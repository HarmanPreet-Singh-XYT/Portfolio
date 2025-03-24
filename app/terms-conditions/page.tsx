import React from 'react'
import { about } from '../data'

const page = () => {
  return (
    <>
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-sm text-gray-600 mb-4"><strong>Effective Date:</strong> 24 March 2025</p>
            
            <h2 className="text-2xl font-semibold mt-4">1. Introduction</h2>
            <p className="mb-4">Welcome to <strong>harman.vercel.app</strong> ("we," "our," or "us"). By accessing or using our website and services, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our services.</p>
            
            <h2 className="text-2xl font-semibold mt-4">2. Contact Information</h2>
            <p className="mb-2">For any inquiries regarding these Terms and Conditions, you can contact us at:</p>
            <ul className="list-disc pl-6 mb-4">
                <li><strong>Email:</strong><a href={`mailto:${about.email}`} className='underline text-blue-800'> {about.email}</a></li>
                <li><strong>Phone:</strong> {about.address.number}</li>
                <li><strong>Address:</strong> {about.address.address1}, {about.address.address2}</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-4">3. Limitation of Liability and Disclaimer of Warranties</h2>
            <ul className="list-disc pl-6 mb-4">
                <li>We provide our services "as is" and "as available" without any warranties, express or implied.</li>
                <li>We are not responsible for any direct, indirect, incidental, or consequential damages arising from the use of our website or services.</li>
                <li>We do not guarantee uninterrupted, secure, or error-free service.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-4">4. Rules of Conduct</h2>
            <p className="mb-2">Users must:</p>
            <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate and up-to-date information when required.</li>
                <li>Respect intellectual property rights and avoid unauthorized use of our content.</li>
                <li>Not engage in illegal, abusive, or harmful activities while using our services.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-4">5. User Restrictions</h2>
            <p className="mb-2">Users are prohibited from:</p>
            <ul className="list-disc pl-6 mb-4">
                <li>Copying, distributing, or modifying any part of our website or services without permission.</li>
                <li>Using automated systems to extract data (e.g., scraping, bots).</li>
                <li>Attempting to gain unauthorized access to our systems or interfering with website operations.</li>
                <li>Engaging in fraudulent, misleading, or deceptive activities.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-4">6. Changes to the Terms</h2>
            <p className="mb-4">We reserve the right to update these Terms at any time. Changes will be posted on this page, and continued use of our services constitutes acceptance of the revised Terms.</p>
            
            <h2 className="text-2xl font-semibold mt-4">7. Governing Law</h2>
            <p className="mb-4">These Terms and Conditions are governed by the laws of India, and any disputes will be resolved in the applicable jurisdiction.</p>
            
            <p className="font-semibold">By using our services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>
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