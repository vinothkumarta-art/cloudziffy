import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/deals/HeroSection';
import { FilterSidebar } from '@/components/deals/FilterSidebar';
import { DealGrid } from '@/components/deals/DealGrid';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useFilterStore } from '@/lib/store';
export function HomePage() {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const fetchData = useFilterStore((state) => state.fetchData);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <ThemeToggle className="fixed bottom-4 right-4 z-50" />
      <Header onMenuClick={() => setIsSheetOpen(true)} />
      <main className="flex-grow">
        <HeroSection />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {isMobile ? (
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <aside className="sticky top-24 h-fit rounded-lg border bg-card p-6 shadow-sm dark:border-gray-700">
                <FilterSidebar />
              </aside>
            )}
            <div className="mt-8 lg:col-span-3 lg:mt-0">
              <DealGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}