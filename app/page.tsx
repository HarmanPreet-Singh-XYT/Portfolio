import Home from '@/components/Home'
import React from 'react'
import { Analytics } from "@vercel/analytics/react"
const page = () => {
  return (
    <>
      <Analytics />
      <Home/>
    </>
  )
}

export default page