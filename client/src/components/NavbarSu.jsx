import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Logs, UserRoundCog, UserRoundPen, HandMetal, MessageSquareText, RefreshCw  } from "lucide-react";
import logoname from '@/assets/logoname.svg'
const NavbarSu = () => {
  const location = useLocation();

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 
      "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary select-none" : 
      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary select-none";
  };

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link to="/SaDashboard" className="flex items-center gap-2 font-semibold">
          <img src={logoname} alt="Logoname" className="w-auto h-10 pointer-events-none select-none" />
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link
            to="/SaDashboard"
            className={isActive("/SaDashboard")}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            to="/AccManagement"
            className={isActive("/AccManagement")}
          >
            <UserRoundCog className="h-4 w-4" />
            Admin Management
          </Link>
          <Link
            to="/SAUserManagement"
            className={isActive("/SAUserManagement")}
          >
            <UserRoundPen className="h-4 w-4" />
            User Management
          </Link>
          <Link
            to="/SASignManagement"
            className={isActive("/SASignManagement")}
          >
            <HandMetal  className="h-4 w-4" />
            Sign Management
          </Link>
          <Link
            to="/SAFeedbacks"
            className={isActive("/SAFeedbacks")}
          >
            <MessageSquareText className="h-4 w-4" />
            Feedbacks
          </Link>
          <Link
            to="/SaUpdate"
            className={isActive("/Updates")} // Dynamically apply class
          >
            <RefreshCw  className="h-4 w-4" />
            Update Logs
          </Link>
          <Link
            to="/SALogs"
            className={isActive("/SALogs")}
          >
            <Logs  className="h-4 w-4" />
            Security Logs
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default NavbarSu;
