const translations = {
  en: {
    brand: 'tiyu salon tokyo',
    nav: {
      gallery: 'Gallery',
      search: 'Search',
      inspo: 'Inspo',
      wishlist: 'Wishlist',
    },
    home: {
      title: 'The Lookbook',
      subtitle: 'A curated gallery of our work',
      ctaTitle: 'Plan Your Visit',
      ctaDesc: 'Estimate your investment with our price calculator',
      ctaArrow: 'Open Estimator',
    },
    detail: {
      back: 'Back',
      investment: 'Estimated Investment',
      investmentNote: 'Final pricing varies with length, removal, and custom details',
      customizeEstimate: 'Customize My Estimate',
      palette: 'The Tiyu Palette',
      saveWishlist: 'Add to Wishlist',
      savedWishlist: 'Saved to Wishlist',
      removed: 'Removed from wishlist',
      saved: 'Saved to your wishlist',
      tierCustom: 'Custom Inspo',
    },
    estimator: {
      title: 'Price Estimator',
      subtitle: 'Build your custom estimate',
      design: 'Design Level',
      extensions: 'Length & Extensions',
      removal: 'Removal (if applicable)',
      total: 'Estimated Total',
      base: 'Base',
      included: 'Included',
      noCharge: 'No charge',
      designs: {
        single: { label: 'Single Color', desc: 'Solid, cat eye, or chrome' },
        simple: { label: 'Simple Design', desc: '2D simple art, with or without charms' },
        complicated: { label: 'Complicated Design', desc: '2D complicated art, 3D art' },
        intense: { label: 'Intense Design', desc: 'Very detailed, intensive 2D art' },
      },
      exts: {
        natural: { label: 'Natural Nails', desc: 'No extensions needed' },
        fullset: { label: 'Full Set Extensions', desc: 'Full set of gel extensions' },
        perfinger: { label: 'Per Finger', desc: 'Individual extension fingers' },
        overlay: { label: 'Overlay Per Finger', desc: 'Gel overlay per finger' },
      },
      fingerCount: 'Number of fingers',
      removals: {
        none: { label: 'No Removal', desc: 'First time or bare nails' },
        polish: { label: 'Polish Removal', desc: 'Regular polish removal' },
        gel: { label: 'Gel Removal', desc: 'Gel polish removal' },
        acrylic: { label: 'Acrylic/Fill Removal', desc: 'Acrylic or fill removal' },
      },
    },
    upload: {
      title: 'Inspo for Tiyu',
      subtitle: 'Share looks you love — saved privately to your wishlist',
      photo: 'Inspiration Photo',
      tapPhoto: 'Tap to add a photo',
      photoNote: 'Show this to Tiyu during your visit',
      lookTitle: 'Look Title',
      titlePlaceholder: 'e.g. Soft Ombré French',
      colors: 'Colors & Details',
      colorsPlaceholder: 'Base: OPI Funny Bunny\nAccent: Essie Blanc\nGold foil accents',
      submit: 'Save to Wishlist',
      needPhoto: 'Please add a photo first',
      saved: 'Saved to your wishlist',
      change: 'Change',
    },
    collection: {
      title: 'My Wishlist',
      subtitle: 'Your curated collection',
      savedCount: (n) => `${n} saved look${n !== 1 ? 's' : ''}`,
      emptyTitle: 'Your wishlist awaits',
      emptyDesc: 'Save looks from the gallery or upload your own inspiration to bring to your appointment.',
      bookBtn: 'Book My Appointment',
    },
    search: {
      title: 'Search',
      placeholder: 'Search styles, colors, tiers...',
      noResults: 'No looks found. Try a different search.',
    },
    toast: {
      removed: 'Removed from wishlist',
      saved: 'Saved to your wishlist',
    },
  },

  ja: {
    brand: 'tiyu salon tokyo',
    nav: {
      gallery: 'ギャラリー',
      search: '検索',
      inspo: 'インスポ',
      wishlist: 'ウィッシュリスト',
    },
    home: {
      title: 'ルックブック',
      subtitle: '私たちの作品を集めたギャラリー',
      ctaTitle: 'ご来店の計画',
      ctaDesc: '料金計算ツールでご予算を估算',
      ctaArrow: '計算ツールを開く',
    },
    detail: {
      back: '戻る',
      investment: '参考価格',
      investmentNote: '最終価格は長さ・除去・デザインにより異なります',
      customizeEstimate: '見積もりをカスタマイズ',
      palette: 'Tiyu パレット',
      saveWishlist: 'ウィッシュリストに追加',
      savedWishlist: 'ウィッシュリストに保存済み',
      removed: 'ウィッシュリストから削除しました',
      saved: 'ウィッシュリストに保存しました',
      tierCustom: 'カスタムインスポ',
    },
    estimator: {
      title: '料金計算ツール',
      subtitle: 'オプションを選んで見積もりを作成',
      design: 'デザインレベル',
      extensions: '長さ・エクステンション',
      removal: '除去（必要な場合）',
      total: '見積もり合計',
      base: 'ベース',
      included: '込み',
      noCharge: '無料',
      designs: {
        single: { label: '単色', desc: '単色・キャットアイ・クローム' },
        simple: { label: 'シンプルデザイン', desc: '2Dシンプルアート・チャーム付き可' },
        complicated: { label: '複雑デザイン', desc: '2D複雑アート・3Dアート' },
        intense: { label: 'インテンスデザイン', desc: '非常に細かい・凝った2Dアート' },
      },
      exts: {
        natural: { label: '自然な爪', desc: 'エクステンション不要' },
        fullset: { label: 'フルセット', desc: 'ジェルエクステンション全指' },
        perfinger: { label: '1本追加', desc: '追加したい指のみ' },
        overlay: { label: 'オーバーレイ1本', desc: 'ジェルオーバーレイ1本' },
      },
      fingerCount: '本数',
      removals: {
        none: { label: '除去なし', desc: '初めて・爪が裸' },
        polish: { label: 'マニキュア除去', desc: '通常のポリッシュ除去' },
        gel: { label: 'ジェル除去', desc: 'ジェルポリッシュ除去' },
        acrylic: { label: 'アクリル・リフィル除去', desc: 'アクリル・リフィル除去' },
      },
    },
    upload: {
      title: 'Tiyuへインスポ',
      subtitle: 'お気に入りのデザインを保存 — ウィッシュリストに非公開保存',
      photo: 'インスピレーション写真',
      tapPhoto: 'タップして写真を追加',
      photoNote: 'ご来店時にTiyuにお見せください',
      lookTitle: 'ルック名',
      titlePlaceholder: '例：ソフト オンブル フレンチ',
      colors: 'カラー・詳細',
      colorsPlaceholder: 'ベース：OPI Funny Bunny\nアクセント：Essie Blanc\nゴールドホイル',
      submit: 'ウィッシュリストに保存',
      needPhoto: '写真を追加してください',
      saved: 'ウィッシュリストに保存しました',
      change: '変更',
    },
    collection: {
      title: 'マイウィッシュリスト',
      subtitle: 'あなたのコレクション',
      savedCount: (n) => `${n}件の保存`,
      emptyTitle: 'ウィッシュリストは空です',
      emptyDesc: 'ギャラリーからデザインを保存するか、ご来店用のインスポをアップロードしてください。',
      bookBtn: '予約する',
    },
    search: {
      title: '検索',
      placeholder: 'スタイル・カラー・レベルで検索...',
      noResults: '見つかりませんでした。別のキーワードでお試しください。',
    },
    toast: {
      removed: 'ウィッシュリストから削除しました',
      saved: 'ウィッシュリストに保存しました',
    },
  },
};

class I18n {
  constructor() {
    this._lang = localStorage.getItem('tiyu_lang') || 'en';
    this._listeners = [];
  }

  get lang() { return this._lang; }

  get isJapanese() { return this._lang === 'ja'; }

  setLang(lang) {
    if (lang === this._lang) return;
    this._lang = lang;
    localStorage.setItem('tiyu_lang', lang);
    document.documentElement.lang = lang;
    this._listeners.forEach(fn => fn());
  }

  toggle() {
    this.setLang(this._lang === 'en' ? 'ja' : 'en');
  }

  get(key) {
    const parts = key.split('.');
    let val = translations[this._lang];
    for (const p of parts) {
      if (val === undefined) return key;
      val = val[p];
    }
    return typeof val === 'function' ? val : (val ?? key);
  }

  t(key) { return this.get(key); }

  onChange(fn) {
    this._listeners.push(fn);
    return () => { this._listeners = this._listeners.filter(l => l !== fn); };
  }
}

export const i18n = new I18n();
