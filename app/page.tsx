import { Suspense } from 'react'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import Hero from '@/components/home/Hero'
import PromoSection from '@/components/home/PromoSection'
import Newsletter from '@/components/home/Newsletter'
import LoadingProducts from '@/components/loading/LoadingProducts'

export default function Home() {
  return (
    <div className="flex flex-col space-y-16 pb-16">
      <Hero />
      
      <div className="container px-4 sm:px-6">
        <h2 className="text-2xl font-bold md:text-3xl mb-8">Featured Products</h2>
        <Suspense fallback={<LoadingProducts />}>
          <FeaturedProducts />
        </Suspense>
      </div>
      
      <CategoryShowcase />
      
      <div className="container px-4 sm:px-6">
        <PromoSection />
      </div>
      
      <Newsletter />
    </div>
  )
}