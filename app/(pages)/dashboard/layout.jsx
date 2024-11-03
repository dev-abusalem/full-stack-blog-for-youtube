"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { cn } from "../../../lib/utils";
import { ChevronRight, User } from "lucide-react";
import Link from "next/link";
import DashHeader from "@/app/components/Dashboard/Header/DashHeader";
import { sidebarItems } from "@/app/components/Dashboard/menuitems";

function Layout({ children }) {
  const primaryColor = "bg-green-500";
  const [collapsed, setCollapsed] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-gray-800 text-white transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex items-center h-16 px-4",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && <span className="text-xl font-bold">Dashboard</span>}
        </div>

        {/* User Profile */}
        <div
          className={cn(
            "flex items-center px-4 py-2",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="font-medium">ADMIN USER</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {sidebarItems.map((item, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white",
                        collapsed ? "justify-center" : "justify-between",
                        activeItem === item.label && "bg-gray-700 text-white"
                      )}
                      onClick={() =>
                        setActiveItem(
                          activeItem === item.label ? null : item.label
                        )
                      }
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5" />
                        {!collapsed && (
                          <span className="ml-3">{item.label}</span>
                        )}
                      </div>
                      {!collapsed && item.subItems && (
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform",
                            activeItem === item.label && "transform rotate-90"
                          )}
                        />
                      )}
                    </Link>
                    {!collapsed &&
                      item.subItems &&
                      activeItem === item.label && (
                        <div className="bg-gray-700 py-2">
                          {item.subItems.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="block py-2 px-4 pl-12 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <DashHeader
          primaryColor={primaryColor}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
export default Layout;
