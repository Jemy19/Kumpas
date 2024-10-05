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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog"
import React, { useContext, useState, useEffect } from 'react';
import {toast} from 'react-hot-toast'
import axios from 'axios'
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import SimplePagination from '@/components/simplepagination';
import SearchInput from '@/components/searchinput';
import UserSkeleton from '../skeletons/userskeleton';

export function Updates() {
  const [updates, setUpdate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [butloading, setbutLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

  const [data, setData] = useState({
    title: '',
    description: ''
  })
  
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
    axios.get('/getUpdates')
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
  
  const addupdate = async (e) => {
    e.preventDefault();
    setbutLoading(true); 
    const { title, description} = data;

    try {
      const response = await axios.post('/addupdate', {
        title,
        description,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({ title: '', description: ''});
        toast.success('New Update Log Successfully Added!');
        setUpdate(prevUpdates => [...prevUpdates, response.data]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setbutLoading(false); // Hide loading overlay
    }
  };

  const deleteupdate = async (id) => {
    try {
      const response = await axios.delete(`/deleteUpdate/${id}`, {
        withCredentials: true, // if you need to send cookies with the request
      });
      if (response.status === 200) {
        console.log('Update Log deleted successfully:');
        toast.success('Update Log Deleted!')  
        setUpdate((prevUpdates) => prevUpdates.filter((update) => update._id !== id));
      } else {
        console.error('Error deleting word:', response.data.error);
      }
    } catch (error) {
      console.error('An error occurred while deleting the update log:', error);
    }
  };

  const filteredLogs = updates.filter((update) => {
    const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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
                    <CardTitle>Updates</CardTitle>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="flex items-center">
                        <SearchInput 
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search by Title..."
                        />
                      </div>
                    </div>
                    <Dialog>
                        <DialogTrigger>
                          <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Add New Update Log
                            </span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Update Log</DialogTitle>
                            <DialogDescription>
                            <form onSubmit={addupdate}>
                              <div className="grid gap-4">
                                <Label>Title</Label>
                                <Input type='text' placeholder='Enter Title...' value={data.title} onChange={(e) => setData({...data, title: e.target.value})} />
                                <Label>Description</Label>
                                <Input type='text' placeholder='Enter Description...' value={data.description} onChange={(e) => setData({...data, description: e.target.value})} />
                                  <Button
                                  type="submit"
                                  disabled={butloading}
                                  className={`w-full h-10 ${butloading ? 'bg-gray-400 cursor-not-allowed translate-y-1' : ''}`}
                                >
                                  {butloading ? 'Creating...' : 'CREATE'}
                                </Button>
                              </div>
                            </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                  </div>
                  <CardDescription>
                    Create and view Updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden md:table-cell">
                          ID
                        </TableHead>
                        <TableHead className="hidden md:table-cell">   
                          Title
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Date
                        </TableHead>
                        <TableHead className="hidden md:table-cell">Update</TableHead>
                        <TableHead className="block md:hidden">
                          Details
                        </TableHead>
                      </TableRow>
                    </TableHeader> 
                    <TableBody >
                    {paginatedFeedback.length > 0 ? (
                      paginatedFeedback.map((update) => (
                        <TableRow>
                          <TableCell className="hidden md:table-cell">
                            {update._id}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {update.title}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {update.createdAt}
                          </TableCell>
                          <TableCell className="flex flex-col sm:items-start md:items-center">
                              <span className="block md:hidden"><strong>ID:</strong> {update._id}</span>
                              <span className="block md:hidden"><strong>Title:</strong> {update.subject}</span>
                              <span className="block md:hidden"><strong>Sent At	:</strong>{update.createdAt}</span>
                              <span className="block md:hidden"><strong>Update Log:</strong> </span>
                          <Dialog>
                            <DialogTrigger>
                            <Button size="sm" className="h-8 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                  Open Update Log
                                </span>
                            </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{update.title}</DialogTitle>
                                <DialogDescription>
                                  Feedback
                                </DialogDescription>
                              </DialogHeader>
                              {update.description}
                            </DialogContent>
                          </Dialog>
                          </TableCell>
                          <TableCell className="flex flex-col sm:items-start md:items-center">
                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel> 
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button className="block py-2 px-4 rounded w-32 h-10" variant="destructive">Delete</Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete {update.title}.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => deleteupdate(update._id)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
export default Updates;

