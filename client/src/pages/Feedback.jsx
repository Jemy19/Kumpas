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
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';

export function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories

  // Categories for filtering
  const categories = ["New Feature Requests", "Bug reports", "Performance issues", "New FSL Suggestions"];

  useEffect(() => {
    axios.get('/getFeedbackForAdmin')
      .then(({ data }) => {
        setFeedback(data);
      })
      .catch(() => {
        toast.error('Error fetching feedback data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle checkbox selection for categories
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  // Filter feedback based on search query and selected categories
  const filteredFeedback = feedback.filter((item) => {
    const matchesSearch = item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.subject);
    return matchesSearch && matchesCategory;
  });

  const paginatedFeedback = filteredFeedback.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Calculate total pages for filtered feedback
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);
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
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <CardTitle>Feedback</CardTitle>
                    <div className="ml-auto flex items-center gap-2">
                      {/* Search Input */}
                      <Input
                        type="text"
                        placeholder="Search feedback..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-48"
                      />
                      {/* Filter Dropdown */}
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
                          <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {categories.map((category) => (
                            <DropdownMenuCheckboxItem
                              key={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => handleCategoryChange(category)}
                            >
                              {category}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardDescription>View user feedback.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Sent At</TableHead>
                        <TableHead>Feedback</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedFeedback.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>{item._id}</TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>{item.rating}</TableCell>
                          <TableCell>{item.createdAt}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger>
                                <Button size="sm" className="h-8 gap-1">
                                  <PlusCircle className="h-3.5 w-3.5" />
                                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Open Feedback
                                  </span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-1/3 h-80 max-w-full">
                                <DialogHeader>
                                  <DialogTitle>{item.subject}</DialogTitle>
                                  <DialogDescription>Feedback</DialogDescription>
                                </DialogHeader>
                                {item.feedback}
                              </DialogContent>
                            </Dialog>
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
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

export default Feedback;
