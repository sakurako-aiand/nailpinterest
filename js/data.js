const PRICING = {
  currency: '¥',
  base: 8000,
  baseNote: 'Single color gel manicure (solid, cat eye, or chrome)',
  designs: [
    { id: 'single',   label: 'Single Color',      price: 0,    desc: 'Solid, cat eye, or chrome' },
    { id: 'simple',   label: 'Simple Design',      price: 3000, desc: '2D simple art, with or without charms' },
    { id: 'complicated', label: 'Complicated Design', price: 5500, desc: '2D complicated art, 3D art' },
    { id: 'intense',  label: 'Intense Design',     price: 9000, desc: 'Very detailed, intensive 2D art' },
  ],
  extensions: [
    { id: 'natural',  label: 'Natural Nails',      price: 0,    desc: 'No extensions needed' },
    { id: 'fullset',  label: 'Full Set Extensions', price: 4500, desc: 'Full set of gel extensions' },
    { id: 'perfinger', label: 'Per Finger',        price: 600,  desc: 'Individual extension fingers', hasCount: true },
    { id: 'overlay',  label: 'Overlay Per Finger',  price: 450,  desc: 'Gel overlay per finger', hasCount: true },
  ],
  removals: [
    { id: 'none',     label: 'No Removal',         price: 0,    desc: 'First time or bare nails' },
    { id: 'polish',   label: 'Polish Removal',     price: 1000, desc: 'Regular polish removal' },
    { id: 'gel',      label: 'Gel Removal',        price: 2000, desc: 'Gel polish removal' },
    { id: 'acrylic',  label: 'Acrylic/Fill Removal', price: 3000, desc: 'Acrylic or fill removal' },
  ],
  bookingUrl: 'https://www.tiyutokyo.com/tiyusalontokyo',
  contactUrl: 'https://www.tiyutokyo.com/contact',
  pressonDiscount: 3500,
};

const SERVICES = [
  { id: 'nails',     label: 'Nails',      jaLabel: 'ネイル',     location: 'both' },
  { id: 'pressons',  label: 'Press-ons',  jaLabel: 'プレスオン',  location: 'both' },
  { id: 'vintage',   label: 'Vintage',    jaLabel: 'ビンテージ',  location: 'studio', special: true },
];

const LOCATIONS = {
  salon:  { id: 'salon',  label: 'Tiyu Salon Tokyo',  jaLabel: 'tiyu salon tokyo',  color: '#E5D3B3', bookingUrl: 'https://tiyusalontokyo.square.site/?location=L03VB1A3GCW75' },
  studio: { id: 'studio', label: 'Tiyu Studio Tokyo', jaLabel: 'tiyu studio tokyo', color: '#F8C8DC', bookingUrl: 'https://tiyusalontokyo.square.site/?location=L03VB1A3GCW75' },
};

const SQUARE_BASE = 'https://tiyusalontokyo.square.site';
const SQUARE_LOC = 'L03VB1A3GCW75';

const BOOKING_MAP = {
  nails: {
    default: `${SQUARE_BASE}/shop/book-manicure-choose-base-design/OCPP5TES2C4VXFVGLUI6C4FV`,
    single:  `${SQUARE_BASE}/shop/single-color-manicure/NJENYJIAPDQMFN45SD2PSU5R`,
    simple:  `${SQUARE_BASE}/shop/simple-design-manicure/3LGIVR2YGBCVNK6LWYZNTQLY`,
    complicated: `${SQUARE_BASE}/shop/complicated-design-manicure/TE5VLYPUFH6EYZG2CJMNF7WG`,
    intense: `${SQUARE_BASE}/shop/intense-design-manicure/GYDKQ6SWXUMXZYE64MRLFZCF`,
  },
  tattoos: {
    default: `${SQUARE_BASE}/shop/tattoos/SMZE4PWBMM62WH2REATOZGVH`,
    small: `${SQUARE_BASE}/shop/tattoos/SMZE4PWBMM62WH2REATOZGVH`,
    medium: `${SQUARE_BASE}/shop/tattoos/SMZE4PWBMM62WH2REATOZGVH`,
    large: `${SQUARE_BASE}/shop/tattoos/SMZE4PWBMM62WH2REATOZGVH`,
    custom: `${SQUARE_BASE}/shop/tattoos/SMZE4PWBMM62WH2REATOZGVH`,
  },
  pressons: {
    default: `${SQUARE_BASE}/shop/custom-press-on-nails-oreder/YEYTWQ4DL7Q75N6LXZUREDHT`,
  },
  brows: {
    default: `${SQUARE_BASE}/shop/brows/7LQNW3ZH42URT5C5OZ6XVLNJ`,
  },
  lashes: {
    default: `${SQUARE_BASE}/?location=${SQUARE_LOC}`,
  },
  pedicures: {
    default: `${SQUARE_BASE}/?location=${SQUARE_LOC}`,
  },
  vintage: {
    default: `${SQUARE_BASE}/?location=${SQUARE_LOC}`,
  },
};

