#!/bin/sh

# Create the public directory if it doesn't exist (it should, but safety first)
mkdir -p /app/public

# Generate env-config.js
cat <<EOF > /app/public/env-config.js
window.__ENV = {
  NEXT_PUBLIC_BASE_URL: "${NEXT_PUBLIC_BASE_URL}",
  NEXT_PUBLIC_SUPABASE_URL: "${NEXT_PUBLIC_SUPABASE_URL}",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "${NEXT_PUBLIC_SUPABASE_ANON_KEY}",
};
EOF
