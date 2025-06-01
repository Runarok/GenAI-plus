import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Attack on Titan Figurine - Eren Yeager",
    price: 4999,
    image: "/images/attack-on-titan-eren-yeager-figurine.png",
    category: "Figurines",
    description: "High-quality figurine of Eren Yeager from Attack on Titan. Made with premium materials and exquisite attention to detail.",
    featured: true
  },
  {
    id: 2,
    name: "My Hero Academia Volume 1",
    price: 999,
    image: "/images/my-hero-academia-volume-1.png",
    category: "Manga",
    description: "The first volume of the popular My Hero Academia manga series. Follow Izuku Midoriya's journey to becoming a hero!",
    featured: true
  },
  {
    id: 3,
    name: "One Piece Crew T-Shirt",
    price: 1999,
    image: "/images/one-piece-crew-tshirt.png",
    category: "Apparel",
    description: "Show your love for the Straw Hat Pirates with this premium quality t-shirt featuring the entire crew.",
    featured: false
  },
  {
    id: 4,
    name: "Demon Slayer Poster Set",
    price: 1499,
    image: "/images/demon-slayer-poster-set.png",
    category: "Posters",
    description: "Set of 3 high-quality posters featuring Tanjiro, Nezuko, and Zenitsu from Demon Slayer.",
    featured: true
  },
  {
    id: 5,
    name: "Naruto Shippuden Complete Box Set",
    price: 11999,
    image: "/images/naruto-shippuden-box-set.png",
    category: "DVDs",
    description: "Complete box set of Naruto Shippuden series with all episodes and special features included.",
    featured: false
  },
  {
    id: 6,
    name: "Dragon Ball Z Action Figure - Goku",
    price: 2999,
    image: "/images/dragon-ball-z-goku-figure.png",
    category: "Figurines",
    description: "Highly detailed action figure of Goku in Super Saiyan form. Fully articulated with multiple accessories.",
    featured: true
  },
  {
    id: 7,
    name: "Sailor Moon Crystal Wand Replica",
    price: 6499,
    image: "/images/sailor-moon-crystal-wand.png",
    category: "Collectibles",
    description: "1:1 scale replica of the Sailor Moon Crystal Wand with light-up features and display stand.",
    featured: false
  },
  {
    id: 8,
    name: "Death Note Notebook Replica",
    price: 2499,
    image: "/images/death-note-notebook.png",
    category: "Collectibles",
    description: "Authentic replica of the Death Note notebook with rules written inside and premium quality cover.",
    featured: true
  },
  {
    id: 9,
    name: "Jujutsu Kaisen Hoodie",
    price: 2799,
    image: "/images/jujutsu-kaisen-hoodie.png",
    category: "Apparel",
    description: "Comfortable cotton hoodie featuring Jujutsu Kaisen characters. Perfect for casual wear.",
    featured: false
  },
  {
    id: 10,
    name: "Tokyo Ghoul Manga Box Set",
    price: 7999,
    image: "/images/tokyo-ghoul-manga-set.png",
    category: "Manga",
    description: "Complete Tokyo Ghoul manga series in a collector's box set with exclusive artwork.",
    featured: true
  },
  {
    id: 11,
    name: "Chainsaw Man Pochita Plush",
    price: 1299,
    image: "/images/chainsaw-man-pochita-plush.png",
    category: "Plushies",
    description: "Adorable Pochita plush toy from Chainsaw Man. Soft and huggable!",
    featured: false
  },
  {
    id: 12,
    name: "Hunter x Hunter Card Game",
    price: 1799,
    image: "/images/hunter-x-hunter-card-game.png",
    category: "Games",
    description: "Strategic card game based on the Hunter x Hunter universe. Includes special edition cards.",
    featured: false
  },
  {
    id: 13,
    name: "Fullmetal Alchemist Pocket Watch",
    price: 3499,
    image: "/images/fullmetal-alchemist-watch.png",
    category: "Accessories",
    description: "Detailed replica of Edward Elric's State Alchemist pocket watch with chain.",
    featured: true
  },
  {
    id: 14,
    name: "Sword Art Online Sword Replica",
    price: 8999,
    image: "/images/sword-art-online-sword.png",
    category: "Collectibles",
    description: "High-quality replica of Kirito's Elucidator sword. Perfect for display.",
    featured: false
  },
  {
    id: 15,
    name: "Attack on Titan 3D Maneuver Gear Model",
    price: 5999,
    image: "/images/attack-on-titan-3d-gear.png",
    category: "Collectibles",
    description: "Detailed model of the ODM Gear from Attack on Titan. Includes display stand.",
    featured: true
  }
];

export const categories = Array.from(new Set(products.map(product => product.category)));