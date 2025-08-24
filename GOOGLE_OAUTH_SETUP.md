# Google OAuth Setup Guide

This application includes a "Sign in with Google" button that uses Supabase's OAuth integration. To enable this functionality, follow these steps:

## 1. Supabase Project Setup

1. Create or access your Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings > API
3. Copy your Project URL and Anon Public key
4. Create a `.env` file based on `.env.example` and add your credentials:

```bash
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 2. Google OAuth Configuration in Supabase

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Find "Google" in the list of providers
4. Enable Google authentication
5. Configure the Google OAuth settings:
   - **Client ID**: Get from Google Cloud Console
   - **Client Secret**: Get from Google Cloud Console

## 3. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `https://your-supabase-project.supabase.co/auth/v1/callback`
   - Copy the Client ID and Client Secret

## 4. Testing the Integration

1. Start the development server: `npm run dev`
2. Click the "Sign in with Google" button
3. You should be redirected to Google's OAuth consent screen
4. After successful authentication, you'll be redirected to the dashboard

## Features Included

- ✅ Google OAuth sign-in button
- ✅ Automatic redirect to dashboard after successful authentication
- ✅ Protected dashboard route (requires authentication)
- ✅ Sign out functionality
- ✅ Conditional navigation (shows Dashboard button when authenticated)
- ✅ Fallback to magic link email authentication

## Security Notes

- The `.env` file is already included in `.gitignore`
- Supabase handles all OAuth security and token management
- The dashboard route is protected by authentication state