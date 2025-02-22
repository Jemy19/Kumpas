import React, { useState, useEffect } from 'react';
import {MoreHorizontal, PlusCircle} from "lucide-react"
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
import NavbarSu from '@/components/NavbarSu';
import HeaderSu from '@/components/HeaderSu';
import SimplePagination from '@/components/simplepagination';
import SearchInput from '@/components/searchinput';
import UserSkeleton from '../../skeletons/userskeleton';

export function AccountManagement() {
  const [admins, setAdmins] = useState([]);
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
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const registerUser = async (e) => {
    e.preventDefault()
    setbutLoading(true); 
    const {name, email, password, confirmPassword} = data
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
      toast.error('Passwords do not match.');
      setbutLoading(false);
      return;
    }
    try {
      const {data} = await axios.post ('/admin/admin', {
        name, email, password
      })
      if(data.error){
        toast.error(data.error)
      } else {
        setData({ name: '', email: '', password: '', confirmPassword: ''});
        toast.success('New User Created!')
        setAdmins(prevAdmins => [...prevAdmins, data]);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setbutLoading(false); // Hide loading overlay
    }
  }
  // delete account

  const deleteAcc = async (id, currentStatus) => {
    try {
      // Determine the new status based on the current status
      const newStatus = currentStatus === 'Deactivated' ? 'Active' : 'Deactivated';
  
      // Send a PATCH request to the backend to update the account status
      const response = await axios.patch(`/admin/admin/${id}`, { status: newStatus });
      
      if (response.status === 200) {
        toast.success(`Account ${newStatus === 'Deactivated' ? 'Deactivated' : 'Activated'}!`);
        
        // Update the local state to reflect the new status
        setAdmins(prevAdmins => prevAdmins.map(admin => 
          admin._id === id ? { ...admin, status: newStatus } : admin
        ));
      }
    } catch (error) {
      console.error(`An error occurred while ${currentStatus === 'Deactivated' ? 'activating' : 'deactivating'} the account:`, error);
      toast.error(`An error occurred while ${currentStatus === 'Deactivated' ? 'activating' : 'deactivating'} the account.`);
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
    setbutLoading(true); 
    const originalData = admins.find((admin) => admin._id === id);
    
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
        toast.error('No changes detected. admins account not updated.');
        return;
      }
      if (updateData.password || updateData.confirmPassword){
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
    } finally {
      setbutLoading(false); // Hide loading overlay
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


  const filteredAdmins = admins.filter((admins) => {
    const matchesSearch = admins.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const paginatedAdmins = filteredAdmins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
       <NavbarSu />
      </div>
      <div className="flex flex-col">
        <HeaderSu />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-2">
          {loading ? (
            <UserSkeleton />
            ) : (
            <>
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                        <CardTitle>Admin Management</CardTitle>
                        <CardDescription>
                            View and Manage all Admin Accounts.
                        </CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-2">
                          <div className="w-full flex-1">
                            <SearchInput 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search by Admin email..."
                            />
                          </div>
                        <Dialog>
                            <DialogTrigger>
                            <Button size="sm" className="h-8 gap-1 select-none">
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
                            <form onSubmit={registerUser}>
                              <div className="grid gap-4">
                                <div className="grid gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input
                                      type="text"
                                      placeholder="Enter Name..."
                                      value={data.name}
                                      onChange={(e) => setData({ ...data, name: e.target.value })}
                                    />
                                  </div>
                                </div>

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
                                      type={showPassword ? "text" : "password"}
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
                                      type={showConfirmPassword ? "text" : "password"}
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
                                <div className="bg-gray-100 p-4 border border-gray-300 rounded-md shadow-md">
                                  <p className="text-gray-800 font-semibold mb-2">Password Requirements:</p>
                                  <ul className="text-gray-700 text-sm space-y-1">
                                    <li>Must contain at least 1 uppercase letter ❌</li>
                                    <li>Must contain at least 1 number ❌</li>
                                    <li>Must contain at least 1 symbol ❌</li>
                                    <li>Must be at least 8 characters ❌</li>
                                  </ul>
                                </div>
                                <Button
                                  type="submit"
                                  disabled={butloading}
                                  className={`w-full h-10 select-none ${butloading ? "bg-gray-400 cursor-not-allowed translate-y-1 select-none" : ""}`}
                                >
                                  {butloading ? "Creating..." : "CREATE"}
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
                        <TableHead className="hidden w-[200px] sm:table-cell">Status</TableHead>
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
                    <TableBody>
                      {paginatedAdmins.length > 0 ? (
                        paginatedAdmins.map((admin) => (
                          <TableRow key={admin._id}>
                            <TableCell className="hidden md:table-cell">{admin._id}</TableCell>
                            <TableCell className="hidden md:table-cell">{admin.name}</TableCell>
                            <TableCell className="hidden md:table-cell">{admin.email}</TableCell>
                            <TableCell className="hidden md:table-cell">{admin.role}</TableCell>
                            <TableCell className="hidden md:table-cell">{admin.status}</TableCell>
                            <TableCell className="hidden md:table-cell">{admin.updatedAt}</TableCell>
                            <TableCell className="hidden md:table-cell">{admin.createdAt}</TableCell>
                            <TableCell className="flex flex-col sm:items-start md:items-center">
                              <span className="block md:hidden"><strong>ID:</strong> {admin._id}</span>
                              <span className="block md:hidden"><strong>Name:</strong> {admin.name}</span>
                              <span className="block md:hidden"><strong>Email:</strong> {admin.email}</span>
                              <span className="block md:hidden"><strong>Role:</strong> {admin.role}</span>
                              <span className="block md:hidden"><strong>Status:</strong> {admin.status}</span>
                              <span className="block md:hidden"><strong>Updated:</strong> {admin.updatedAt}</span>
                              <span className="block md:hidden"><strong>Created:</strong> {admin.createdAt}</span>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost" className="select-none">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <Sheet>
                                    <SheetTrigger asChild>
                                      <Button onClick={() => handleEdit(admin)} className="block py-2 px-4 rounded mb-1 w-32 h-10 select-none" variant="outline">Edit</Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                      <SheetHeader>
                                        <SheetTitle>Edit Account</SheetTitle>
                                        <SheetDescription>
                                          Make changes to your Account here. Click Update when you're done.
                                        </SheetDescription>
                                      </SheetHeader>
                                      <form onSubmit={(e) => updateAcc(e, updateData.id)}>
                                        <div className="grid gap-4">
                                          <Label>Name</Label>
                                          <Input
                                            type="text"
                                            placeholder="Enter Name..."
                                            value={updateData.name}
                                            onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                                          />

                                          <Label>Email</Label>
                                          <Input
                                            type="email"
                                            placeholder="Enter Email..."
                                            value={updateData.email}
                                            onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                                          />

                                          {/* New Password Field */}
                                          <Label>New Password</Label>
                                          <div className="relative">
                                            <Input
                                              type={showPassword ? "text" : "password"}
                                              placeholder="Enter Password..."
                                              value={updateData.password || ''}
                                              onChange={(e) => setUpdateData({ ...updateData, password: e.target.value })}
                                            />
                                            <div
                                              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                              onClick={() => setShowPassword(!showPassword)}
                                            >
                                              {showPassword ? <FaEye /> : <FaEyeSlash />}
                                            </div>
                                          </div>

                                          {/* Confirm Password Field */}
                                          <Label>Confirm Password</Label>
                                          <div className="relative">
                                            <Input
                                              type={showConfirmPassword ? "text" : "password"}
                                              placeholder="Confirm Password..."
                                              value={updateData.confirmPassword || ''}
                                              onChange={(e) => setUpdateData({ ...updateData, confirmPassword: e.target.value })}
                                            />
                                            <div
                                              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                            </div>
                                          </div>

                                          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                                          <div className="bg-gray-100 p-4 border border-gray-300 rounded-md shadow-md">
                                            <p className="text-gray-800 font-semibold mb-2">Password Requirements:</p>
                                            <ul className="text-gray-700 text-sm space-y-1">
                                              <li>Must contain at least 1 uppercase letter ❌</li>
                                              <li>Must contain at least 1 number ❌</li>
                                              <li>Must contain at least 1 symbol ❌</li>
                                              <li>Must be at least 8 characters ❌</li>
                                            </ul>
                                          </div>
                                          <SheetFooter>
                                            <Button
                                              type="submit"
                                              disabled={butloading}
                                              className={`w-full h-10 select-none ${butloading ? "bg-gray-400 cursor-not-allowed translate-y-1 select-none" : ""}`}
                                            >
                                              {butloading ? "Updating..." : "UPDATE"}
                                            </Button>
                                          </SheetFooter>
                                        </div>
                                      </form>
                                    </SheetContent>
                                  </Sheet>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button className="block py-2 px-4 rounded w-32 h-10 select-none" variant="destructive"> {admin.status === 'Active' ? 'Deactivate' : 'Activate'}</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This will {admin.status === 'Active' ? 'Deactivate' : 'Activate'} the Account: {admin.name}
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteAcc(admin._id, admin.status)}>Continue</AlertDialogAction>
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
export default AccountManagement;