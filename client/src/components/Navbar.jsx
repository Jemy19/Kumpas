import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { Home, Logs, MessageSquareText, UserRoundPen, HandMetal, RefreshCw  } from "lucide-react";
import logoname from '@/assets/logoname.svg'
const Navbar = () => {
  const location = useLocation(); // Get current location

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 
      "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary" : 
      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  };

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link to="/Dashboard" className="flex items-center gap-2 font-semibold">
          <img src={logoname} alt="Logoname" className="w-auto h-10" />
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link
            to="/Dashboard"
            className={isActive("/Dashboard")} // Dynamically apply class
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            to="/Management"
            className={isActive("/Management")} // Dynamically apply class
          >
            <HandMetal className="h-4 w-4" />
            Sign Management
          </Link>
          <Link
            to="/UserManagement"
            className={isActive("/UserManagement")} // Dynamically apply class
          >
            <UserRoundPen className="h-4 w-4" />
            User Management
          </Link>
          <Link
            to="/Feedback"
            className={isActive("/Feedback")} // Dynamically apply class
          >
            <MessageSquareText className="h-4 w-4" />
            Feedback
          </Link>
          <Link
            to="/AdminLogs"
            className={isActive("/AdminLogs")} // Dynamically apply class
          >
            <Logs className="h-4 w-4" />
            Admin Logs
          </Link>
          <Link
            to="/Updates"
            className={isActive("/Updates")} // Dynamically apply class
          >
            <RefreshCw  className="h-4 w-4" />
            Update Logs
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
