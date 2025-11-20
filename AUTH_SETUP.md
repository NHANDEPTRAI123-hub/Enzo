# Authentication Setup Guide

## Overview
This project uses **Supabase** for authentication and database management with Next.js 14+ App Router.

## Features
- ✅ Email/Password Sign Up
- ✅ Email/Password Sign In
- ✅ Google OAuth Sign In
- ✅ Full Name Collection
- ✅ TypeScript Support
- ✅ Clean UI with shadcn/ui components
- ✅ Error Handling
- ✅ Loading States

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Configuration

#### Enable Email Authentication
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Providers**
3. Enable **Email** provider
4. Configure email templates (optional)

#### Enable Google OAuth (Optional)
1. Go to **Authentication** → **Providers**
2. Enable **Google** provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Add authorized redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)

#### User Metadata
The sign-up process stores the user's full name in `user_metadata.full_name`.

### 3. Database Schema
Your existing `users` table structure:

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);
```

**Important**: The app handles user creation automatically. You need to:

1. **Link to Supabase Auth** - Update the table to reference auth.users:
```sql
-- Add foreign key to link with Supabase Auth
ALTER TABLE users 
  DROP CONSTRAINT IF EXISTS users_pkey,
  ADD PRIMARY KEY (id),
  ADD CONSTRAINT users_id_fkey 
    FOREIGN KEY (id) 
    REFERENCES auth.users(id) 
    ON DELETE CASCADE;

-- Remove password_hash column (Supabase Auth handles passwords)
ALTER TABLE users DROP COLUMN IF EXISTS password_hash;
```

2. **Enable Row Level Security (RLS)**:
```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own data
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Allow inserts during signup
CREATE POLICY "Enable insert for authenticated users"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);
```

3. **Optional: Auto-create user record with trigger**:
```sql
-- Function to automatically create user record
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### 4. Routes

- **Sign Up**: `/auth` or `/auth/page.tsx`
- **Sign In**: `/auth/signin`
- **Home**: `/` (redirect after successful auth)

### 5. Components Structure

```
components/
└── Auth/
    ├── button.tsx      # Reusable button component
    ├── card.tsx        # Card container components
    ├── input.tsx       # Input field component
    └── label.tsx       # Label component

lib/
├── supabase.ts        # Supabase client initialization
└── utils.ts           # Utility functions (cn for classnames)
```

## Usage Examples

### Check Authentication Status
```typescript
import { supabase } from '@/lib/supabase';

const { data: { user } } = await supabase.auth.getUser();
```

### Sign Out
```typescript
await supabase.auth.signOut();
```

### Protected Routes
Create a middleware or use React hooks to protect routes:

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return res;
}
```

## Security Best Practices

1. **Never commit `.env` or `.env.local`** files
2. **Use Row Level Security (RLS)** in Supabase
3. **Validate user input** on both client and server
4. **Use HTTPS** in production
5. **Enable email confirmation** for production
6. **Set up proper CORS** policies in Supabase

## Troubleshooting

### "Invalid API key" Error
- Verify your environment variables are correct
- Restart your development server after changing `.env.local`

### Google OAuth Not Working
- Check redirect URLs in Google Console
- Verify Google provider is enabled in Supabase
- Ensure credentials are correct

### Email Not Sending
- Check Supabase email settings
- For production, configure a custom SMTP provider

## Next Steps

1. ✅ Set up email confirmation
2. ✅ Add password reset functionality
3. ✅ Create user profile pages
4. ✅ Add user dashboard
5. ✅ Implement role-based access control

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
