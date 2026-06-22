class Store {
  constructor() {
    const saved = localStorage.getItem('tiyu_wishlist');
    this._collection = saved ? JSON.parse(saved) : [];
    this._listeners = [];
  }

  get collection() {
    return [...this._collection];
  }

  isInCollection(id) {
    return this._collection.some(item => item.id === id);
  }

  saveToCollection(item) {
    if (this.isInCollection(item.id)) return false;
    this._collection.push({ ...item, savedAt: Date.now() });
    this._save();
    this._notify();
    return true;
  }

  removeFromCollection(id) {
    const before = this._collection.length;
    this._collection = this._collection.filter(item => item.id !== id);
    if (this._collection.length !== before) {
      this._save();
      this._notify();
      return true;
    }
    return false;
  }

  addUpload(imageDataUrl, title, colorsText) {
    const colors = colorsText
      .split('\n')
      .filter(line => line.trim())
      .map((line, i) => {
        const [rest, brandRaw] = line.split(/,|—/);
        const label = rest ? rest.trim() : `Color ${i + 1}`;
        const brand = brandRaw ? brandRaw.trim() : '';
        return {
          label,
          brand: brand || 'Custom',
          color: label,
          swatch: 'taupe-swatch',
        };
      });

    const item = {
      id: 'u_' + Date.now(),
      title: title || 'Untitled Inspo',
      image: imageDataUrl,
      colors,
      savedAt: Date.now(),
      isUpload: true,
      tier: 'custom',
    };
    this._collection.push(item);
    this._save();
    this._notify();
    return item;
  }

  onChange(fn) {
    this._listeners.push(fn);
    return () => {
      this._listeners = this._listeners.filter(l => l !== fn);
    };
  }

  _save() {
    localStorage.setItem('tiyu_wishlist', JSON.stringify(this._collection));
  }

  _notify() {
    for (const fn of this._listeners) fn(this._collection);
  }
}

export const store = new Store();
