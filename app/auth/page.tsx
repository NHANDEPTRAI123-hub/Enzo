'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Auth/button';
import { Card, CardContent } from '@/components/Auth/card';
import { Input } from '@/components/Auth/input';
import { Label } from '@/components/Auth/label';
import { supabase } from '@/lib/supabase';


export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Sign up with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // Insert user data into custom users table
        // Using upsert to handle cases where user might already exist
        const { error: insertError } = await supabase
          .from('users')
          .upsert({
            id: data.user.id,
            email: data.user.email,
            full_name: name,
            avatar_url: null,
          });

        if (insertError) {
          console.error('Error creating user record:', insertError);
          // If it's a 400 error, it might be a schema mismatch, but we can't fix it here easily.
          // We'll log it and continue, as the auth user is created.
          // However, for the user experience, we might want to show a warning or just proceed.
          // If the table doesn't exist or columns are wrong, this will fail.
        }

        setSuccess(true);
        // Redirect to home or dashboard after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (signInError) throw signInError;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred with Google sign up');
      setLoading(false);
    }
  };

  return (
    <>
   
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-[400px] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-black tracking-tight">
              Create an account
            </h3>
          </div>

          <Card className="border-none shadow-l bg-white/80 backdrop-blur-sm ring-1 ring-gray-100">
            <CardContent className="pt-6 pb-6 px-8">
              <form onSubmit={handleSignUp} className="space-y-5">
                {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 rounded-xl border border-red-100">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="p-3 text-sm text-green-500 bg-green-50 rounded-xl border border-green-100">
                    Account created successfully! Redirecting...
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-text-black font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 bg-white border-gray-200 focus:border-feature-card-purple-dark focus:ring-feature-card-purple-dark/20 rounded-xl transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-text-black font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 bg-white border-gray-200 focus:border-feature-card-purple-dark focus:ring-feature-card-purple-dark/20 rounded-xl transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-text-black font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                    className="h-12 bg-white border-gray-200 focus:border-feature-card-purple-dark focus:ring-feature-card-purple-dark/20 rounded-xl transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-feature-card-purple-dark hover:bg-feature-card-purple-dark/90 text-white rounded-xl font-medium transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:-translate-y-0.5"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Sign up'}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-text-gray font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-12 border-gray-200 hover:bg-gray-50 text-text-black rounded-xl font-medium transition-all hover:border-gray-300"
                onClick={handleGoogleSignUp}
                disabled={loading}
                type="button"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>

              <div className="mt-8 text-center text-sm">
                <span className="text-text-gray">
                  Already have an account?{' '}
                </span>
                <button
                  onClick={() => router.push('/auth/signin')}
                  className="text-feature-card-purple-dark font-semibold hover:underline transition-all"
                >
                  Sign in
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
