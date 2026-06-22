const DATA = {
  feed: [
    {
      id: 'p1',
      title: 'Silver Chrome Nail Art',
      image: 'https://images.unsplash.com/photo-1773808605530-17926a0463e9?w=400&h=500&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Holo Taco',     color: 'Silver Chrome Powder',  swatch: 'silver-swatch' },
        { label: 'Accent', brand: 'ILNP',           color: 'Starry Night',         swatch: 'silver-swatch' },
        { label: 'Top',    brand: 'Seche Vite',     color: 'Glossy Top Coat',      swatch: 'white-swatch'  },
      ],
    },
    {
      id: 'p2',
      title: 'Blue Almond French Tips',
      image: 'https://images.unsplash.com/photo-1772322586634-9867476143b9?w=400&h=600&fit=crop',
      colors: [
        { label: 'Base',    brand: 'OPI',          color: 'Alpine Snow',          swatch: 'white-swatch'  },
        { label: 'Tips',    brand: 'Essie',        color: 'Butler Please',        swatch: 'blue-swatch'   },
        { label: 'Accent',  brand: 'Cirque Colors', color: 'Silver Foil',         swatch: 'silver-swatch' },
      ],
    },
    {
      id: 'p3',
      title: 'Grey Cat Eye Nails',
      image: 'https://images.unsplash.com/photo-1777287852699-9e818bf236f7?w=400&h=500&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Gelish',        color: 'Grey Cat Eye',         swatch: 'grey-swatch'   },
        { label: 'Magnetic', brand: 'Born Pretty', color: 'Magnetic Polish',      swatch: 'grey-swatch'   },
        { label: 'Top',    brand: 'OPI',           color: 'Gel Top Coat',         swatch: 'white-swatch'  },
      ],
    },
    {
      id: 'p4',
      title: 'Red & White Stiletto Nails',
      image: 'https://images.unsplash.com/photo-1777287852750-53eb2ca506e9?w=400&h=550&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Dior',          color: 'Rouge 999',           swatch: 'red-swatch'    },
        { label: 'Accent', brand: 'OPI',           color: 'Alpine Snow',         swatch: 'white-swatch'  },
        { label: 'Art',    brand: 'Essie',         color: 'Blanc',               swatch: 'white-swatch'  },
      ],
    },
    {
      id: 'p5',
      title: 'Long Almond Manicure',
      image: 'https://images.unsplash.com/photo-1772983166346-93afb9898264?w=400&h=500&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Zoya',          color: 'Chantal',             swatch: 'nude-swatch'   },
        { label: 'Top',    brand: 'Seche Vite',    color: 'Dry Fast Top Coat',   swatch: 'white-swatch'  },
      ],
    },
    {
      id: 'p6',
      title: 'Navy Gold & White Nail Art',
      image: 'https://images.unsplash.com/photo-1754799670312-8e7da8e40ad7?w=400&h=520&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Essie',         color: 'Butler Please',        swatch: 'blue-swatch'   },
        { label: 'Accent', brand: 'Born Pretty',   color: 'Gold Foil Transfer',   swatch: 'gold-swatch'   },
        { label: 'Detail', brand: 'OPI',           color: 'Alpine Snow',          swatch: 'white-swatch'  },
      ],
    },
    {
      id: 'p7',
      title: 'Pink Ombré with Rings',
      image: 'https://images.unsplash.com/photo-1754799670380-17640d939e32?w=400&h=480&fit=crop',
      colors: [
        { label: 'Base',    brand: 'OPI',          color: 'Funny Bunny',          swatch: 'white-swatch'  },
        { label: 'Ombré',   brand: 'Essie',        color: 'Ballet Slippers',      swatch: 'pink-swatch'   },
        { label: 'Top',     brand: 'Gelish',       color: 'Top It Off',           swatch: 'white-swatch'  },
      ],
    },
    {
      id: 'p8',
      title: 'Red & Blue Statement Nails',
      image: 'https://images.unsplash.com/photo-1767515341175-d4b19ef34ddd?w=400&h=500&fit=crop',
      colors: [
        { label: 'Color 1', brand: 'Dior',         color: 'Rouge 999',           swatch: 'red-swatch'    },
        { label: 'Color 2', brand: 'Essie',        color: 'Butler Please',        swatch: 'blue-swatch'   },
        { label: 'Top',     brand: 'Seche Vite',   color: 'Glossy Top Coat',      swatch: 'white-swatch'  },
      ],
    },
    {
      id: 'p9',
      title: 'French Manicure with Flower',
      image: 'https://images.unsplash.com/photo-1762373349045-c2decd4ec3f3?w=400&h=470&fit=crop',
      colors: [
        { label: 'Base',   brand: 'OPI',           color: 'Funny Bunny',          swatch: 'white-swatch'  },
        { label: 'Tips',   brand: 'Essie',         color: 'Blanc',                swatch: 'white-swatch'  },
        { label: 'Top',    brand: 'Seche Vite',    color: 'Dry Fast Top Coat',    swatch: 'white-swatch'  },
      ],
    },
    {
      id: 'p10',
      title: 'French Tips with Glitter',
      image: 'https://images.unsplash.com/photo-1772322586754-34c9e6f5be6f?w=400&h=490&fit=crop',
      colors: [
        { label: 'Base',    brand: 'Zoya',         color: 'Purity',               swatch: 'white-swatch'  },
        { label: 'Tips',    brand: 'Essie',        color: 'Blanc',                swatch: 'white-swatch'  },
        { label: 'Glitter', brand: 'ILNP',          color: 'Mega',                swatch: 'silver-swatch' },
      ],
    },
    {
      id: 'p11',
      title: 'Soft Pink Gel Manicure',
      image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=530&fit=crop',
      colors: [
        { label: 'Base', brand: 'Essie',           color: 'Ballet Slippers',      swatch: 'pink-swatch'   },
        { label: 'Top',  brand: 'OPI',             color: 'Gel Top Coat',         swatch: 'white-swatch'  },
      ],
    },
    {
      id: 'p12',
      title: 'Bridal French with Glitter',
      image: 'https://images.unsplash.com/photo-1722872112546-936593441be8?w=400&h=460&fit=crop',
      colors: [
        { label: 'Base',    brand: 'OPI',          color: 'Funny Bunny',          swatch: 'white-swatch'  },
        { label: 'Tips',    brand: 'Essie',        color: 'Blanc',                swatch: 'white-swatch'  },
        { label: 'Glitter', brand: 'Cirque Colors', color: 'Rose Gold Shimmer',   swatch: 'gold-swatch'   },
      ],
    },
    {
      id: 'p13',
      title: 'Milky Pink Gel Manicure',
      image: 'https://images.unsplash.com/photo-1643648854897-7b5845b4c04c?w=400&h=510&fit=crop',
      colors: [
        { label: 'Base', brand: 'OPI',             color: 'Sweetheart',           swatch: 'pink-swatch'   },
        { label: 'Top',  brand: 'Gelish',          color: 'Top It Off',           swatch: 'white-swatch'  },
      ],
    },
    {
      id: 'p14',
      title: 'Elegant Manicure with Rings',
      image: 'https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?w=400&h=480&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Chanel',        color: 'Ballade',              swatch: 'nude-swatch'   },
        { label: 'Accent', brand: 'Essie',         color: 'Sugar Daddy',          swatch: 'pink-swatch'   },
        { label: 'Top',    brand: 'Seche Vite',     color: 'Glossy Top Coat',      swatch: 'white-swatch'  },
      ],
    },
    {
      id: 'p15',
      title: 'Artistic Nail Design',
      image: 'https://images.unsplash.com/photo-1572814601679-4ef8f7b5ebd1?w=400&h=540&fit=crop',
      colors: [
        { label: 'Base',   brand: 'Holo Taco',     color: 'One-Coat Black',       swatch: 'black-swatch'  },
        { label: 'Art',    brand: 'Cirque Colors', color: 'Starry Night',         swatch: 'purple-swatch' },
        { label: 'Top',    brand: 'OPI',           color: 'Gel Top Coat',         swatch: 'white-swatch'  },
      ],
    },
  ],
};

export { DATA };