const PRICE_LISTS = {
  lashes: {
    prepNote: 'Please arrive with no makeup on your lashes',
    items: [
      { label: 'Omakase / Custom Anime Lash',  desc: 'SIGNATURE — Custom design based on your eyes & style. 120-160 lashes', low: 16000, high: 16000, duration: '1 hr 30 mins', addOns: [{ label: 'Removal', price: 1500 }] },
      { label: 'Single Lash Extensions',         desc: 'Super lightweight, long lasting. Only menu you can combine with lash lift. 120-200 lashes', low: 11000, high: 19000, duration: '1 hr 30 mins – 2 hrs 15 mins', addOns: [{ label: 'Removal', price: 1500 }, { label: 'Upper Lash Lift', price: 7000 }] },
      { label: 'Double Lash Extensions',        desc: 'Clumpy lash bundles for a bold, trendy look. 120-200 lashes', low: 12500, high: 20500, duration: '1 hr 30 mins', addOns: [{ label: 'Removal', price: 1500 }] },
      { label: 'Volume Lash Extensions',         desc: 'Layers of ultra-thin extensions for a fluffy look. 400-1000 lashes', low: 15000, high: 21000, duration: '1 hr 30 mins', addOns: [{ label: 'Removal', price: 1500 }] },
      { label: 'Lash Lift',                       desc: 'Upper & lower lash lift for a naturally defined look', low: 13000, high: 13000, duration: '1 hr 30 mins' },
    ],
  },
  brows: {
    prepNote: 'Please arrive with no makeup on your brows. Avoid trimming or plucking for at least 2 weeks prior. Mild redness may occur — book ahead of important events.',
    items: [
      { label: 'Eyebrow Wax',     desc: 'Removes unwanted hair using wax and tweezers to shape and define your brows based on your natural bone structure', low: 8000, high: 8000, duration: '50 mins' },
      { label: 'Hybrid Brow',     desc: 'Beautifully styled brows without makeup. Combines a specialized brow perm with waxing to correct hair direction and create a fuller, lifted look', low: 10000, high: 10000, duration: '1 hr 15 mins' },
    ],
  },
  tattoos: {
    items: [
      { label: 'Small Size',      desc: 'Up to 5cm × 5cm (approx. 2" × 2"). Price varies with design complexity', low: 8000, high: 12000, duration: '1 hr' },
      { label: 'Medium Size',     desc: 'Up to 5cm × 8cm (approx. 2" × 3.1"). Price varies with design complexity', low: 15000, high: 21000, duration: '1 hr 30 mins' },
      { label: 'Large Size',      desc: 'Up to 10cm × 10cm (approx. 3.9" × 3.9"). Price varies with design complexity', low: 25000, high: 35000, duration: '2 hrs 30 mins' },
      { label: 'Custom',          desc: 'For custom designs, please DM us for inquiries. Send inspiration images in advance', low: 35000, high: null, duration: '3 hrs' },
    ],
  },
  pressons: {
    items: [
      { label: 'Custom Press-Ons',  desc: '¥3,500 OFF from the gel manicure design menu price. Reusable custom set', low: 3500, high: null },
      { label: 'Full Set (10 nails)', desc: 'Reusable press-on nail set based on your selected design', low: 3500, high: null },
      { label: 'Individual Nail',    desc: 'Single replacement press-on nail', low: 400, high: null },
      { label: 'Refill Kit',          desc: 'Adhesive + prep tools', low: 1500, high: null },
      { label: 'Removal & Re-glaze',  desc: 'Remove + refresh existing press-on set', low: 2000, high: null },
    ],
  },
  pedicures: {
    prepNote: 'All pedicures include a wet massage. Removal charges apply additionally.',
    items: [
      { label: 'Single Color',       desc: 'Solid color / Cat Eye / Chrome. +¥1,000 for Cat Eye and Chrome', low: 9000, high: 10000, duration: '1 hr 15 mins – 1 hr 45 mins' },
      { label: 'French Tips / Dots',  desc: 'Classic French tips or dot designs', low: 10500, high: 10500, duration: '1 hr 30 mins – 2 hrs' },
      { label: 'Design',              desc: 'With 2D art or charms', low: 11000, high: 11000, duration: '1 hr 45 mins – 2 hrs 15 mins' },
      { label: 'Polish Removal',      desc: 'Regular polish removal (additional charge)', low: 1000, high: 1000 },
      { label: 'Gel Removal',         desc: 'Gel polish removal (additional charge)', low: 2000, high: 2000 },
    ],
  },
};

