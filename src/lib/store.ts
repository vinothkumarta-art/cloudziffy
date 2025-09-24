import { create } from 'zustand';
import type { Deal, Category, Brand } from '@/types';
import { api } from '@/lib/api-client';
type AppState = {
  // Data
  deals: Deal[];
  categories: Category[];
  brands: Brand[];
  // Fetching state
  isLoading: boolean;
  error: string | null;
  // Filters
  searchQuery: string;
  selectedCategories: string[];
  priceRange: [number, number];
  selectedBrands: string[];
  // Actions
  fetchData: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  toggleCategory: (categoryId: string) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleBrand: (brandId: string) => void;
  resetFilters: () => void;
};
export const useFilterStore = create<AppState>((set) => ({
  // Initial Data State
  deals: [],
  categories: [],
  brands: [],
  // Initial Fetching State
  isLoading: true,
  error: null,
  // Initial Filter State
  searchQuery: '',
  selectedCategories: [],
  priceRange: [0, 1000],
  selectedBrands: [],
  // Actions
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [deals, categories, brands] = await Promise.all([
        api<Deal[]>('/api/deals'),
        api<Category[]>('/api/categories'),
        api<Brand[]>('/api/brands'),
      ]);
      set({ deals, categories, brands, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch data:", error);
      set({ error: 'Failed to load data. Please try again later.', isLoading: false });
    }
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleCategory: (categoryId) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(categoryId)
        ? state.selectedCategories.filter((c) => c !== categoryId)
        : [...state.selectedCategories, categoryId],
    })),
  setPriceRange: (range) => set({ priceRange: range }),
  toggleBrand: (brandId) =>
    set((state) => ({
      selectedBrands: state.selectedBrands.includes(brandId)
        ? state.selectedBrands.filter((b) => b !== brandId)
        : [...state.selectedBrands, brandId],
    })),
  resetFilters: () =>
    set({
      searchQuery: '',
      selectedCategories: [],
      priceRange: [0, 1000],
      selectedBrands: [],
    }),
}));