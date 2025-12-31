"use client"

import { Bell, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Header({ onLogout }: { onLogout?: () => void }) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  const notifications = [
    {
      id: 1,
      title: "Low Stock Alert",
      message: "Fresh Milk is running low (45 ltr remaining)",
      time: "5 min ago",
      type: "critical",
    },
    {
      id: 2,
      title: "GRN Pending",
      message: "GRN #12345 requires your approval",
      time: "15 min ago",
      type: "warning",
    },
    {
      id: 3,
      title: "Payment Due",
      message: "Payment Order #PO-2024-003 is due tomorrow",
      time: "1 hour ago",
      type: "info",
    },
    {
      id: 4,
      title: "New Vendor",
      message: "Fresh Valley Organics has been added to vendor list",
      time: "2 hours ago",
      type: "info",
    },
    {
      id: 5,
      title: "Critical Stock",
      message: "Cheddar Cheese needs immediate restocking",
      time: "3 hours ago",
      type: "critical",
    },
  ]

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-100 border-red-200"
      case "warning":
        return "bg-yellow-100 border-yellow-200"
      default:
        return "bg-blue-100 border-blue-200"
    }
  }

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div>
        <h2 className="text-sm font-semibold text-foreground">Downtown Outlet</h2>
        <p className="text-xs text-muted-foreground">Accountant Dashboard</p>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-orange-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                5
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-96">
            <DropdownMenuLabel className="text-base font-semibold">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notif) => (
                <DropdownMenuItem
                  key={notif.id}
                  className={`flex flex-col items-start p-4 cursor-pointer border-b ${getNotificationColor(notif.type)}`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-semibold text-sm">{notif.title}</span>
                    <Badge variant={notif.type === "critical" ? "destructive" : "secondary"} className="text-xs">
                      {notif.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{notif.message}</p>
                  <span className="text-xs text-muted-foreground">{notif.time}</span>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-orange-600 font-semibold cursor-pointer">
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground">SA</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="text-sm font-medium">Sarah Anderson</div>
                <div className="text-xs text-muted-foreground">Accountant</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
