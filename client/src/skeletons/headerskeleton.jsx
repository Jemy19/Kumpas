import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"; // Ensure you have a Skeleton component

const HeaderSkeleton = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="flex-shrink-0 md:hidden">
        <Skeleton className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-5 w-1/2" /> {/* Adjust width as needed */}
            </div>
          ))}
        </nav>
      </div>
      <div className="w-full flex-1">
        <div className="relative">
          <Skeleton className="absolute left-2.5 top-2.5 h-4 w-4" />
          <Skeleton className="w-full h-10" /> {/* Adjust height as needed */}
        </div>
      </div>
      <div>
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </header>
  );
};

export default HeaderSkeleton;
