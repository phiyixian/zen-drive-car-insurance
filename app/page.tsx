"use client"

import type React from "react"
import Link from "next/link"

import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Text, SpotLight } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, ChevronLeft, ChevronRight, Upload, Camera } from "lucide-react"
import * as THREE from "three"

// Language context
const translations = {
  en: {
    home: "Home",
    aboutUs: "About Us",
    products: "Products",
    contact: "Contact",
    title: "ZenDrive",
    subtitle: "Your One-Stop Car Insurance Center",
    getQuote: "Get Quote Now",
    enterPlate: "Please enter your car plate number.",
    plateNumber: "Plate Number",
    next: "Next",
    chooseBrand: "Please choose your car brand.",
    selectModel: "Select your car model.",
    brands: ["Toyota", "Honda", "Mazda", "Nissan", "Proton", "Perodua"],
    models: {
      Toyota: ["Vios", "Camry", "Corolla"],
      Honda: ["City", "Civic", "Accord"],
      Mazda: ["Mazda2", "Mazda3", "CX-5"],
      Nissan: ["Almera", "Teana", "X-Trail"],
      Proton: ["Saga", "Persona", "X70"],
      Perodua: ["Myvi", "Axia", "Aruz"],
    },
    chatTitle: "ZenDrive Support",
    chatPlaceholder: "Type your message...",
    chatWelcome: "Hi there! How can I help you with your car insurance today?",
  },
  ms: {
    home: "Laman Utama",
    aboutUs: "Tentang Kami",
    products: "Produk",
    contact: "Hubungi",
    title: "ZenDrive",
    subtitle: "Pusat Insurans Kereta Sehenti Anda",
    getQuote: "Dapatkan Sebut Harga",
    enterPlate: "Sila masukkan nombor plat kereta anda.",
    plateNumber: "Nombor Plat",
    next: "Seterusnya",
    chooseBrand: "Sila pilih jenama kereta anda.",
    selectModel: "Pilih model kereta anda.",
    brands: ["Toyota", "Honda", "Mazda", "Nissan", "Proton", "Perodua"],
    models: {
      Toyota: ["Vios", "Camry", "Corolla"],
      Honda: ["City", "Civic", "Accord"],
      Mazda: ["Mazda2", "Mazda3", "CX-5"],
      Nissan: ["Almera", "Teana", "X-Trail"],
      Proton: ["Saga", "Persona", "X70"],
      Perodua: ["Myvi", "Axia", "Aruz"],
    },
    chatTitle: "Sokongan ZenDrive",
    chatPlaceholder: "Taip mesej anda...",
    chatWelcome: "Hai! Bagaimana saya boleh membantu anda dengan insurans kereta hari ini?",
  },
  zh: {
    home: "首页",
    aboutUs: "关于我们",
    products: "产品",
    contact: "联系我们",
    title: "ZenDrive",
    subtitle: "您的一站式汽车保险中心",
    getQuote: "获取报价",
    enterPlate: "请输入您的车牌号码。",
    plateNumber: "车牌号码",
    next: "下一步",
    chooseBrand: "请选择您的汽车品牌。",
    selectModel: "选择您的汽车型号。",
    brands: ["丰田", "本田", "马自达", "日产", "宝腾", "第二国产车"],
    models: {
      Toyota: ["Vios", "Camry", "Corolla"],
      Honda: ["City", "Civic", "Accord"],
      Mazda: ["Mazda2", "Mazda3", "CX-5"],
      Nissan: ["Almera", "Teana", "X-Trail"],
      Proton: ["Saga", "Persona", "X70"],
      Perodua: ["Myvi", "Axia", "Aruz"],
    },
    chatTitle: "ZenDrive 支持",
    chatPlaceholder: "输入您的消息...",
    chatWelcome: "您好！我如何帮助您处理汽车保险？",
  },
}

