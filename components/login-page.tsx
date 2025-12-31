"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, Shield, ArrowLeft } from "lucide-react"

interface LoginPageProps {
  onLoginSuccess: (token: string) => void
}

type LoginStep = "credentials" | "otp"

const MOCK_USERS = [
  { identifier: "admin@flavors.com", password: "admin123", name: "Admin User" },
  { identifier: "EMP001", password: "admin123", name: "Employee 001" },
]

const MOCK_OTP = "123456" // Demo OTP

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [step, setStep] = useState<LoginStep>("credentials")
  const [emailOrId, setEmailOrId] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resendTimer, setResendTimer] = useState(0)
  const [maskedContact, setMaskedContact] = useState("")

  const otpInputs = useRef<(HTMLInputElement | null)[]>([])

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  // Validate credentials
  const validateCredentials = () => {
    if (!emailOrId.trim()) {
      setError("Please enter your Email or Employee ID")
      return false
    }
    if (!password.trim()) {
      setError("Please enter your password")
      return false
    }
    return true
  }

  const handleSendOTP = async () => {
    setError("")
    if (!validateCredentials()) return

    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    try {
      // Check if user exists
      const user = MOCK_USERS.find(
        (u) => u.identifier.toLowerCase() === emailOrId.toLowerCase() && u.password === password,
      )

      if (!user) {
        throw new Error("Invalid email/ID or password")
      }

      // Mask contact info for display
      setMaskedContact(maskContact(emailOrId))
      setStep("otp")
      setResendTimer(30)

      // Auto-focus first OTP input
      setTimeout(() => otpInputs.current[0]?.focus(), 100)

      // Show OTP hint in console for demo
      console.log(`[v0] Demo OTP: ${MOCK_OTP}`)
      setError(`Demo mode: Use OTP ${MOCK_OTP}`)
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordLogin = async () => {
    setError("")
    if (!validateCredentials()) return

    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    try {
      const user = MOCK_USERS.find(
        (u) => u.identifier.toLowerCase() === emailOrId.toLowerCase() && u.password === password,
      )

      if (!user) {
        throw new Error("Invalid credentials")
      }

      // Generate mock JWT token
      const mockToken = btoa(JSON.stringify({ user: user.identifier, name: user.name }))
      onLoginSuccess(mockToken)
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // Only numbers

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Only last digit
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus()
    }
  }

  // Handle OTP backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus()
    }
  }

  // Handle OTP paste
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newOtp = [...otp]
    pastedData.split("").forEach((digit, i) => {
      if (i < 6) newOtp[i] = digit
    })
    setOtp(newOtp)

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5)
    otpInputs.current[lastIndex]?.focus()
  }

  const handleVerifyOTP = async () => {
    const otpString = otp.join("")

    if (otpString.length !== 6) {
      setError("Please enter complete 6-digit OTP")
      return
    }

    setLoading(true)
    setError("")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    try {
      // Verify OTP
      if (otpString !== MOCK_OTP) {
        throw new Error("Invalid OTP")
      }

      const user = MOCK_USERS.find((u) => u.identifier.toLowerCase() === emailOrId.toLowerCase())

      // Generate mock JWT token
      const mockToken = btoa(JSON.stringify({ user: user?.identifier, name: user?.name }))
      onLoginSuccess(mockToken)
    } catch (err: any) {
      setError(err.message || "OTP verification failed")
      setOtp(["", "", "", "", "", ""])
      otpInputs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (resendTimer > 0) return

    setLoading(true)
    setError("")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    try {
      setResendTimer(30)
      setOtp(["", "", "", "", "", ""])
      otpInputs.current[0]?.focus()
      console.log(`[v0] Demo OTP resent: ${MOCK_OTP}`)
      setError(`Demo mode: Use OTP ${MOCK_OTP}`)
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP")
    } finally {
      setLoading(false)
    }
  }

  // Mask contact for display
  const maskContact = (contact: string) => {
    if (contact.includes("@")) {
      const [local, domain] = contact.split("@")
      return `${local.slice(0, 2)}${"*".repeat(local.length - 2)}@${domain}`
    }
    return `${"*".repeat(contact.length - 4)}${contact.slice(-4)}`
  }

  // Handle back to credentials
  const handleBackToCredentials = () => {
    setStep("credentials")
    setOtp(["", "", "", "", "", ""])
    setError("")
    setResendTimer(0)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-orange-200">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            FLAVORS' GARDEN
          </CardTitle>
          <CardDescription className="text-gray-600">
            {step === "credentials" ? "Admin Dashboard Login" : "Verify OTP"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === "credentials" && (
            <Alert className="bg-orange-50 border-orange-200">
              <AlertDescription className="text-sm text-orange-800">
                <strong>Demo Mode:</strong> Use <code className="bg-orange-100 px-1 rounded">admin@flavors.com</code> /{" "}
                <code className="bg-orange-100 px-1 rounded">admin123</code>
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert
              variant={error.includes("Demo mode") ? "default" : "destructive"}
              className={error.includes("Demo mode") ? "bg-blue-50 border-blue-200" : ""}
            >
              <AlertDescription className={error.includes("Demo mode") ? "text-blue-800" : ""}>
                {error}
              </AlertDescription>
            </Alert>
          )}

          {step === "credentials" ? (
            // Step 1: Credentials
            <>
              <div className="space-y-2">
                <Label htmlFor="emailOrId" className="text-gray-700">
                  Email or Employee ID
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="emailOrId"
                    type="text"
                    placeholder="Enter email or employee ID"
                    value={emailOrId}
                    onChange={(e) => setEmailOrId(e.target.value)}
                    className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    disabled={loading}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>

                <Button
                  onClick={handlePasswordLogin}
                  disabled={loading}
                  variant="outline"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  Login via Password
                </Button>
              </div>
            </>
          ) : (
            // Step 2: OTP Verification
            <>
              <Button
                onClick={handleBackToCredentials}
                variant="ghost"
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 -mt-2"
                disabled={loading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>

              <div className="text-center space-y-2 py-4">
                <p className="text-sm text-gray-600">OTP sent to</p>
                <p className="font-semibold text-gray-900">{maskedContact}</p>
                <p className="text-xs text-gray-500">Valid for 5 minutes</p>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Enter 6-Digit OTP</Label>
                <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (otpInputs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-semibold border-orange-300 focus:border-orange-500 focus:ring-orange-500"
                      disabled={loading}
                    />
                  ))}
                </div>
              </div>

              <Button
                onClick={handleVerifyOTP}
                disabled={loading || otp.join("").length !== 6}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <div className="text-center pt-2">
                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-500">Resend OTP in {resendTimer}s</p>
                ) : (
                  <Button
                    onClick={handleResendOTP}
                    disabled={loading}
                    variant="link"
                    className="text-orange-600 hover:text-orange-700"
                  >
                    Resend OTP
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
