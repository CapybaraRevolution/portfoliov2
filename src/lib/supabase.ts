import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Comment {
  id: string
  item_id: string
  author: string
  content: string
  mood: string | null
  created_at: string
  client_id: string
}

export interface CommentInsert {
  item_id: string
  author: string
  content: string
  mood?: string | null
  client_id: string
}