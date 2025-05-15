"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { Product, formatPrice, truncateText } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ShoppingCart, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsAddingToCart(true)
    
    // Simulate a small delay to show the loading state
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
      <Card 
        className="h-full overflow-hidden transition-all duration-200 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <img
            src={product.image}
            alt={product.title}
            className={cn(
              "h-full w-full object-contain object-center p-4 transition-transform duration-500",
              isHovered && "scale-110"
            )}
          />
          {/* Category badge */}
          <Badge 
            variant="secondary" 
            className="absolute left-3 top-3"
          >
            {product.category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">
              {product.rating.rate}
            </span>
            <span className="text-xs text-muted-foreground">
              ({product.rating.count} reviews)
            </span>
          </div>
          <h3 className="mt-2 font-semibold">
            {truncateText(product.title, 50)}
          </h3>
          <p className="mt-2 text-lg font-bold">
            {formatPrice(product.price)}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full" 
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
        </CardFooter>
      </Card>
    </Link>
  )
}