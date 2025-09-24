import { useMemo } from 'react';
import { DealCard } from './DealCard';
import { useFilterStore } from '@/lib/store';
import { Frown, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
const DealCardSkeleton = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-sm">
    <Skeleton className="h-48 w-full" />
    <div className="flex-grow p-4">
      <Skeleton className="mb-2 h-4 w-1/3" />
      <Skeleton className="h-6 w-full" />
      <div className="mt-3 flex items-baseline gap-2">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-5 w-1/4" />
      </div>
    </div>
    <div className="p-4 pt-0">
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);
export function DealGrid() {
  const isLoading = useFilterStore((state) => state.isLoading);
  const error = useFilterStore((state) => state.error);
  const deals = useFilterStore((state) => state.deals);
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const selectedCategories = useFilterStore((state) => state.selectedCategories);
  const priceRange = useFilterStore((state) => state.priceRange);
  const selectedBrands = useFilterStore((state) => state.selectedBrands);
  const filteredDeals = useMemo(() => {
    if (!deals) return [];
    return deals.filter((deal) => {
      const searchMatch =
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(deal.category);
      const priceMatch = deal.price >= priceRange[0] && deal.price <= priceRange[1];
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(deal.brand);
      return searchMatch && categoryMatch && priceMatch && brandMatch;
    });
  }, [deals, searchQuery, selectedCategories, priceRange, selectedBrands]);
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <DealCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-red-300 bg-red-50 py-24 text-center dark:border-red-700 dark:bg-red-900/20">
        <AlertCircle className="mx-auto h-16 w-16 text-red-400" />
        <h3 className="mt-4 text-2xl font-semibold text-red-900 dark:text-red-100">An Error Occurred</h3>
        <p className="mt-2 text-base text-red-600 dark:text-red-300">{error}</p>
      </div>
    );
  }
  if (filteredDeals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-24 text-center dark:border-gray-700 dark:bg-gray-800/50">
        <Frown className="mx-auto h-16 w-16 text-gray-400" />
        <h3 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">No Deals Found</h3>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredDeals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}