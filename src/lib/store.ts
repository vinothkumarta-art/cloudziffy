import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Deal, Category, Brand, User } from '@shared/types';
import { api } from '@/lib/api-client';
type AuthCredentials = {
  email: string;
  password: string;
};
type SignupData = AuthCredentials & {
  name: string;
};
type AuthResponse = {
  user: User;
  token: string;
};
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
  // Auth
  user: User | null;
  token: string | null;
  // Actions
  fetchData: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  toggleCategory: (categoryId: string) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleBrand: (brandId: string) => void;
  resetFilters: () => void;
  // Auth Actions
  signup: (data: SignupData) => Promise<void>;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
};
export const useFilterStore = create<AppState>()(
  persist(
    (set, get) => ({
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
      // Initial Auth State
      user: null,
      token: null,
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
      // Auth Actions
      signup: async (data) => {
        const { user, token } = await api<AuthResponse>('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        set({ user, token });
      },
      login: async (credentials) => {
        const { user, token } = await api<AuthResponse>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
        });
        set({ user, token });
      },
      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'savvysphere-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);