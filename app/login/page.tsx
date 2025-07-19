'use client'

import { LoginForm } from '@/components/Auth/login-form'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <LoginForm isAdmin={true} />
        </div>
      </div>
    </div>
  )
}