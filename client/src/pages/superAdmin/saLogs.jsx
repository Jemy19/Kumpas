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
import { UserContext } from '../../../context/userContext';
import React, { useContext, useState, useEffect } from 'react';
import {toast} from 'react-hot-toast'
import axios from 'axios'
import NavbarSu from '@/components/NavbarSu';
import HeaderSu from '@/components/HeaderSu';

export function Salogs() {
  const { user, logout } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('admin/logs')
      .then((response) => {
        setLogs(response.data.logs);
      })
      .catch((err) => {
        setError('Error fetching logs');
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  

  // Filter logs based on the search query
  const filteredLogs = logs.filter(log =>
    log.adminName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <NavbarSu />
      </div>
      <div className="flex flex-col">
        <HeaderSu />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <CardTitle>Super Admin Logs</CardTitle>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-full flex-1">
                        <form>
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="text"
                                placeholder="Search by Admin Name..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full appearance-none bg-background pl-8 shadow-none"
                              />
                          </div>
                        </form>
                      </div>
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
                    View all Logs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>TimeStamp</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Level</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedLogs.map((log) => (
                        <TableRow key={log._id}>
                          <TableCell className="hidden sm:table-cell">{log._id}</TableCell>
                          <TableCell className="hidden md:table-cell">{log.adminName}</TableCell>
                          <TableCell className="hidden md:table-cell">{log.timestamp}</TableCell>
                          <TableCell className="hidden md:table-cell">{log.message}</TableCell>
                          <TableCell className="hidden md:table-cell">{log.level}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  {/* Previous Button */}
                {currentPage !== 1 && (
                  <div>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                  </div>
                )}
  <Pagination>
    <PaginationContent>
      

      {/* First Page */}
      {currentPage > 3 && (
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      )}

      {/* Ellipsis before current page */}
      {currentPage > 4 && (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )}

      {/* Pages around the current page */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(
          (page) =>
            page === currentPage || // Current page
            (page >= currentPage - 2 && page <= currentPage + 2) // Pages around current
        )
        .map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

      {/* Ellipsis after current page */}
      {currentPage < totalPages - 3 && (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )}

      {/* Last Page */}
      {currentPage < totalPages - 2 && (
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )}

      
    </PaginationContent>
  </Pagination>
  {/* Next Button */}
  {currentPage < totalPages && (
        <div>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </div>
      )}
</CardFooter>

              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
export default Salogs;

