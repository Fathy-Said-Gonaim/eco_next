"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Product } from '@/lib/utils'
import ProductsGrid from '@/components/product/ProductsGrid'
import ProductFilters from '@/components/category/ProductFilters'
import { Skeleton } from '@/components/ui/skeleton'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        
        if (!res.ok) {
          throw new Error('Failed to fetch products')
        }
        
        const allProducts: Product[] = await res.json()
        
        // Filter products based on search query
        const filteredProducts = allProducts.filter(product => 
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        )
        
        setProducts(filteredProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [query])
  
  return (
    <div className="container py-10">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">
          Search Results for "{query}"
        </h1>
        <p className="mt-1 text-muted-foreground">
          {loading ? 'Searching...' : `Found ${products.length} results`}
        </p>
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <ProductFilters />
        </aside>
        <div>
          {loading ? (
            <LoadingResults />
          ) : products.length > 0 ? (
            <ProductsGrid products={products} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-xl font-semibold">No products found</h2>
              <p className="mt-2 text-center text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function LoadingResults() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}