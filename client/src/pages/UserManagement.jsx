import React, { useState, useEffect } from 'react';
import { MoreHorizontal, PlusCircle} from "lucide-react"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
import SimplePagination from '@/components/simplepagination';
import SearchInput from '@/components/searchinput';
import UserSkeleton from '../skeletons/userskeleton';

export function UserManagement() {
  const [mobUsers, setmobUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query
  const [butloading, setbutLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    //responsive

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

  // create account
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const registerMobUser = async (e) => {
    e.preventDefault();
    setbutLoading(true); 
    const { email, password, confirmPassword } = data;
  
    // Frontend password validation
    
    // Check if password is at least 8 characters long
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      setbutLoading(false); // Stop loading if validation fails
      return;
    }
  
    // Check if password has at least one uppercase letter, one lowercase letter, one number, and one special character
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[@$!%*?&]/;
  
    if (!uppercaseRegex.test(password)) {
      toast.error('Password must include at least one uppercase letter.');
      setbutLoading(false);
      return;
    }
  
    if (!lowercaseRegex.test(password)) {
      toast.error('Password must include at least one lowercase letter.');
      setbutLoading(false);
      return;
    }
  
    if (!numberRegex.test(password)) {
      toast.error('Password must include at least one number.');
      setbutLoading(false);
      return;
    }
  
    if (!specialCharRegex.test(password)) {
      toast.error('Password must include at least one special character.');
      setbutLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setbutLoading(false);
      return;
    }
    try {
      const { data } = await axios.post('/createMobUser', {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ email: '', password: '', confirmPassword: '' });
        toast.success('New User Created!');
        setmobUsers(prevmobUsers => [...prevmobUsers, data]);
      }
    } catch (error) {
      toast.error('Failed to Create new user!');
    } finally {
      setbutLoading(false); // Ensure loading stops in both success and failure cases
    }
  };
  
  // delete account
  const deleteAcc = async (id) => {
    try {
      const response = await axios.delete(`/deleteMobUser/${id}`);
      if (response.status === 200 && response.data.success) {
        toast.success('Account Deleted!');  
        setmobUsers(prevmobUsers => prevmobUsers.filter((mobUsers) => mobUsers._id !== id));
      } else if (response.data.error) {
        toast.error('Error deleting account.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the account.');
    }finally {
      setbutLoading(false); // Hide loading overlay
    }
  };  
  // for updating account
  const [updateData, setUpdateData] = useState({
    id: null,
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateAcc = async (e, id) => {
    e.preventDefault();
    setbutLoading(true); 
    const originalData = mobUsers.find((mobUser) => mobUser._id === id); // Find the original mob user
    try {
      // Check if passwords match
      if (updateData.password !== updateData.confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }

      setErrorMessage('');

      // Validate that email is not empty
      if (!updateData.email) {
        toast.error('Email cannot be blank.');
        return;
      }

      // Check if no changes were made
      if (
        originalData.email === updateData.email &&
        !updateData.password && !updateData.confirmPassword
      ) {
        toast.error('No changes detected. MobUser account not updated.');
        return;
      }

      if (updateData.password.length < 8) {
        toast.error('Password must be at least 8 characters long.');
        setbutLoading(false); // Stop loading if validation fails
        return;
      }
    
      // Check if password has at least one uppercase letter, one lowercase letter, one number, and one special character
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /\d/;
      const specialCharRegex = /[@$!%*?&]/;
    
      if (!uppercaseRegex.test(updateData.password)) {
        toast.error('Password must include at least one uppercase letter.');
        setbutLoading(false);
        return;
      }
    
      if (!lowercaseRegex.test(updateData.password)) {
        toast.error('Password must include at least one lowercase letter.');
        setbutLoading(false);
        return;
      }
    
      if (!numberRegex.test(updateData.password)) {
        toast.error('Password must include at least one number.');
        setbutLoading(false);
        return;
      }
    
      if (!specialCharRegex.test(updateData.password)) {
        toast.error('Password must include at least one special character.');
        setbutLoading(false);
        return;
      }
      // Send PUT request to update the account
      const response = await axios.put(`/updateMobUser/${id}`, updateData);

      // Handle errors from the backend
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        // Success message
        toast.success('MobUser Account Successfully Updated!');

        // Update the state with the new data
        setmobUsers((prevMobUsers) =>
          prevMobUsers.map((mobUser) =>
            mobUser._id === id ? response.data : mobUser
          )
        );
      }
    } catch (error) {
      console.error('An error occurred while updating the MobUser:', error);
    } finally {
      setbutLoading(false); // Hide loading overlay
    }
  };

  // Function to set update data when editing
  const handleEdit = (mobUser) => {
    setUpdateData({
      id: mobUser._id,
      email: mobUser.email,
      password: '',
      confirmPassword: '',
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

    const filteredUsers = mobUsers.filter((mobUsers) => {
      const matchesSearch = mobUsers.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
    
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1); // Reset to the first page when search changes
    };
  
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Navbar />
      </div>
      <div className="flex flex-col">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-2">
          {loading ? (
            <UserSkeleton />
            ) : (
            <>
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
                          <div className="w-full flex-1">
                            <SearchInput 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search by Admin Name..."
                            />
                          </div>
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
                            <form onSubmit={registerMobUser}>
                              <div className="grid gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input
                                    type="email"
                                    placeholder="Enter Email..."
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                  />
                                </div>
                                
                                {/* Password Field */}
                                <div className="grid gap-2 relative">
                                  <Label htmlFor="password">Password</Label>
                                  <div className="relative">
                                    <Input
                                      type={showPassword ? 'text' : 'password'}
                                      placeholder="Enter Password..."
                                      value={data.password}
                                      onChange={(e) => setData({ ...data, password: e.target.value })}
                                    />
                                    <div
                                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                      onClick={() => setShowPassword(!showPassword)}
                                    >
                                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </div>
                                  </div>
                                </div>

                                {/* Confirm Password Field */}
                                <div className="grid gap-2 relative">
                                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                                  <div className="relative">
                                    <Input
                                      type={showConfirmPassword ? 'text' : 'password'}
                                      placeholder="Confirm Password..."
                                      value={data.confirmPassword}
                                      onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                                    />
                                    <div
                                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                    </div>
                                  </div>
                                </div>

                                <Button
                                  type="submit"
                                  disabled={butloading}
                                  className={`w-full h-10 ${butloading ? 'bg-gray-400 cursor-not-allowed translate-y-1' : ''}`}
                                >
                                  {butloading ? 'Creating...' : 'CREATE'}
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
                        <TableHead className="hidden md:table-cell">
                          Actions
                        </TableHead>
                        <TableHead className="block md:hidden">
                          Details
                        </TableHead>
                      </TableRow>
                    </TableHeader> 
                    <TableBody >
                    {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((mobUsers) => (
                        <TableRow key={mobUsers._id}>
                          <TableCell className="hidden md:table-cell">
                            {mobUsers._id}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
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
                          <TableCell className="flex flex-col sm:items-start md:items-center">
                              <span className="block md:hidden"><strong>ID:</strong> {mobUsers._id}</span>
                              <span className="block md:hidden"><strong>Name:</strong> {mobUsers.username}</span>
                              <span className="block md:hidden"><strong>Email:</strong> {mobUsers.email}</span>
                              <span className="block md:hidden"><strong>Role:</strong> {mobUsers.role}</span>
                              <span className="block md:hidden"><strong>Updated:</strong> {mobUsers.updatedAt}</span>
                              <span className="block md:hidden"><strong>Created:</strong> {mobUsers.createdAt}</span>
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
                                        <Label>Email</Label>
                                        <Input
                                          type="email"
                                          placeholder="Enter Email..."
                                          value={updateData.email}
                                          onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                                        />

                                        <Label>New Password</Label>
                                        <div className="relative">
                                          <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter Password..."
                                            onChange={(e) => setUpdateData({ ...updateData, password: e.target.value })}
                                          />
                                          <div
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                          >
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                          </div>
                                        </div>

                                        <Label>Confirm Password</Label>
                                        <div className="relative">
                                          <Input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Enter Password..."
                                            onChange={(e) => setUpdateData({ ...updateData, confirmPassword: e.target.value })}
                                          />
                                          <div
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                          >
                                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                          </div>
                                        </div>

                                        {errorMessage && (
                                          <p className="text-red-500 text-sm">{errorMessage}</p>
                                        )}

                                        <SheetFooter>
                                          <Button
                                            type="submit"
                                            disabled={butloading}
                                            className={`w-full h-10 ${butloading ? 'bg-gray-400 cursor-not-allowed translate-y-1' : ''}`}
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
              </>
         )}
        </main>
      </div>
    </div>
    
  )
}
export default UserManagement;