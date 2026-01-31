"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export function TopNavbar() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("auth")
    router.push("/login")
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <div className="text-sm text-muted-foreground">Restaurant Management System</div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
          <User className="w-4 h-4" />
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
