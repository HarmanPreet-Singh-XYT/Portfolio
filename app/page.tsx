import Home from '@/components/Home'
import React, { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Harmanpreet Singh | Full Stack Developer & Software Engineer',
  description: 'AI-native Full-Stack Engineer based in Canada. Google Winner at Hack Canada 2026. Production apps used by 1,000+ people. Specializing in React, Next.js, Node.js, Flutter, and TypeScript.',
  alternates: {
    canonical: 'https://harmanita.com',
  },
  openGraph: {
    url: 'https://harmanita.com',
    title: 'Harmanpreet Singh | Full Stack Developer & Software Engineer',
    description: 'AI-native Full-Stack Engineer based in Canada. Google Winner at Hack Canada 2026. Production apps used by 1,000+ people.',
  },
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  )
}