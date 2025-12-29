'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Users,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  MessageSquare
} from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'

interface Lead {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  lead_source: string
  lead_status: 'new' | 'contacted' | 'qualified' | 'nurture' | 'dead' | 'client'
  lead_score: number
  buyer_seller: 'buyer' | 'seller' | 'both' | 'none'
  budget_min: number | null
  budget_max: number | null
  preferred_locations: string[]
  last_contacted_at: string | null
  created_at: string
}

const mockLeads: Lead[] = [
  {
    id: '1',
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 123-4567',
    lead_source: 'Zillow',
    lead_status: 'qualified',
    lead_score: 85,
    buyer_seller: 'buyer',
    budget_min: 400000,
    budget_max: 600000,
    preferred_locations: ['Downtown', 'Suburbia Heights'],
    last_contacted_at: '2024-01-15T10:30:00Z',
    created_at: '2024-01-14T08:45:00Z'
  },
  {
    id: '2',
    first_name: 'Mike',
    last_name: 'Chen',
    email: 'mike.chen@email.com',
    phone: '(555) 987-6543',
    lead_source: 'Facebook',
    lead_status: 'contacted',
    lead_score: 72,
    buyer_seller: 'seller',
    budget_min: null,
    budget_max: 750000,
    preferred_locations: ['Oak Grove'],
    last_contacted_at: '2024-01-15T09:15:00Z',
    created_at: '2024-01-13T14:20:00Z'
  },
  {
    id: '3',
    first_name: 'Emily',
    last_name: 'Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 456-7890',
    lead_source: 'Website',
    lead_status: 'new',
    lead_score: 91,
    buyer_seller: 'buyer',
    budget_min: 500000,
    budget_max: 800000,
    preferred_locations: ['Riverside', 'Westside'],
    last_contacted_at: null,
    created_at: '2024-01-15T08:45:00Z'
  },
  {
    id: '4',
    first_name: 'David',
    last_name: 'Wilson',
    email: 'david.w@email.com',
    phone: '(555) 234-5678',
    lead_source: 'Referral',
    lead_status: 'nurture',
    lead_score: 58,
    buyer_seller: 'both',
    budget_min: 300000,
    budget_max: 500000,
    preferred_locations: ['East End'],
    last_contacted_at: '2024-01-14T16:20:00Z',
    created_at: '2024-01-10T11:30:00Z'
  }
]

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'qualified': return 'bg-green-100 text-green-800'
      case 'nurture': return 'bg-purple-100 text-purple-800'
      case 'dead': return 'bg-red-100 text-red-800'
      case 'client': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'zillow': return '🏠'
      case 'facebook': return '📘'
      case 'website': return '🌐'
      case 'referral': return '👥'
      default: return '📧'
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = `${lead.first_name} ${lead.last_name} ${lead.email}`.toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || lead.lead_status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.lead_status === 'new').length,
    qualified: leads.filter(l => l.lead_status === 'qualified').length,
    avgScore: Math.round(leads.reduce((sum, l) => sum + l.lead_score, 0) / leads.length)
  }

  const handleAIEnrichment = async (leadId: string) => {
    setIsLoading(true)
    // Simulate AI enrichment process
    setTimeout(() => {
      setIsLoading(false)
      alert('AI enrichment completed! Lead score updated and insights generated.')
    }, 2000)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
            <p className="text-gray-600">Manage and nurture your real estate leads</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Active in pipeline</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Leads</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
              <p className="text-xs text-muted-foreground">Awaiting contact</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualified</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.qualified}</div>
              <p className="text-xs text-muted-foreground">Ready for appointments</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgScore}</div>
              <p className="text-xs text-muted-foreground">Lead quality score</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search leads by name, email..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="contacted">Contacted</TabsTrigger>
                  <TabsTrigger value="qualified">Qualified</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Leads</CardTitle>
            <CardDescription>
              {filteredLeads.length} leads found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{`${lead.first_name} ${lead.last_name}`}</div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                        <div className="text-sm text-gray-500">{lead.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getSourceIcon(lead.lead_source)}</span>
                        <span className="text-sm">{lead.lead_source}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lead.lead_status)}>
                        {lead.lead_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.lead_score)}`}>
                        {lead.lead_score}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {lead.buyer_seller === 'buyer' && <span>🏠</span>}
                        {lead.buyer_seller === 'seller' && <span>🏡</span>}
                        {lead.buyer_seller === 'both' && <span>🔄</span>}
                        <span className="text-sm capitalize">{lead.buyer_seller}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {lead.budget_min && lead.budget_max ? (
                          `$${(lead.budget_min / 1000).toFixed(0)}K-${(lead.budget_max / 1000).toFixed(0)}K`
                        ) : lead.budget_max ? (
                          `Up to $${(lead.budget_max / 1000).toFixed(0)}K`
                        ) : (
                          'Not specified'
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {lead.last_contacted_at ? (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span>{new Date(lead.last_contacted_at).toLocaleDateString()}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Never</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Call
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Send SMS
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Appointment
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleAIEnrichment(lead.id)}
                            disabled={isLoading}
                          >
                            <Zap className="mr-2 h-4 w-4" />
                            AI Enrichment
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            Edit Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}