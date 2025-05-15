import ProductCard from '@/components/product/ProductCard'
import { getProducts, Product } from '@/lib/utils'

async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts()
  
  // Get 8 random products as featured
  return products.sort(() => 0.5 - Math.random()).slice(0, 8)
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}