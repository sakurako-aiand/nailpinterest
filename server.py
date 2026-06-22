from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

port = int(os.environ.get("PORT", 8080))
handler = SimpleHTTPRequestHandler
http = HTTPServer(("0.0.0.0", port), handler)
print(f"Serving on 0.0.0.0:{port}")
http.serve_forever()
