import React from 'react'
import { about } from '../data'

const page = () => {
  return (
    <>
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Cancellation and Refund Policy</h1>
        <p className="text-sm text-gray-600 mb-4"><strong>Effective Date:</strong> 24 March 2025</p>
        
        <h2 className="text-2xl font-semibold mt-4">1. Cancellation Policy</h2>
        <p className="mb-4">Clients may request a cancellation of services under the following conditions:</p>
        <ul className="list-disc pl-6 mb-4">
            <li>Requests must be made within <strong>3 days</strong> of the service purchase.</li>
            <li>Cancellations after project commencement may be subject to partial refunds based on work completed.</li>
            <li>To initiate a cancellation, contact us at <strong><a href="mailto:harmanpreetsingh@programmer.net" className='underline text-blue-800'> harmanpreetsingh@programmer.net</a></strong> with your order details.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-4">2. Refund Policy</h2>
        <p className="mb-4">We provide refunds under the following circumstances:</p>
        <ul className="list-disc pl-6 mb-4">
            <li>Full refunds for cancellations made before work begins.</li>
            <li>Partial refunds for work already completed, depending on project progress.</li>
            <li>No refunds once the project is fully delivered and approved by the client.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-4">3. How to Request a Refund</h2>
        <p className="mb-4">To request a refund, please follow these steps:</p>
        <ul className="list-disc pl-6 mb-4">
            <li><strong>Email:</strong><a href={`mailto:${about.email}`} className='underline text-blue-800'> {about.email}</a> with your order details and the reason for the refund request.</li>
            <li>We will review your request and respond within <strong>1-3 business days</strong>.</li>
            <li>If approved, the refund will be processed to the original payment method.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-4">4. Refund Processing Time</h2>
        <p className="mb-4">Approved refunds will be processed within <strong>7-15 days</strong>, depending on your payment provider.</p>
        
        <h2 className="text-2xl font-semibold mt-4">5. Contact Information</h2>
        <p className="mb-2">If you have any questions about our policy, contact us at:</p>
        <ul className="list-disc pl-6 mb-4">
            <li><strong>Email:</strong><a href={`mailto:${about.email}`} className='underline text-blue-800'> {about.email}</a></li>
            <li><strong>Phone:</strong> {about.address.number}</li>
        </ul>
        
        <p className="font-semibold">By purchasing our services, you agree to this Cancellation and Refund Policy.</p>
    </div>
    <footer className="w-full bg-transparent text-gray-400 text-sm mt-10">
        <div className="border-t border-gray-300 py-4 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-center">
        <a href="/privacy-policy" className="hover:text-black">Privacy Policy</a>
        <a href="/terms-conditions" className="hover:text-black">Terms & Conditions</a>
        <a href="/cancellation-refund" className="hover:text-black">Cancellation & Refund</a>
        <a href="/shipping-delivery" className="hover:text-black">Shipping & Delivery</a>
        <a href="/contact-us" className="hover:text-black">Contact Us</a>
        </div>
    </footer>
    </>
  )
}

export default page