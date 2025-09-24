export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface Deal {
  id: string;
  title: string;
  store: string;
  category: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  imageUrl: string;
  dealUrl: string;
  couponCode?: string;
}
export interface Category {
  id: string;
  name: string;
}
export interface Brand {
  id: string;
  name: string;
}