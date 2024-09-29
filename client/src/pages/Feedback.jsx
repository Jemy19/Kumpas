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
import SimplePagination from '@/components/simplepagination';
import SearchInput from '@/components/searchinput';
import Filter from '@/components/filter';

export function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
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
    return matchesCategory;
  });
  

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedFeedback = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                    <CardTitle>Super Admin Logs</CardTitle>
                    <div className="ml-auto flex items-center gap-2">
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
                        <TableHead>ID</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Sent At</TableHead>
                        <TableHead>Feedback</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {paginatedFeedback.length > 0 ? (
                      paginatedFeedback.map((item) => (
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
        </main>
      </div>
    </div>
  );
}

export default Feedback;
