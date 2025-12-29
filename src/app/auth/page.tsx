'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Zap, Mail, Lock, User, ArrowRight, Building, Phone } from 'lucide-react'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    brokerage: '',
    licenseNumber: '',
    agreeTerms: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreeTerms) {
      alert('Please agree to terms and conditions')
      return
    }
    
    setIsLoading(true)
    try {
      // Import auth functions dynamically to avoid SSR issues
      const { signUp } = await import('@/lib/auth')
      const { data, error } = await signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      )
      
      if (error) {
        console.error('Sign up error:', error)
        alert(error.message)
      } else {
        // Redirect to dashboard or onboarding
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.error('Sign up error:', error)
      alert('An error occurred during sign up')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Import auth functions dynamically to avoid SSR issues
      const { signIn } = await import('@/lib/auth')
      const { data, error } = await signIn(formData.email, formData.password)
      
      if (error) {
        console.error('Sign in error:', error)
        alert(error.message)
      } else {
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.error('Sign in error:', error)
      alert('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center">
              <Zap className="h-12 w-12 text-blue-600" />
              <span className="ml-3 text-3xl font-bold text-gray-900">RealEstateAI</span>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Transform your real estate business with AI-powered automation
          </p>
        </div>

        {/* Auth Card */}
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>
                  Sign in to your account to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button 
                      type="button"
                      className="text-blue-600 hover:text-blue-500 font-medium"
                      onClick={() => setActiveTab('signup')}
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>
                  Start your 14-day free trial - no credit card required
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Create a strong password"
                        className="pl-10"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="pl-10"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="brokerage">Brokerage Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="brokerage"
                        name="brokerage"
                        placeholder="Your brokerage (optional)"
                        className="pl-10"
                        value={formData.brokerage}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))
                      }
                    />
                    <Label htmlFor="agreeTerms" className="text-sm">
                      I agree to Terms of Service and Privacy Policy
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || !formData.agreeTerms}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button 
                      type="button"
                      className="text-blue-600 hover:text-blue-500 font-medium"
                      onClick={() => setActiveTab('signin')}
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Trust Badges */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4 text-sm text-gray-600">
            <Badge variant="outline" className="bg-white">
              ✨ 14-day free trial
            </Badge>
            <Badge variant="outline" className="bg-white">
              🔒 SSL secured
            </Badge>
            <Badge variant="outline" className="bg-white">
              📧 No spam guarantee
            </Badge>
          </div>
          <p className="text-xs text-gray-500">
            By signing up, you agree to receive marketing emails from RealEstateAI
          </p>
        </div>
      </div>
    </div>
  )
}