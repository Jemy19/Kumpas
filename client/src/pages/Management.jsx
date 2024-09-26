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
import Alphabet from '../components/managetab/Alphabet'
import BasicGreetings from '../components/managetab/basicgreetings'
import CommonWords from '../components/managetab/CommonWords'
import Questions from '../components/managetab/Questions'
import SurvivalSigns from '../components/managetab/SurvivalSigns'
import VidUp from '../components/vidup';
import { UserContext } from '../../context/userContext';
import React, { useContext, useState, useEffect, useRef  } from 'react';
import {toast} from 'react-hot-toast'
import axios from 'axios'
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';

export function Management() {
    // for creating new sign language
    const categories = ['Basic Greetings', 'Survival Signs', 'Common Words', 'Questions', 'Alphabet'];
    const [data, setData] = useState({
      title: '',
      description: '',
      category: '',
      video: '',
    })
    const vidUpRef = useRef(null);
    // for creating new sign language
    const addWord = async (e) => {
      e.preventDefault();
      const { title, description, category } = data;
  
      try {
        let videoUrl = '';
        if (vidUpRef.current) {
          videoUrl = await vidUpRef.current.uploadVideo();
        }
        const urlString = videoUrl;
        const vidname = urlString.slice(urlString.lastIndexOf('/') + 1);
        const response = await axios.post('/addNewWord', {
          title,
          description,
          category,
          video: vidname,
        });
  
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setData({ title: '', description: '', category: '', video: '' });
          toast.success('New Word Successfully Added!');
          setWords(prevWords => [...prevWords, response.data]);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    // for fetching sign language
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        axios.get('/signWords')
            .then(({ data }) => {
                setWords(data);
            })
            .catch((error) => {
                console.error('Error fetching words data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    // for Delete Function
    const deleteWord = async (id, videopath) => {
      try {
        const response = await axios.delete(`/deleteWord/${id}`, {
          withCredentials: true, // if you need to send cookies with the request
        });
        await axios.delete(`https://kumpas.onrender.com/delvideo/${videopath}`);
        if (response.status === 200) {
          console.log('Word deleted successfully:');
          toast.success('Word Deleted!')  
          setWords((prevWords) => prevWords.filter((word) => word._id !== id));
        } else {
          console.error('Error deleting word:', response.data.error);
        }
      } catch (error) {
        console.error('An error occurred while deleting the word:', error);
      }
    };
    // for update function

    const [updateData, setUpdateData] = useState({
      id: null,
      title: '',
      description: '',
      category: '',
      video: '',
    });

    const updateWord = async (e, id, updatedData) => {
      e.preventDefault();
      const originalData = words.find((word) => word._id === id);
      
      console.log(originalData);
      console.log(updateData);
      console.log(updatedData);
      try {
        let videoUrl = await vidUpRef.current.uploadVideo();
        const urlString = videoUrl;
        const vidname = urlString.slice(urlString.lastIndexOf('/') + 1);
        console.log(vidname)
        if(originalData.title == updateData.title 
          && originalData.description == updateData.description
          && originalData.category == updateData.category
          && !vidname.endsWith('.mp4') 
        ) 
        {
          toast.error('No changes detected. Word not updated.');
          return;
        }
        if(vidname.endsWith('.mp4')) {
          await axios.delete(`https://kumpas.onrender.com/delvideo/${updatedData.video}`);
          updatedData.video = vidname;
        }
        
        const response = await axios.put(`/updateWord/${id}`, updatedData, {
          withCredentials: true,
        });
    
        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success('Word Successfully Updated!');
          setWords((prevWords) => prevWords.map((word) =>
            word._id === id? response.data : word
          ));
        }
      } catch (error) {
        console.error('An error occurred while updating the word:', error);
      }
    };
    const handleEdit = (word) => {
      setUpdateData({
        id: word._id,
        title: word.title,
        description: word.description,
        category: word.category,
        video: word.video,
      });
    };
    
    const totalPages = Math.ceil(words.length / itemsPerPage);
    const maxPagesToShow = 5;
  
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
    // Adjust start page if there are not enough pages to show
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
  
    // Ensure the last page is always visible
    const showLastPage = totalPages > endPage;
    
    // Adjust the start page so the first page is always visible and the middle range is limited
    const showFirstPage = startPage > 1;
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    const filteredWords = words.filter(word => 
      word.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to the first page when search changes
    };

    const paginatedWords = filteredWords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);    

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Navbar />
      </div>
      <div className="flex flex-col">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center mt-5">
              <TabsList>
                <TabsTrigger value="all">Recently Added</TabsTrigger>
                <TabsTrigger value="Alphabet">Alphabet</TabsTrigger>
                <TabsTrigger value="Basic Greetings">Basic Greetings</TabsTrigger>
                <TabsTrigger value="Common Words" className="hidden sm:flex">
                  Common Words
                </TabsTrigger>
                <TabsTrigger value="Questions">Questions</TabsTrigger>
                <TabsTrigger value="Survival Signs">Survival Signs</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-full flex-1">
                  <form>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search by Title..."
                        value={searchTerm}
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
                <Dialog>
                  <DialogTrigger>
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add New Sign
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Sign Language</DialogTitle>
                      <DialogDescription>
                      <form onSubmit={addWord}>
                        <div className="grid gap-4">
                          <Label>Title</Label>
                          <Input type='text' placeholder='Enter Title...' value={data.title} onChange={(e) => setData({...data, title: e.target.value})} />
                          <Label>Description</Label>
                          <Input type='text' placeholder='Enter Description...' value={data.description} onChange={(e) => setData({...data, description: e.target.value})} />
                          <Label>Category</Label>
                          <select name="category" value={data.category} onChange={(e) => setData({...data, category: e.target.value})} required>
                            <option value="" disabled>Select a category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                          </select>
                          <Label>Video</Label>
                          <VidUp value={data.video} ref={vidUpRef} />
                          <Button type="submit" variant="secondary">
                            SUBMIT
                          </Button>
                        </div>
                      </form>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Recently Added</CardTitle>
                  <CardDescription>
                    View the latest sign language phrases, words, and alphabet signs added to our library.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          VideoPath
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Updated at
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader> 
                    <TableBody >
                      {paginatedWords.map((word) => (
                        <TableRow>
                          <TableCell className="hidden sm:table-cell">
                              <Dialog>
                                  <DialogTrigger>
                                  <Button>
                                    Play Video
                                  </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                      <DialogHeader>
                                      <DialogTitle>{word.video}</DialogTitle>
                                      <DialogDescription>
                                      <div>
                                      <h2>Video Stream</h2>
                                      <video controls width="400" src={`https://kumpas.onrender.com/videos/${word.video}`} type="video/mp4" />
                                      </div>
                                      </DialogDescription>
                                  </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {word.title}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {word.description}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {word.category}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {word.updatedAt}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {word.createdAt}
                          </TableCell>
                          <TableCell>
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
                                <Sheet>
                                  <SheetTrigger asChild>
                                    <Button onClick={() => handleEdit(word)} className="block py-2 px-4 rounded mb-1 w-32 h-10" variant="outline">Edit</Button>
                                  </SheetTrigger>
                                  <SheetContent>
                                    <SheetHeader>
                                      <SheetTitle>Edit Word</SheetTitle>
                                      <SheetDescription>
                                        Make changes to your Word here. Click Update when you're done.
                                      </SheetDescription>
                                    </SheetHeader>
                                    <form onSubmit={(e) => updateWord(e, updateData.id, updateData)}>
                                      <div className="grid gap-4">
                                      <Label>Title</Label>
                                      <Input
                                          type='text'
                                          placeholder='Enter Title...'
                                          value={updateData.title}
                                          onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
                                      />
                                      <Label>Description</Label>
                                      <Input
                                          type='text'
                                          placeholder='Enter Description...'
                                          value={updateData.description}
                                          onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
                                      />
                                      <Label>Category</Label>
                                      <select
                                          name="category"
                                          value={updateData.category}
                                          onChange={(e) => setUpdateData({ ...updateData, category: e.target.value })}
                                          required
                                      >
                                          <option value="" disabled>Select a category</option>
                                          {categories.map((category) => (
                                          <option key={category} value={category}>
                                              {category}
                                          </option>
                                          ))}
                                      </select>
                                      <Label>Video</Label>
                                      {word.video}
                                      <VidUp ref={vidUpRef} />
                                      <input type="hidden" name="originalVideo" value={word.video} />
                                      <SheetFooter>
                                          <SheetClose asChild>
                                          <Button type="submit">
                                              UPDATE
                                          </Button>
                                          </SheetClose>
                                      </SheetFooter>
                                      </div>
                                      </form>
                                  </SheetContent>
                                </Sheet>  
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button className="block py-2 px-4 rounded w-32 h-10" variant="destructive">Delete</Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete {word.title}.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => deleteWord(word._id, word.video)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                          <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        </PaginationItem>
                      )}
                      {Array(Math.ceil(filteredWords.length / itemsPerPage)).fill(0).map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink onClick={() => handlePageChange(index + 1)} isActive={index + 1 === currentPage}>
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      {currentPage < Math.ceil(filteredWords.length / itemsPerPage) && (
                        <PaginationItem>
                          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination> 
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="Alphabet">
              <Alphabet/>
            </TabsContent>
            <TabsContent value="Basic Greetings">
              <BasicGreetings/>
            </TabsContent>
            <TabsContent value="Common Words">
              <CommonWords/>
            </TabsContent>
            <TabsContent value="Questions">
              < Questions/>
            </TabsContent>
            <TabsContent value="Survival Signs">
              <SurvivalSigns/>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
export default Management;

