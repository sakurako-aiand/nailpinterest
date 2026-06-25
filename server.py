import os
import json
import sqlite3
import uuid
import base64
import re
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

PORT = int(os.environ.get("PORT", 8080))
DB_PATH = os.path.join(os.getcwd(), "gallery.db")
UPLOAD_DIR = os.path.join(os.getcwd(), "uploads")
ADMIN_PASSCODE = os.environ.get("ADMIN_PASSCODE", "tiyu-admin")

# Canonical id <-> human label maps (admin shows labels, DB stores ids)
LOCATION_LABELS = {
    "salon": "Tiyu Salon Tokyo",
    "studio": "Tiyu Studio Tokyo",
}
CATEGORY_LABELS = {
    "nails": "Nails",
    "pressons": "Press-ons",
    "lashes": "Lashes",
    "brows": "Brows",
    "pedicures": "Pedicures",
    "tattoos": "Tattoos",
}
VALID_LOCATIONS = set(LOCATION_LABELS)
VALID_CATEGORIES = set(CATEGORY_LABELS)


def init_db():
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS GalleryImages (
            id TEXT PRIMARY KEY,
            ImageURL TEXT NOT NULL,
            Location TEXT NOT NULL,
            ServiceCategory TEXT NOT NULL,
            UploadDate TEXT NOT NULL,
            Is_Client_Photo INTEGER NOT NULL DEFAULT 0
        )
    """)
    # Add column if upgrading from old schema
    cols = [r[1] for r in conn.execute("PRAGMA table_info(GalleryImages)").fetchall()]
    if "Is_Client_Photo" not in cols:
        conn.execute("ALTER TABLE GalleryImages ADD COLUMN Is_Client_Photo INTEGER NOT NULL DEFAULT 0")
    conn.commit()
    count = conn.execute("SELECT COUNT(*) FROM GalleryImages").fetchone()[0]
    conn.close()
    if count == 0:
        seed_gallery()


SEED_IMAGES = [
    ("7c92d2_4f0dbecf712c484ea18b6b2dbcab5ab3", "png",  "salon"),
    ("7c92d2_0533d74681674293adc4df66066dbfe3", "png",  "studio"),
    ("7c92d2_63f53e879cd149269f5465f6e6ec7b17", "jpg",  "salon"),
    ("7c92d2_e3370d7c2a3d43bcb5811bb7808f791a", "png",  "studio"),
    ("7c92d2_a1dd53d685a440e0932f7c18d2f1e9ae", "png",  "salon"),
    ("7c92d2_00e82380d64643d98afd3f3db93aa6b5", "png",  "studio"),
    ("7c92d2_a4d76ee19b3d4cb59e430c5ef5a6bc83", "png",  "salon"),
    ("7c92d2_8a11ab61cc654abaa23ebdf85f8ecb39", "png",  "studio"),
    ("7c92d2_435264a2819c4fda9bed5d2160f43a81", "png",  "salon"),
    ("7c92d2_8f6f76b1dd414d7e9628ebc20ebe60c7", "png",  "studio"),
    ("7c92d2_34a041a96bff444983d2c9613ef87ad6", "png",  "salon"),
    ("7c92d2_a3347862c44e43b88e1b989d7f12bb34", "png",  "studio"),
    ("7c92d2_7c2eaa30e83d4e76923889c64b2c2867", "jpeg", "salon"),
    ("7c92d2_0efe127ede044dbf9f2ad609718ea027", "jpg",  "studio"),
    ("7c92d2_e0d67274986d4ef48d065db1139bca19", "jpg",  "salon"),
    ("7c92d2_3375b3636670409cb69999c4e38c5771", "png",  "studio"),
    ("7c92d2_0aa8a2f904014458abcaea4601dc1a5e", "png",  "salon"),
    ("7c92d2_25ff8db88f2f46fc93e8939a0b4094c4", "jpg",  "studio"),
    ("7c92d2_677f88964b984db689ae7bbc5918d390", "jpg",  "salon"),
    ("7c92d2_0ffe7fc6f12f4c849d3c4abb593c2c6a", "jpg",  "studio"),
    ("7c92d2_7df892872faf4a9597dc2a1bddea4882", "jpg",  "salon"),
    ("7c92d2_6ce15bb561d0463abf12cb2bd00ccf5f", "jpg",  "studio"),
    ("7c92d2_794739f1009643f1ad3e0a81813565e2", "jpg",  "salon"),
    ("7c92d2_4e7cae1fd7044ed184ae7032a245af69", "jpg",  "studio"),
    ("7c92d2_496a56e7a91d4fb792e0d630e930eecb", "png",  "salon"),
]


def seed_gallery():
    """Insert seed images into the DB on startup (ephemeral filesystem recovery)."""
    from datetime import datetime, timezone
    upload_date = datetime.now(timezone.utc).isoformat()
    conn = db_conn()
    for hash_str, ext, location in SEED_IMAGES:
        image_url = f"https://static.wixstatic.com/media/{hash_str}~mv2.{ext}/v1/fill/w_400,h_500,q_90/{hash_str}~mv2.{ext}"
        item_id = f"seed_{hash_str}"
        conn.execute(
            "INSERT OR IGNORE INTO GalleryImages (id, ImageURL, Location, ServiceCategory, UploadDate, Is_Client_Photo) VALUES (?, ?, ?, ?, ?, 0)",
            (item_id, image_url, location, "nails", upload_date),
        )
    conn.commit()
    conn.close()
    print(f"Seeded {len(SEED_IMAGES)} gallery images")


def db_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def row_to_item(row):
    """Map a DB row to the gallery-item shape expected by the frontend."""
    cat = row["ServiceCategory"]
    loc = row["Location"]
    # Nails items get a default tier so the detail view pricing works.
    tier = "simple" if cat == "nails" else None
    return {
        "id": row["id"],
        "image": row["ImageURL"],
        "title": "Tiyu Creation",
        "category": cat,
        "location": loc,
        "tier": tier,
        "tags": [],
        "colors": [],
        "uploadDate": row["UploadDate"],
        "isClientPhoto": bool(row["Is_Client_Photo"]),
    }


class TiyuHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

    # ── Routing ──
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        if path == "/api/gallery":
            return self.handle_gallery(parsed.query)
        if path == "/admin-upload":
            return self.serve_admin_page()
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/upload":
            return self.handle_upload()
        if parsed.path == "/api/import-ig":
            return self.handle_import_ig()
        self.send_json(404, {"error": "Not found"})

    def do_DELETE(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/gallery":
            return self.handle_delete()
        self.send_json(404, {"error": "Not found"})

    # ── Endpoints ──
    def handle_gallery(self, query):
        params = parse_qs(query)
        location = params.get("location", [None])[0]
        category = params.get("category", [None])[0]
        sql = "SELECT * FROM GalleryImages"
        clauses, args = [], []
        if location in VALID_LOCATIONS:
            clauses.append("Location = ?")
            args.append(location)
        if category in VALID_CATEGORIES:
            clauses.append("ServiceCategory = ?")
            args.append(category)
        if clauses:
            sql += " WHERE " + " AND ".join(clauses)
        sql += " ORDER BY UploadDate DESC"
        conn = db_conn()
        rows = conn.execute(sql, args).fetchall()
        conn.close()
        self.send_json(200, [row_to_item(r) for r in rows])

    def handle_upload(self):
        body = self.read_json_body()
        if body is None:
            return
        if body.get("passcode") != ADMIN_PASSCODE:
            return self.send_json(401, {"error": "Invalid passcode"})
        location = body.get("location")
        category = body.get("category")
        if location not in VALID_LOCATIONS:
            return self.send_json(400, {"error": "Invalid location"})
        if category not in VALID_CATEGORIES:
            return self.send_json(400, {"error": "Invalid service category"})

        image_url = body.get("imageUrl")
        data_url = body.get("imageDataUrl")
        if data_url:
            image_url = self.save_data_url(data_url)
            if image_url is None:
                return self.send_json(400, {"error": "Could not decode image"})
        elif not image_url:
            return self.send_json(400, {"error": "Provide imageUrl or imageDataUrl"})

        item_id = uuid.uuid4().hex
        # sqlite3 adapter handles the datetime
        from datetime import datetime, timezone
        upload_date = datetime.now(timezone.utc).isoformat()
        is_client = 1 if body.get("isClientPhoto") else 0

        conn = db_conn()
        conn.execute(
            "INSERT INTO GalleryImages (id, ImageURL, Location, ServiceCategory, UploadDate, Is_Client_Photo) VALUES (?, ?, ?, ?, ?, ?)",
            (item_id, image_url, location, category, upload_date, is_client),
        )
        conn.commit()
        conn.close()
        self.send_json(201, {"id": item_id, "image": image_url, "location": location, "category": category})

    def handle_import_ig(self):
        """Fetch an image from an Instagram post URL or direct image URL,
        download the bytes to /uploads/, and return the local URL.
        The image persists on the server even if the IG post is later deleted."""
        body = self.read_json_body()
        if body is None:
            return
        if body.get("passcode") != ADMIN_PASSCODE:
            return self.send_json(401, {"error": "Invalid passcode"})
        raw_url = (body.get("url") or "").strip()
        if not raw_url:
            return self.send_json(400, {"error": "Missing url"})

        url = raw_url.strip()
        if url.startswith("www."):
            url = "https://" + url

        # Fetch the URL and branch on content-type:
        #  - image/*  -> direct image, download bytes
        #  - text/html -> Instagram post page, extract og:image, then download that
        result = self.fetch_and_resolve_image(url)
        if result is None:
            return self.send_json(422, {
                "error": "Could not extract an image. Instagram may be showing a login wall. "
                         "Right-click the photo on Instagram and choose 'Copy image address', then paste that direct URL.",
            })
        direct_url, data = result
        if data is None:
            # og:image pointed somewhere but the second fetch failed
            return self.send_json(502, {"error": "Could not download the image. Try the direct image URL."})
        saved = self.save_image_bytes(data)
        if saved is None:
            return self.send_json(502, {"error": "Could not save the image."})
        self.send_json(200, {"image": saved, "source": direct_url})

    def fetch_and_resolve_image(self, url):
        """Fetch url. Returns (direct_image_url, image_bytes) on success.
        If the URL serves HTML, parses og:image and fetches that instead.
        Returns None if no image can be resolved; (url, None) if a direct
        image URL was found but its bytes couldn't be downloaded."""
        fetched_url, content_type, body = self._fetch(url, timeout=20)
        if fetched_url is None:
            return None
        if content_type and content_type.startswith("image/"):
            return (fetched_url, body)
        # HTML page — try to extract og:image
        if content_type and content_type.startswith("text/html") and body:
            match = re.search(
                r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']',
                body, re.IGNORECASE,
            )
            if match:
                og_url = match.group(1).replace("&amp;", "&")
                img_url, img_ct, img_body = self._fetch(og_url, timeout=30)
                if img_url and img_ct and img_ct.startswith("image/"):
                    return (img_url, img_body)
                return (og_url, None)
        return None

    def _fetch(self, url, timeout=20):
        """GET a URL with browser-like headers. Returns (final_url, content_type, body_text_or_None).
        body is decoded as text for HTML, kept as bytes for images."""
        req = self._build_request(url, accept="*/*")
        try:
            with urlopen(req, timeout=timeout) as resp:
                if resp.status != 200:
                    return (None, None, None)
                ct = (resp.headers.get("Content-Type") or "").lower().split(";")[0].strip()
                final_url = resp.url or url
                # For images, read bytes; for HTML, read text (capped)
                if ct.startswith("image/"):
                    data = resp.read(15 * 1024 * 1024)
                    return (final_url, ct, data)
                if ct.startswith("text/html"):
                    text = resp.read(2 * 1024 * 1024).decode("utf-8", errors="replace")
                    return (final_url, ct, text)
                # Unknown content-type — let the caller decide
                return (final_url, ct, None)
        except (URLError, HTTPError, TimeoutError, ConnectionError):
            return (None, None, None)

    def save_image_bytes(self, data, content_type=""):
        """Save raw image bytes to /uploads/<uuid>.<ext>. Returns '/uploads/...' or None."""
        if not data or len(data) > 15 * 1024 * 1024:
            return None
        ext = "jpg"
        if "png" in content_type:
            ext = "png"
        elif "webp" in content_type:
            ext = "webp"
        filename = f"{uuid.uuid4().hex}.{ext}"
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        path = os.path.join(UPLOAD_DIR, filename)
        with open(path, "wb") as f:
            f.write(data)
        return f"/uploads/{filename}"

    def _build_request(self, url, accept="*/*"):
        return Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/124.0.0.0 Safari/537.36",
            "Accept": accept,
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Encoding": "identity",  # avoid gzip decode complexity
            "Cache-Control": "no-cache",
        })

    def handle_delete(self):
        body = self.read_json_body()
        if body is None:
            return
        if body.get("passcode") != ADMIN_PASSCODE:
            return self.send_json(401, {"error": "Invalid passcode"})
        item_id = body.get("id")
        if not item_id:
            return self.send_json(400, {"error": "Missing id"})
        conn = db_conn()
        row = conn.execute("SELECT ImageURL FROM GalleryImages WHERE id = ?", (item_id,)).fetchone()
        conn.execute("DELETE FROM GalleryImages WHERE id = ?", (item_id,))
        conn.commit()
        conn.close()
        if row and row["ImageURL"].startswith("/uploads/"):
            try:
                os.remove(os.path.join(os.getcwd(), row["ImageURL"].lstrip("/")))
            except OSError:
                pass
        self.send_json(200, {"deleted": item_id})

    # ── Helpers ──
    def save_data_url(self, data_url):
        match = re.match(r"data:image/(\w+);base64,(.+)", data_url)
        if not match:
            return None
        ext = "jpg" if match.group(1) == "jpeg" else match.group(1)
        ext = ext if ext in ("jpg", "png", "webp", "gif") else "jpg"
        filename = f"{uuid.uuid4().hex}.{ext}"
        path = os.path.join(UPLOAD_DIR, filename)
        with open(path, "wb") as f:
            f.write(base64.b64decode(match.group(2)))
        return f"/uploads/{filename}"

    def serve_admin_page(self):
        admin_file = os.path.join(os.getcwd(), "admin-upload.html")
        if not os.path.exists(admin_file):
            return self.send_json(404, {"error": "admin-upload.html not found"})
        with open(admin_file, "rb") as f:
            content = f.read()
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def read_json_body(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
        except ValueError:
            self.send_json(400, {"error": "Bad Content-Length"})
            return None
        if length <= 0 or length > 15 * 1024 * 1024:
            self.send_json(413, {"error": "Body too large (max 15MB)"})
            return None
        raw = self.rfile.read(length)
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            self.send_json(400, {"error": "Invalid JSON"})
            return None

    def send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        # Keep the console quiet for static asset noise; still log API calls.
        if "/api/" in (args[0] if args else "") or "/admin-upload" in (args[0] if args else ""):
            super().log_message(fmt, *args)


if __name__ == "__main__":
    init_db()
    print(f"Admin passcode: {ADMIN_PASSCODE}")
    print(f"Serving on 0.0.0.0:{PORT}  (admin at /admin-upload)")
    http = HTTPServer(("0.0.0.0", PORT), TiyuHandler)
    http.serve_forever()
