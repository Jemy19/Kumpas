import { Skeleton } from "@/components/ui/skeleton";
import NavBarSkeleton from "./navbarskeleton"; // Import the NavBarSkeleton
import HeaderSkeleton from "./headerskeleton"; // Import the HeaderSkeleton

export function DashSkeleton() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <NavBarSkeleton /> {/* Use NavBarSkeleton instead of Navbar */}
      </div>
      <div className="flex flex-col">
        <HeaderSkeleton /> {/* Use HeaderSkeleton instead of Header */}
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-12 mb-2" /> {/* Card Header Skeleton */}
                <Skeleton className="h-24 mb-1" /> {/* Card Content Skeleton */}
                <Skeleton className="h-4 w-1/2" /> {/* Additional Text Skeleton */}
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <Skeleton className="h-12 mb-2" /> {/* Card Header Skeleton */}
              <Skeleton className="h-48" /> {/* Table Skeleton */}
            </div>
            <div>
              <Skeleton className="h-12 mb-2" /> {/* Card Header Skeleton */}
              <Skeleton className="h-48" /> {/* Content Skeleton */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashSkeleton;
