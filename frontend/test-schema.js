import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env manually
const envPath = path.resolve(process.cwd(), '.env');
let envData = '';
try {
  envData = fs.readFileSync(envPath, 'utf8');
} catch (e) {
  console.log('No .env file found');
}

const envVars = {};
envData.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim().replace(/['"]/g, '');
  }
});

const supabaseUrl = envVars['VITE_SUPABASE_URL'] || '';
const supabaseKey = envVars['VITE_SUPABASE_ANON_KEY'] || envVars['VITE_SUPABASE_PUBLISHABLE_KEY'] || '';

if (!supabaseUrl || !supabaseKey) {
  console.log("Missing credentials.", supabaseUrl, supabaseKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Testing supabase connection...");
  const { data, error } = await supabase.from('community_posts').select('*').limit(1);
  if (error) {
    console.log("Error querying community_posts:", error);
  } else {
    console.log("Query successful. Data:", data);
    // Let's also check table columns by causing an intentional error or just looking at the data
  }
}

test();
