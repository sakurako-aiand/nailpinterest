const DATA = {
  feed: [
    {
      id: 'p1',
      title: 'Spring Blossom French Tips',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop',
      colors: [
        { label: 'Base',   brand: 'OPI',         color: 'Funny Bunny',         swatch: 'white-swatch' },
        { label: 'Tips',   brand: 'Essie',        color: 'Blanc',               swatch: 'white-swatch' },
        { label: 'Accent', brand: 'Chanel',       color: 'Ballerina',          swatch: 'pink-swatch'  },
        { label: 'Art',    brand: 'Cirque Colors', color: 'Rose Jelly',         swatch: 'pink-swatch'  },
      ],
    },
    {
      id: 'p2',
      title: 'Midnight Galaxy Coffin Nails',
      image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=600&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Holo Taco',    color: 'One-Coat Black',      swatch: 'black-swatch' },
        { label: 'Accent', brand: 'ILNP',          color: 'Deep Space',          swatch: 'blue-swatch'  },
        { label: 'Glitter',brand: 'Cirque Colors', color: 'Starry Night',       swatch: 'purple-swatch'},
      ],
    },
    {
      id: 'p3',
      title: 'Minimalist Nude Almond',
      image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=450&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Zoya',          color: 'Chantal',             swatch: 'nude-swatch'  },
        { label: 'Top',    brand: 'Seche Vite',    color: 'Dry Fast Top Coat',  swatch: 'white-swatch' },
      ],
    },
    {
      id: 'p4',
      title: 'Cherry Red Stiletto',
      image: 'https://images.unsplash.com/photo-1604902396830-aca29e19b06f?w=400&h=550&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Dior',          color: 'Rouge 999',          swatch: 'red-swatch'   },
        { label: 'Top',    brand: 'OPI',           color: 'Gel Top Coat',       swatch: 'white-swatch' },
      ],
    },
    {
      id: 'p5',
      title: 'Pastel Ombre Dream',
      image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&h=480&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Essie',         color: 'Ballet Slippers',    swatch: 'pink-swatch'  },
        { label: 'Ombre 1',brand: 'OPI',           color: 'Lisbon Wants Moor',  swatch: 'coral-swatch' },
        { label: 'Ombre 2',brand: 'Essie',         color: 'Peach Side Babe',    swatch: 'peach-swatch' },
      ],
    },
    {
      id: 'p6',
      title: 'Gold Foil Accent Gems',
      image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=520&fit=crop',
      colors: [
        { label: 'Base',   brand: 'OPI',           color: 'Bare My Soul',        swatch: 'nude-swatch'  },
        { label: 'Foil',   brand: 'Born Pretty',   color: 'Gold Foil Transfer',  swatch: 'gold-swatch'  },
        { label: 'Top',    brand: 'Gelish',        color: 'Top It Off',          swatch: 'white-swatch' },
      ],
    },
    {
      id: 'p7',
      title: 'Matte Emerald Elegance',
      image: 'https://images.unsplash.com/photo-1583395145518-331ec52fc07d?w=400&h=440&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Essie',         color: 'Off Tropic',          swatch: 'green-swatch' },
        { label: 'Matte Top', brand: 'OPI',        color: 'Matte Top Coat',      swatch: 'white-swatch' },
      ],
    },
    {
      id: 'p8',
      title: 'Lavender Marble Magic',
      image: 'https://images.unsplash.com/photo-1522337360786-8d7b0e2f4dc5?w=400&h=500&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Chanel',        color: 'Lilac Sky',           swatch: 'purple-swatch'},
        { label: 'Marble', brand: 'OPI',           color: 'Do You Lilac It?',    swatch: 'lavender-swatch'},
        { label: 'Vein',   brand: 'Essie',         color: 'Blanc',                swatch: 'white-swatch' },
      ],
    },
    {
      id: 'p9',
      title: 'Classic Red French',
      image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400&h=470&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Zoya',          color: 'Madeline',            swatch: 'nude-swatch'  },
        { label: 'Tips',   brand: 'Dior',          color: 'Massai Red',          swatch: 'red-swatch'   },
        { label: 'Top',    brand: 'Essie',         color: 'Gel Setter',          swatch: 'white-swatch' },
      ],
    },
    {
      id: 'p10',
      title: 'Winter Ice Blue Chrome',
      image: 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=400&h=490&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Holo Taco',     color: 'Cold Shoulder',       swatch: 'blue-swatch'  },
        { label: 'Chrome', brand: 'Daily Charme',  color: 'Ice Chrome Powder',   swatch: 'silver-swatch'},
      ],
    },
    {
      id: 'p11',
      title: 'Tropical Neon Swirls',
      image: 'https://images.unsplash.com/photo-1560060141-7b9018741ced?w=400&h=530&fit=crop',
      colors: [
        { label: 'Swirl 1', brand: 'China Glaze',  color: 'Flip Flop Fantasy',    swatch: 'coral-swatch' },
        { label: 'Swirl 2', brand: 'Orly',          color: 'Mint to Be',          swatch: 'mint-swatch'  },
        { label: 'Base',    brand: 'OPI',           color: 'Alpine Snow',         swatch: 'white-swatch' },
      ],
    },
    {
      id: 'p12',
      title: 'Pearl Wedding Elegance',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=400&h=460&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Chanel',        color: 'Ballade',             swatch: 'nude-swatch'  },
        { label: 'Pearl',  brand: 'Bio Seaweed',   color: 'Pearlescent Top',     swatch: 'white-swatch' },
        { label: 'Accent', brand: 'Swarovski',     color: 'Crystal Pixie',       swatch: 'silver-swatch'},
      ],
    },
    {
      id: 'p13',
      title: 'Abstract Line Art Almond',
      image: 'https://images.unsplash.com/photo-1574781331305-78eed58cc2f6?w=400&h=510&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Essie',         color: 'Sugar Daddy',         swatch: 'pink-swatch'  },
        { label: 'Lines',  brand: 'Cirque Colors', color: 'Memento Mori',        swatch: 'black-swatch' },
        { label: 'Top',    brand: 'Seche Vite',    color: 'Dry Fast Top Coat',  swatch: 'white-swatch' },
      ],
    },
    {
      id: 'p14',
      title: 'Silver Glitter Gradient',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=480&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Zoya',          color: 'Purity',              swatch: 'white-swatch' },
        { label: 'Glitter',brand: 'ILNP',          color: 'Mega',                swatch: 'silver-swatch'},
        { label: 'Top',    brand: 'Essie',         color: 'Platinum Grade Finish',swatch: 'white-swatch' },
      ],
    },
    {
      id: 'p15',
      title: 'Rose Gold Holographic',
      image: 'https://images.unsplash.com/photo-1526745924704-7a6802bbad2e?w=400&h=540&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Holo Taco',     color: 'Pink Fizz',           swatch: 'pink-swatch'  },
        { label: 'Holo',   brand: 'ILNP',          color: 'Rosewater',           swatch: 'pink-swatch'  },
        { label: 'Top',    brand: 'Seche Vite',    color: 'High Gloss Top Coat',swatch: 'white-swatch' },
      ],
    },
  ],
};
