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
import NavbarSu from '@/components/NavbarSu';
import HeaderSu from '@/components/HeaderSu';
import SimplePagination from '@/components/simplepagination';
import SearchInput from '@/components/searchinput';
import Filter from '@/components/filter';
import UserSkeleton from '../../skeletons/userskeleton';

export function SaFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = ["New Feature Requests", "Bug reports", "Performance issues", "New FSL Suggestions"];

  const updateItemsPerPage = () => {
    if (window.innerHeight <= 800) {
      setItemsPerPage(6); // Set to your desired number
    } else {
      setItemsPerPage(8); // Reset to the default
    }
  };

  useEffect(() => {
    // Set initial items per page
    updateItemsPerPage();

    // Add event listener
    window.addEventListener('resize', updateItemsPerPage);
    return () => {
      // Cleanup listener
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    axios.get('/admin/getfeedback')
      .then(({ data }) => {
        setFeedback(data);
      })
      .catch((error) => {
        toast.error('Error fetching feedback data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category];
      setCurrentPage(1); // Reset to the first page when category changes
      return updatedCategories;
    });
  };
  
  

  const filteredLogs = feedback.filter((feedback) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(feedback.subject);
    const matchesSearch = feedback.email.toLowerCase().includes(searchQuery.toLowerCase());
    const result = matchesSearch && matchesCategory;
    return result;
  });
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedFeedback = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <NavbarSu />
      </div>
      <div className="flex flex-col">
        <HeaderSu />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {loading ? (
          <UserSkeleton />
          ) : (
          <>
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <div className="flex items-center">
                    <CardTitle>Feedback</CardTitle>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-full flex-1">
                        <SearchInput 
                          value={searchQuery}
                          onChange={handleSearchChange}
                          placeholder="Search by Email"
                        />
                      </div>
                      <div className="flex items-center">
                        <Filter
                          selectedCategories={selectedCategories}
                          handleCategoryChange={handleCategoryChange}
                          categories={categories}
                          titlelabel="Filter by Subject"
                        />
                      </div>
                    </div>
                  </div>
                  <CardDescription>
                    View user feedback.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden md:table-cell">
                          ID
                        </TableHead>
                        <TableHead className="hidden md:table-cell">Category</TableHead>
                        <TableHead className="hidden md:table-cell">Sender</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Rating
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Sent At
                        </TableHead>
                        <TableHead className="hidden md:table-cell">Feedback</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Actions
                        </TableHead>
                        <TableHead className="block md:hidden">
                          Details
                        </TableHead>
                      </TableRow>
                    </TableHeader> 
                    <TableBody >
                    {paginatedFeedback.length > 0 ? (
                      paginatedFeedback.map((feedback) => (
                        <TableRow>
                          <TableCell className="hidden md:table-cell">
                            {feedback._id}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {feedback.subject}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {feedback.email}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {feedback.rating}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {feedback.createdAt}
                          </TableCell>
                          <TableCell className="flex flex-col sm:items-start md:items-center">
                              <span className="block md:hidden"><strong>ID:</strong> {feedback._id}</span>
                              <span className="block md:hidden"><strong>Category:</strong> {feedback.subject}</span>
                              <span className="block md:hidden"><strong>Sender:</strong> {feedback.email}</span>
                              <span className="block md:hidden"><strong>Rating:</strong> {feedback.rating}</span>
                              <span className="block md:hidden"><strong>Sent At:</strong> {feedback.createdAt}</span>
                              <span className="block md:hidden"><strong>Feedback:</strong>
                                <Dialog>
                                  <DialogTrigger>
                                  <Button size="sm" className="h-8 gap-1">
                                      <PlusCircle className="h-3.5 w-3.5" />
                                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Open Feedback
                                      </span>
                                  </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>{feedback.email} - {feedback.subject}</DialogTitle>
                                      <DialogDescription>
                                        Feedback
                                      </DialogDescription>
                                    </DialogHeader>
                                    {feedback.feedback}
                                  </DialogContent>
                                </Dialog>
                              </span>
                          </TableCell>
                        </TableRow>
                      ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            Nothing Found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-center p-4">
                  {/* Pagination Component at the bottom */}
                  <SimplePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage} // Pass the state setter function
                  />
                </CardFooter>
              </Card>
            </TabsContent> 
          </Tabs>
          </>
         )}
        </main>
      </div>
    </div>
  )
}
export default SaFeedback;

