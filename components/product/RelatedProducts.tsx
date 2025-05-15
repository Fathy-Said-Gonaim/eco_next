import { getProducts, Product } from '@/lib/utils'
import ProductCard from './ProductCard'

async function getRelatedProducts(productId: string, category: string): Promise<Product[]> {
  const products = await getProducts()
  
  // Filter products by the same category, excluding the current product
  return products
    .filter(product => 
      product.category === category && 
      product.id.toString() !== productId
    )
    .slice(0, 4) // Limit to 4 products
}

interface RelatedProductsProps {
  productId: string
  category: string
}

export default async function RelatedProducts({ productId, category }: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(productId, category)
  
  if (relatedProducts.length === 0) {
    return null
  }
  
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}