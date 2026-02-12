"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Navbar() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const navLinks = [
    { label: "Home", link: "#hero" },
    { label: "Problem", link: "#problem" },
    { label: "How It Works", link: "#how-it-works" },
    { label: "Features", link: "#features" },
    { label: "Why It’s Better", link: "#why-better" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        {/* Logo */}
        <div className="flex shrink-0">
          <Link
            href="#hero"
            className="text-lg font-semibold tracking-tight text-foreground hover:opacity-90"
          >
            CashFlow
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navLinks.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()}
        text-muted-foreground
        hover:text-foreground`}
                  >
                    <a href={item.link}>{item.label}</a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Section */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>

          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            asChild
          >
            <Link href="/signup">Sign Up</Link>
          </Button>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
