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
  
import { UserContext } from '../../context/userContext';
import React, { useContext, useState, useEffect } from 'react';
import {toast} from 'react-hot-toast'
import axios from 'axios'


export function Feedback() {
    const categories = ['Basic Greetings', 'Survival Signs', 'Common Words', 'Questions', 'Alphbet'];
    const { user, logout } = useContext(UserContext);
    const [data, setData] = useState({
      title: '',
      description: '',
      category: '',
      video: '',
    })
    const addWord = async (e) => {
      e.preventDefault()
      const {title, description, category, video} = data
      try {
        const {data} = await axios.post ('/addNewWord', {
          title, description, category, video
        })
        if(data.error){
          toast.error(data.error)
        } else {
          setData({ title: '', description: '', category: '', video: '' });
          toast.success('New Word Succesfully Added!')  
          setWords(prevWords => [...prevWords, data]);
        }
      } catch (error) {
        console.log(error)
      }
    }
    // for fetching sign language
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);

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
    const deleteWord = async (id) => {
      try {
        const response = await axios.delete(`/deleteWord/${id}`, {
          withCredentials: true, // if you need to send cookies with the request
        });
    
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
      try {
        const response = await axios.put(`/updateWord/${id}`, updatedData, {
          withCredentials: true,
        });
    
        if (response.error) {
          toast.error(response.error)
        } else {
          console.log('Word updated successfully:');
          toast.success('Word Successfully Updated!');
          setWords((prevWords) => prevWords.map((word) =>
            word._id === id ? response.data : word
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
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">E-Kumpas</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/Dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/Management"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" 
              >
                <Package className="h-4 w-4" />
                Sign Management{" "}
              </Link>
              <Link
                to="/UserManagement"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" 
              >
                <Users className="h-4 w-4" />
                User Management
              </Link>
              <Link
                to="/Feedback"
                className="flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all hover:text-primary" 
              >
                <Users className="h-4 w-4" />
                Feedback{" "}
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  to="/Dashboard"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/Management"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Sign Management
                </Link>
                <Link
                  to="/UserManagement"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  UserManagement
                </Link>
                <Link
                  to="/FeedBack"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Feedback
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search Sign Languages..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          Name
                        </TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Sent at
                        </TableHead>
                        <TableHead>
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader> 
                    <TableBody >
                      {words.map(word => (
                        <TableRow>
                          <TableCell className="hidden sm:table-cell">
                            Lemnuel Lumaban
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            please add new categories like numberes, thanks!
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            june 1 2027
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
                                        <Input
                                          type='text'
                                          placeholder='Enter Video...'
                                          value={updateData.video}
                                          onChange={(e) => setUpdateData({ ...updateData, video: e.target.value })}
                                        />
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
                                      <AlertDialogAction onClick={() => deleteWord(word._id)}>Continue</AlertDialogAction>
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
        </main>
      </div>
    </div>
  )
}
export default Feedback;

