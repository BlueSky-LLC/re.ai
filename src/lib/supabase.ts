import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
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
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          email: string
          phone?: string | null
          avatar_url?: string | null
          role?: 'agent' | 'admin' | 'team_member'
          subscription_tier?: 'starter' | 'professional' | 'team'
          ghl_user_id?: string | null
          ghl_api_key?: string | null
          brokerage_name?: string | null
          license_number?: string | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string
          phone?: string | null
          avatar_url?: string | null
          role?: 'agent' | 'admin' | 'team_member'
          subscription_tier?: 'starter' | 'professional' | 'team'
          ghl_user_id?: string | null
          ghl_api_key?: string | null
          brokerage_name?: string | null
          license_number?: string | null
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
        }
      }
      contacts: {
        Row: {
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
        Insert: {
          id: string
          user_id: string
          ghl_contact_id?: string | null
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          lead_source?: string | null
          lead_status?: 'new' | 'contacted' | 'qualified' | 'nurture' | 'dead' | 'client'
          lead_score?: number
          buyer_seller?: 'buyer' | 'seller' | 'both' | 'none'
          budget_min?: number | null
          budget_max?: number | null
          preferred_locations?: string[]
          notes?: string | null
          assigned_to?: string | null
          last_contacted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          ghl_contact_id?: string | null
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          lead_source?: string | null
          lead_status?: 'new' | 'contacted' | 'qualified' | 'nurture' | 'dead' | 'client'
          lead_score?: number
          buyer_seller?: 'buyer' | 'seller' | 'both' | 'none'
          budget_min?: number | null
          budget_max?: number | null
          preferred_locations?: string[]
          notes?: string | null
          assigned_to?: string | null
          last_contacted_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
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
        Insert: {
          id: string
          mls_number?: string | null
          user_id: string
          address: string
          city: string
          state: string
          zip: string
          latitude?: number | null
          longitude?: number | null
          price: number
          bedrooms?: number | null
          bathrooms?: number | null
          sqft?: number | null
          lot_size?: number | null
          property_type: string
          listing_date?: string | null
          status?: 'active' | 'pending' | 'sold' | 'expired' | 'off_market'
          photos_urls?: string[]
          description?: string | null
          year_built?: number | null
          created_at?: string
          updated_at?: string
          ghl_listing_id?: string | null
        }
        Update: {
          id?: string
          mls_number?: string | null
          user_id?: string
          address?: string
          city?: string
          state?: string
          zip?: string
          latitude?: number | null
          longitude?: number | null
          price?: number
          bedrooms?: number | null
          bathrooms?: number | null
          sqft?: number | null
          lot_size?: number | null
          property_type?: string
          listing_date?: string | null
          status?: 'active' | 'pending' | 'sold' | 'expired' | 'off_market'
          photos_urls?: string[]
          description?: string | null
          year_built?: number | null
          created_at?: string
          updated_at?: string
          ghl_listing_id?: string | null
        }
      }
      transactions: {
        Row: {
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
        Insert: {
          id: string
          contact_id: string
          property_id?: string | null
          user_id: string
          transaction_type: 'buyer' | 'seller' | 'both'
          status?: 'lead' | 'appointment_set' | 'showing_scheduled' | 'offer_made' | 'under_contract' | 'closed' | 'cancelled'
          commission_percentage?: number | null
          commission_amount?: number | null
          closing_date?: string | null
          offer_price?: number | null
          sale_price?: number | null
          listing_price?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          ghl_deal_id?: string | null
        }
        Update: {
          id?: string
          contact_id?: string
          property_id?: string | null
          user_id?: string
          transaction_type?: 'buyer' | 'seller' | 'both'
          status?: 'lead' | 'appointment_set' | 'showing_scheduled' | 'offer_made' | 'under_contract' | 'closed' | 'cancelled'
          commission_percentage?: number | null
          commission_amount?: number | null
          closing_date?: string | null
          offer_price?: number | null
          sale_price?: number | null
          listing_price?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
          ghl_deal_id?: string | null
        }
      }
      campaigns: {
        Row: {
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
        Insert: {
          id: string
          user_id: string
          name: string
          type: 'email' | 'sms' | 'social' | 'multichannel'
          status?: 'draft' | 'active' | 'paused' | 'completed'
          trigger_type: 'new_lead' | 'stage_change' | 'birthday' | 'anniversary' | 'manual'
          content: any
          settings: any
          analytics?: {
            sent_count: number
            open_count: number
            click_count: number
            reply_count: number
            conversion_count: number
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: 'email' | 'sms' | 'social' | 'multichannel'
          status?: 'draft' | 'active' | 'paused' | 'completed'
          trigger_type?: 'new_lead' | 'stage_change' | 'birthday' | 'anniversary' | 'manual'
          content?: any
          settings?: any
          analytics?: {
            sent_count: number
            open_count: number
            click_count: number
            reply_count: number
            conversion_count: number
          }
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
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
        Insert: {
          id: string
          user_id: string
          contact_id?: string | null
          transaction_id?: string | null
          type: 'call' | 'email' | 'sms' | 'meeting' | 'note' | 'task' | 'showing'
          subject?: string | null
          description?: string | null
          direction?: 'inbound' | 'outbound' | 'internal'
          duration_minutes?: number | null
          outcome?: string | null
          metadata?: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          contact_id?: string | null
          transaction_id?: string | null
          type?: 'call' | 'email' | 'sms' | 'meeting' | 'note' | 'task' | 'showing'
          subject?: string | null
          description?: string | null
          direction?: 'inbound' | 'outbound' | 'internal'
          duration_minutes?: number | null
          outcome?: string | null
          metadata?: any
          created_at?: string
        }
      }
    }
  }
}