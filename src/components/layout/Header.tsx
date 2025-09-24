import { Flame, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFilterStore } from '@/lib/store';
import { useIsMobile } from '@/hooks/use-mobile';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { UserNav } from '@/components/auth/UserNav';
import { Toaster } from '@/components/ui/sonner';
export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const user = useFilterStore((state) => state.user);
  const isMobile = useIsMobile();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <Toaster richColors closeButton />
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2">
            <Flame className="h-7 w-7 text-orange-500" />
            <span className="font-display text-2xl font-bold text-gray-900 dark:text-gray-100">
              SavvySphere
            </span>
          </a>
          {!isMobile && (
            <nav className="flex items-center gap-6 text-sm">
              <a href="#" className="font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                Deals
              </a>
              <a href="#" className="font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                Stores
              </a>
              <a href="#" className="font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                Categories
              </a>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search deals..."
              className="w-full rounded-full bg-muted pl-9 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onMenuClick}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open Filters</span>
            </Button>
          )}
          {user ? <UserNav /> : <AuthDialog />}
        </div>
      </div>
    </header>
  );
}