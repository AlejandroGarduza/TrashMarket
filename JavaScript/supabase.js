
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://ldljiqpbghfmvftbkqtf.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

const channel = supabase.channel('test')

channel.on('broadcast', { event: 'supa' }, (payload) => console.log(payload))
  .subscribe()