"use client"

import { useState, useEffect } from "react"
import { LoginPage } from "./login-page"
import { GRNDashboard } from "./grn-dashboard"

export function AuthWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has valid JWT token
    const token = localStorage.getItem("auth_token")
    if (token) {
      // In production, validate token with backend
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("auth_token", token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-orange-600">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />
  }

  return <GRNDashboard onLogout={handleLogout} />
}
