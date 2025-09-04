"use client"

import { useState } from "react"
import Link from "next/link"

const insuranceProducts = [
  {
    id: "comprehensive",
    name: "Comprehensive Coverage",
    price: "From RM 1,200/year",
    description: "Complete protection for your vehicle including theft, accidents, fire, and natural disasters.",
    features: [
      "Own Damage Coverage",
      "Third Party Liability",
      "Theft & Fire Protection",
      "Natural Disaster Coverage",
      "Windscreen Protection",
      "24/7 Roadside Assistance",
    ],
    popular: true,
    color: "orange",
  },
  {
    id: "third-party",
    name: "Third Party Insurance",
    price: "From RM 400/year",
    description: "Essential coverage required by law for all Malaysian drivers.",
    features: [
      "Third Party Liability",
      "Legal Requirement Compliance",
      "Bodily Injury Coverage",
      "Property Damage Protection",
      "Court Attendance Coverage",
    ],
    popular: false,
    color: "blue",
  },
  {
    id: "enhanced",
    name: "Enhanced Protection",
    price: "From RM 1,800/year",
    description: "Premium coverage with additional benefits and higher limits.",
    features: [
      "All Comprehensive Benefits",
      "Higher Coverage Limits",
      "Rental Car Coverage",
      "Personal Accident Coverage",
      "Legal Liability to Passengers",
      "Emergency Medical Expenses",
      "Flood Coverage Enhancement",
    ],
    popular: false,
    color: "purple",
  },
]

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState("comprehensive")

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
            <Link href="/products" className="text-orange-500">
              Products
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <section className="text-center py-20">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance">
              Choose Your
              <span className="text-orange-500"> Perfect Coverage</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto text-balance">
              Tailored insurance solutions designed for Malaysian drivers. From basic compliance to comprehensive
              protection.
            </p>
          </section>

          {/* Products Grid */}
          <section className="py-20">
            <div className="grid md:grid-cols-3 gap-8">
              {insuranceProducts.map((product) => (
                <div
                  key={product.id}
                  className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                    product.popular ? "border-orange-500 bg-orange-500/10" : "border-white/10 hover:border-white/20"
                  }`}
                  onClick={() => setSelectedProduct(product.id)}
                >
                  {product.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <div className="text-3xl font-bold text-orange-500 mb-4">{product.price}</div>
                    <p className="text-white/80 text-sm">{product.description}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                      product.popular
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    Get Quote Now
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose ZenDrive */}
          <section className="py-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Why Choose ZenDrive?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Quotes</h3>
                <p className="text-white/80">Get personalized quotes in under 60 seconds</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                <p className="text-white/80">Competitive rates with transparent pricing</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Trusted Coverage</h3>
                <p className="text-white/80">Backed by leading insurance providers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Digital First</h3>
                <p className="text-white/80">Manage everything from your mobile device</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Get Protected?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of Malaysian drivers who trust ZenDrive for their car insurance needs.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-500 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Start Your Quote Journey
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
