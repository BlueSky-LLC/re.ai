export interface User {
  id: string
  first_name: string | null
  last_name: string | null
  email: string
  phone: string | null
  avatar_url: string | null
  role: 'agent' | 'admin' | 'team_member'
  subscription_tier: 'starter' | 'professional' | 'team'
  ghl_user_id: string | null
  ghl_api_key: string | null
  brokerage_name: string | null
  license_number: string | null
  created_at: string
  updated_at: string
  last_login_at: string | null
}

export interface Contact {
  id: string
  user_id: string
  ghl_contact_id: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: string | null
  lead_source: string | null
  lead_status: 'new' | 'contacted' | 'qualified' | 'nurture' | 'dead' | 'client'
  lead_score: number
  buyer_seller: 'buyer' | 'seller' | 'both' | 'none'
  budget_min: number | null
  budget_max: number | null
  preferred_locations: string[]
  notes: string | null
  assigned_to: string | null
  last_contacted_at: string | null
  created_at: string
  updated_at: string
}

export interface Property {
  id: string
  mls_number: string | null
  user_id: string
  address: string
  city: string
  state: string
  zip: string
  latitude: number | null
  longitude: number | null
  price: number
  bedrooms: number | null
  bathrooms: number | null
  sqft: number | null
  lot_size: number | null
  property_type: string
  listing_date: string | null
  status: 'active' | 'pending' | 'sold' | 'expired' | 'off_market'
  photos_urls: string[]
  description: string | null
  year_built: number | null
  created_at: string
  updated_at: string
  ghl_listing_id: string | null
}

export interface Transaction {
  id: string
  contact_id: string
  property_id: string | null
  user_id: string
  transaction_type: 'buyer' | 'seller' | 'both'
  status: 'lead' | 'appointment_set' | 'showing_scheduled' | 'offer_made' | 'under_contract' | 'closed' | 'cancelled'
  commission_percentage: number | null
  commission_amount: number | null
  closing_date: string | null
  offer_price: number | null
  sale_price: number | null
  listing_price: number | null
  notes: string | null
  created_at: string
  updated_at: string
  ghl_deal_id: string | null
}

export interface Campaign {
  id: string
  user_id: string
  name: string
  type: 'email' | 'sms' | 'social' | 'multichannel'
  status: 'draft' | 'active' | 'paused' | 'completed'
  trigger_type: 'new_lead' | 'stage_change' | 'birthday' | 'anniversary' | 'manual'
  content: any
  settings: any
  analytics: {
    sent_count: number
    open_count: number
    click_count: number
    reply_count: number
    conversion_count: number
  }
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  user_id: string
  contact_id: string | null
  transaction_id: string | null
  type: 'call' | 'email' | 'sms' | 'meeting' | 'note' | 'task' | 'showing'
  subject: string | null
  description: string | null
  direction: 'inbound' | 'outbound' | 'internal'
  duration_minutes: number | null
  outcome: string | null
  metadata: any
  created_at: string
}

export interface AIResponse {
  suggestions: string[]
  confidence: number
  context_insights: string[]
  lead_score_adjustment?: number
  recommended_actions?: string[]
}

export interface LeadScoring {
  behavior_score: number
  demographic_score: number
  engagement_score: number
  conversion_probability: number
  recommended_priority: 'high' | 'medium' | 'low'
  reasoning: string[]
}

export interface MarketInsight {
  type: 'trend' | 'opportunity' | 'alert' | 'recommendation'
  title: string
  description: string
  data: any
  urgency: 'low' | 'medium' | 'high'
  actionable: boolean
  estimated_impact?: string
}

export interface DashboardMetrics {
  total_leads: number
  qualified_leads: number
  active_transactions: number
  commission_pipeline: number
  response_time_avg: number
  conversion_rate: number
  monthly_gci: number
  goal_progress: number
}

export interface CommissionForecast {
  period: '30_days' | '60_days' | '90_days'
  projected_gci: number
  probability_weighted: number
  confidence: number
  factors: string[]
}

export interface ConversationMessage {
  id: string
  contact_id: string
  type: 'email' | 'sms' | 'call'
  direction: 'inbound' | 'outbound'
  content: string
  timestamp: string
  ai_generated?: boolean
  sentiment?: 'positive' | 'neutral' | 'negative'
}

export interface CMAReport {
  id: string
  property_id: string
  subject_property: Property
  comparable_properties: Property[]
  valuation_adjustments: any
  recommended_price_range: {
    min: number
    max: number
    recommended: number
  }
  market_analysis: {
    days_on_market_avg: number
    price_per_sqft_avg: number
    sold_count_90d: number
    active_inventory: number
    absorption_rate: number
  }
  generated_at: string
  pdf_url: string
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  variables: string[]
  category: 'lead_nurture' | 'transaction_updates' | 'marketing' | 'soi'
  tags: string[]
  usage_count: number
  open_rate: number
  click_rate: number
}

export interface MLSListing {
  mls_id: string
  address: string
  city: string
  state: string
  zip: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  lot_size: number
  property_type: string
  year_built: number
  listing_date: string
  status: 'active' | 'pending' | 'sold'
  days_on_market: number
  price_per_sqft: number
  photos: string[]
  description: string
  agent: {
    name: string
    phone: string
    email: string
    brokerage: string
  }
  coordinates: {
    lat: number
    lng: number
  }
}

export interface NotificationPreference {
  type: 'email' | 'sms' | 'push' | 'in_app'
  category: 'lead' | 'transaction' | 'marketing' | 'system'
  enabled: boolean
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly'
}