const ESTIMATOR_PRICING = {
  currency: '¥',
  base: 8000,
  removalOnlyPrice: 5000,
  variance: 1500,
  removals: [
    { id: 'none',        price: 0 },
    { id: 'polish',      price: 1000 },
    { id: 'gel',         price: 2000 },
    { id: 'acrylic',     price: 3000 },
    { id: 'removalOnly', price: 5000, replacesBase: true },
  ],
  extensions: {
    overlayPerFinger: 450,
    extensionPerFinger: 600,
    extensionFlat: 4500,
    extensionThreshold: 8,
    extensionAllFingers: 4500,
  },
  artLevels: [
    { id: 'oneColor', price: 0,   key: 'estimator.art.oneColor' },
    { id: 'catEye',   price: 100, key: 'estimator.art.catEye'   },
    { id: 'french',   price: 150, key: 'estimator.art.french'   },
    { id: 'art2dL1',  price: 200, key: 'estimator.art.art2dL1'  },
    { id: 'art2dL2',  price: 300, key: 'estimator.art.art2dL2'  },
  ],
  addOns: [
    { id: 'charmL',    price: 200, key: 'estimator.addOn.charmL'    },
    { id: 'charmM',    price: 100, key: 'estimator.addOn.charmM'    },
    { id: 'charmS',    price: 100, key: 'estimator.addOn.charmS', bundleOf: 3 },
    { id: 'piercing',  price: 200, key: 'estimator.addOn.piercing'  },
    { id: 'pierceCharm', price: 200, key: 'estimator.addOn.pierceCharm' },
  ],
  allYouCanTakeCharms: 2000,
};

function img(hash, w = 400, h = 500, ext = 'jpg') {
  return `https://static.wixstatic.com/media/${hash}~mv2.${ext}/v1/fill/w_${w},h_${h},q_90/${hash}~mv2.${ext}`;
}

