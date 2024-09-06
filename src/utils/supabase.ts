import { environment } from '@/environments/envronment.dev'
import { createClient } from '@supabase/supabase-js'

export const db = createClient(environment.supabase.url, environment.supabase.anonKey);