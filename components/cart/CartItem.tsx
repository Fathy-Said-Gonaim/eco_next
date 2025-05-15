"use client"

import { useState } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart, CartItem } from '@/context/cart-context'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface CartItemProps {
  item: CartItem
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const [isRemoving, setIsRemoving] = useState(false)
  
  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1)
  }
  
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    } else {
      handleRemove()
    }
  }
  
  const handleRemove = () => {
    setIsRemoving(true)
    
    // Add a slight delay for animation
    setTimeout(() => {
      removeFromCart(item.id)
    }, 300)
  }
  
  return (
    <div
      className={`flex gap-4 rounded-md p-1 transition-all ${
        isRemoving ? "scale-95 opacity-50" : ""
      }`}
    >
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted/30">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain p-2"
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h4 className="line-clamp-1 text-sm font-medium">{item.title}</h4>
          <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleDecreaseQuantity}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            
            <span className="w-5 text-center text-sm">{item.quantity}</span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleIncreaseQuantity}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {formatPrice(item.price * item.quantity)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove item</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}