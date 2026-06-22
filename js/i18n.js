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
      tags: 'Tags',
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
      popularTags: 'Popular Tags',
    },
    toast: {
      removed: 'Removed from wishlist',
      saved: 'Saved to your wishlist',
    },
    canvas: {
      title: 'Design Canvas',
      selectDesign: 'Select a design below, then tap a finger to apply',
      tapFinger: 'Now tap a finger to apply the design',
      clearAll: 'Clear',
      gallery: 'Designs',
      finalize: 'Finalize Look',
      generating: 'Generating your look...',
      generateError: 'Unable to generate. Please try again.',
      resultTitle: 'Your Canvas Look',
      sendToTiyu: 'Send to Tiyu',
      saveImage: 'Save Image',
      bookAfter: 'Book Appointment',
      close: 'Close',
      applied: 'Design applied!',
      selectFirst: 'Select a design first',
      savedImage: 'Image saved to your device',
      shareText: 'I created this custom nail design using the Tiyu Canvas. I would love this for my appointment!',
      emailBody: 'Hello Tiyu,\n\nI created a custom nail design using the Tiyu Canvas lookbook app.\n\nI would love to discuss this for my upcoming appointment.\n\nThank you!',
      emailOpened: 'Opening email — please attach your saved image',
      shareFallback: 'Please save the image and email it to tiyusalontokyo@gmail.com',
      tryOnCanvas: 'Try on Canvas',
      ctaTitle: 'Design Canvas',
      ctaDesc: 'Mix and match designs on a virtual hand',
      ctaArrow: 'Open Canvas',
    },
    policy: {
      title: 'Our Policy',
      subtitle: 'Please read carefully before booking',
      cancellation: 'Cancellation or Rescheduling',
      cancellationItems: [
        'Full refund for cancellations or rescheduling made more than 4 days in advance.',
        '50% refund for cancellations or rescheduling made 4 days before the appointment day.',
        'No refund for cancellations or rescheduling made less than 4 days before the appointment day or no-show.',
      ],
      cancellationNote: '⚠️ This policy applies under all circumstances and conditions. ⚠️',
      late: 'Late Arrivals',
      lateItems: [
        'If you arrive late, your service time may be shortened.',
        'If you are more than 15 minutes late, we may not be able to provide the service. This will be treated as a "no-show" and your deposit will not be refunded.',
        'If we are still able to take you after the delay, a ¥3,500 delay fee will apply.',
        'If your companion wishes to wait inside the salon, we kindly ask that they order a drink (¥770 per person) for use of our facilities.',
      ],
      refix: 'Refund / Refix',
      refixItems: [
        'We do not offer refunds after the service.',
        'If you notice any issues, we can offer a refix within one week, provided our schedule allows.',
      ],
      refixCovers: 'A refix applies only to technical issues such as:',
      refixCoversItems: [
        'A nail chip or crack',
        'Detached parts or stones',
        'Lifted or broken extensions',
      ],
      refixNote: 'Design or quality-related adjustments (e.g., "I don\'t like the color," "I wish it were thinner/shorter") must be mentioned during your appointment. Once the service is completed, corrections may be limited.',
      refixFinal: 'We always strive to deliver high-quality results; however, depending on the design or style, it may not be possible to reproduce the exact image requested.',
    },
    booking: {
      title: 'Before You Book',
      subtitle: 'Please review our key policies',
      reminder1Title: 'Cancellations',
      reminder1Text: 'Full refund 4+ days before. 50% refund 4 days before. No refund within 4 days or no-show.',
      reminder2Title: 'Late Arrivals',
      reminder2Text: '15+ min late may be treated as no-show. A ¥3,500 delay fee applies if we can still accommodate you.',
      reminder3Title: 'Refix Policy',
      reminder3Text: 'No refunds after service. Refix within 1 week for technical issues only (chips, cracks, detached parts).',
      acknowledge: 'I have read and understand the policy',
      acknowledgeBtn: 'I Understand — Continue to Booking',
      cancel: 'Go Back',
      viewFull: 'View Full Policy',
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
      tags: 'タグ',
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
      popularTags: '人気のタグ',
    },
    toast: {
      removed: 'ウィッシュリストから削除しました',
      saved: 'ウィッシュリストに保存しました',
    },
    canvas: {
      title: 'デザインキャンバス',
      selectDesign: '下のデザインを選んで、指をタップして適用',
      tapFinger: '指をタップしてデザインを適用',
      clearAll: 'クリア',
      gallery: 'デザイン',
      finalize: 'ルックを完成',
      generating: '生成中...',
      generateError: '生成できませんでした。もう一度お試しください。',
      resultTitle: 'あなたのキャンバスルック',
      sendToTiyu: 'Tiyuに送る',
      saveImage: '画像を保存',
      bookAfter: '予約する',
      close: '閉じる',
      applied: 'デザインを適用しました！',
      selectFirst: '先にデザインを選んでください',
      savedImage: '画像を保存しました',
      shareText: 'Tiyuキャンバスでカスタムネイルデザインを作成しました。ご予約時にこのデザインでお願いしたいです！',
      emailBody: 'Tiyuさん、\n\nTiyuキャンバスアプリでカスタムネイルデザインを作成しました。\n\nご予約時にこのデザインについて相談させていただきたいです。\n\nよろしくお願いいたします！',
      emailOpened: 'メールを開いています — 保存した画像を添付してください',
      shareFallback: '画像を保存して tiyusalontokyo@gmail.com にメールでお送りください',
      tryOnCanvas: 'キャンバスで試す',
      ctaTitle: 'デザインキャンバス',
      ctaDesc: 'バーチャルな手でデザインを組み合わせ',
      ctaArrow: 'キャンバスを開く',
    },
    policy: {
      title: '当サロンポリシー',
      subtitle: 'ご予約前に必ずお読みください',
      cancellation: 'キャンセル・日程変更について',
      cancellationItems: [
        '4日前までのキャンセル・日程変更は全額返金いたします。',
        '予約日の4日前のキャンセル・日程変更は50%返金いたします。',
        '予約日の4日前以降のキャンセル・日程変更、または無断キャンセルは返金いたしません。',
      ],
      cancellationNote: '⚠️このポリシーはいかなる状況・条件においても適用されます。⚠️',
      late: '遅刻について',
      lateItems: [
        '遅刻された場合、サービス時間が短縮される場合がございます。',
        '15分以上遅刻された場合、スケジュールによりサービスをご提供できない場合がございます。その場合、無断キャンセルとして扱い、デポジットは返金されません。',
        '遅刻後でもサービス可能な場合、¥3,500の遅延料金が発生します。',
        '同行者がサロン内でお待ちになる場合、座席・Wi-Fi・トイレ等のご利用に対し、ドリンク（1名様¥770）をご注文いただきますようお願いいたします。',
      ],
      refix: '返金・リフィックスについて',
      refixItems: [
        'サービス完了後の返金は行っておりません。',
        '問題がございましたら、スケジュールの許す限り1週間以内にリフィックスをご提供いたします。',
      ],
      refixCovers: 'リフィックスの対象は以下の技術的な問題のみです：',
      refixCoversItems: [
        '爪のチップや割れ',
        'パーツやストーンの外れ',
        'エクステンションの浮き・破損',
      ],
      refixNote: 'デザインや品質に関する調整（例：「色が気に入らない」「もう少し細く・短くしてほしい」など）は、ご来店時にお申し付けください。サービス完了後の修正には限界がございます。',
      refixFinal: '常に高品質な結果をお届けするよう努めておりますが、デザインやスタイルによってはご希望の通りのイメージを完全に再現できない場合がございます。あらかじめご了承ください。',
    },
    booking: {
      title: 'ご予約前に',
      subtitle: '当サロンの重要ポリシーをご確認ください',
      reminder1Title: 'キャンセルについて',
      reminder1Text: '4日前まで全額返金。4日前は50%返金。4日以内または無断キャンセルは返金なし。',
      reminder2Title: '遅刻について',
      reminder2Text: '15分以上の遅刻は無断キャンセル扱いの場合あり。対応可能な場合は¥3,500の遅延料金が発生します。',
      reminder3Title: 'リフィックスポリシー',
      reminder3Text: 'サービス後の返金はありません。1週間以内の技術的問題（チップ・割れ・パーツ外れ）のみリフィックス対応可能。',
      acknowledge: 'ポリシーを読み、理解しました',
      acknowledgeBtn: '確認しました — 予約ページへ進む',
      cancel: '戻る',
      viewFull: 'ポリシー全文を見る',
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
