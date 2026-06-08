"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import { motion, AnimatePresence } from "framer-motion";
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
  FileText,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import StackMapLogo from "@/components/roadmap/StackMapLogo";
import Cursor from "@/components/roadmap/Cursor";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user, initialize } = useRoadmapStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const [hoveredItemId, setHoveredItemId] = React.useState<string | null>(null);
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");

  React.useEffect(() => {
    initialize();
    
    // Theme setup
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
    
    // Auth route guard checking
    const session = localStorage.getItem("stackmap_session");
    if (!session && pathname !== "/login" && pathname !== "/") {
      window.location.href = "/login";
    }
  }, [initialize, pathname]);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      setTheme("dark");
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("stackmap_session");
      window.location.href = "/login";
    }
  };

  const navGroups = [
    {
      label: null,
      items: [
        { id: "dashboard", href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", accent: "#6E54F7" }
      ]
    },
    {
      label: "LEARNING",
      items: [
        { id: "roadmaps", href: "/roadmaps", icon: Map, label: "Career Roadmaps", accent: "#6E54F7" },
        { id: "skills", href: "/skills", icon: Trophy, label: "Skill Trees", accent: "#00E5CC" },
        { id: "companies", href: "/companies", icon: Building2, label: "Company Prep", accent: "#FFB830" },
        { id: "projects", href: "/project-roadmaps", icon: FolderGit, label: "Project Roadmaps", accent: "#FF5C35" }
      ]
    },
    {
      label: "CAREER",
      items: [
        { id: "resume-r", href: "/resume/readiness", icon: Sparkles, label: "Resume Readiness", accent: "#00E5CC" },
        { id: "resume-b", href: "/resume/builder", icon: FileText, label: "Resume Builder", accent: "#6E54F7" },
        { id: "interview", href: "/interview", icon: MessageSquare, label: "AI Interview Hub", accent: "#FF3D9A" }
      ]
    },
    {
      label: "TRACKING",
      items: [
        { id: "tracker", href: "/tracker/applications", icon: Briefcase, label: "App Tracker", accent: "#FF3D9A" },
        { id: "dsa", href: "/tracker/dsa", icon: Code2, label: "DSA Tracker", accent: "#FFB830" }
      ]
    },
    {
      label: "TOOLS",
      items: [
        { id: "resources", href: "/resources", icon: BookOpen, label: "Resource Hub", accent: "#00E5CC" },
        { id: "project-ideas", href: "/projects", icon: FolderGit, label: "Project Ideas", accent: "#FFB830" },
        { id: "mentor", href: "/mentor", icon: MessageSquare, label: "AI Mentor", accent: "#FF3D9A" }
      ]
    }
  ];

  // Mobile Navigation items list flat representation
  const mobileNavItems = React.useMemo(() => {
    return navGroups.flatMap(g => g.items);
  }, []);

  return (
    <div className="flex min-h-screen bg-abyss text-starlight transition-colors duration-300 font-sans">
      <Cursor />
      {/* Command Dock - Collapsible Sidebar for Desktop */}
      <motion.aside
        className="command-dock hidden md:flex md:flex-col"
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        {/* Header - Branding */}
        <div className="dock-header">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                className="dock-wordmark"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <StackMapLogo size={28} />
                <span className="font-display font-bold">StackMap</span>
              </motion.div>
            )}
          </AnimatePresence>
          {collapsed && <StackMapLogo size={28} />}
          
          <motion.button
            className="collapse-btn"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(110,84,247,0.15)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCollapsed(c => !c)}
          >
            <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronLeft size={14} />
            </motion.div>
          </motion.button>
        </div>

        {/* Streak banner indicator */}
        <motion.div
          className="streak-banner"
          whileHover={{ scale: 1.02 }}
          animate={{
            boxShadow: [
              "0 0 0px rgba(255,92,53,0)",
              "0 0 20px rgba(255,92,53,0.25)",
              "0 0 0px rgba(255,92,53,0)"
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="streak-flame">🔥</div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="streak-days">{user.streak} Day Streak</span>
                <span className="streak-sub">Active status</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation list */}
        <nav className="dock-nav">
          {navGroups.map((group, gi) => (
            <div key={gi} className="nav-group border-t border-rim/35 first:border-0 pt-2 first:pt-0">
              {/* Group label */}
              <AnimatePresence>
                {!collapsed && group.label && (
                  <motion.span
                    className="group-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {group.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Items */}
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                const Icon = item.icon;
                
                return (
                  <Link 
                    key={item.id} 
                    href={item.href}
                    onMouseEnter={() => setHoveredItemId(item.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                    className="block"
                  >
                    <motion.div
                      className={cn(
                        "nav-item relative overflow-hidden",
                        isActive && "active bg-white/[0.02]"
                      )}
                      style={{
                        justifyContent: collapsed ? "center" : "flex-start"
                      }}
                      whileHover={{ x: collapsed ? 0 : 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Active item highlights */}
                      {isActive && (
                        <>
                          <motion.div
                            className="radar-ping"
                            style={{ background: item.accent }}
                            animate={{ scale: [1, 2.3], opacity: [0.35, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                          />
                          <motion.div
                            className="active-bar"
                            layoutId="activeBar"
                            style={{ background: item.accent }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                          />
                        </>
                      )}

                      {/* Icon wrapper */}
                      <div 
                        className="nav-icon-wrap relative z-10 transition-colors"
                        style={{ color: isActive || hoveredItemId === item.id ? item.accent : undefined }}
                      >
                        <Icon size={16} />
                      </div>

                      {/* Label */}
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            className="nav-label relative z-10 font-sans"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                            style={{ color: isActive || hoveredItemId === item.id ? item.accent : undefined }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Hover tooltip for collapsed state */}
                      <AnimatePresence>
                        {collapsed && hoveredItemId === item.id && (
                          <motion.div
                            className="nav-tooltip"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                          >
                            {item.label}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer profile area */}
        <div className="dock-footer">
          <Link href="/profile">
            <motion.div className="user-chip flex items-center gap-3 w-full bg-white/[0.01] hover:bg-white/[0.04] transition-colors border border-rim/20">
              <div className="user-avatar text-[10px]">
                {user.name.split(" ").map(n => n[0]).join("")}
              </div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    className="user-info flex flex-col justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="user-name text-xs font-semibold text-starlight">{user.name}</span>
                    <span className="user-plan text-[9px]">Premium Student</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div className="ml-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Settings size={13} className="settings-icon text-muted-foreground hover:text-foreground transition-colors" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
          <div className="mt-3 flex justify-between items-center w-full">
            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 rounded-lg border border-red-500/30 bg-red-500/5 hover:bg-red-500/15 text-red-400 font-mono text-[9px] uppercase cursor-pointer"
            >
              Sign Out
            </button>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-rim/40 bg-void hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div 
        className="flex flex-col flex-1 w-full transition-all duration-300 md:pl-[var(--sidebar-w-current)]"
        style={{
          "--sidebar-w-current": collapsed ? "72px" : "260px"
        } as React.CSSProperties}
      >
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 flex items-center justify-between h-16 md:hidden border-b border-rim bg-void/85 backdrop-blur-md px-4">
          <div className="flex items-center space-x-2">
            <StackMapLogo size={28} />
            <span className="text-lg font-bold tracking-tight text-gradient font-display">
              StackMap
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 p-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-lg px-2 py-0.5 font-mono text-xs">
              <Flame className="h-4 w-4 fill-orange-400" />
              <span>{user.streak}d</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-rim bg-void hover:bg-secondary text-muted-foreground hover:text-foreground"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg border border-rim bg-void hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-void p-6 shadow-xl border-l border-rim flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold font-display text-gradient">Navigation</span>
                  <button onClick={() => setMobileOpen(false)} className="p-1 rounded-md border border-rim hover:bg-secondary">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <nav className="space-y-1 overflow-y-auto max-h-[70vh]">
                  {mobileNavItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150",
                          isActive
                            ? "bg-primary text-primary-foreground shadow"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex items-center border-t border-rim pt-4">
                <div className="user-avatar text-[10px] mr-3">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-starlight">{user.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">Premium Student</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Section Content Wrapper */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto relative grid-bg">
          {children}
        </main>
      </div>
    </div>
  );
}
