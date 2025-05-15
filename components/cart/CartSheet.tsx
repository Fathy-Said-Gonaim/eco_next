"use client"

import { ReactNode } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import CartItem from './CartItem'
import { ShoppingBag } from 'lucide-react'

interface CartSheetProps {
  children: ReactNode
}

export default function CartSheet({ children }: CartSheetProps) {
  const { cart, cartTotal, clearCart } = useCart()
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        
        {cart.length > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-5 overflow-auto py-4">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="space-y-4 px-1">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link href="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Your cart is empty</h3>
              <p className="text-muted-foreground">
                Add items to your cart to see them here.
              </p>
            </div>
            <Button asChild>
              <Link href="/categories/all">
                Browse Products
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}