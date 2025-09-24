import { IndexedEntity } from "./core-utils";
import type { Deal, Category, Brand, User } from "@shared/types";
// Mock data for seeding, adapted from frontend mock data
const MOCK_CATEGORIES: Category[] = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home & Garden' },
  { id: 'sports', name: 'Sports & Outdoors' },
  { id: 'health', name: 'Health & Beauty' },
  { id: 'toys', name: 'Toys & Games' },
];
const MOCK_BRANDS: Brand[] = [
  { id: 'sony', name: 'Sony' },
  { id: 'apple', name: 'Apple' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'nike', name: 'Nike' },
  { id: 'adidas', name: 'Adidas' },
  { id: 'lego', name: 'LEGO' },
  { id: 'dyson', name: 'Dyson' },
  { id: 'bose', name: 'Bose' },
];
const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    store: 'Amazon',
    category: 'electronics',
    brand: 'sony',
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    imageUrl: 'https://images.unsplash.com/photo-1653021341194-326b1c8d5a48?q=80&w=800&auto=format&fit=crop',
    dealUrl: '#',
    couponCode: 'SAVVY25',
  },
  {
    id: '2',
    title: 'Apple iPad Pro 11-inch (M2 Chip)',
    store: 'Best Buy',
    category: 'electronics',
    brand: 'apple',
    price: 749.0,
    originalPrice: 799.0,
    discount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop',
    dealUrl: '#',
  },
  {
    id: '3',
    title: 'Nike Air Max 270 React',
    store: 'Nike Store',
    category: 'fashion',
    brand: 'nike',
    price: 120.0,
    originalPrice: 160.0,
    discount: 25,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    dealUrl: '#',
  },
  {
    id: '4',
    title: 'Dyson V11 Cordless Vacuum Cleaner',
    store: 'Dyson',
    category: 'home',
    brand: 'dyson',
    price: 499.99,
    originalPrice: 599.99,
    discount: 17,
    imageUrl: 'https://images.unsplash.com/photo-1575029644376-489b418f7c9a?q=80&w=800&auto=format&fit=crop',
    dealUrl: '#',
  },
  {
    id: '5',
    title: 'LEGO Star Wars Millennium Falcon',
    store: 'LEGO Store',
    category: 'toys',
    brand: 'lego',
    price: 159.99,
    originalPrice: 179.99,
    discount: 11,
    imageUrl: 'https://images.unsplash.com/photo-1608178233333-35186a76e1f2?q=80&w=800&auto=format&fit=crop',
    dealUrl: '#',
  },
  {
    id: '6',
    title: 'Samsung 65" Class QLED 4K Smart TV',
    store: 'Walmart',
    category: 'electronics',
    brand: 'samsung',
    price: 897.99,
    originalPrice: 1099.99,
    discount: 18,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop',
    dealUrl: '#',
  },
  {
    id: '7',
    title: 'Adidas Ultraboost 22 Running Shoes',
    store: 'Adidas',
    category: 'fashion',
    brand: 'adidas',
    price: 135.0,
    originalPrice: 180.0,
    discount: 25,
    imageUrl: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=800&auto=format&fit=crop',
    dealUrl: '#',
  },
  {
    id: '8',
    title: 'Bose QuietComfort 45 Headphones',
    store: 'Target',
    category: 'electronics',
    brand: 'bose',
    price: 279.0,
    originalPrice: 329.0,
    discount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    dealUrl: '#',
  },
];
// USER ENTITY
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "", email: "", passwordHash: "" };
  static keyOf(state: User): string { return state.email; }
}
// CATEGORY ENTITY
export class CategoryEntity extends IndexedEntity<Category> {
  static readonly entityName = "category";
  static readonly indexName = "categories";
  static readonly initialState: Category = { id: "", name: "" };
  static seedData = MOCK_CATEGORIES;
}
// BRAND ENTITY
export class BrandEntity extends IndexedEntity<Brand> {
  static readonly entityName = "brand";
  static readonly indexName = "brands";
  static readonly initialState: Brand = { id: "", name: "" };
  static seedData = MOCK_BRANDS;
}
// DEAL ENTITY
export class DealEntity extends IndexedEntity<Deal> {
  static readonly entityName = "deal";
  static readonly indexName = "deals";
  static readonly initialState: Deal = {
    id: "",
    title: "",
    store: "",
    category: "",
    brand: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    imageUrl: "",
    dealUrl: "",
  };
  static seedData = MOCK_DEALS;
}