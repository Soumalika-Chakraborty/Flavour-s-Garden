"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, LogIn } from "lucide-react"

export default function LoginPage() {
  const [employeeId, setEmployeeId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  // Prevent hydration mismatch by only rendering client content after mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Login failed")
        setLoading(false)
        return
      }

      // Store auth token and redirect
      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("employeeId", data.employeeId)
        router.push("/dashboard")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  // Prevent hydration mismatch by using suppressHydrationWarning
  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4" suppressHydrationWarning>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Flavours' Garden</CardTitle>
          <CardDescription>Admin Dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="employeeId" className="text-sm font-medium">
                Employee ID
              </label>
              <Input
                id="employeeId"
                placeholder="Enter your employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                disabled={loading}
                suppressHydrationWarning
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                suppressHydrationWarning
              />
            </div>
            {error && <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">{error}</div>}
            <Button className="w-full" disabled={loading} suppressHydrationWarning>
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-muted rounded text-xs text-muted-foreground">
            Demo: Use any Employee ID with password "demo" to login
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
