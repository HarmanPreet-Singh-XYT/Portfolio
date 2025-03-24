import React from 'react'
import { about } from '../data'

const page = () => {
  return (
    <>
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Shipping and Delivery Policy</h1>
        <p className="text-sm text-gray-600 mb-4"><strong>Effective Date:</strong> 24 March 2025</p>

        <h2 className="text-2xl font-semibold mt-4">1. Project Processing & Delivery Time</h2>
        <p className="mb-4">The timeline for delivering software projects depends on the project scope. Estimated delivery times will be communicated before the project begins. Clients can expect:</p>
        <ul className="list-disc pl-6 mb-4">
            <li>Small projects: <strong>1-2 weeks</strong></li>
            <li>Medium projects: <strong>2-4 weeks</strong></li>
            <li>Large or custom projects: <strong>1+ months</strong></li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">2. Delivery Methods</h2>
        <p className="mb-4">Completed projects will be delivered through one or more of the following methods:</p>
        <ul className="list-disc pl-6 mb-4">
            <li>Secure email with download links</li>
            <li>Private GitHub, GitLab, or Bitbucket repository</li>
            <li>Cloud storage (Google Drive, Dropbox, etc.)</li>
            <li>Direct server deployment (if applicable)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">3. Ownership & Rights</h2>
        <p className="mb-4">Upon full payment, the software developed is **fully owned by the client**. This includes:</p>
        <ul className="list-disc pl-6 mb-4">
            <li>Complete source code and documentation</li>
            <li>Full rights to modify, distribute, or resell the software</li>
            <li>No restrictions on usage unless otherwise agreed upon</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">4. International Clients</h2>
        <p className="mb-4">We provide software development services to clients globally. However, clients are responsible for ensuring compliance with their local regulations regarding software usage and licensing.</p>

        <h2 className="text-2xl font-semibold mt-4">5. Additional Fees</h2>
        <p className="mb-4">Standard project delivery is included in the agreed pricing. Additional fees may apply for:</p>
        <ul className="list-disc pl-6 mb-4">
            <li>Expedited delivery requests</li>
            <li>Additional revisions beyond the agreed scope</li>
            <li>Third-party services or integrations requiring additional licensing</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">6. Contact Information</h2>
        <p className="mb-2">For questions about this policy, contact:</p>
        <ul className="list-disc pl-6 mb-4">
            <li><strong>Email:</strong><a href={`mailto:${about.email}`} className='underline text-blue-800'> {about.email}</a></li>
            <li><strong>Phone:</strong> {about.address.number}</li>
        </ul>

        <p className="font-semibold">By using our services, you acknowledge and agree to this Shipping and Delivery Policy.</p>
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