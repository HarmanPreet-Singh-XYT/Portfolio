import React from 'react'
import { about } from '../data'

const page = () => {
  return (
    <>
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-4"><strong>Effective Date:</strong> 24 March 2025</p>

        <h2 className="text-2xl font-semibold mt-4">1. Information We Collect</h2>
        <p className="mb-4">We may collect the following types of personal information from users:</p>
        <ul className="list-disc pl-6 mb-4">
            <li>Name, email address, and contact details</li>
            <li>Billing and payment information</li>
            <li>Website usage data (e.g., IP address, browser type)</li>
            <li>Any other details you voluntarily provide</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">2. How We Collect Information</h2>
        <p className="mb-4">We collect information through:</p>
        <ul className="list-disc pl-6 mb-4">
            <li>Forms filled out on our website</li>
            <li>Cookies and analytics tracking</li>
            <li>Direct communication via email or chat</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">3. How We Use Your Information</h2>
        <p className="mb-4">The collected information is used for:</p>
        <ul className="list-disc pl-6 mb-4">
            <li>Providing and improving our services</li>
            <li>Processing transactions and payments</li>
            <li>Communicating updates and responding to inquiries</li>
            <li>Ensuring website security and functionality</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">4. How We Keep Your Information Safe</h2>
        <p className="mb-4">We implement various security measures, including:</p>
        <ul className="list-disc pl-6 mb-4">
            <li>Encryption of sensitive data</li>
            <li>Secure access controls and authentication</li>
            <li>Regular security audits and updates</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">5. Sharing Information with Third Parties</h2>
        <p className="mb-4">We do not sell your personal information. However, we may share it with:</p>
        <ul className="list-disc pl-6 mb-4">
            <li>Trusted service providers for payment processing and website analytics</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with your consent</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">6. Contact Information</h2>
        <p className="mb-2">For privacy-related inquiries, contact us at:</p>
        <ul className="list-disc pl-6 mb-4">
            <li><strong>Email:</strong><a href={`mailto:${about.email}`} className='underline text-blue-800'> {about.email}</a></li>
            <li><strong>Phone:</strong> {about.address.number}</li>
        </ul>

        <p className="font-semibold">By using our services, you consent to this Privacy Policy.</p>
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