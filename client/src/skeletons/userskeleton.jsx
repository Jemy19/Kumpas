import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonAdminManagement() {
  return (
    <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-2">
      <div className="bg-gray-200 rounded-lg p-4">
        {/* Header section with title and search bar */}
        <div className="space-y-4 sm:flex sm:space-y-0 sm:gap-4 justify-between"> 
  {/* Title and Description */}
  <Skeleton className="h-10 w-60 sm:h-12 sm:w-80 lg:h-14 lg:w-96" /> {/* Larger height and width */}

  {/* Right-aligned search input and button */}
  <div className="flex sm:ml-auto sm:gap-4">
    <Skeleton className="h-8 w-44 sm:h-14 lg:h-12" /> {/* Larger search input */}
    <Skeleton className="h-8 w-44 sm:h-14 lg:h-12" /> {/* Larger button */}
  </div>
</div>
        {/* Table section */}
        <div className="mt-8 space-y-6"> 
          <div className="grid gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-4 items-center">
                <Skeleton className="h-8 w-full sm:h-10 lg:h-12" /> {/* ID */}
                <Skeleton className="h-8 w-full sm:h-10 lg:h-12" /> {/* Username */}
                <Skeleton className="h-8 w-full sm:h-10 lg:h-12" /> {/* Email */}
                <Skeleton className="h-8 w-full sm:h-10 lg:h-12" /> {/* Role */}
                <Skeleton className="h-8 w-full sm:h-10 lg:h-12 hidden sm:block" /> {/* Updated At */}
                <Skeleton className="h-8 w-full sm:h-10 lg:h-12 hidden lg:block" /> {/* Created At */}
                <Skeleton className="h-8 w-24 sm:h-10 lg:h-12" /> {/* Actions */}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <Skeleton className="h-12 w-48 sm:h-14 lg:h-16" /> {/* Larger pagination */}
        </div>
      </div>
    </main>
  );
}

export default SkeletonAdminManagement;
