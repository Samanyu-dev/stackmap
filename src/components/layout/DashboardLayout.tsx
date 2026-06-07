"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import {
  LayoutDashboard,
  Map,
  Briefcase,
  Code2,
  BookOpen,
  FolderGit,
  MessageSquare,
  User,
  Settings,
  Flame,
  Menu,
  X,
  Sun,
  Moon,
  ShieldCheck,
  Trophy,
  Sparkles,
  Building2,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user } = useRoadmapStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");

  React.useEffect(() => {
    // Check initial class
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      setTheme("dark");
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Career Roadmaps", href: "/roadmaps", icon: Map },
    { name: "Skill Trees", href: "/skills", icon: Trophy },
    { name: "Company Prep", href: "/companies", icon: Building2 },
    { name: "Project Roadmaps", href: "/project-roadmaps", icon: FolderGit },
    { name: "Resume Readiness", href: "/resume/readiness", icon: Sparkles },
    { name: "Resume Builder", href: "/resume/builder", icon: FileText },
    { name: "Application Tracker", href: "/tracker/applications", icon: Briefcase },
    { name: "DSA Tracker", href: "/tracker/dsa", icon: Code2 },
    { name: "Resource Hub", href: "/resources", icon: BookOpen },
    { name: "Project Ideas", href: "/projects", icon: FolderGit },
    { name: "AI Mentor", href: "/mentor", icon: MessageSquare },
    { name: "Profile settings", href: "/profile", icon: User },
    { name: "Admin panel", href: "/admin", icon: ShieldCheck }
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-border bg-card/60 backdrop-blur-md z-20">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary/20">
              S
            </div>
            <span className="text-xl font-bold tracking-tight text-gradient">
              StackMap
            </span>
          </div>

          {/* Streak Indicator */}
          <div className="mt-6 px-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <div className="flex items-center space-x-2">
                <Flame className="h-5 w-5 animate-pulse fill-orange-400" />
                <span className="text-sm font-semibold">Active Streak</span>
              </div>
              <span className="text-lg font-bold">{user.streak} Days</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 flex-1 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150",
                    isActive
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-150",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Settings */}
        <div className="flex-shrink-0 flex border-t border-border p-4 bg-card/80">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-primary/20"
                src={user.image}
                alt={user.name}
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">Premium Student</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col flex-1 w-full">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 flex items-center justify-between h-16 md:hidden border-b border-border bg-card/80 backdrop-blur-md px-4">
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-base">
              S
            </div>
            <span className="text-lg font-bold tracking-tight text-gradient">
              StackMap
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 p-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-lg px-2 py-0.5">
              <Flame className="h-4 w-4 fill-orange-400" />
              <span className="text-xs font-bold">{user.streak}d</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-card p-6 shadow-xl border-l border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold text-gradient">Navigation</span>
                  <button onClick={() => setMobileOpen(false)} className="p-1 rounded-md border hover:bg-secondary">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150",
                          isActive
                            ? "bg-primary text-primary-foreground shadow"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex items-center border-t pt-4">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.image}
                  alt={user.name}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">Premium Student</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Section */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto relative grid-bg">
          {children}
        </main>
      </div>
    </div>
  );
}
