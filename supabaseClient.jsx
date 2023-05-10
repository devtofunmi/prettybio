import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vnmytpmtbwlzknlrkpvc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZubXl0cG10YndsemtubHJrcHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM1MDEzNzYsImV4cCI6MTk5OTA3NzM3Nn0.byde3de8UAbe3nM07tl7RR-ASmQc1bUsnlEpwwILWYA";
export const supabase = createClient(supabaseUrl, supabaseKey);
