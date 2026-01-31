"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "./sidebar"
import { TopNavbar } from "./top-navbar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("auth")
    if (!auth) {
      router.push("/login")
      return
    }
    setAuthenticated(true)
  }, [router])

  if (!authenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-0">
        <TopNavbar />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
