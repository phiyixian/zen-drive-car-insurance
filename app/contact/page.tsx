"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Thank you for your message! We will get back to you within 24 hours.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">Z</span>
            </div>
            <span className="text-white font-bold text-xl">ZenDrive</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/products" className="text-white/80 hover:text-white transition-colors">
              Products
            </Link>
            <Link href="/contact" className="text-orange-500">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <section className="text-center py-20">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance">
              Get In
              <span className="text-orange-500"> Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto text-balance">
              Have questions about our insurance products? Need help with your policy? We're here to assist you every
              step of the way.
            </p>
          </section>

          {/* Contact Methods */}
          <section className="grid md:grid-cols-2 gap-12 py-20">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                    <p className="text-white/80 mb-1">+60 3-1234 5678</p>
                    <p className="text-white/60 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-white/60 text-sm">Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                    <p className="text-white/80 mb-1">support@zendrive.com.my</p>
                    <p className="text-white/60 text-sm">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Office Address</h3>
                    <p className="text-white/80">
                      Level 10, Menara ZenDrive
                      <br />
                      Jalan Bukit Bintang
                      <br />
                      55100 Kuala Lumpur
                      <br />
                      Malaysia
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <span className="text-white font-bold">f</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                  >
                    <span className="text-white font-bold">📷</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                  >
                    <span className="text-white font-bold">🐦</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                  >
                    <span className="text-white font-bold">in</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="quote">Get a Quote</option>
                    <option value="claim">File a Claim</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    placeholder="Enter your message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="py-20">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4 text-red-400">Emergency Claims Hotline</h2>
              <p className="text-xl mb-6">Need to file an urgent claim? Call our 24/7 emergency hotline:</p>
              <a
                href="tel:+60312345678"
                className="text-3xl font-bold text-red-400 hover:text-red-300 transition-colors"
              >
                +60 3-1234 5678
              </a>
              <p className="text-white/60 mt-4">Available 24 hours a day, 7 days a week</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
