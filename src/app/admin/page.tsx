'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useAdmin } from '@/contexts/AdminContext'

export default function AdminPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { isAdmin, login, logout } = useAdmin()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800))

    if (login(email, password)) {
      setEmail('')
      setPassword('')
      setError('')
      // Show success message briefly, then redirect
      setTimeout(() => {
        router.push('/process')
      }, 1000)
    } else {
      setError('Invalid email or password')
      setPassword('')
    }
    
    setIsLoading(false)
  }

  const handleLogout = () => {
    logout()
    setError('')
    setEmail('')
    setPassword('')
  }

  const goBack = () => {
    router.push('/')
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-zinc-900 py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-zinc-200 dark:border-zinc-800 ring-1 ring-zinc-900/5 dark:ring-white/10">
            <div className="text-center mb-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20">
                <ShieldCheckIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Admin Dashboard
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Logged in as {localStorage.getItem('adminEmail')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800/50 p-4">
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                      Admin session active
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                      Comment moderation enabled
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push('/process')}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
                >
                  Manage Comments
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-200 shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={goBack}
                className="w-full flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20">
            <ShieldCheckIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Admin Access
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to manage comments
          </p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 py-8 px-6 shadow-xl rounded-2xl border border-zinc-200 dark:border-zinc-800 ring-1 ring-zinc-900/5 dark:ring-white/10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-lg border-0 px-3 py-2 text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-emerald-600 dark:focus:ring-emerald-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-lg border-0 px-3 py-2 text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-emerald-600 dark:focus:ring-emerald-500 sm:text-sm sm:leading-6"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-3">
                <div className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600 text-emerald-600 focus:ring-emerald-600 dark:focus:ring-emerald-500 bg-white dark:bg-zinc-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-700 dark:text-zinc-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button 
                  type="button"
                  onClick={goBack}
                  className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Back to site
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email.trim() || !password.trim()}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
              🤫 Hidden admin portal
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}