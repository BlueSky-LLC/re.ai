'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Check,
  Zap,
  TrendingUp,
  Users,
  Home,
  BarChart3,
  Phone,
  Mail,
  Star,
  ArrowRight,
  Target,
  Bot,
  Shield,
  Clock,
  DollarSign,
  MessageSquare,
  Calendar
} from 'lucide-react'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Lead Intelligence',
      description: 'Automated lead scoring, instant responses, and predictive analytics to convert more leads.',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: MessageSquare,
      title: 'Unified Communication Hub',
      description: 'All conversations in one place - email, SMS, social media, with AI-suggested responses.',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics Dashboard',
      description: 'Real-time insights, commission forecasting, and performance tracking.',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: Home,
      title: 'AI CMA Generator',
      description: 'Generate comprehensive comparative market analyses in under 2 minutes.',
      color: 'text-orange-600 bg-orange-50'
    },
    {
      icon: Target,
      title: 'Smart Marketing Automation',
      description: 'Multi-channel campaigns, content generation, and sphere-of-influence management.',
      color: 'text-red-600 bg-red-50'
    },
    {
      icon: Shield,
      title: 'Go High Level Native',
      description: 'Seamless integration with your existing GHL setup, not just another bolt-on.',
      color: 'text-indigo-600 bg-indigo-50'
    }
  ]

  const testimonials = [
    {
      name: 'Jessica Martinez',
      role: 'Top Producer, 25+ transactions/year',
      content: 'This platform transformed my business. I\'m saving 15+ hours per week and closing 3x more deals. The AI lead scoring is scary accurate!',
      rating: 5,
      image: '/avatars/jessica.jpg'
    },
    {
      name: 'David Chen',
      role: 'Broker, 15-agent team',
      content: 'The ROI is insane. Within 3 months, our team\'s productivity increased by 40%. The unified communication hub alone is worth the price.',
      rating: 5,
      image: '/avatars/david.jpg'
    },
    {
      name: 'Amanda Roberts',
      role: 'Solo Agent, 3 years experience',
      content: 'I was struggling with lead management. Now I have a system that works while I sleep. The AI responses have saved me countless hours.',
      rating: 5,
      image: '/avatars/amanda.jpg'
    }
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$297',
      period: '/month',
      description: 'Perfect for new agents getting started',
      features: [
        'Up to 500 contacts',
        '5 active drip campaigns',
        'Basic AI lead scoring',
        'Unified inbox (email + SMS)',
        '1,000 SMS credits/month',
        'Mobile app access',
        'Basic analytics dashboard',
        'Community support'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      price: '$597',
      period: '/month',
      description: 'Most popular for established agents',
      features: [
        'Up to 5,000 contacts',
        'Unlimited drip campaigns',
        'Advanced AI features',
        'AI-powered CMA generator',
        'Transaction pipeline management',
        'DocuSign integration',
        'Social media scheduler',
        'Priority email support',
        'Quarterly strategy calls'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Team/Brokerage',
      price: '$1,497',
      period: '/month',
      description: 'For top producers and brokerages',
      features: [
        'Up to 25,000 contacts',
        'Multi-user accounts (up to 5)',
        'Team collaboration tools',
        'White-label options',
        'Dedicated account manager',
        'Custom integrations',
        '20,000 SMS credits/month',
        'Priority phone support',
        'Weekly strategy calls'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const stats = [
    { label: 'Average Time Saved', value: '15+ hrs/week', icon: Clock },
    { label: 'Lead Conversion Increase', value: '3x Higher', icon: TrendingUp },
    { label: 'Response Time Improvement', value: '<5 mins', icon: Zap },
    { label: 'Average ROI', value: '340%', icon: DollarSign }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              🚀 Transform Your Real Estate Business with AI
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Close 3x More Deals While
              <span className="text-yellow-400"> Working 70% Less</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              The AI-powered platform that automates your lead management, 
              supercharges your client relationships, and predicts your next commission check.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 text-lg px-8 py-3">
                Start 14-Day Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3">
                    Watch 2-Min Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Schedule Your Demo</DialogTitle>
                    <DialogDescription>
                      See how our AI platform can transform your real estate business.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="Your phone number" />
                    </div>
                    <Button className="w-full">Schedule Demo</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-12 text-center">
              <p className="text-sm text-blue-200 mb-4">Trusted by 1,200+ real estate professionals</p>
              <div className="flex justify-center space-x-8 opacity-80">
                <span className="text-sm font-medium">★ 4.9/5 Rating</span>
                <span className="text-sm font-medium">50,000+ Deals Closed</span>
                <span className="text-sm font-medium">$2.5B+ Commission Generated</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 border-b">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Dominate Your Market
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From lead capture to closing, our AI-powered platform handles the heavy lifting 
              so you can focus on what matters most: building relationships and closing deals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Real Estate Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join 1,200+ agents who are closing more deals while working less. 
            Start your 14-day free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 text-lg px-8 py-3">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
