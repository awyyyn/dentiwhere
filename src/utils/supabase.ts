import { environment } from '@/environments/envronment.dev'
import { Database } from '@/types/db.types';
import { createClient } from '@supabase/supabase-js'

export const db = createClient<Database>(environment.supabase.url, environment.supabase.anonKey);