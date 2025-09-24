import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import type { Deal } from '@/types';
import { motion } from 'framer-motion';
interface DealCardProps {
  deal: Deal;
}
export function DealCard({ deal }: DealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
        <CardHeader className="relative p-0">
          <img src={deal.imageUrl} alt={deal.title} className="h-48 w-full object-cover" />
          <Badge variant="destructive" className="absolute right-3 top-3 text-base">
            {deal.discount}% OFF
          </Badge>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <p className="mb-1 text-sm font-medium text-blue-800 dark:text-blue-400">{deal.store}</p>
          <CardTitle className="text-lg leading-tight">{deal.title}</CardTitle>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${deal.price.toFixed(2)}</p>
            <p className="text-base text-gray-500 line-through dark:text-gray-400">${deal.originalPrice.toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-orange-500 font-bold text-white transition-all hover:bg-orange-600 active:scale-95">
                Get Deal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">{deal.title}</DialogTitle>
                <DialogDescription>
                  Your deal from {deal.store} is ready.
                </DialogDescription>
              </DialogHeader>
              {deal.couponCode && (
                <div className="my-4">
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Your Coupon Code:</p>
                  <div className="flex items-center justify-between rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-800">
                    <span className="font-mono text-lg font-bold text-orange-600 dark:text-orange-400">{deal.couponCode}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigator.clipboard.writeText(deal.couponCode || '')}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button asChild className="w-full bg-blue-800 text-white hover:bg-blue-900">
                  <a href={deal.dealUrl} target="_blank" rel="noopener noreferrer">
                    Go to Store
                  </a>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
}