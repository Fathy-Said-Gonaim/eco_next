import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/10 dark:to-background"
        aria-hidden="true"
      />
      <div className="container relative grid items-center gap-6 px-4 py-16 md:grid-cols-2 md:gap-8 md:py-24 lg:py-32">
        <div className="flex flex-col items-start space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Discover Your Style
            <span className="text-primary"> Shop Now</span>
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Elevate your style with our curated collection of premium products. Quality meets affordability.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg">
              <Link href="/categories/all">Shop All Products</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/categories/electronics">Browse Electronics</Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="relative h-[500px] w-full rounded-lg bg-muted/50 p-4">
            <div className="absolute left-4 top-4 h-60 w-48 rotate-[-6deg] overflow-hidden rounded-lg bg-white shadow-lg">
              <img 
                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" 
                alt="Fjallraven Backpack" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-16 left-32 h-72 w-56 rotate-[6deg] overflow-hidden rounded-lg bg-white shadow-lg">
              <img 
                src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" 
                alt="Mens Casual Shirt" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-8 right-8 h-64 w-48 rotate-[-8deg] overflow-hidden rounded-lg bg-white shadow-lg">
              <img 
                src="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg" 
                alt="Gold Earrings" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}