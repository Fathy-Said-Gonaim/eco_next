import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getProduct, getProducts } from '@/lib/utils'
import ProductDetail from '@/components/product/ProductDetail'
import RelatedProducts from '@/components/product/RelatedProducts'
import LoadingProductDetail from '@/components/loading/LoadingProductDetail'

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map((product) => ({
    id: product.id.toString()
  }))
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container py-10">
      <Suspense fallback={<LoadingProductDetail />}>
        <ProductContent id={params.id} />
      </Suspense>
    </div>
  )
}

async function ProductContent({ id }: { id: string }) {
  try {
    const product = await getProduct(id)
    
    return (
      <>
        <ProductDetail product={product} />
        <Suspense fallback={<div className="mt-16 h-60 animate-pulse rounded-lg bg-muted" />}>
          <RelatedProducts productId={id} category={product.category} />
        </Suspense>
      </>
    )
  } catch (error) {
    notFound()
  }
}