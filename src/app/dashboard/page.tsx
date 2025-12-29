'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
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
  TrendingUp, 
  Users, 
  Building, 
  FileText, 
  Phone, 
  Mail, 
  Target,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Zap
} from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'

interface DashboardMetrics {
  total_leads: number
  qualified_leads: number
  active_transactions: number
  commission_pipeline: number
  response_time_avg: number
  conversion_rate: number
  monthly_gci: number
  goal_progress: number
}

interface RecentLead {
  id: string
  name: string
  email: string
  lead_source: string
  lead_score: number
  status: 'new' | 'contacted' | 'qualified'
  created_at: string
}

interface UpcomingTask {
  id: string
  title: string
  type: 'call' | 'email' | 'meeting' | 'showing'
  due_date: string
  contact_name: string
  priority: 'high' | 'medium' | 'low'
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    total_leads: 127,
    qualified_leads: 43,
    active_transactions: 18,
    commission_pipeline: 284500,
    response_time_avg: 4.2,
    conversion_rate: 12.5,
    monthly_gci: 45800,
    goal_progress: 68
  })

  const [recentLeads] = useState<RecentLead[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      lead_source: 'Zillow',
      lead_score: 85,
      status: 'qualified',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      lead_source: 'Facebook',
      lead_score: 72,
      status: 'contacted',
      created_at: '2024-01-15T09:15:00Z'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      lead_source: 'Website',
      lead_score: 91,
      status: 'new',
      created_at: '2024-01-15T08:45:00Z'
    }
  ])

  const [upcomingTasks] = useState<UpcomingTask[]>([
    {
      id: '1',
      title: 'Follow-up call with Sarah Johnson',
      type: 'call',
      due_date: '2024-01-15T14:00:00Z',
      contact_name: 'Sarah Johnson',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Property showing for Mike Chen',
      type: 'showing',
      due_date: '2024-01-15T16:30:00Z',
      contact_name: 'Mike Chen',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Send listing presentation to Emily',
      type: 'email',
      due_date: '2024-01-15T18:00:00Z',
      contact_name: 'Emily Rodriguez',
      priority: 'high'
    }
  ])

  const MetricCard = ({ 
    title, 
    value, 
    change, 
    changeType, 
    icon: Icon, 
    description 
  }: {
    title: string
    value: string | number
    change?: number
    changeType?: 'increase' | 'decrease'
    icon: any
    description: string
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center text-xs text-muted-foreground">
            {changeType === 'increase' ? (
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
            )}
            <span className={changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>
              {change}%
            </span>
            <span className="ml-1">from last month</span>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone
      case 'email': return Mail
      case 'meeting': return Calendar
      case 'showing': return Building
      default: return Target
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'qualified': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your real estate business overview.</p>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
            <Button variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              AI Insights
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Leads"
            value={metrics.total_leads}
            change={12}
            changeType="increase"
            icon={Users}
            description="Leads in your pipeline"
          />
          <MetricCard
            title="Active Transactions"
            value={metrics.active_transactions}
            change={8}
            changeType="increase"
            icon={FileText}
            description="Deals in progress"
          />
          <MetricCard
            title="Commission Pipeline"
            value={`$${(metrics.commission_pipeline / 1000).toFixed(0)}K`}
            change={15}
            changeType="increase"
            icon={DollarSign}
            description="Potential commission"
          />
          <MetricCard
            title="Monthly GCI"
            value={`$${(metrics.monthly_gci / 1000).toFixed(0)}K`}
            change={-5}
            changeType="decrease"
            icon={TrendingUp}
            description="Gross commission income"
          />
        </div>

        {/* Progress towards goals */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Goal Progress</CardTitle>
            <CardDescription>Track your progress towards monthly targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>GCI Goal: $67,500</span>
                <span>{metrics.goal_progress}% Complete</span>
              </div>
              <Progress value={metrics.goal_progress} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{metrics.qualified_leads}</div>
                <div className="text-sm text-gray-600">Qualified Leads</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{metrics.conversion_rate}%</div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{metrics.response_time_avg}min</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="leads" className="space-y-4">
          <TabsList>
            <TabsTrigger value="leads">Recent Leads</TabsTrigger>
            <TabsTrigger value="tasks">Upcoming Tasks</TabsTrigger>
            <TabsTrigger value="activity">Activity Feed</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>New leads captured in the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-sm text-gray-500">{lead.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{lead.lead_source}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm font-medium">{lead.lead_score}</div>
                            <div className={`h-2 w-2 rounded-full ${
                              lead.lead_score >= 80 ? 'bg-green-500' : 
                              lead.lead_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Contact
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your upcoming tasks and appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTasks.map((task) => {
                  const TaskIcon = getTaskIcon(task.type)
                  return (
                    <div key={task.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        <TaskIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          with {task.contact_name} • {new Date(task.due_date).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority)}`} />
                        <Button variant="outline" size="sm">
                          Complete
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your CRM</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Sarah Johnson</span> scheduled a showing for tomorrow
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        New lead from <span className="font-medium">Zillow</span> - High priority
                      </p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        Deal with <span className="font-medium">Mike Chen</span> moved to "Under Contract"
                      </p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}