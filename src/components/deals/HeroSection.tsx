import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFilterStore } from '@/lib/store';
export function HeroSection() {
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  return (
    <section className="relative w-full bg-gray-50 dark:bg-gray-900/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-100/50 to-transparent dark:from-orange-900/20"></div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          Find Your <span className="text-orange-500">Perfect Deal</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Discover thousands of coupons, promo codes, and discounts from your favorite stores. Your savvy shopping journey starts here.
        </p>
        <div className="mx-auto mt-10 max-w-xl">
          <form className="flex w-full items-center space-x-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for stores, products, or brands..."
                className="h-14 w-full rounded-full border-gray-300 bg-white py-3 pl-12 pr-4 text-lg shadow-sm focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="h-14 shrink-0 rounded-full bg-orange-500 px-8 text-lg font-semibold text-white shadow-md transition-all duration-200 hover:bg-orange-600 active:scale-95"
            >
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}