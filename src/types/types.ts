import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from './supabase'

import { getEnv } from '@/utils/env'

let _supabase: SupabaseClient<Database> | null = null

export const supabase = (() => {
  if (!_supabase) {
    _supabase = createClient<Database>(
      getEnv('NEXT_PUBLIC_SUPABASE_URL') || 'https://placeholder.supabase.co',
      getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') || 'placeholder'
    )
  }
  return _supabase
})()

export type Participant = Database['public']['Tables']['participants']['Row']

export type Choice = Database['public']['Tables']['choices']['Row']

export type Question = Database['public']['Tables']['questions']['Row'] & {
  choices: Choice[]
}

export type QuizSet = Database['public']['Tables']['quiz_sets']['Row'] & {
  questions: Question[]
}

export type Answer = Database['public']['Tables']['answers']['Row']

export type Game = Database['public']['Tables']['games']['Row']

export type GameResult = Database['public']['Views']['game_results']['Row']
