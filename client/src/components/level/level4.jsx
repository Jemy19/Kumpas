import {
    MoreHorizontal,
    PlusCircle,
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
  import VidUp from '../vidup';
  import React, { useContext, useState, useEffect, useRef  } from 'react';
  import {toast} from 'react-hot-toast'
  import axios from 'axios'
  import SimplePagination from '@/components/simplepagination';
  import SearchInput from '@/components/searchinput';
  import Filter from '@/components/filter';
  import UserSkeleton from '../skeletons/userskeleton';
  
  export function Level4() {
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
        setbutLoading(true); 
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
        } finally {
          setbutLoading(false); // Hide loading overlay
        }
      };
    
      // for fetching sign language
      const [words, setWords] = useState([]);
      const [loading, setLoading] = useState(true);
      const [butloading, setbutLoading] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(8);
      const [searchQuery, setSearchQuery] = useState(''); // Add state for search query
      const [selectedCategories, setSelectedCategories] = useState([]);
  
  
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
        setbutLoading(true); 
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
        } finally {
          setbutLoading(false); // Hide loading overlay
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
      
      const handleCategoryChange = (category) => {
        setSelectedCategories((prevCategories) => {
          const updatedCategories = prevCategories.includes(category)
            ? prevCategories.filter((c) => c !== category)
            : [...prevCategories, category];
          setCurrentPage(1); // Reset to the first page when category changes
          return updatedCategories;
        });
      };
    
      const filteredLogs = words.filter((word) => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(word.category);
        const matchesSearch = word.title.toLowerCase().includes(searchQuery.toLowerCase());
        const result = matchesSearch && matchesCategory;
        return result;
      });
      
    
      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page when search changes
      };
    
      const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
      const paginatedWords = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
    return (
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {loading ? (
              <UserSkeleton />
              ) : (
              <>        
              <TabsContent value="level2">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <div className="flex items-center">
                    <CardTitle>Sign Language Management - LEVEL 4</CardTitle>
                    
                      <div className="ml-auto flex items-center gap-2">
                        <div className="flex items-center">
                          <div className="ml-auto flex items-center gap-2">
                              <div className="w-full flex-1">
                              <SearchInput 
                                  value={searchQuery}
                                  onChange={handleSearchChange}
                                  placeholder="Search by Title..."
                              />
                              </div>
                              <div className="flex items-center">
                              <Filter
                                  selectedCategories={selectedCategories}
                                  handleCategoryChange={handleCategoryChange}
                                  categories={categories}
                                  titlelabel="Filter by Category"
                              />
                              </div>
                          </div>
                      </div>
                        <Dialog>
                          <DialogTrigger>
                            <Button size="sm" className="h-8 gap-1 select-none">
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
                                    <Button
                                    type="submit"
                                    disabled={butloading}
                                    className={`w-full h-10 select-none ${butloading ? 'bg-gray-400 cursor-not-allowed translate-y-1 select-none' : ''}`}
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
                    </div>
                    <CardDescription>
                      View the latest sign language phrases, words, and alphabet signs added to our library.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden md:table-cell">
                            VideoPath
                          </TableHead>
                          <TableHead className="hidden md:table-cell">Title</TableHead>
                          <TableHead className="hidden md:table-cell">Description</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Updated at
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Created at
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Actions
                          </TableHead>
                          <TableHead className="block md:hidden">
                            Details
                          </TableHead>
                        </TableRow>
                      </TableHeader> 
                      <TableBody >
                      {paginatedWords.length > 0 ? (
                        paginatedWords.map((word) => (
                          <TableRow>
                            <TableCell className="hidden md:table-cell">
                                <Dialog>
                                    <DialogTrigger>
                                    <Button className="select-none">
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
                            <TableCell className="hidden md:table-cell">
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
                            <TableCell className="flex flex-col sm:items-start md:items-center">
                                <span className="block md:hidden"><strong>Video:</strong>
                                  <Dialog>
                                      <DialogTrigger>
                                      <Button className="select-none">
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
                                </span>
                                <span className="block md:hidden"><strong>title:</strong> {word.title}</span>
                                <span className="block md:hidden"><strong>description:</strong> {word.description}</span>
                                <span className="block md:hidden"><strong>category:</strong> {word.category}</span>
                                <span className="block md:hidden"><strong>Updated:</strong> {word.updatedAt}</span>
                                <span className="block md:hidden"><strong>Created:</strong> {word.createdAt}</span>
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
                                      <Button onClick={() => handleEdit(word)} className="block py-2 px-4 rounded mb-1 w-32 h-10 select-none" variant="outline">Edit</Button>
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
                                          <Button
                                            type="submit"
                                            disabled={butloading}
                                            className={`w-full h-10 select-none ${butloading ? 'bg-gray-400 cursor-not-allowed translate-y-1 select-none' : ''}`}
                                          >
                                            {butloading ? 'Updating...' : 'UPDATE'}
                                          </Button>
                                        </SheetFooter>
                                        </div>
                                        </form>
                                    </SheetContent>
                                  </Sheet>  
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button className="block py-2 px-4 rounded w-32 h-10 select-none" variant="destructive">Delete</Button>
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
            </>
           )}
          </main>
    )
  }
  export default Level4;
  
  