import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';
import { CircleUser, Package2, Home, UserRoundCog, Menu, Logs, MessageSquareText, UserRoundPen, HandMetal } from "lucide-react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import logoname from '@/assets/logoname.svg'
const HeaderSu = () => {
    const { user, logout } = useContext(UserContext);
  return (
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
                  <img src={logoname} alt="Logoname" className="w-auto h-10" />
                </Link>
                <Link
                  to="/SaDashboard"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/AccManagement"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <UserRoundCog className="h-5 w-5" />
                  Admin Management
                </Link>
                <Link
                  to="/SAUserManagement"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <UserRoundPen className="h-5 w-5" />
                  User Management
                </Link>
                <Link
                  to="/SASignManagement"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <HandMetal className="h-5 w-5" />
                  Sign Management
                </Link>
                <Link
                  to="/SAFeedbacks"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <MessageSquareText className="h-5 w-5" />
                  Feedbacks
                </Link>
                <Link
                  to="/Updates"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <RefreshCw  className="h-5 w-5" />
                  Update Logs
                </Link>
                <Link
                  to="/SALogs"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Logs className="h-5 w-5" />
                  Security Logs
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
          </div>
          <p className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 py-1 px-3 rounded-md shadow-sm text-sm font-medium text-gray-800 dark:text-gray-300 mr-4">
            Welcome, <span className="font-semibold ml-1">{user.name}</span>
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
    );
};
export default HeaderSu;
