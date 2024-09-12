import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

import { CircleUser, Menu, Package2, Search, MoreHorizontal, PlusCircle, Home, Package, Users} from "lucide-react"

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
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';

export function UserManagement() {
  const [mobUsers, setmobUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // create account
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const registerMobUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    console.log(data)
    try {
      const { data } = await axios.post('/createMobUser', {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ email: '', password: '' });
        toast.success('New User Created!');
        setmobUsers(prevmobUsers => [...prevmobUsers, data]);
        // Update mobUsers state NOT WORKING
      }
    } catch (error) {
      toast.success('Failed to Create new user!');
    }
  };
  // delete account
  const deleteAcc = async (id) => {
    try {
      const response = await axios.delete(`/deleteMobUser/${id}`);
      if (response.status === 200 && response.data.success) {
        console.log('User deleted successfully:');
        toast.success('Account Deleted!');  
        setmobUsers(prevmobUsers => prevmobUsers.filter((mobUsers) => mobUsers._id !== id));
      } else if (response.data.error) {
        console.error('Error from server:', response.data.error);
        toast.error('Error deleting account.');
      }
    } catch (error) {
      console.error('An error occurred while deleting the account:', error);
      toast.error('An error occurred while deleting the account.');
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
    const originalData = mobUsers.find((mobUsers) => mobUsers._id === id);
    
    console.log(originalData);
    console.log(updateData);
    try { 
      if (updateData.password !== updateData.confirmPassword) {
        setErrorMessage('Passwords do not match.'); // Set error message
        return;
      }
      setErrorMessage('');
      if ((updateData.name === null || updateData.name === "") ||
        (updateData.email === null || updateData.email === "")
      ) 
      {
        toast.error('Name or Email cannot be blank.');
        return;
      }
      if (
        originalData.name === updateData.name &&
        originalData.email === updateData.email &&
        (updateData.password === null || updateData.password === "") &&
        (updateData.confirmPassword === null || updateData.confirmPassword === "")
      )
      {
        toast.error('No changes detected. mobUsers account not updated.');
        return;
      }
      const response = await axios.put(`/mobUsers/mobUsers/${id}`, updateData);
      if (response.data.error) {
        toast.error(response.data.error)
      } 
      else {
        toast.success('Admin Account Successfully Updated!');
        setAdmins((prevAdmins) => prevAdmins.map((mobUsers) =>
          mobUsers._id === id? response.data : mobUsers
        ));
      }
    } catch (error) {
      console.error('An error occurred while updating the word:', error);
    }
  };
  const handleEdit = (mobUsers) => {
    setUpdateData({
      id: mobUsers._id,
      name: mobUsers.name,
      email: mobUsers.email,
      password: null,
      confirmPassword: null,
    });
  };
// fetch mobUsers
  useEffect(() => {
    axios.get('/getUsers')
        .then(({ data }) => {
            setmobUsers(data);
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
  const paginatedUsers = mobUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Navbar />
      </div>
      <div className="flex flex-col">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-2">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>
                            View and Manage all User Accounts.
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
                              <form  onSubmit={registerMobUser}>
                              <div className="grid gap-4">
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
                      {paginatedUsers.map((mobUsers) => (
                        <TableRow>
                          <TableCell className="hidden sm:table-cell">
                            {mobUsers._id}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {mobUsers.username}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {mobUsers.email}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {mobUsers.role}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {mobUsers.updatedAt}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {mobUsers.createdAt}
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
                                    <Button onClick={() => handleEdit(mobUsers)} className="block py-2 px-4 rounded mb-1 w-32 h-10" variant="outline">Edit</Button>
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
                                          type='email'
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
                                        This action cannot be undone. This will permanently 
                                        delete the  <br />  Account: {mobUsers.name}
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => deleteAcc(mobUsers._id)}>Continue</AlertDialogAction>
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
                        {Array(Math.ceil(mobUsers.length / itemsPerPage)).fill(0).map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink onClick={() => handlePageChange(index + 1)} isActive={index + 1 === currentPage}>
                            {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                        ))}
                        {currentPage < Math.ceil(mobUsers.length / itemsPerPage) && (
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
    </div>
    
  )
}
export default UserManagement;