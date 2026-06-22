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
  bookingUrl: 'https://www.tiyutokyo.com/salon-manicure',
  contactUrl: 'https://www.tiyutokyo.com/contact',
  pressonDiscount: 3500,
};

function img(hash, w = 400, h = 500) {
  return `https://static.wixstatic.com/media/${hash}~mv2.jpg/v1/fill/w_${w},h_${h},q_90/${hash}~mv2.jpg`;
}

const DATA = {
  feed: [
    { id: 'p1',  title: 'Blossom French Tips',      tier: 'simple',       image: img('7c92d2_2c9f60c8f1d149efaec5fab38407512f'), colors: [
      { label: 'Base',  brand: 'OPI',      color: 'Funny Bunny',    swatch: 'white-swatch' },
      { label: 'Tips',  brand: 'Essie',    color: 'Blanc',          swatch: 'pink-swatch' },
      { label: 'Art',   brand: 'Cirque',   color: 'Rose Jelly',     swatch: 'pink-swatch' },
    ]},
    { id: 'p2',  title: 'Silver Chrome Statement',   tier: 'complicated', image: img('7c92d2_8fafd4a5ed3b4536bf9ece852540a82c'), colors: [
      { label: 'Base',    brand: 'Holo Taco', color: 'One-Coat Black',  swatch: 'black-swatch' },
      { label: 'Chrome',  brand: 'ILNP',      color: 'Deep Space',     swatch: 'silver-swatch' },
      { label: 'Accent',  brand: 'Cirque',    color: 'Starry Night',   swatch: 'purple-swatch' },
    ]},
    { id: 'p3',  title: 'Soft Nude Elegance',       tier: 'single',      image: img('7c92d2_4c658a2d54b44c729946a3652cbcef95'), colors: [
      { label: 'Base', brand: 'Zoya',    color: 'Chantal',      swatch: 'nude-swatch' },
      { label: 'Top',  brand: 'Seche',   color: 'Dry Fast Top', swatch: 'white-swatch' },
    ]},
    { id: 'p4',  title: 'Bold Glamour Set',          tier: 'intense',     image: img('7c92d2_4adb7e6d86264523a234d398c25746a9'), colors: [
      { label: 'Base',   brand: 'Dior',    color: 'Rouge 999',     swatch: 'red-swatch' },
      { label: 'Accent', brand: 'OPI',     color: 'Alpine Snow',  swatch: 'white-swatch' },
      { label: 'Art',    brand: 'Essie',  color: 'Blanc',         swatch: 'white-swatch' },
    ]},
    { id: 'p5',  title: 'Signature Gel Set',          tier: 'single',      image: img('7c92d2_a78ab1e8de0440ed8ac96e3f82085f74'), colors: [
      { label: 'Base', brand: 'OPI',     color: 'Funny Bunny',  swatch: 'white-swatch' },
      { label: 'Top',  brand: 'Gelish',  color: 'Top It Off',   swatch: 'white-swatch' },
    ]},
    { id: 'p6',  title: 'Muted Single Tone',         tier: 'single',      image: img('7c92d2_2c909f90f2b14d608218e5716c733e6a'), colors: [
      { label: 'Base', brand: 'Essie',  color: 'Ballet Slippers', swatch: 'pink-swatch' },
      { label: 'Top',  brand: 'OPI',    color: 'Gel Top Coat',    swatch: 'white-swatch' },
    ]},
    { id: 'p7',  title: 'Effortless Nude Glow',       tier: 'single',      image: img('7c92d2_bdb91fd391ac4f2495f991cf49fc2468'), colors: [
      { label: 'Base', brand: 'Chanel', color: 'Ballade',      swatch: 'nude-swatch' },
      { label: 'Top',  brand: 'Seche',  color: 'Glossy Top Coat', swatch: 'white-swatch' },
    ]},
    { id: 'p8',  title: 'Minimalist French',          tier: 'simple',      image: img('7c92d2_7408ff3f96084c00828fa3f887ab7784'), colors: [
      { label: 'Base', brand: 'OPI',   color: 'Funny Bunny', swatch: 'white-swatch' },
      { label: 'Tips', brand: 'Essie', color: 'Blanc',       swatch: 'white-swatch' },
    ]},
    { id: 'p9',  title: 'Clean Line Art',             tier: 'simple',      image: img('7c92d2_d837cf907eac4903afcd583570a74c72'), colors: [
      { label: 'Base',  brand: 'Essie', color: 'Sugar Daddy',  swatch: 'pink-swatch' },
      { label: 'Lines', brand: 'Cirque', color: 'Memento Mori', swatch: 'black-swatch' },
    ]},
    { id: 'p10', title: 'Intricate Detail Work',     tier: 'complicated', image: img('7c92d2_f556e83d6bc9468ca302f72c9009c048'), colors: [
      { label: 'Base',   brand: 'OPI',    color: 'Alpine Snow',  swatch: 'white-swatch' },
      { label: 'Art 1',  brand: 'Essie',  color: 'Butler Please', swatch: 'blue-swatch' },
      { label: 'Art 2',  brand: 'Cirque', color: 'Rose Jelly',    swatch: 'pink-swatch' },
    ]},
    { id: 'p11', title: 'Jewel Tone Artistry',        tier: 'complicated', image: img('7c92d2_7089a93b863e4b5396243aa6815fb66b'), colors: [
      { label: 'Base',  brand: 'Holo Taco', color: 'One-Coat Black', swatch: 'black-swatch' },
      { label: 'Accent', brand: 'ILNP',      color: 'Deep Space',     swatch: 'purple-swatch' },
    ]},
    { id: 'p12', title: 'Sculptural 3D Art',          tier: 'complicated', image: img('7c92d2_6baa7226955b47fd863593eb58d00c08'), colors: [
      { label: 'Base',   brand: 'Zoya',   color: 'Purity',       swatch: 'white-swatch' },
      { label: '3D Art', brand: 'Cirque', color: 'Starry Night', swatch: 'purple-swatch' },
      { label: 'Top',    brand: 'Seche',  color: 'Glossy Top',   swatch: 'white-swatch' },
    ]},
    { id: 'p13', title: 'Graphic Statement Set',     tier: 'complicated', image: img('7c92d2_dcf94f43819e403f82cbe6ed7dd38ff3'), colors: [
      { label: 'Base',   brand: 'OPI',    color: 'Alpine Snow',   swatch: 'white-swatch' },
      { label: 'Design', brand: 'Essie',  color: 'Butler Please',  swatch: 'blue-swatch' },
      { label: 'Accent', brand: 'Dior',   color: 'Rouge 999',     swatch: 'red-swatch' },
    ]},
    { id: 'p14', title: 'Refined Ombré',              tier: 'complicated', image: img('7c92d2_f88a978af702407e8e192a84b3d38a9d'), colors: [
      { label: 'Base',   brand: 'OPI',    color: 'Funny Bunny',    swatch: 'white-swatch' },
      { label: 'Ombré',  brand: 'Essie',  color: 'Ballet Slippers', swatch: 'pink-swatch' },
    ]},
    { id: 'p15', title: 'Editorial Bold',             tier: 'intense',     image: img('7c92d2_80e1c3d875894da5b0158e0a8fc831f1'), colors: [
      { label: 'Base',   brand: 'Holo Taco', color: 'One-Coat Black', swatch: 'black-swatch' },
      { label: 'Art',    brand: 'Cirque',    color: 'Memento Mori',   swatch: 'black-swatch' },
      { label: 'Accent', brand: 'ILNP',      color: 'Mega',           swatch: 'silver-swatch' },
    ]},
    { id: 'p16', title: 'Fine Line Detail',           tier: 'simple',      image: img('7c92d2_10ea82c01fbc486997ecba64ed6e545f'), colors: [
      { label: 'Base',  brand: 'Essie',  color: 'Sugar Daddy', swatch: 'pink-swatch' },
      { label: 'Lines', brand: 'Cirque', color: 'Memento Mori', swatch: 'black-swatch' },
    ]},
    { id: 'p17', title: 'Avant-Garde Set',            tier: 'intense',     image: img('7c92d2_eec64f6d23ec46e6a66a638d6024d106'), colors: [
      { label: 'Base',   brand: 'OPI',    color: 'Alpine Snow',  swatch: 'white-swatch' },
      { label: 'Art 1',  brand: 'Dior',   color: 'Rouge 999',    swatch: 'red-swatch' },
      { label: 'Art 2',  brand: 'Essie',  color: 'Blanc',        swatch: 'white-swatch' },
    ]},
    { id: 'p18', title: 'Luxury Bridal Set',           tier: 'intense',     image: img('7c92d2_18b2a8c8d3ee4a22b2db4620bbbcbdec'), colors: [
      { label: 'Base',    brand: 'OPI',   color: 'Funny Bunny',   swatch: 'white-swatch' },
      { label: 'Tips',    brand: 'Essie', color: 'Blanc',         swatch: 'white-swatch' },
      { label: 'Glitter', brand: 'ILNP',   color: 'Mega',         swatch: 'silver-swatch' },
      { label: 'Accent',  brand: 'Cirque', color: 'Rose Gold',    swatch: 'champagne-swatch' },
    ]},
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

export { DATA, PRICING, getTierPrice, getTierLabel, formatPrice };
