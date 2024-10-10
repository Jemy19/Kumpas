import React from "react";
import { Typography } from "@material-tailwind/react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

export function SimplePagination({ currentPage, totalPages, onPageChange }) {
  const next = () => {
    if (currentPage === totalPages) return;
    onPageChange(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  return (
    <div className="flex items-center gap-8">
      <PaginationPrevious
        onClick={prev}
        disabled={currentPage === 1}
        className="select-none"
      />
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <PaginationNext
        onClick={next}
        disabled={currentPage === totalPages}
        className="select-none"
      />
    </div>
  );
}
export default SimplePagination;
