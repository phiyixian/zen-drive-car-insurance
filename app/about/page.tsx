"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"

function Car3D() {
  return (
    <mesh position={[0, -0.5, 0]} rotation={[0, Math.PI / 6, 0]}>
      <boxGeometry args={[2, 0.8, 4]} />
      <meshStandardMaterial color="#e5e7eb" />
      {/* Car details */}
      <mesh position={[0, 0.3, 1.5]}>
        <boxGeometry args={[1.8, 0.6, 0.8]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>
      {/* Wheels */}
      {[-0.8, 0.8].map((x, i) =>
        [1.2, -1.2].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, -0.4, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
        )),
      )}
    </mesh>
  )
}

export default function AboutPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
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
            <Link href="/about" className="text-orange-500">
              About Us
            </Link>
            <Link href="/products" className="text-white/80 hover:text-white transition-colors">
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
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <section className="text-center py-20">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance">
              Meet Your Smart
              <span className="text-orange-500"> Insurance Agent</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto text-balance">
              ZenDrive revolutionizes car insurance with AI-powered recommendations, instant quotes, and personalized
              coverage that adapts to your driving lifestyle.
            </p>
          </section>

          {/* 3D Car Section */}
          <section className="grid md:grid-cols-2 gap-12 items-center py-20">
            <div>
              <h2 className="text-4xl font-bold mb-6">Powered by Innovation</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">AI</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Smart Risk Assessment</h3>
                    <p className="text-white/80">
                      Our AI analyzes your driving patterns and vehicle data to provide the most accurate premium
                      calculations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3D</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Interactive Experience</h3>
                    <p className="text-white/80">
                      Visualize your vehicle and coverage options in stunning 3D detail for complete transparency.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Instant Processing</h3>
                    <p className="text-white/80">
                      Get quotes in seconds, not hours. Our streamlined process eliminates paperwork and waiting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-96 relative">
              <Canvas>
                <PerspectiveCamera makeDefault position={[5, 2, 5]} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} />
                <Car3D />
              </Canvas>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
                <div className="text-4xl font-bold text-orange-500 mb-2">50K+</div>
                <div className="text-white/80">Happy Customers</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
                <div className="text-4xl font-bold text-orange-500 mb-2">99.9%</div>
                <div className="text-white/80">Uptime</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
                <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
                <div className="text-white/80">Support</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
                <div className="text-4xl font-bold text-orange-500 mb-2">5★</div>
                <div className="text-white/80">Rating</div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto mb-12">
              To democratize car insurance in Malaysia by making it transparent, affordable, and accessible to everyone.
              We believe technology should simplify your life, not complicate it.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors"
            >
              Start Your Quote Journey
            </Link>
          </section>
        </div>
      </main>
    </div>
  )
}