function Calendar3D({ selectedYear }: { selectedYear: number }) {
  const calendarRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (calendarRef.current) {
      calendarRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={calendarRef} position={[3, 0, 0]}>
      {/* Calendar base */}
      <mesh position={[0, 0, 0]} scale={[2, 0.1, 2.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Calendar pages */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[0, 0.1 + i * 0.02, 0]} scale={[1.8, 0.02, 2.3]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}

      {/* Highlighted year page */}
      <mesh position={[0, 0.35, 0]} scale={[1.8, 0.05, 2.3]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff6b35" emissive="#ff6b35" emissiveIntensity={0.3} />
      </mesh>

      {/* Year text */}
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.3}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Bold.json"
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {selectedYear}
      </Text>

      {/* Calendar rings */}
      <mesh position={[-0.6, 0.5, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.1, 0.02]} />
        <meshStandardMaterial color="#666666" metalness={0.8} />
      </mesh>
      <mesh position={[0.6, 0.5, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.1, 0.02]} />
        <meshStandardMaterial color="#666666" metalness={0.8} />
      </mesh>
    </group>
  )
}

function IdentityCard3D({ idNumber, idType }: { idNumber: string; idType: string }) {
  const cardRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (cardRef.current) {
      cardRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.1
    }
  })

  return (
    <group ref={cardRef} position={[3, 0, 0]}>
      {/* Card base */}
      <mesh position={[0, 0, 0]} scale={[2.5, 0.05, 1.6]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={idType === "MyKad" ? "#0066cc" : "#cc0000"} metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Card details area */}
      <mesh position={[0.3, 0.03, 0]} scale={[1.8, 0.01, 1.2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* ID Number display */}
      {idNumber && (
        <Text
          position={[0.3, 0.04, -0.2]}
          fontSize={0.08}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter_Bold.json"
        >
          {idNumber}
        </Text>
      )}

      {/* Card type text */}
      <Text
        position={[0.3, 0.04, 0.3]}
        fontSize={0.06}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Regular.json"
      >
        {idType}
      </Text>

      {/* Photo placeholder */}
      <mesh position={[-0.7, 0.03, 0]} scale={[0.6, 0.01, 0.8]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </group>
  )
}

function Car({
  mousePosition,
  step,
  plateNumber,
  selectedBrand,
  selectedModel,
  currentModelIndex,
  selectedYear,
}: {
  mousePosition: { x: number; y: number }
  step: number
  plateNumber: string
  selectedBrand: string
  selectedModel: string
  currentModelIndex: number
  selectedYear: number
}) {
  const carRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  const modelColors = ["#c0c0c0", "#8b0000", "#ffffff"]
  const models = selectedBrand ? (translations.en.models as any)[selectedBrand] || [] : []

  const getCarScale = () => {
    if (step === 1) return [1.5, 1.5, 1.5] // Bigger during plate entry
    if (step >= 2 && step <= 3) return [1.2, 1.2, 1.2] // Medium size for brand/model selection
    return [1, 1, 1] // Normal size for other steps
  }

  useFrame(() => {
    if (carRef.current) {
      if (step >= 1 && step <= 3) {
        // Move to center and face front for plate entry, brand selection, and model selection
        carRef.current.position.x = THREE.MathUtils.lerp(carRef.current.position.x, 0, 0.05)
        carRef.current.position.y = THREE.MathUtils.lerp(carRef.current.position.y, -0.5, 0.05)
        carRef.current.rotation.y = THREE.MathUtils.lerp(carRef.current.rotation.y, 0, 0.05)
      } else if (step >= 4) {
        // Move to left side for year selection and identity steps
        carRef.current.position.x = THREE.MathUtils.lerp(carRef.current.position.x, -2, 0.05)
        carRef.current.position.y = THREE.MathUtils.lerp(carRef.current.position.y, -0.5, 0.05)
        carRef.current.rotation.y = THREE.MathUtils.lerp(carRef.current.rotation.y, Math.PI / 4, 0.05)
      } else {
        // Follow mouse
        const x = (mousePosition.x / window.innerWidth) * 2 - 1
        const y = -(mousePosition.y / window.innerHeight) * 2 + 1

        carRef.current.position.x = THREE.MathUtils.lerp(carRef.current.position.x, x * (viewport.width / 4), 0.02)
        carRef.current.position.y = THREE.MathUtils.lerp(carRef.current.position.y, y * (viewport.height / 6), 0.02)
        carRef.current.rotation.y += 0.005
      }
    }
  })

  if (step === 3 && models.length > 0) {
    return (
      <group ref={carRef}>
        {/* Circular platform */}
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[4, 4, 0.1]} />
          <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Car models in circle */}
        {models.map((model: string, index: number) => {
          const angle = (index / models.length) * Math.PI * 2
          const radius = 3
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const isSelected = index === currentModelIndex

          return (
            <CarModel
              key={model}
              position={[x, -0.5, z]}
              rotation={[0, -angle + Math.PI / 2, 0]}
              scale={isSelected ? [1, 1, 1] : [0.8, 0.8, 0.8]}
              color={modelColors[index % modelColors.length]}
              isSelected={isSelected}
              modelName={model}
              plateNumber={plateNumber}
              selectedBrand={selectedBrand}
            />
          )
        })}
      </group>
    )
  }

  return (
    <group ref={carRef} position={[0, -0.5, 0]} scale={getCarScale()}>
      {step === 1 && (
        <SpotLight
          position={[0, 3, 3]}
          angle={0.4}
          penumbra={0.3}
          intensity={3}
          color="#ffffff"
          target-position={[0, -0.2, 2.1]}
        />
      )}

      {/* Car body */}
      <mesh position={[0, 0, 0]} scale={[2, 0.8, 4]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Car windows */}
      <mesh position={[0, 0.3, 0.2]} scale={[1.8, 0.4, 2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.3} />
      </mesh>

      {plateNumber && (
        <>
          {/* License plate background with border */}
          <mesh position={[0, -0.2, 2.12]} scale={[1.0, 0.4, 0.02]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          {/* Main license plate */}
          <mesh position={[0, -0.2, 2.13]} scale={[0.9, 0.35, 0.02]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
          </mesh>
        </>
      )}

      {plateNumber && (
        <Text
          position={[0, -0.2, 2.15]}
          fontSize={step === 1 ? 0.12 : 0.08}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter_Bold.json"
          outlineWidth={0.002}
          outlineColor="#ffffff"
        >
          {plateNumber}
        </Text>
      )}

      {/* Brand logo area on hood */}
      {selectedBrand && (
        <mesh position={[0, 0.1, 1.5]} scale={[0.3, 0.3, 0.05]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      )}

      {/* Brand text */}
      {selectedBrand && (
        <Text
          position={[0, 0.1, 1.55]}
          fontSize={0.08}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter_Bold.json"
        >
          {selectedBrand}
        </Text>
      )}

      {/* Year badge */}
      {selectedYear && step >= 4 && (
        <>
          <mesh position={[-0.8, 0.1, 1.5]} scale={[0.25, 0.25, 0.05]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ff6b35" />
          </mesh>
          <Text
            position={[-0.8, 0.1, 1.55]}
            fontSize={0.06}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter_Bold.json"
          >
            {selectedYear}
          </Text>
        </>
      )}

      {/* Wheels */}
      <mesh position={[-0.7, -0.4, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0.7, -0.4, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[-0.7, -0.4, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0.7, -0.4, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* 3D Calendar for year selection */}
      {step === 4 && <Calendar3D selectedYear={selectedYear} />}

      {/* 3D Identity Card for identity step */}
      {step === 5 && <IdentityCard3D idNumber="" idType="MyKad" />}
    </group>
  )
}

// Car component with plate number and brand logo
function CarModel({
  position,
  rotation,
  scale,
  color,
  isSelected,
  modelName,
  plateNumber,
  selectedBrand,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  color: string
  isSelected: boolean
  modelName: string
  plateNumber: string
  selectedBrand: string
}) {
  const carRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (carRef.current && isSelected) {
      // Gentle floating animation for selected car
      carRef.current.position.y = position[1] + Math.sin(Date.now() * 0.002) * 0.1
    }
  })

  return (
    <group ref={carRef} position={position} rotation={rotation} scale={scale}>
      {/* Spotlight for selected car */}
      {isSelected && (
        <SpotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={0.5}
          intensity={2}
          color="#ffffff"
          target-position={[0, 0, 0]}
        />
      )}

      {/* Car body */}
      <mesh position={[0, 0, 0]} scale={[2, 0.8, 4]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={isSelected ? "#222222" : "#000000"}
        />
      </mesh>

      {/* Car windows */}
      <mesh position={[0, 0.3, 0.2]} scale={[1.8, 0.4, 2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1a1a1a" transparent opacity={0.3} />
      </mesh>

      {plateNumber && isSelected && (
        <>
          {/* License plate background with border */}
          <mesh position={[0, -0.2, 2.12]} scale={[1.0, 0.4, 0.02]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          {/* Main license plate */}
          <mesh position={[0, -0.2, 2.13]} scale={[0.9, 0.35, 0.02]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
          </mesh>
        </>
      )}

      {plateNumber && isSelected && (
        <Text
          position={[0, -0.2, 2.15]}
          fontSize={0.1}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter_Bold.json"
          outlineWidth={0.002}
          outlineColor="#ffffff"
        >
          {plateNumber}
        </Text>
      )}

      {/* Brand logo area on hood */}
      {selectedBrand && isSelected && (
        <mesh position={[0, 0.1, 1.5]} scale={[0.3, 0.3, 0.05]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      )}

      {/* Brand text */}
      {selectedBrand && isSelected && (
        <Text
          position={[0, 0.1, 1.55]}
          fontSize={0.08}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter_Bold.json"
        >
          {selectedBrand}
        </Text>
      )}

      {/* Model name above car */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.2}
        color={isSelected ? "#ff6b35" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Bold.json"
      >
        {modelName}
      </Text>

      {/* Wheels */}
      <mesh position={[-0.7, -0.4, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0.7, -0.4, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[-0.7, -0.4, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0.7, -0.4, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  )
}

// Header component with language switcher
function Header({
  onGetQuote,
  language,
  setLanguage,
  currentPage,
  setCurrentPage,
}: {
  onGetQuote: () => void
  language: keyof typeof translations
  setLanguage: (lang: keyof typeof translations) => void
  currentPage: string
  setCurrentPage: (page: string) => void
}) {
  const t = translations[language]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">Z</span>
          </div>
          <span className="text-white font-bold text-xl">{t.title}</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`transition-colors ${currentPage === "home" ? "text-orange-500" : "text-white/80 hover:text-white"}`}
          >
            {t.home}
          </Link>
          <Link
            href="/about"
            className={`transition-colors ${currentPage === "about" ? "text-orange-500" : "text-white/80 hover:text-white"}`}
          >
            {t.aboutUs}
          </Link>
          <Link
            href="/products"
            className={`transition-colors ${currentPage === "products" ? "text-orange-500" : "text-white/80 hover:text-white"}`}
          >
            {t.products}
          </Link>
          <Link
            href="/contact"
            className={`transition-colors ${currentPage === "contact" ? "text-orange-500" : "text-white/80 hover:text-white"}`}
          >
            {t.contact}
          </Link>
        </nav>

        {/* Language switcher */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as keyof typeof translations)}
              className="bg-white/10 text-white border border-white/20 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="en">EN</option>
              <option value="ms">MS</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}

// Chatbot component
function Chatbot({ language }: { language: keyof typeof translations }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([])
  const [inputValue, setInputValue] = useState("")
  const t = translations[language]

  useEffect(() => {
    setMessages([{ text: t.chatWelcome, isBot: true }])
  }, [language, t.chatWelcome])

  const sendMessage = () => {
    if (inputValue.trim()) {
      setMessages((prev) => [...prev, { text: inputValue, isBot: false }])
      setInputValue("")

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thanks for your message! Our team will get back to you shortly with personalized insurance options.",
            isBot: true,
          },
        ])
      }, 1000)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col">
          <div className="bg-orange-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <span className="font-semibold">{t.chatTitle}</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.isBot ? "bg-gray-100 text-gray-800" : "bg-orange-500 text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder={t.chatPlaceholder}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Button onClick={sendMessage} size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  )
}

// Car plate validation
function validateMalaysianPlate(plate: string): boolean {
  // Malaysian plate formats: ABC1234, AB1234C, etc.
  const patterns = [
    /^[A-Z]{1,3}\d{1,4}[A-Z]?$/, // Standard format
    /^[A-Z]{2}\d{1,4}[A-Z]{1,2}$/, // Alternative format
  ]
  return patterns.some((pattern) => pattern.test(plate.toUpperCase()))
}

// Car plate entry component
function CarPlateEntry({
  language,
  plateNumber,
  setPlateNumber,
  onNext,
}: {
  language: keyof typeof translations
  plateNumber: string
  setPlateNumber: (plate: string) => void
  onNext: () => void
}) {
  const t = translations[language]
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    setIsValid(validateMalaysianPlate(plateNumber))
  }, [plateNumber])

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">{t.enterPlate}</h3>
      <div className="space-y-4">
        <input
          type="text"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
          placeholder={t.plateNumber}
          className={`w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            plateNumber && !isValid ? "border-red-500" : "border-white/30"
          }`}
        />
        {plateNumber && !isValid && (
          <p className="text-red-400 text-sm">Please enter a valid Malaysian car plate number</p>
        )}
        {isValid && (
          <Button
            onClick={onNext}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
          >
            {t.next}
          </Button>
        )}
      </div>
    </div>
  )
}

// Brand selection component
function BrandSelection({
  language,
  selectedBrand,
  setSelectedBrand,
  onNext,
}: {
  language: keyof typeof translations
  selectedBrand: string
  setSelectedBrand: (brand: string) => void
  onNext: () => void
}) {
  const t = translations[language]

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">{t.chooseBrand}</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {t.brands.map((brand, index) => (
          <button
            key={index}
            onClick={() => setSelectedBrand(brand)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedBrand === brand
                ? "border-orange-500 bg-orange-500/20"
                : "border-white/30 bg-white/10 hover:border-orange-300"
            }`}
          >
            <span className="text-white font-semibold">{brand}</span>
          </button>
        ))}
      </div>
      {selectedBrand && (
        <Button
          onClick={onNext}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
        >
          {t.next}
        </Button>
      )}
    </div>
  )
}

// Model selection component with carousel controls
function ModelSelection({
  language,
  selectedBrand,
  selectedModel,
  setSelectedModel,
  currentModelIndex,
  setCurrentModelIndex,
  onNext,
}: {
  language: keyof typeof translations
  selectedBrand: string
  selectedModel: string
  setSelectedModel: (model: string) => void
  currentModelIndex: number
  setCurrentModelIndex: (index: number) => void
  onNext: () => void
}) {
  const t = translations[language]
  const models = (t.models as any)[selectedBrand] || []

  const handlePrevious = () => {
    const newIndex = currentModelIndex > 0 ? currentModelIndex - 1 : models.length - 1
    setCurrentModelIndex(newIndex)
    setSelectedModel(models[newIndex])
  }

  const handleNext = () => {
    const newIndex = currentModelIndex < models.length - 1 ? currentModelIndex + 1 : 0
    setCurrentModelIndex(newIndex)
    setSelectedModel(models[newIndex])
  }

  useEffect(() => {
    if (models.length > 0 && !selectedModel) {
      setSelectedModel(models[0])
      setCurrentModelIndex(0)
    }
  }, [selectedBrand, models, selectedModel, setSelectedModel, setCurrentModelIndex])

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">{t.selectModel}</h3>

      {/* Model navigation */}
      <div className="flex items-center justify-center space-x-8 mb-8">
        <button
          onClick={handlePrevious}
          className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="text-center">
          <h4 className="text-xl font-semibold text-white">{selectedModel}</h4>
          <p className="text-white/60 text-sm">{selectedBrand}</p>
        </div>

        <button
          onClick={handleNext}
          className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Model indicators */}
      <div className="flex justify-center space-x-2 mb-6">
        {models.map((_: string, index: number) => (
          <button
            key={index}
            onClick={() => {
              setCurrentModelIndex(index)
              setSelectedModel(models[index])
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentModelIndex ? "bg-orange-500" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {selectedModel && (
        <Button
          onClick={onNext}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
        >
          {t.next}
        </Button>
      )}
    </div>
  )
}

function YearSelection({
  language,
  selectedYear,
  setSelectedYear,
  onNext,
}: {
  language: keyof typeof translations
  selectedYear: number
  setSelectedYear: (year: number) => void
  onNext: () => void
}) {
  const currentYear = new Date().getFullYear()
  const minYear = 2010
  const maxYear = currentYear

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Please select year of car.</h3>

      <div className="space-y-6">
        <div className="text-center">
          <span className="text-sm text-white/60">
            Range {minYear} - {maxYear}
          </span>
        </div>

        {/* Year range slider */}
        <div className="relative">
          <input
            type="range"
            min={minYear}
            max={maxYear}
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number.parseInt(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #ff6b35 0%, #ff6b35 ${((selectedYear - minYear) / (maxYear - minYear)) * 100}%, rgba(255,255,255,0.2) ${((selectedYear - minYear) / (maxYear - minYear)) * 100}%, rgba(255,255,255,0.2) 100%)`,
            }}
          />
          <div className="flex justify-between text-sm text-white/60 mt-2">
            <span>{minYear}</span>
            <span className="text-orange-500 font-bold text-lg">{selectedYear}</span>
            <span>{maxYear}</span>
          </div>
        </div>

        <Button
          onClick={onNext}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

function IdentityInformation({
  language,
  idType,
  setIdType,
  idNumber,
  setIdNumber,
  onNext,
}: {
  language: keyof typeof translations
  idType: string
  setIdType: (type: string) => void
  idNumber: string
  setIdNumber: (number: string) => void
  onNext: () => void
}) {
  const [uploadMethod, setUploadMethod] = useState<"manual" | "upload">("manual")
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    // Basic validation for Malaysian IC and Passport
    if (idType === "MyKad") {
      setIsValid(/^\d{6}-\d{2}-\d{4}$/.test(idNumber))
    } else {
      setIsValid(idNumber.length >= 6)
    }
  }, [idNumber, idType])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate OCR processing
      setTimeout(() => {
        if (idType === "MyKad") {
          setIdNumber("123456-78-9012")
        } else {
          setIdNumber("A12345678")
        }
      }, 2000)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Please enter your identity number.</h3>

      <div className="space-y-6">
        {/* Identity type selection */}
        <div className="space-y-2">
          <label className="text-white/80 text-sm">Identity option</label>
          <select
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="MyKad">MyKad</option>
            <option value="Passport">Passport</option>
          </select>
        </div>

        {/* Upload method selection */}
        <div className="flex space-x-4">
          <button
            onClick={() => setUploadMethod("manual")}
            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
              uploadMethod === "manual" ? "border-orange-500 bg-orange-500/20" : "border-white/30 bg-white/10"
            }`}
          >
            <span className="text-white">Manual Input</span>
          </button>
          <button
            onClick={() => setUploadMethod("upload")}
            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
              uploadMethod === "upload" ? "border-orange-500 bg-orange-500/20" : "border-white/30 bg-white/10"
            }`}
          >
            <span className="text-white">Upload Picture</span>
          </button>
        </div>

        {uploadMethod === "manual" ? (
          <div className="space-y-4">
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder={idType === "MyKad" ? "123456-78-9012" : "A12345678"}
              className={`w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                idNumber && !isValid ? "border-red-500" : "border-white/30"
              }`}
            />
            {idNumber && !isValid && (
              <p className="text-red-400 text-sm">
                Please enter a valid {idType === "MyKad" ? "MyKad number (123456-78-9012)" : "Passport number"}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
              <p className="text-white/80 mb-4">Upload a picture of your {idType}</p>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="file-upload" />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg cursor-pointer"
              >
                <Camera className="w-4 h-4 mr-2" />
                Choose File
              </label>
            </div>
            {idNumber && (
              <div className="text-center">
                <p className="text-green-400">✓ ID Number detected: {idNumber}</p>
              </div>
            )}
          </div>
        )}

        {isValid && (
          <Button
            onClick={onNext}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}

function QuoteSummary({
  language,
  plateNumber,
  selectedBrand,
  selectedModel,
  selectedYear,
  idType,
  idNumber,
  onComplete,
}: {
  language: keyof typeof translations
  plateNumber: string
  selectedBrand: string
  selectedModel: string
  selectedYear: number
  idType: string
  idNumber: string
  onComplete: () => void
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">Quote Summary</h3>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-orange-500">Vehicle Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">Plate Number:</span>
                <span className="text-white font-semibold">{plateNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Brand:</span>
                <span className="text-white font-semibold">{selectedBrand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Model:</span>
                <span className="text-white font-semibold">{selectedModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Year:</span>
                <span className="text-white font-semibold">{selectedYear}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-orange-500">Personal Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/80">ID Type:</span>
                <span className="text-white font-semibold">{idType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">ID Number:</span>
                <span className="text-white font-semibold">{idNumber}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6">
          <div className="bg-orange-500/20 rounded-lg p-6 text-center">
            <h4 className="text-2xl font-bold text-orange-500 mb-2">Estimated Premium</h4>
            <p className="text-3xl font-bold text-white">RM 1,250 / year</p>
            <p className="text-white/80 text-sm mt-2">*Final premium may vary based on additional factors</p>
          </div>
        </div>

        <Button
          onClick={onComplete}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-xl font-semibold"
        >
          Get Final Quote
        </Button>
      </div>
    </div>
  )
}

// Page components
function HomePage({ language }: { language: keyof typeof translations }) {
  const t = translations[language]
  return (
    <div className="text-center">
      <h1 className="text-6xl md:text-8xl font-bold mb-4 text-balance">{t.title}</h1>
      <p className="text-xl md:text-2xl text-white/80 mb-8 text-balance">{t.subtitle}</p>
    </div>
  )
}

function AboutPage({ language }: { language: keyof typeof translations }) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">About ZenDrive</h1>
      <p className="text-lg text-white/80 mb-6">
        ZenDrive is Malaysia's leading digital car insurance platform, providing comprehensive coverage with innovative
        technology and exceptional customer service.
      </p>
      <p className="text-lg text-white/80">
        Our mission is to make car insurance simple, transparent, and accessible to everyone.
      </p>
    </div>
  )
}

function ProductsPage({ language }: { language: keyof typeof translations }) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4">Comprehensive Coverage</h3>
          <p className="text-white/80">
            Full protection for your vehicle including theft, accidents, and natural disasters.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4">Third Party Insurance</h3>
          <p className="text-white/80">Essential coverage required by law for all Malaysian drivers.</p>
        </div>
      </div>
    </div>
  )
}

function ContactPage({ language }: { language: keyof typeof translations }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-white/80">+60 3-1234 5678</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-white/80">support@zendrive.com.my</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-white/80">
              Level 10, Menara ZenDrive
              <br />
              Jalan Bukit Bintang
              <br />
              55100 Kuala Lumpur
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ZenDriveLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [language, setLanguage] = useState<keyof typeof translations>("en")
  const [currentPage, setCurrentPage] = useState("home")
  const [quoteStep, setQuoteStep] = useState(0) // 0: hero, 1: plate entry, 2: brand selection, 3: model selection, 4: year selection, 5: identity info, 6: summary
  const [plateNumber, setPlateNumber] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [currentModelIndex, setCurrentModelIndex] = useState(0)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [idType, setIdType] = useState("MyKad")
  const [idNumber, setIdNumber] = useState("")

  const plateRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)
  const identityRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const t = translations[language]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleGetQuote = () => {
    setCurrentPage("home")
    setQuoteStep(1)
    setTimeout(() => {
      plateRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handlePlateNext = () => {
    setQuoteStep(2)
    setTimeout(() => {
      brandRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleBrandNext = () => {
    setQuoteStep(3) // Move to model selection instead of completing
    setTimeout(() => {
      modelRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleModelNext = () => {
    setQuoteStep(4)
    setTimeout(() => {
      yearRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleYearNext = () => {
    setQuoteStep(5)
    setTimeout(() => {
      identityRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleIdentityNext = () => {
    setQuoteStep(6)
    setTimeout(() => {
      summaryRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleQuoteComplete = () => {
    alert("Thank you! Our team will contact you within 24 hours with your personalized quote and policy options.")
    // Reset form
    setQuoteStep(0)
    setPlateNumber("")
    setSelectedBrand("")
    setSelectedModel("")
    setSelectedYear(new Date().getFullYear())
    setIdType("MyKad")
    setIdNumber("")
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case "about":
        return <AboutPage language={language} />
      case "products":
        return <ProductsPage language={language} />
      case "contact":
        return <ContactPage language={language} />
      default:
        return <HomePage language={language} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-x-hidden">
      <Header
        onGetQuote={handleGetQuote}
        language={language}
        setLanguage={setLanguage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* 3D Background */}
      <div className="fixed inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            <Car
              mousePosition={mousePosition}
              step={quoteStep}
              plateNumber={plateNumber}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
              currentModelIndex={currentModelIndex}
              selectedYear={selectedYear} // Added selectedYear prop
            />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {renderPageContent()}
          {currentPage === "home" && quoteStep === 0 && (
            <Button
              onClick={handleGetQuote}
              className="bg-gray-600 hover:bg-orange-500 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 mt-8"
            >
              {t.getQuote}
            </Button>
          )}
        </div>
      </section>

      {/* Car Plate Entry Section */}
      {quoteStep >= 1 && (
        <section ref={plateRef} className="min-h-screen flex items-center justify-center px-6 py-20">
          <CarPlateEntry
            language={language}
            plateNumber={plateNumber}
            setPlateNumber={setPlateNumber}
            onNext={handlePlateNext}
          />
        </section>
      )}

      {/* Brand Selection Section */}
      {quoteStep >= 2 && (
        <section ref={brandRef} className="min-h-screen flex items-center justify-center px-6 py-20">
          <BrandSelection
            language={language}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            onNext={handleBrandNext}
          />
        </section>
      )}

      {/* Model Selection Section */}
      {quoteStep >= 3 && (
        <section ref={modelRef} className="min-h-screen flex items-center justify-center px-6 py-20">
          <ModelSelection
            language={language}
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            currentModelIndex={currentModelIndex}
            setCurrentModelIndex={setCurrentModelIndex}
            onNext={handleModelNext}
          />
        </section>
      )}

      {quoteStep >= 4 && (
        <section ref={yearRef} className="min-h-screen flex items-center justify-center px-6 py-20">
          <YearSelection
            language={language}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            onNext={handleYearNext}
          />
        </section>
      )}

      {quoteStep >= 5 && (
        <section ref={identityRef} className="min-h-screen flex items-center justify-center px-6 py-20">
          <IdentityInformation
            language={language}
            idType={idType}
            setIdType={setIdType}
            idNumber={idNumber}
            setIdNumber={setIdNumber}
            onNext={handleIdentityNext}
          />
        </section>
      )}

      {quoteStep >= 6 && (
        <section ref={summaryRef} className="min-h-screen flex items-center justify-center px-6 py-20">
          <QuoteSummary
            language={language}
            plateNumber={plateNumber}
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
            selectedYear={selectedYear}
            idType={idType}
            idNumber={idNumber}
            onComplete={handleQuoteComplete}
          />
        </section>
      )}

      {/* Chatbot */}
      <Chatbot language={language} />
    </div>
  )
}