const DATA = {
  feed: [
    { id: 'p1',  title: 'Blossom French Tips',      tier: 'simple',       category: 'nails', location: 'salon', image: img('7c92d2_2c9f60c8f1d149efaec5fab38407512f'),
      tags: ['#FrenchTip', '#Pink', '#Floral', '#Spring', '#Almond'],
      colors: [
        { label: 'Base',  brand: 'OPI',      color: 'Funny Bunny',    swatch: 'white-swatch' },
        { label: 'Tips',  brand: 'Essie',    color: 'Blanc',          swatch: 'pink-swatch' },
        { label: 'Art',   brand: 'Cirque',   color: 'Rose Jelly',     swatch: 'pink-swatch' },
      ]},
    { id: 'p2',  title: 'Silver Chrome Statement',   tier: 'complicated', category: 'nails', location: 'studio', image: img('7c92d2_8fafd4a5ed3b4536bf9ece852540a82c'),
      tags: ['#Chrome', '#Silver', '#Black', '#Statement', '#Coffin'],
      colors: [
        { label: 'Base',    brand: 'Holo Taco', color: 'One-Coat Black',  swatch: 'black-swatch' },
        { label: 'Chrome',  brand: 'ILNP',      color: 'Deep Space',     swatch: 'silver-swatch' },
        { label: 'Accent',  brand: 'Cirque',    color: 'Starry Night',   swatch: 'purple-swatch' },
      ]},
    { id: 'p3',  title: 'Soft Nude Elegance',       tier: 'single',      category: 'nails', location: 'salon', image: img('7c92d2_4c658a2d54b44c729946a3652cbcef95'),
      tags: ['#Nude', '#Minimalist', '#Natural', '#Almond', '#Everyday'],
      colors: [
        { label: 'Base', brand: 'Zoya',    color: 'Chantal',      swatch: 'nude-swatch' },
        { label: 'Top',  brand: 'Seche',   color: 'Dry Fast Top', swatch: 'white-swatch' },
      ]},
    { id: 'p4',  title: 'Bold Glamour Set',          tier: 'intense',     category: 'nails', location: 'studio', image: img('7c92d2_4adb7e6d86264523a234d398c25746a9'),
      tags: ['#Red', '#Glamour', '#Statement', '#Stiletto', '#Bold'],
      colors: [
        { label: 'Base',   brand: 'Dior',    color: 'Rouge 999',     swatch: 'red-swatch' },
        { label: 'Accent', brand: 'OPI',     color: 'Alpine Snow',  swatch: 'white-swatch' },
        { label: 'Art',    brand: 'Essie',  color: 'Blanc',         swatch: 'white-swatch' },
      ]},
    { id: 'p5',  title: 'Signature Gel Set',          tier: 'single',      category: 'nails', location: 'salon', image: img('7c92d2_a78ab1e8de0440ed8ac96e3f82085f74'),
      tags: ['#White', '#Minimalist', '#Gel', '#Natural', '#CleanGirl'],
      colors: [
        { label: 'Base', brand: 'OPI',     color: 'Funny Bunny',  swatch: 'white-swatch' },
        { label: 'Top',  brand: 'Gelish',  color: 'Top It Off',   swatch: 'white-swatch' },
      ]},
    { id: 'p6',  title: 'Muted Single Tone',         tier: 'single',      category: 'nails', location: 'salon', image: img('7c92d2_2c909f90f2b14d608218e5716c733e6a'),
      tags: ['#Pink', '#Minimalist', '#SingleColor', '#Soft', '#Everyday'],
      colors: [
        { label: 'Base', brand: 'Essie',  color: 'Ballet Slippers', swatch: 'pink-swatch' },
        { label: 'Top',  brand: 'OPI',    color: 'Gel Top Coat',    swatch: 'white-swatch' },
      ]},
    { id: 'p7',  title: 'Effortless Nude Glow',       tier: 'single',      category: 'nails', location: 'salon', image: img('7c92d2_bdb91fd391ac4f2495f991cf49fc2468'),
      tags: ['#Nude', '#Minimalist', '#Natural', '#Glossy', '#CleanGirl'],
      colors: [
        { label: 'Base', brand: 'Chanel', color: 'Ballade',      swatch: 'nude-swatch' },
        { label: 'Top',  brand: 'Seche',  color: 'Glossy Top Coat', swatch: 'white-swatch' },
      ]},
    { id: 'p8',  title: 'Minimalist French',          tier: 'simple',      category: 'nails', location: 'salon', image: img('7c92d2_7408ff3f96084c00828fa3f887ab7784'),
      tags: ['#FrenchTip', '#White', '#Minimalist', '#Classic', '#Almond'],
      colors: [
        { label: 'Base', brand: 'OPI',   color: 'Funny Bunny', swatch: 'white-swatch' },
        { label: 'Tips', brand: 'Essie', color: 'Blanc',       swatch: 'white-swatch' },
      ]},
    { id: 'p9',  title: 'Clean Line Art',             tier: 'simple',      category: 'nails', location: 'salon', image: img('7c92d2_d837cf907eac4903afcd583570a74c72'),
      tags: ['#LineArt', '#Black', '#Minimalist', '#Pink', '#Modern'],
      colors: [
        { label: 'Base',  brand: 'Essie', color: 'Sugar Daddy',  swatch: 'pink-swatch' },
        { label: 'Lines', brand: 'Cirque', color: 'Memento Mori', swatch: 'black-swatch' },
      ]},
    { id: 'p10', title: 'Intricate Detail Work',     tier: 'complicated', category: 'nails', location: 'studio', image: img('7c92d2_f556e83d6bc9468ca302f72c9009c048'),
      tags: ['#Blue', '#Pink', '#Detailed', '#Art', '#Coffin'],
      colors: [
        { label: 'Base',   brand: 'OPI',    color: 'Alpine Snow',  swatch: 'white-swatch' },
        { label: 'Art 1',  brand: 'Essie',  color: 'Butler Please', swatch: 'blue-swatch' },
        { label: 'Art 2',  brand: 'Cirque', color: 'Rose Jelly',    swatch: 'pink-swatch' },
      ]},
    { id: 'p11', title: 'Jewel Tone Artistry',        tier: 'complicated', category: 'nails', location: 'studio', image: img('7c92d2_7089a93b863e4b5396243aa6815fb66b'),
      tags: ['#JewelTone', '#Black', '#Purple', '#Statement', '#Stiletto'],
      colors: [
        { label: 'Base',  brand: 'Holo Taco', color: 'One-Coat Black', swatch: 'black-swatch' },
        { label: 'Accent', brand: 'ILNP',      color: 'Deep Space',     swatch: 'purple-swatch' },
      ]},
    { id: 'p12', title: 'Sculptural 3D Art',          tier: 'complicated', category: 'nails', location: 'studio', image: img('7c92d2_6baa7226955b47fd863593eb58d00c08'),
      tags: ['#3DArt', '#White', '#Purple', '#Sculptural', '#Statement'],
      colors: [
        { label: 'Base',   brand: 'Zoya',   color: 'Purity',       swatch: 'white-swatch' },
        { label: '3D Art', brand: 'Cirque', color: 'Starry Night', swatch: 'purple-swatch' },
        { label: 'Top',    brand: 'Seche',  color: 'Glossy Top',   swatch: 'white-swatch' },
      ]},
    { id: 'p13', title: 'Graphic Statement Set',     tier: 'complicated', category: 'nails', location: 'studio', image: img('7c92d2_dcf94f43819e403f82cbe6ed7dd38ff3'),
      tags: ['#Blue', '#Red', '#Graphic', '#Bold', '#Modern'],
      colors: [
        { label: 'Base',   brand: 'OPI',    color: 'Alpine Snow',   swatch: 'white-swatch' },
        { label: 'Design', brand: 'Essie',  color: 'Butler Please',  swatch: 'blue-swatch' },
        { label: 'Accent', brand: 'Dior',   color: 'Rouge 999',     swatch: 'red-swatch' },
      ]},
    { id: 'p14', title: 'Refined Ombré',              tier: 'complicated', category: 'nails', location: 'salon', image: img('7c92d2_f88a978af702407e8e192a84b3d38a9d'),
      tags: ['#Ombré', '#Pink', '#White', '#Soft', '#Almond'],
      colors: [
        { label: 'Base',   brand: 'OPI',    color: 'Funny Bunny',    swatch: 'white-swatch' },
        { label: 'Ombré',  brand: 'Essie',  color: 'Ballet Slippers', swatch: 'pink-swatch' },
      ]},
    { id: 'p15', title: 'Editorial Bold',             tier: 'intense',     category: 'nails', location: 'studio', image: img('7c92d2_80e1c3d875894da5b0158e0a8fc831f1'),
      tags: ['#Black', '#Silver', '#Editorial', '#Bold', '#AvantGarde'],
      colors: [
        { label: 'Base',   brand: 'Holo Taco', color: 'One-Coat Black', swatch: 'black-swatch' },
        { label: 'Art',    brand: 'Cirque',    color: 'Memento Mori',   swatch: 'black-swatch' },
        { label: 'Accent', brand: 'ILNP',      color: 'Mega',           swatch: 'silver-swatch' },
      ]},
    { id: 'p16', title: 'Fine Line Detail',           tier: 'simple',      category: 'nails', location: 'salon', image: img('7c92d2_10ea82c01fbc486997ecba64ed6e545f'),
      tags: ['#LineArt', '#Black', '#Pink', '#Minimalist', '#FineLine'],
      colors: [
        { label: 'Base',  brand: 'Essie',  color: 'Sugar Daddy', swatch: 'pink-swatch' },
        { label: 'Lines', brand: 'Cirque', color: 'Memento Mori', swatch: 'black-swatch' },
      ]},
    { id: 'p17', title: 'Avant-Garde Set',            tier: 'intense',     category: 'nails', location: 'studio', image: img('7c92d2_eec64f6d23ec46e6a66a638d6024d106'),
      tags: ['#Red', '#White', '#AvantGarde', '#Bold', '#Statement'],
      colors: [
        { label: 'Base',   brand: 'OPI',    color: 'Alpine Snow',  swatch: 'white-swatch' },
        { label: 'Art 1',  brand: 'Dior',   color: 'Rouge 999',    swatch: 'red-swatch' },
        { label: 'Art 2',  brand: 'Essie',  color: 'Blanc',        swatch: 'white-swatch' },
      ]},
    { id: 'p18', title: 'Luxury Bridal Set',           tier: 'intense',     category: 'nails', location: 'studio', image: img('7c92d2_18b2a8c8d3ee4a22b2db4620bbbcbdec'),
      tags: ['#Bridal', '#FrenchTip', '#Glitter', '#White', '#Elegant'],
      colors: [
        { label: 'Base',    brand: 'OPI',   color: 'Funny Bunny',   swatch: 'white-swatch' },
        { label: 'Tips',    brand: 'Essie', color: 'Blanc',         swatch: 'white-swatch' },
        { label: 'Glitter', brand: 'ILNP',   color: 'Mega',         swatch: 'silver-swatch' },
        { label: 'Accent',  brand: 'Cirque', color: 'Rose Gold',    swatch: 'champagne-swatch' },
      ]},
    { id: 'po1', title: 'Pearl Press-On Set',          category: 'pressons', location: 'salon', image: img('7c92d2_a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8'),
      tags: ['#Pearl', '#PressOn', '#White', '#Elegant', '#Reusable'],
      colors: [] },
    { id: 'po2', title: 'Chrome Press-On',             category: 'pressons', location: 'studio', image: img('7c92d2_b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9'),
      tags: ['#Chrome', '#Silver', '#PressOn', '#Modern', '#Glossy'],
      colors: [] },
    { id: 'po3', title: 'Floral Art Press-On',         category: 'pressons', location: 'studio', image: img('7c92d2_c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0'),
      tags: ['#Floral', '#Art', '#PressOn', '#Pink', '#HandPainted'],
      colors: [] },
    { id: 'po4', title: 'French Tip Press-On',         category: 'pressons', location: 'salon', image: img('7c92d2_d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1'),
      tags: ['#FrenchTip', '#Classic', '#PressOn', '#White', '#CleanGirl'],
      colors: [] },
    { id: 'po5', title: 'Glitter Glam Press-On',       category: 'pressons', location: 'studio', image: img('7c92d2_e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2'),
      tags: ['#Glitter', '#Glam', '#PressOn', '#Sparkle', '#Bold'],
      colors: [] },
    { id: 'po6', title: 'Nude Minimalist Press-On',    category: 'pressons', location: 'studio', image: img('7c92d2_f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3'),
      tags: ['#Nude', '#Minimalist', '#PressOn', '#Natural', '#Everyday'],
      colors: [] },
    { id: 'g1',  title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_4f0dbecf712c484ea18b6b2dbcab5ab3', 400, 500, 'png'), tags: [], colors: [] },
    { id: 'g2',  title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'studio', image: img('7c92d2_0533d74681674293adc4df66066dbfe3', 400, 500, 'png'), tags: [], colors: [] },
    { id: 'g3',  title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_63f53e879cd149269f5465f6e6ec7b17'), tags: [], colors: [], isClientPhoto: true },
    { id: 'g4',  title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'studio', image: img('7c92d2_e3370d7c2a3d43bcb5811bb7808f791a', 400, 500, 'png'), tags: [], colors: [] },
    { id: 'g5',  title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_a1dd53d685a440e0932f7c18d2f1e9ae', 400, 500, 'png'), tags: [], colors: [] },
    { id: 'g6',  title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'studio', image: img('7c92d2_00e82380d64643d98afd3f3db93aa6b5', 400, 500, 'png'), tags: [], colors: [], isClientPhoto: true },
    { id: 'g7',  title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_a4d76ee19b3d4cb59e430c5ef5a6bc83', 400, 500, 'png'), tags: [], colors: [] },
    { id: 'g8',  title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'studio', image: img('7c92d2_8a11ab61cc654abaa23ebdf85f8ecb39', 400, 500, 'png'), tags: [], colors: [] },
    { id: 'g9',  title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_435264a2819c4fda9bed5d2160f43a81', 400, 500, 'png'), tags: [], colors: [] },
    { id: 'g10', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'studio', image: img('7c92d2_8f6f76b1dd414d7e9628ebc20ebe60c7', 400, 500, 'png'), tags: [], colors: [], isClientPhoto: true },
    { id: 'g11', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_34a041a96bff444983d2c9613ef87ad6', 400, 500, 'png'), tags: [], colors: [] },
    { id: 'g12', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'studio', image: img('7c92d2_a3347862c44e43b88e1b989d7f12bb34', 400, 500, 'png'), tags: [], colors: [] },
    { id: 'g13', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_7c2eaa30e83d4e76923889c64b2c2867', 400, 500, 'jpeg'), tags: [], colors: [] },
    { id: 'g14', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'studio', image: img('7c92d2_0efe127ede044dbf9f2ad609718ea027'), tags: [], colors: [] },
    { id: 'g15', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_e0d67274986d4ef48d065db1139bca19'), tags: [], colors: [], isClientPhoto: true },
    { id: 'g16', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'studio', image: img('7c92d2_3375b3636670409cb69999c4e38c5771', 400, 500, 'png'), tags: [], colors: [] },
    { id: 'g17', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_0aa8a2f904014458abcaea4601dc1a5e', 400, 500, 'png'), tags: [], colors: [] },
    { id: 'g18', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'studio', image: img('7c92d2_25ff8db88f2f46fc93e8939a0b4094c4'), tags: [], colors: [] },
    { id: 'g19', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_677f88964b984db689ae7bbc5918d390'), tags: [], colors: [] },
    { id: 'g20', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'studio', image: img('7c92d2_0ffe7fc6f12f4c849d3c4abb593c2c6a'), tags: [], colors: [] },
    { id: 'g21', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_7df892872faf4a9597dc2a1bddea4882'), tags: [], colors: [] },
    { id: 'g22', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'studio', image: img('7c92d2_6ce15bb561d0463abf12cb2bd00ccf5f'), tags: [], colors: [] },
    { id: 'g23', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_794739f1009643f1ad3e0a81813565e2'), tags: [], colors: [] },
    { id: 'g24', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'studio', image: img('7c92d2_4e7cae1fd7044ed184ae7032a245af69'), tags: [], colors: [] },
    { id: 'g25', title: 'Tiyu Creation',   tier: 'simple', category: 'nails', location: 'salon',  image: img('7c92d2_496a56e7a91d4fb792e0d630e930eecb', 400, 500, 'png'), tags: [], colors: [] },
  ],
};

function getTierPrice(tierId) {
  const design = PRICING.designs.find(d => d.id === tierId);
  return PRICING.base + (design ? design.price : 0);
}

function getTierLabel(tierId) {
  const design = PRICING.designs.find(d => d.id === tierId);
  return design ? design.label : '';
}

function formatPrice(amount) {
  return PRICING.currency + amount.toLocaleString();
}

function getFeedByCategory(category) {
  if (!category || category === 'all') return DATA.feed;
  return DATA.feed.filter(item => item.category === category);
}

function getFeedByCategoryAndLocation(category, location) {
  return DATA.feed.filter(item =>
    item.category === category &&
    (item.location === location || item.location === 'both')
  );
}

function getServicesByLocation(location) {
  return SERVICES.filter(s => s.location === location || s.location === 'both');
}

function getAllTags(category) {
  const tagSet = new Set();
  const items = category ? getFeedByCategory(category) : DATA.feed;
  items.forEach(item => {
    (item.tags || []).forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export { DATA, PRICING, ESTIMATOR_PRICING, SERVICES, LOCATIONS, PRICE_LISTS, BOOKING_MAP, getTierPrice, getTierLabel, formatPrice, getAllTags, getFeedByCategory, getFeedByCategoryAndLocation, getServicesByLocation };
