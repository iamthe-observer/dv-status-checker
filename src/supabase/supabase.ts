import { createClient } from '@supabase/supabase-js'

// 2023 database
// const supabase = createClient(
//   'https://bwisulfnifauhpelglgh.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aXN1bGZuaWZhdWhwZWxnbGdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0ODQ4MDQ3MSwiZXhwIjoxOTY0MDU2NDcxfQ.I1zMWSVpXmdeehMNwKh3yGC04gTKHn_ajoXK035rtoE'
// )

// 2024 database
const supabase = createClient(
  'https://wepsovihexcnzicbdmst.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcHNvdmloZXhjbnppY2JkbXN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4ODYyMzkwNSwiZXhwIjoyMDA0MTk5OTA1fQ.dYkR2L5lR8JkdlJJjoX2AyFBFUTKcmp5pUxrxXSfqG0'
)

export default supabase
