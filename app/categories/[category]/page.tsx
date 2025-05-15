import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getCategories, getProductsByCategory } from '@/lib/utils'
import ProductsGrid from '@/components/product/ProductsGrid'
import CategoryHeader from '@/components/category/CategoryHeader'
import ProductFilters from '@/components/category/ProductFilters'
import LoadingProducts from '@/components/loading/LoadingProducts'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return [
    { category: 'all' },
    ...categories.map((category) => ({ 
      category: category 
    }))
  ]
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedCategory = decodeURIComponent(params.category)
  
  return (
    <div className="container py-10">
      <CategoryHeader category={decodedCategory} />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <ProductFilters />
        </aside>
        <div>
          <Suspense fallback={<LoadingProducts />}>
            <CategoryContent category={decodedCategory} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

async function CategoryContent({ category }: { category: string }) {
  try {
    const products = await getProductsByCategory(category)
    
    return (
      <ProductsGrid products={products} />
    )
  } catch (error) {
    notFound()
  }
}