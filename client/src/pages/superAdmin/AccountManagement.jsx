import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../context/userContext';
import { Link } from 'react-router-dom';

import { CircleUser, Menu, Package2, Search, MoreHorizontal, PlusCircle} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import axios from 'axios'
import {toast} from 'react-hot-toast'

export function AccountManagement() {
  const { user, logout } = useContext(UserContext);
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // create account
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const registerUser = async (e) => {
    e.preventDefault()
    const {name, email, password} = data
    try {
      const {data} = await axios.post ('/admin/admin', {
        name, email, password
      })
      if(data.error){
        toast.error(data.error)
      } else {
        setData({ name: '', email: '', password: ''});
        toast.success('New User Created!')
        setAdmins(prevAdmins => [...prevAdmins, data]);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // delete account
  const deleteAcc = async (id) => {
    try {
      const response = await axios.delete(`/admin/admin/${id}`);
      if (response.status === 200) {
        console.log('Word deleted successfully:');
        toast.success('account Deleted!')  
        setAdmins(prevAdmins => prevAdmins.filter((admin) => admin._id !== id));
      } 
    } catch (error) {
      console.error('An error occurred while deleting the account:', error);
    }
  };
  // for updating account
  const [updateData, setUpdateData] = useState({
    id: null,
    name: '',
    email: '',
    password: "",
    confirmPassword: "",
  });

  const updateAcc = async (e, id) => {
    e.preventDefault();
    const originalData = admins.find((admin) => admin._id === id);
    
    console.log(originalData);
    console.log(updateData);
    try { 
      if (updateData.password !== updateData.confirmPassword) {
        setErrorMessage('Passwords do not match.'); // Set error message
        return;
      }
      setErrorMessage('');
      if (
        originalData.name === updateData.name &&
        originalData.email === updateData.email &&
        (updateData.password === null || updateData.password === "") &&
        (updateData.confirmPassword === null || updateData.confirmPassword === "")
      )
      {
        toast.error('No changes detected. admins account not updated.');
        return;
      }
      const response = await axios.put(`/admin/admins/${id}`, updateData);
      if (response.data.error) {
        toast.error(response.data.error)
      } 
      else {
        toast.success('Admin Account Successfully Updated!');
        setAdmins((prevAdmins) => prevAdmins.map((admin) =>
          admin._id === id? response.data : admin
        ));
      }
    } catch (error) {
      console.error('An error occurred while updating the word:', error);
    }
  };
  const handleEdit = (admins) => {
    setUpdateData({
      id: admins._id,
      name: admins.name,
      email: admins.email,
      password: null,
      confirmPassword: null,
    });
  };

  useEffect(() => {
    axios.get('/admin/admins')
        .then(({ data }) => {
            setAdmins(data);
        })
        .catch((error) => {
            console.error('Error fetching words data:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedAdmins = admins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link to="/SaDashboard" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="whitespace-nowrap">E-KUMPAS</span>
            </Link>
          <div>|</div>
          <Link
            to="/SaDashboard"
            className="text-muted-foreground  transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            to="/AccManagement"
            className="text-muted-foreground text-primary transition-colors hover:text-foreground whitespace-nowrap"
          >
           Account Management
          </Link>
        </nav>
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
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/SaDashboard"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">E-Kumpas</span>
              </Link>
              <Link
                to="/SaDashboard"
                className="text-primary hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                to="/AccManagement"
                className="text-muted-foreground hover:text-foreground"
              >
                Managment
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
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
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                        <CardTitle>Account Management</CardTitle>
                        <CardDescription>
                            View and Manage all Admin Accounts.
                        </CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                        <Dialog>
                            <DialogTrigger>
                            <Button size="sm" className="h-8 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                  Create New Account
                                </span>
                            </Button>
                            </DialogTrigger>
                            
                            <DialogContent>
                            <DialogTitle>
                              Create New Account
                            </DialogTitle>
                              <form  onSubmit={registerUser}>
                              <div className="grid gap-4">
                                <div className="grid gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input type='text' placeholder='Enter Name...' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
                                  </div>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input type='email' placeholder='Enter Email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="password">Password</Label>
                                  <Input type='password' placeholder='Enter Password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                                </div>
                                <Button type="submit" className="w-full">
                                  Create an account
                                </Button>
                              </div>
                              </form>
                            </DialogContent>
                        </Dialog>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[300px] sm:table-cell">ID</TableHead>
                        <TableHead className="hidden w-[200px] sm:table-cell">
                          Username
                        </TableHead>
                        <TableHead className="hidden w-[200px] sm:table-cell">Email</TableHead>
                        <TableHead className="hidden w-[200px] sm:table-cell">Role</TableHead>
                        <TableHead className="hidden md:table-cell w-[300px]">
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
                      {paginatedAdmins.map((admin) => (
                        <TableRow>
                          <TableCell className="hidden sm:table-cell">
                            {admin._id}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {admin.name}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {admin.email}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {admin.role}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {admin.updatedAt}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {admin.createdAt}
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
                                    <Button onClick={() => handleEdit(admin)} className="block py-2 px-4 rounded mb-1 w-32 h-10" variant="outline">Edit</Button>
                                  </SheetTrigger>
                                  <SheetContent>
                                    <SheetHeader>
                                      <SheetTitle>Edit Account</SheetTitle>
                                      <SheetDescription>
                                        Make changes to your Account here. Click Update when you're done.
                                      </SheetDescription>
                                    </SheetHeader>
                                    <form onSubmit={(e) => updateAcc(e, updateData.id, updateData)}>
                                      <div className="grid gap-4">
                                      <Label>Name</Label>
                                      <Input
                                          type='text'
                                          placeholder='Enter Name...'
                                          value={updateData.name}
                                          onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                                      />
                                      <Label>email</Label>
                                      <Input
                                          type='text'
                                          placeholder='Enter Email...'
                                          value={updateData.email}
                                          onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                                      />
                                      <Label>New Password</Label>
                                      <Input
                                          type='text'
                                          placeholder='Enter Password...'
                                          onChange={(e) => setUpdateData({ ...updateData, password: e.target.value })}
                                      />
                                      <Label>Confirm Password</Label>
                                      <Input
                                          type='text'
                                          placeholder='Enter Password...'
                                          onChange={(e) => setUpdateData({ ...updateData, confirmPassword: e.target.value })}
                                      />
                                      {errorMessage && (
                                        <p className="text-red-500 text-sm">{errorMessage}</p>
                                      )}
                                      <SheetFooter>
                                          <Button type="submit">
                                              UPDATE
                                          </Button>
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
                                        This action cannot be undone. This will permanently 
                                        delete the  <br />  Account: {admin.name}
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => deleteAcc(admin._id)}>Continue</AlertDialogAction>
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
                        {currentPage != 1 && (
                        <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        </PaginationItem>
                        )}
                        {Array(Math.ceil(admins.length / itemsPerPage)).fill(0).map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink onClick={() => handlePageChange(index + 1)} isActive={index + 1 === currentPage}>
                            {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                        ))}
                        {currentPage < Math.ceil(admins.length / itemsPerPage) && (
                        <PaginationItem>
                            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                        </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>       
                </CardFooter>
              </Card>
      </main>
    </div>
  )
}
export default AccountManagement;