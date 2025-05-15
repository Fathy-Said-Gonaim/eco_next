"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useCart } from '@/context/cart-context'
import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Menu, Search, X } from 'lucide-react'
import MobileNav from './MobileNav'
import CartSheet from '../cart/CartSheet'

export default function Navbar() {
  const { theme } = useTheme()
  const { cart } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Count total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-sm' 
          : 'bg-background'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">StyleShop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/categories/all" className="text-sm font-medium transition-colors hover:text-primary">
            All Products
          </Link>
          <Link href="/categories/electronics" className="text-sm font-medium transition-colors hover:text-primary">
            Electronics
          </Link>
          <Link href="/categories/jewelery" className="text-sm font-medium transition-colors hover:text-primary">
            Jewelry
          </Link>
          <Link href="/categories/men's clothing" className="text-sm font-medium transition-colors hover:text-primary">
            Men's
          </Link>
          <Link href="/categories/women's clothing" className="text-sm font-medium transition-colors hover:text-primary">
            Women's
          </Link>
        </nav>

        {/* Desktop Search, Theme Toggle, and Cart */}
        <div className="hidden md:flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full bg-background pl-8 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <ModeToggle />
          <CartSheet>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </CartSheet>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-4">
          {isMobileSearchOpen ? (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-background px-4">
              <form onSubmit={handleSearch} className="relative w-full max-w-lg">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full bg-background pl-9 pr-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setIsMobileSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <ModeToggle />
              <CartSheet>
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </CartSheet>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>StyleShop</SheetTitle>
                    <SheetDescription>
                      Explore our collections
                    </SheetDescription>
                  </SheetHeader>
                  <MobileNav />
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </header>
  )
}