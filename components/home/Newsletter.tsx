"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      })
      setEmail('')
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className="bg-muted/50">
      <div className="container px-4 py-12 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-4 text-muted-foreground">
            Be the first to know about new arrivals, special offers, and more.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:gap-3"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:max-w-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            By subscribing, you agree to our privacy policy.
          </p>
        </div>
      </div>
    </section>
  )
}