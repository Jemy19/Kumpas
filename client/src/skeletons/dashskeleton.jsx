import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDashboard() {
  return (
      <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg p-4">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-4" />
            </div>
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2 bg-gray-200 rounded-lg p-4">
          <div className="flex flex-row items-center mb-4">
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-32 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full" />
          <div className="flex flex-row items-center mb-4">
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-32 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
          <Skeleton className="h-6 w-32 mb-4" />
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
          <Skeleton className="h-6 w-32 mb-4" />
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SkeletonDashboard; // Ensure this line is included
