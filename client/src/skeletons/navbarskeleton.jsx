import { Skeleton } from "@/components/ui/skeleton";

const NavBarSkeleton = () => {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Skeleton className="h-6 w-24" /> {/* Placeholder for the title */}
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 rounded-lg px-3 py-2">
              <Skeleton className="h-4 w-4" /> {/* Placeholder for icon */}
              <Skeleton className="h-4 w-32" /> {/* Placeholder for link text */}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavBarSkeleton;
