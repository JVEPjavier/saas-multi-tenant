# Environment Variables Setup

Create a `.env.local` file in the root directory with these variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Auth.js Configuration
# Generate a secret: openssl rand -base64 32
AUTH_SECRET=change-this-to-a-random-secret-in-production

# App Configuration
NEXT_PUBLIC_APP_NAME=Booking App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Quick Setup

```bash
# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
echo "AUTH_SECRET=your-secret-key-here" >> .env.local
echo "NEXT_PUBLIC_APP_NAME=Booking App" >> .env.local
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env.local
```
