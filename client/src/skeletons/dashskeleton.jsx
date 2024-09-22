import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {/* Skeleton for Total Users Card */}
        <div className="p-4 border rounded shadow">
          <div className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </div>
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>

        {/* Skeleton for Phrases Used Card */}
        <div className="p-4 border rounded shadow">
          <div className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </div>
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>

        {/* Skeleton for Total Number Of Assets Card */}
        <div className="p-4 border rounded shadow">
          <div className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-4" />
          </div>
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>

        {/* Skeleton for Feedbacks Card */}
        <div className="p-4 border rounded shadow">
          <div className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </div>
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {/* Skeleton for Most Used Phrases Table */}
        <div className="p-4 border rounded shadow xl:col-span-2">
          <div className="flex flex-row items-center pb-4">
            <div className="grid gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div>
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
          </div>
        </div>

        {/* Skeleton for Least Used Phrases */}
        <div className="p-4 border rounded shadow">
          <Skeleton className="h-4 w-32 mb-4" />
          <div className="grid gap-8">
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-12 ml-auto" />
            </div>
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-12 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default SkeletonDashboard;