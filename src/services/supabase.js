import { createClient } from '@supabase/supabase-js/dist/module';

const supabaseUrl = 'https://hrqzbfxfwinkrvwrrbzu.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhycXpiZnhmd2lua3J2d3JyYnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzNDAwMzgsImV4cCI6MjAwNzkxNjAzOH0.IpvIERiaF9zIBQcnmbNVF3gNGzdWghRD5o0vWBJMwMQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
