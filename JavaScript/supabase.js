import { createClient } from './node_modules/@supabase/supabase-js'

const supabaseUrl = 'https://ldljiqpbghfmvftbkqtf.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

console.log('supabase')