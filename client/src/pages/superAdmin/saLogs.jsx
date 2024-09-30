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
import { UserContext } from '../../../context/userContext';
import React, { useContext, useState, useEffect } from 'react';
import {toast} from 'react-hot-toast'
import axios from 'axios'
import NavbarSu from '@/components/NavbarSu';
import HeaderSu from '@/components/HeaderSu';
import SimplePagination from '@/components/simplepagination';
import SearchInput from '@/components/searchinput';
import Filter from '@/components/filter';
import UserSkeleton from '../../skeletons/userskeleton';

export function Salogs() {
  const { user, logout } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = ["info", "error", "warn", "debug"];

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
    axios
      .get('admin/logs')
      .then((response) => {
        setLogs(response.data.logs);
      })
      .catch((err) => {
        setError('Error fetching logs');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //filter

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      const updatedCategories = prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category];
      setCurrentPage(1); // Reset to the first page when category changes
      return updatedCategories;
    });
  };
  
  

  const filteredLogs = logs.filter((log) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(log.level);
    const matchesSearch = log.adminName.toLowerCase().includes(searchQuery.toLowerCase());
    const result = matchesSearch && matchesCategory;
    return result;
  });
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <NavbarSu />
      </div>
      <div className="flex flex-col">
        <HeaderSu />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {loading ? (
            <UserSkeleton />
            ) : (
            <>
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <CardTitle>Super Admin Logs</CardTitle>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-full flex-1">
                        <SearchInput 
                          value={searchQuery}
                          onChange={handleSearchChange}
                          placeholder="Search by Admin Name..."
                        />
                      </div>
                      <div className="flex items-center">
                        <Filter
                          selectedCategories={selectedCategories}
                          handleCategoryChange={handleCategoryChange}
                          categories={categories}
                          titlelabel="Filter by Level"
                        />
                      </div>
                    </div>
                  </div>
                  <CardDescription>
                    View all Logs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden md:table-cell">ID</TableHead>
                        <TableHead className="hidden md:table-cell">Admin</TableHead>
                        <TableHead className="hidden md:table-cell">TimeStamp</TableHead>
                        <TableHead className="hidden md:table-cell">Message</TableHead>
                        <TableHead className="hidden md:table-cell">Level</TableHead>
                        <TableHead className="block md:hidden">
                          Details
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedLogs.length > 0 ? (
                        paginatedLogs.map((log) => (
                          <TableRow key={log._id}>
                            <TableCell className="hidden md:table-cell">{log._id}</TableCell>
                            <TableCell className="hidden md:table-cell">{log.adminName}</TableCell>
                            <TableCell className="hidden md:table-cell">{log.timestamp}</TableCell>
                            <TableCell className="hidden md:table-cell">{log.message}</TableCell>
                            <TableCell className="hidden md:table-cell">{log.level}</TableCell>
                            <TableCell className="flex flex-col sm:items-start md:items-center">
                              <span className="block md:hidden"><strong>ID:</strong> {log._id}</span>
                              <span className="block md:hidden"><strong>Name:</strong> {log.adminName}</span>
                              <span className="block md:hidden"><strong>Email:</strong> {log.timestamp}</span>
                              <span className="block md:hidden"><strong>Role:</strong> {log.message}</span>
                              <span className="block md:hidden"><strong>Updated:</strong> {log.level}</span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            No logs found
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
export default Salogs;

