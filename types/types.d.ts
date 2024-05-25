export interface FullProduct {
  id: number;
  title: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  discountPercentage: number;
  stock: number;
  thumbnail: string;
}

export interface SingleProduct {
  id: number;
  title: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  discountPercentage: number;
  images?: string;
  stock: number;
  thumbnail: string;
}

export interface NewProduct {
  title: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  discountPercentage: number;
  category: string;

}

export interface ApiResponse {
  products: FullProduct[];
}
