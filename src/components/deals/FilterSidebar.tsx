import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useFilterStore } from '@/lib/store';
const FilterSkeleton = () => (
  <div className="space-y-3 p-1">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>
    ))}
  </div>
);
export function FilterSidebar() {
  const isLoading = useFilterStore((state) => state.isLoading);
  const categories = useFilterStore((state) => state.categories);
  const brands = useFilterStore((state) => state.brands);
  const selectedCategories = useFilterStore((state) => state.selectedCategories);
  const toggleCategory = useFilterStore((state) => state.toggleCategory);
  const priceRange = useFilterStore((state) => state.priceRange);
  const setPriceRange = useFilterStore((state) => state.setPriceRange);
  const selectedBrands = useFilterStore((state) => state.selectedBrands);
  const toggleBrand = useFilterStore((state) => state.toggleBrand);
  const resetFilters = useFilterStore((state) => state.resetFilters);
  return (
    <aside className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-orange-500 hover:text-orange-600">
          Reset
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={['category', 'price', 'brand']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="text-lg font-semibold">Category</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-48">
              {isLoading ? <FilterSkeleton /> : (
                <div className="space-y-3 p-1">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cat-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <label
                        htmlFor={`cat-${category.id}`}
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="text-lg font-semibold">Price Range</AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="mb-4 flex justify-between text-base font-medium">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <Slider
              defaultValue={priceRange}
              max={1000}
              step={10}
              onValueCommit={(value) => setPriceRange(value as [number, number])}
              disabled={isLoading}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger className="text-lg font-semibold">Brand</AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-48">
              {isLoading ? <FilterSkeleton /> : (
                <div className="space-y-3 p-1">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand.id}`}
                        checked={selectedBrands.includes(brand.id)}
                        onCheckedChange={() => toggleBrand(brand.id)}
                      />
                      <label
                        htmlFor={`brand-${brand.id}`}
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}