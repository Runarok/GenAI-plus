export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ThemeMode = 'dark' | 'light';