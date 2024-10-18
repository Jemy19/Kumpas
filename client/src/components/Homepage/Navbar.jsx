import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Download, KeyRound } from 'lucide-react';
import ModeToggle from './mode-toggle';
import Logo from '@/assets/LOGOKUMPAS.svg'
import { Link } from 'react-router-dom';
const routeList = [
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#team",
    label: "Team",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
        <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              E-KUMPAS
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    E-KUMPAS
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    rel="noreferrer noopener"
                    className={`border ${buttonVariants({ variant: "secondary" })}`}
                    onClick={() =>
                      window.open(
                        'https://github.com/XjorLml/E-Kumpas_Mobile_App/releases/download/v1.0.0-beta/E-Kumpas-v1.0.0-beta.apk',
                        '_blank',
                        'noopener noreferrer'
                      )
                    }
                  >
                    <Download  className="mr-2 w-5 h-5" />
                    Download App
                  </a>
                  <a
                    rel="noreferrer noopener"
                    href="/Login"
                    className={`border ${buttonVariants({ variant: "secondary" })}`}
                  >
                    <KeyRound className="mr-2 w-5 h-5" />
                    Login
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="mr-3 hidden md:flex gap-2">
            {routeList.map((route, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[20px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex gap-2">
            <a
              rel="noreferrer noopener"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
              onClick={() =>
                window.open(
                  'https://github.com/XjorLml/E-Kumpas_Mobile_App/releases/download/v1.0.0-beta/E-Kumpas-v1.0.0-beta.apk',
                  '_blank',
                  'noopener noreferrer'
                )
              }
            >
              <Download className="mr-2 w-5 h-5" />
              Download App
            </a>
            <a
              rel="noreferrer noopener"
              href="/Login"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <KeyRound  className="mr-2 w-5 h-5" />
              Login
            </a>
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
export default Navbar;