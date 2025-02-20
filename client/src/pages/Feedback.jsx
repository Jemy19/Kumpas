import { MoreHorizontal, PlusCircle } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import SimplePagination from "@/components/simplepagination";
import Filter from "@/components/filter";
import UserSkeleton from "../skeletons/userskeleton";

export function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = [
    "New Feature Requests",
    "Bug Reports",
    "Performance Issues",
    "New FSL Suggestions",
  ];

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
    window.addEventListener("resize", updateItemsPerPage);
    return () => {
      // Cleanup listener
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    axios
      .get("/getfeedbackforadmin")
      .then(({ data }) => {
        setFeedback(data);
      })
      .catch((error) => {
        toast.error("Error fetching feedback data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteFeedback = async (id) => {
    try {
      const response = await axios.delete(`/deleteFeedback/${id}`);
      if (response.status === 200) {
        console.log("Feedback deleted successfully:");
        toast.success("Feedback deleted successfully!");
        setFeedback((prevFeedbacks) =>
          prevFeedbacks.filter((feedback) => feedback._id !== id)
        );
      }
    } catch (error) {
      console.error("An error occurred while deleting the feedback:", error);
    }
  };

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
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(feedback.subject);
    return matchesCategory;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedFeedback = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Navbar />
      </div>
      <div className="flex flex-col">
        <Header />
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
                      <CardDescription>View user feedback.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden md:table-cell">
                              ID
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Category
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Rating
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Sent At
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Feedback
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Actions
                            </TableHead>
                            <TableHead className="block md:hidden">
                              Details
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
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
                                  {feedback.rating}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {feedback.createdAt}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Dialog>
                                    <DialogTrigger>
                                      <Button
                                        size="sm"
                                        className="h-8 gap-1 select-none"
                                      >
                                        <PlusCircle className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                          Open Feedback
                                        </span>
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>
                                          {feedback.subject}
                                        </DialogTitle>
                                        <DialogDescription>
                                          Feedback
                                        </DialogDescription>
                                      </DialogHeader>
                                      {feedback.feedback}
                                    </DialogContent>
                                  </Dialog>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">
                                          Toggle menu
                                        </span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            className="block py-2 px-4 rounded w-32 h-10"
                                            variant="destructive"
                                          >
                                            Delete
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>
                                              Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                              This action cannot be undone. This
                                              will permanently delete the
                                              Feedback
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>
                                              Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() =>
                                                deleteFeedback(feedback._id)
                                              }
                                            >
                                              Continue
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                                <TableCell className="flex flex-col sm:items-start md:items-center">
                                  <span className="block md:hidden">
                                    <strong>ID:</strong> {feedback._id}
                                  </span>
                                  <span className="block md:hidden">
                                    <strong>Category:</strong>{" "}
                                    {feedback.subject}
                                  </span>
                                  <span className="block md:hidden">
                                    <strong>Rating:</strong> {feedback.rating}
                                  </span>
                                  <span className="block md:hidden">
                                    <strong>Sent At :</strong>
                                    {feedback.createdAt}
                                  </span>
                                  <span className="block md:hidden">
                                    <strong>Feedback:</strong>
                                    <Dialog>
                                      <DialogTrigger>
                                        <Button
                                          size="sm"
                                          className="h-8 gap-1 select-none"
                                        >
                                          <PlusCircle className="h-3.5 w-3.5" />
                                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Open Feedback
                                          </span>
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>
                                            {feedback.subject}
                                          </DialogTitle>
                                          <DialogDescription>
                                            Feedback
                                          </DialogDescription>
                                        </DialogHeader>
                                        {feedback.feedback}
                                      </DialogContent>
                                    </Dialog>
                                  </span>
                                  <span className="block md:hidden">
                                    <strong>Action:</strong>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          aria-haspopup="true"
                                          size="icon"
                                          variant="ghost"
                                        >
                                          <MoreHorizontal className="h-4 w-4" />
                                          <span className="sr-only">
                                            Toggle menu
                                          </span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                          Actions
                                        </DropdownMenuLabel>
                                        <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                            <Button
                                              className="block py-2 px-4 rounded w-32 h-10 select-none"
                                              variant="destructive"
                                            >
                                              Delete
                                            </Button>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>
                                                Are you absolutely sure?
                                              </AlertDialogTitle>
                                              <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete the
                                                Feedback
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel>
                                                Cancel
                                              </AlertDialogCancel>
                                              <AlertDialogAction
                                                onClick={() =>
                                                  deleteAcc(feedback._id)
                                                }
                                              >
                                                Continue
                                              </AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
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
  );
}
export default Feedback;
