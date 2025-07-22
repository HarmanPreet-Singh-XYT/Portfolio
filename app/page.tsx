'use client'
import Home from '@/components/Home'
import React, { Suspense, useEffect } from 'react'
import { setCookies } from './api/set-tokens/cookies'

const page = () => {
  // useEffect(() => {
  //   const hash = window.location.hash.substring(1) // remove '#'
  //   const params = new URLSearchParams(hash)
  //   const access_token = params.get('access_token');
  //   const refresh_token = params.get('refresh_token');
  //   (access_token && refresh_token) && (access_token.length > 5 && refresh_token.length > 5) && setCookies(access_token,refresh_token);
  // }, [])
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Home/>
      {/* <footer className="w-full bg-black text-gray-400 text-sm">
        <div className="border-t border-gray-600 py-4 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-center">
          <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
          <a href="/terms-conditions" className="hover:text-white">Terms & Conditions</a>
          <a href="/cancellation-refund" className="hover:text-white">Cancellation & Refund</a>
          <a href="/shipping-delivery" className="hover:text-white">Shipping & Delivery</a>
          <a href="/contact-us" className="hover:text-white">Contact Us</a>
        </div>
      </footer> */}
    </Suspense>
  )
}

export default page