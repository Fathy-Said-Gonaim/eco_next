"use client"

import { useState } from 'react'
import { Product, formatPrice } from '@/lib/utils'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Heart,
  Minus,
  Plus,
  Share,
  ShoppingCart,
  Star
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  const handleAddToCart = () => {
    setIsAddingToCart(true)
    
    // Add item to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    
    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.title}`,
    })
    
    setIsAddingToCart(false)
  }
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }
  
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="overflow-hidden rounded-lg bg-muted/30 p-4">
        <div className="aspect-square relative flex items-center justify-center rounded-md bg-background">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain p-8"
          />
        </div>
      </div>
      
      <div className="flex flex-col">
        <Badge className="w-fit">{product.category}</Badge>
        <h1 className="mt-2 text-2xl font-bold md:text-3xl">{product.title}</h1>
        
        <div className="mt-2 flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.round(product.rating.rate)
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium">
            {product.rating.rate} ({product.rating.count} reviews)
          </span>
        </div>
        
        <div className="mt-4">
          <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
          <p className="text-sm text-muted-foreground">
            Including all taxes and duties
          </p>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="font-medium">Quantity</p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="secondary" className="flex-1">
              <Heart className="mr-2 h-5 w-5" />
              Wishlist
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <Share className="mr-2 h-5 w-5" />
              Share
            </Button>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
            <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p>{product.description}</p>
          </TabsContent>
          <TabsContent value="shipping" className="mt-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  Standard shipping with delivery in 3-5 business days.
                  Express shipping available for select locations.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Returns</h4>
                <p className="text-sm text-muted-foreground">
                  Easy returns within 30 days of purchase. See our return policy
                  for more details.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Customer Reviews</h4>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.round(product.rating.rate)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">
                      Based on {product.rating.count} reviews
                    </span>
                  </div>
                </div>
                <Button>Write a Review</Button>
              </div>
              
              <Separator />
              
              <p className="text-center text-muted-foreground">
                No reviews yet. Be the first to write a review.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}