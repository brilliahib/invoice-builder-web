#!/usr/bin/env node
/**
 * supabase-keepalive.mjs
 *
 * Sends a lightweight query to the Supabase project to prevent it from
 * being paused due to inactivity (free tier pauses after 1 week).
 *
 * Intended to be run on a schedule via GitHub Actions cron.
 * See: .github/workflows/supabase-keepalive.yml
 *
 * Run manually: node scripts/supabase-keepalive.mjs
 *
 * Required env vars:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    '❌ Missing required env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
  );
  process.exit(1);
}

async function keepAlive() {
  const url = `${SUPABASE_URL}/rest/v1/companies?select=id&limit=1`;

  console.log(`\n🔔 Sending keep-alive ping to Supabase...`);
  console.log(`   URL: ${SUPABASE_URL}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log(`✅ Keep-alive ping successful. Status: ${response.status}\n`);
    } else {
      const body = await response.text();
      console.error(`❌ Keep-alive ping failed. Status: ${response.status}`);
      console.error(`   Response: ${body}\n`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`❌ Keep-alive ping error:`, err);
    process.exit(1);
  }
}

keepAlive();
