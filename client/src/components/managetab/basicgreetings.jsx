import {
    MoreHorizontal,
  } from "lucide-react"
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
    DropdownMenuLabel,
    DropdownMenuTrigger,
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
    } from "@/components/ui/tabs"
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
    import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
    } from "@/components/ui/dialog"
  import VidUp from "../vidup"
  import React, { useContext, useState, useEffect, useRef  } from 'react';
  import {toast} from 'react-hot-toast'
  import axios from 'axios'
  
  
  export function BasicGreetings() {
      // for creating new sign language
      const categories = ['Basic Greetings', 'Survival Signs', 'Common Words', 'Questions', 'Alphabet'];
      const [data, setData] = useState({
        title: '',
        description: '',
        category: '',
        video: '',
      })
    
      // for fetching sign language
      const [words, setWords] = useState([]);
      const [loading, setLoading] = useState(true);
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(8);
  
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
            await axios.delete(`https://kumpas.onrender.com
/delvideo/${videopath}`);
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
  
      const vidUpRef = useRef(null);
      const updateWord = async (e, id, updatedData) => {
        e.preventDefault();
        const originalData = words.find((word) => word._id === id);
        
        console.log(originalData);
        console.log(updateData);
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
            await axios.delete(`https://kumpas.onrender.com
/delvideo/${updatedData.video}`);
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
  
      const handlePageChange = (page) => {
          setCurrentPage(page);
        };
      
        // Filter words for 'Alphabet' category
    const alphabetWords = words.filter((word) => word.category === 'Basic Greetings');
    
    // Paginate the alphabetWords based on the current page
    const paginatedAlphabetWords = alphabetWords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    // Calculate total pages for alphabetWords
    const totalPages = Math.ceil(alphabetWords.length / itemsPerPage);
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
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Basic Greetings</CardTitle>
                    <CardDescription>
                      View and manage the full range of Basic Greetings Sign Language.
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
                        {paginatedAlphabetWords.map((word) => (
                          <TableRow key={word._id}>
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
                                      <video controls width="400" src={`https://kumpas.onrender.com
/videos/${word.video}`} type="video/mp4" />
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
                          <PaginationLink onClick={() => handlePageChange(startPage + index)} isActive={startPage + index === currentPage}>
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
    )
  }
  export default BasicGreetings;
  
  