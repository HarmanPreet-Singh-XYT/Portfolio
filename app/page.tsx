import Home from '@/components/Home'
import React from 'react'

const page = () => {
  return (
    <>
    <Home/>
      <footer className="w-full bg-black text-gray-400 text-sm">
        <div className="border-t border-gray-600 py-4 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-center">
          <a href="/privacy-policy" className="hover:text-white">Privacy Policy</a>
          <a href="/terms-conditions" className="hover:text-white">Terms & Conditions</a>
          <a href="/cancellation-refund" className="hover:text-white">Cancellation & Refund</a>
          <a href="/shipping-delivery" className="hover:text-white">Shipping & Delivery</a>
          <a href="/contact-us" className="hover:text-white">Contact Us</a>
        </div>
      </footer>
    </>
  )
}

export default page