"use client"

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'

interface CategoryHeaderProps {
  category: string
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  const router = useRouter()
  const categoryTitle = category === 'all' 
    ? 'All Products' 
    : `${category.charAt(0).toUpperCase()}${category.slice(1)}`
  
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{categoryTitle}</h1>
        <p className="mt-1 text-muted-foreground">
          Browse our collection of {category === 'all' ? 'products' : category}
        </p>
      </div>
      
      <Tabs 
        defaultValue={category} 
        className="w-full sm:w-auto"
        onValueChange={(value) => router.push(`/categories/${value}`)}
      >
        <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="electronics">Electronics</TabsTrigger>
          <TabsTrigger value="jewelery">Jewelry</TabsTrigger>
          <TabsTrigger value="men's clothing">Men's</TabsTrigger>
          <TabsTrigger value="women's clothing" className="hidden sm:block">Women's</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}