import { ArrowRight, Clock, Package, RefreshCcw, Truck } from 'lucide-react'

export default function PromoSection() {
  return (
    <div className="space-y-12">
      {/* Sale Banner */}
      <div className="relative overflow-hidden rounded-lg bg-primary py-12 text-primary-foreground">
        <div className="absolute -right-8 -top-8 h-40 w-40 rotate-12 bg-primary-foreground/10 rounded-3xl" />
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rotate-12 bg-primary-foreground/10 rounded-3xl" />
        <div className="container relative px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold md:text-4xl">
              Summer Sale Now Live!
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Get up to 50% off on selected items. Limited time offer.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-6">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">48</span>
                <span className="text-primary-foreground/70">Hours</span>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">12</span>
                <span className="text-primary-foreground/70">Minutes</span>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">36</span>
                <span className="text-primary-foreground/70">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Truck className="h-6 w-6" />
          </div>
          <h3 className="mt-4 font-semibold">Free Shipping</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            On all orders over $50
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <RefreshCcw className="h-6 w-6" />
          </div>
          <h3 className="mt-4 font-semibold">Easy Returns</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            30-day return policy
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Package className="h-6 w-6" />
          </div>
          <h3 className="mt-4 font-semibold">Secure Packaging</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Your products are safe
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Clock className="h-6 w-6" />
          </div>
          <h3 className="mt-4 font-semibold">24/7 Support</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Dedicated customer service
          </p>
        </div>
      </div>
    </div>
  )
}