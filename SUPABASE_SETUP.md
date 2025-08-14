# Supabase Database Setup Guide

## Quick Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose organization and enter project details:
   - **Name**: Portfolio Comments
   - **Database Password**: Generate a secure password (save it!)
   - **Region**: Choose closest to your users
4. Wait for project to be created (~2 minutes)

### 2. Get API Keys
1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy these two values:
   - **Project URL** (starts with https://...)
   - **anon/public key** (long string starting with "eyJ...")

### 3. Update Environment Variables
Replace the placeholder values in `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_actual_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

### 4. Create Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click **RUN** to execute the schema

## ✅ Verification

After setup, the system will:
- ✅ **Automatically detect** Supabase configuration
- ✅ **Store comments persistently** in PostgreSQL database  
- ✅ **Maintain all security features** (captcha, profanity filter, rate limiting)
- ✅ **Fall back to in-memory** if Supabase is not configured

## Current Status

**Without Supabase setup:**
- Comments stored in server memory (lost on restart)
- All security features work normally
- Perfect for development/testing

**With Supabase setup:**
- Comments stored permanently in database
- Survives server restarts and deployments
- Ready for production use
- Scalable and backed up automatically

## Database Schema

The `comments` table includes:
- `id` (UUID, primary key)
- `item_id` (text, identifies which component/item)
- `author` (text, max 50 chars)
- `content` (text, max 2000 chars)  
- `mood` (text, optional: excited/loved/happy/sad/thumbsy)
- `client_id` (text, for moderation/rate limiting)
- `created_at` (timestamp)

## Security Features

- **Row Level Security (RLS)** enabled
- **Input validation** with length limits
- **Proper indexing** for performance
- **Client fingerprinting** for moderation

## Production Notes

- **Free tier**: 500MB database, 2GB bandwidth/month
- **Automatic backups** included
- **Real-time subscriptions** available (could add live comment updates)
- **Built-in auth system** available for future user accounts

The system is designed to work seamlessly with or without Supabase - just add the environment variables when you're ready!