import { Link } from 'react-router-dom';
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  File,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog"

  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import React, { useContext, useState, useEffect } from 'react';
import {toast} from 'react-hot-toast'
import axios from 'axios'
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';

export function Adminlogs() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/adminLogs')
      .then((response) => {
        setLogs(response.data.logs);
      })
      .catch((err) => {
        setError('Error fetching logs');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // Paginate the logs based on the current page
  const paginatedWords = logs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate total pages for logs
  const totalPages = Math.ceil(logs.length / itemsPerPage);
  const maxPagesToShow = 5;

  // Determine the range of pages to show
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust start page if necessary
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Show first and last pages
  const showLastPage = totalPages > endPage;
  const showFirstPage = startPage > 1;
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Navbar />
      </div>
      <div className="flex flex-col">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-2">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <div className="flex items-center">
                  <CardTitle>Admin Logs</CardTitle>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Active
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Archived
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  </div>
                  <CardDescription>
                    View all your logs
                  </CardDescription>
                  
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          ID
                        </TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>timeStamp</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>
                          Level
                        </TableHead>
                      </TableRow>
                    </TableHeader> 
                    <TableBody >
                      {paginatedWords.map((log) => (
                        <TableRow>
                          <TableCell className="hidden sm:table-cell">
                            {log._id}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {log.adminName}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {log.timestamp}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {log.message}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {log.level}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Pagination>
                    <PaginationContent>
                      {currentPage !== 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          />
                        </PaginationItem>
                      )}

                      {showFirstPage && (
                        <PaginationItem>
                          <PaginationLink onClick={() => handlePageChange(1)} isActive={currentPage === 1}>
                            1
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      {showFirstPage && startPage > 2 && (
                        <PaginationItem>
                          <span>...</span>
                        </PaginationItem>
                      )}

                      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                        <PaginationItem key={startPage + index}>
                          <PaginationLink
                            onClick={() => handlePageChange(startPage + index)}
                            isActive={startPage + index === currentPage}
                          >
                            {startPage + index}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {showLastPage && endPage < totalPages - 1 && (
                        <PaginationItem>
                          <span>...</span>
                        </PaginationItem>
                      )}

                      {showLastPage && (
                        <PaginationItem>
                          <PaginationLink onClick={() => handlePageChange(totalPages)} isActive={currentPage === totalPages}>
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              </Card>
        </main>
      </div>
    </div>
  )
}
export default Adminlogs;

