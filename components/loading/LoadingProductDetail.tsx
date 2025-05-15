import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingProductDetail() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Skeleton className="aspect-square rounded-lg" />
      
      <div className="flex flex-col space-y-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-full" />
        
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-5 rounded-full" />
          ))}
          <Skeleton className="ml-2 h-5 w-20" />
        </div>
        
        <Skeleton className="h-8 w-32" />
        
        <Skeleton className="h-0.5 w-full" />
        
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <div className="flex space-x-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        
        <Skeleton className="h-0.5 w-full" />
        
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}