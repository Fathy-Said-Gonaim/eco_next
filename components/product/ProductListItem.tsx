"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { Product, formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ProductListItemProps {
  product: Product
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsAddingToCart(true)
    
    // Simulate a small delay for loading state
    setTimeout(() => {
      addToCart(product)
      setIsAddingToCart(false)
      
      toast({
        title: "Added to cart",
        description: product.title,
      })
    }, 500)
  }
  
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="flex flex-col overflow-hidden p-4 transition-all duration-200 hover:shadow-md sm:flex-row">
        <div className="aspect-square w-full max-w-[150px] sm:w-[150px]">
          <div className="h-full overflow-hidden rounded-md bg-muted/30">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain p-2"
            />
          </div>
        </div>
        
        <div className="mt-4 flex flex-1 flex-col sm:ml-6 sm:mt-0">
          <div className="mb-auto">
            <div className="flex items-center justify-between">
              <Badge className="mb-1">{product.category}</Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="ml-1 text-sm font-medium">
                  {product.rating.rate}
                </span>
                <span className="ml-1 text-xs text-muted-foreground">
                  ({product.rating.count})
                </span>
              </div>
            </div>
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold">
              {formatPrice(product.price)}
            </span>
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                "Adding..."
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}