'use client';

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RotatingText from "@/components/RotatingText";
import ScrollVelocity from "@/components/ScrollVelocity";
import CardSwap, { Card } from "@/components/CardSwap";
import InfiniteScroll from "@/components/InfiniteScroll";
import IndonesiaMap from "@/components/IndonesiaMap";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  MapPin, AlertTriangle, BookOpen, Users, Bell, Shield, 
  ArrowRight, CheckCircle, TrendingUp, Globe, Zap, Heart, Calendar, Star, HelpCircle,
  X, Clock, Eye, Share2, ExternalLink, Phone, Mail, Navigation as NavigationIcon, FileText
} from "lucide-react";

export default function Home() {
  const [velocity, setVelocity] = useState(0);
  const [highlightedQuestion, setHighlightedQuestion] = useState(3);
  const [selectedCard, setSelectedCard] = useState(null);

  // Data detail untuk setiap card
  const cardDetails = [
    {
      id: 1,
      type: 'alert',
      category: 'ALERT PENTING',
      title: 'Banjir di Area Kelurahan Merdeka',
      shortDescription: 'Warga diharapkan waspada terhadap banjir di Jalan Raya Merdeka. Ketinggian air mencapai 50cm. Hindari area tersebut dan gunakan rute alternatif.',
      fullDescription: 'Banjir terjadi akibat hujan deras yang turun sejak pagi hari. Ketinggian air di Jalan Raya Merdeka mencapai 50cm dan terus meningkat. Warga di sekitar area tersebut diharapkan untuk segera mengungsi ke tempat yang lebih aman. Tim SAR telah dikerahkan untuk membantu evakuasi. Hindari area tersebut dan gunakan rute alternatif melalui Jalan Sudirman atau Jalan Thamrin.',
      location: 'Kelurahan Merdeka, Jakarta Pusat',
      coordinates: { lat: -6.2088, lng: 106.8456 },
      time: '2 jam lalu',
      views: 245,
      severity: 'high',
      status: 'active',
      reporter: {
        name: 'Budi Santoso',
        verified: true,
        avatar: null
      },
      updates: [
        { time: '2 jam lalu', text: 'Banjir mulai terjadi di Jalan Raya Merdeka' },
        { time: '1 jam lalu', text: 'Ketinggian air mencapai 30cm' },
        { time: '30 menit lalu', text: 'Ketinggian air meningkat menjadi 50cm, evakuasi dimulai' }
      ],
      affectedAreas: ['Jalan Raya Merdeka', 'Gang Merdeka 1', 'Gang Merdeka 2'],
      emergencyContacts: [
        { name: 'Posko Darurat', phone: '021-1234567' },
        { name: 'BPBD Jakarta', phone: '021-7654321' }
      ],
      tips: [
        'Hindari area banjir jika memungkinkan',
        'Gunakan rute alternatif',
        'Siapkan perbekalan darurat',
        'Hubungi nomor darurat jika membutuhkan bantuan'
      ],
      relatedAlerts: 3,
      comments: 12
    },
    {
      id: 2,
      type: 'event',
      category: 'UPDATE TERBARU',
      title: 'Program Gotong Royong Minggu Ini',
      shortDescription: 'Komunitas BERINGIN mengundang semua warga untuk bergabung dalam kegiatan gotong royong membersihkan lingkungan pada hari Minggu, 15 Desember 2024 pukul 07:00 WIB.',
      fullDescription: 'Komunitas BERINGIN mengundang semua warga untuk bergabung dalam kegiatan gotong royong membersihkan lingkungan. Kegiatan ini akan dilaksanakan pada hari Minggu, 15 Desember 2024 mulai pukul 07:00 WIB. Kegiatan akan dimulai dengan briefing di Lapangan Merdeka, kemudian dilanjutkan dengan pembersihan saluran air, penanaman pohon, dan perbaikan fasilitas umum. Semua warga diundang untuk berpartisipasi. Peralatan akan disediakan oleh panitia. Mari kita bersama-sama menjaga kebersihan dan keindahan lingkungan kita.',
      location: 'Lapangan Merdeka, Jakarta Pusat',
      coordinates: { lat: -6.2000, lng: 106.8500 },
      time: '5 jam lalu',
      views: 128,
      severity: 'low',
      status: 'upcoming',
      date: 'Minggu, 15 Desember 2024',
      timeEvent: '07:00 WIB',
      organizer: {
        name: 'Komunitas BERINGIN',
        verified: true,
        avatar: null
      },
      registered: 128,
      maxParticipants: 200,
      activities: [
        'Pembersihan saluran air',
        'Penanaman pohon',
        'Perbaikan fasilitas umum',
        'Kegiatan sosial bersama'
      ],
      requirements: [
        'Membawa peralatan kebersihan (opsional)',
        'Menggunakan pakaian yang nyaman',
        'Membawa air minum',
        'Mendaftar melalui platform BERINGIN'
      ],
      contact: {
        name: 'Ketua Panitia',
        phone: '0812-3456-7890',
        email: 'panitia@beringin.id'
      },
      relatedAlerts: 2,
      comments: 8
    },
    {
      id: 3,
      type: 'tips',
      category: 'TIPS KEAMANAN',
      title: 'Tips Menjaga Keamanan Lingkungan',
      shortDescription: 'Selalu laporkan kejadian mencurigakan melalui platform BERINGIN. Aktifkan notifikasi untuk mendapatkan alert real-time. Verifikasi informasi sebelum menyebarkannya.',
      fullDescription: 'Keamanan lingkungan adalah tanggung jawab bersama. Berikut adalah tips-tips penting untuk menjaga keamanan lingkungan kita: 1) Selalu laporkan kejadian mencurigakan melalui platform BERINGIN segera setelah melihatnya. 2) Aktifkan notifikasi untuk mendapatkan alert real-time tentang kejadian di sekitar Anda. 3) Verifikasi informasi sebelum menyebarkannya kepada orang lain. 4) Ikuti prosedur keamanan yang telah ditetapkan oleh komunitas. 5) Berpartisipasi aktif dalam program keamanan lingkungan. 6) Kenali tetangga sekitar dan jalin komunikasi yang baik. 7) Laporkan kerusakan fasilitas umum segera. 8) Ikuti grup keamanan komunitas untuk update terbaru.',
      location: 'Seluruh Area Komunitas',
      coordinates: null,
      time: '1 hari lalu',
      views: 567,
      severity: 'low',
      status: 'published',
      author: {
        name: 'Tim Keamanan BERINGIN',
        verified: true,
        avatar: null
      },
      tips: [
        'Laporkan kejadian mencurigakan segera',
        'Aktifkan notifikasi real-time',
        'Verifikasi informasi sebelum menyebarkan',
        'Ikuti prosedur keamanan komunitas',
        'Berpartisipasi dalam program keamanan',
        'Kenali tetangga sekitar',
        'Laporkan kerusakan fasilitas umum',
        'Ikuti grup keamanan komunitas'
      ],
      resources: [
        { title: 'Panduan Keamanan Lingkungan', type: 'pdf', url: '#' },
        { title: 'Kontak Darurat', type: 'link', url: '#' },
        { title: 'Video Tutorial', type: 'video', url: '#' }
      ],
      relatedAlerts: 5,
      comments: 23,
      helpful: 89
    }
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const speed = Math.abs(currentScrollY - lastScrollY);
      setVelocity(speed);
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVelocity);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Peta Komunitas Interaktif",
      description: "Jelajahi peta real-time dengan informasi penting di sekitar Anda",
      color: "from-green-500 to-green-600"
    },
    {
      icon: AlertTriangle,
      title: "Sistem Alert Cerdas",
      description: "Buat dan terima notifikasi alert penting secara real-time",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: BookOpen,
      title: "Pusat Sumber Daya",
      description: "Akses berbagai panduan dan informasi penting untuk komunitas",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Komunitas Aktif",
      description: "Terhubung dengan warga sekitar dan berbagi informasi",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Bell,
      title: "Notifikasi Real-time",
      description: "Dapatkan update instan tentang kejadian penting di area Anda",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Informasi Terverifikasi",
      description: "Semua informasi telah diverifikasi untuk keamanan komunitas",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const stats = [
    { number: "10K+", label: "Pengguna Aktif", icon: Users },
    { number: "5K+", label: "Alert Dibuat", icon: AlertTriangle },
    { number: "50+", label: "Daerah Terjangkau", icon: MapPin },
    { number: "99%", label: "Kepuasan Pengguna", icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Abstract Network Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="#10b981" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="text-center space-y-8">
            {/* Main Title - 3 Lines with Different Colors */}
            <div className="space-y-4 md:space-y-6">
              {/* BERINGIN with RotatingText */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex justify-center"
              >
                <RotatingText
                  texts={['BERINGIN', 'Forum', 'Komunitas', 'Terhubung']}
                  mainClassName="px-4 sm:px-6 md:px-8 lg:px-10 bg-gradient-to-r from-green-600 to-green-500 text-white overflow-hidden py-2 sm:py-3 md:py-4 lg:py-5 justify-center rounded-2xl shadow-xl text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1.5"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </motion.div>
              
              {/* Forum & Terhubung Publik */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap"
              >
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800">
                  Forum &amp;
                </span>
                <div className="flex items-center min-w-[200px] sm:min-w-[250px] md:min-w-[300px] justify-center">
                  <RotatingText
                    texts={['Terhubung', 'Aman', 'Bersama', 'Komunitas']}
                    mainClassName="px-3 sm:px-4 md:px-5 lg:px-6 bg-gradient-to-r from-green-500 to-green-400 text-white overflow-hidden py-1.5 sm:py-2 md:py-2.5 lg:py-3 justify-center rounded-xl shadow-lg text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1.5"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2500}
                  />
                </div>
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800">
                  Publik
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-4"
            >
              Platform komunitas modern yang menghubungkan warga untuk berbagi informasi penting, 
              membuat alert publik, dan membangun lingkungan yang lebih aman bersama-sama.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/authentication-portal"
                  className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl"
                >
                  <Users className="w-5 h-5" />
                  <span>Mulai Sekarang</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/community-map-view"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border border-gray-300 hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Lihat Peta</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
            >
              {[
                { number: "1.247", label: "Peringatan Aktif", icon: AlertTriangle, color: "red", border: true },
                { number: "52.834", label: "Anggota Komunitas", icon: Users, color: "gray" },
                { number: "8.956", label: "Laporan Terverifikasi", icon: CheckCircle, color: "gray" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-white p-6 rounded-xl shadow-lg ${stat.border ? 'border-2 border-red-200' : ''}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      stat.color === 'red' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <stat.icon className={`w-6 h-6 ${stat.color === 'red' ? 'text-red-600' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-800">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Indonesia Map Section */}
      <IndonesiaMap />

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-green-50/30 to-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-full text-sm font-semibold border border-green-200">
                ✨ Fitur Terbaik
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6">
              Fitur <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 bg-clip-text text-transparent">Unggulan</span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Semua yang Anda butuhkan untuk terhubung dengan komunitas dan menjaga keamanan lingkungan
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: index * 0.15, 
                  type: "spring", 
                  stiffness: 120,
                  damping: 15
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Card Background with Glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl group-hover:shadow-2xl transition-all duration-300"></div>
                
                {/* Gradient Border Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`}></div>
                
                <div className="relative p-8 lg:p-10 h-full">
                  {/* Icon Container with Enhanced Animation */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.15 + 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ 
                      rotate: [0, -15, 15, -15, 0],
                      scale: 1.2,
                      transition: { duration: 0.6 }
                    }}
                    className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl relative overflow-hidden`}
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <feature.icon className="w-10 h-10 text-white relative z-10" />
                  </motion.div>
                  
                  {/* Title with Slide Animation */}
                  <motion.h3
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    whileHover={{ x: 5 }}
                    className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300"
                  >
                    {feature.title}
                  </motion.h3>
                  
                  {/* Description with Fade Animation */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                    className="text-gray-600 leading-relaxed text-base lg:text-lg mb-6"
                  >
                    {feature.description}
                  </motion.p>
                  
                  {/* Decorative Element */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
                    className={`h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                  ></motion.div>
                  
                  {/* Hover Arrow Indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-6 right-6 w-8 h-8 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Cara <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Kerja</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mulai dalam 3 langkah sederhana
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Daftar Akun", description: "Buat akun gratis dan lengkapi profil Anda", icon: Users },
              { step: "2", title: "Jelajahi Peta", description: "Lihat informasi dan alert di peta komunitas", icon: MapPin },
              { step: "3", title: "Berbagi Informasi", description: "Buat alert dan berbagi informasi penting", icon: AlertTriangle }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative inline-flex items-center justify-center mb-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                  >
                    {item.step}
                  </motion.div>
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                    className="absolute -top-2 -right-2 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
                  >
                    <item.icon className="w-6 h-6 text-green-600" />
                  </motion.div>
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="text-xl font-bold text-gray-800 mb-2"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                  className="text-gray-600"
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CardSwap Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Informasi <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Terbaru</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Lihat informasi dan update terbaru dari komunitas
            </p>
          </motion.div>

          <div className="relative" style={{ height: '600px', minHeight: '500px' }}>
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={true}
            >
              {cardDetails.map((card, index) => {
                const getIcon = () => {
                  if (card.type === 'alert') return AlertTriangle;
                  if (card.type === 'event') return Bell;
                  return Shield;
                };
                const getColor = () => {
                  if (card.type === 'alert') return 'from-yellow-500 to-orange-500';
                  if (card.type === 'event') return 'from-blue-500 to-blue-600';
                  return 'from-green-500 to-green-600';
                };
                const getCategoryColor = () => {
                  if (card.type === 'alert') return 'bg-yellow-100 text-yellow-700';
                  if (card.type === 'event') return 'bg-blue-100 text-blue-700';
                  return 'bg-green-100 text-green-700';
                };
                const Icon = getIcon();
                
                return (
                  <Card key={card.id}>
                    <motion.div
                      onClick={() => setSelectedCard(card)}
                      className="flex items-start space-x-4 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 bg-gradient-to-r ${getColor()} rounded-xl flex items-center justify-center shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-3 py-1 ${getCategoryColor()} text-xs font-semibold rounded-full`}>{card.category}</span>
                          <span className="text-gray-400 text-sm">{card.time}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">{card.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {card.shortDescription}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{card.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{card.views} dilihat</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                          <span>Klik untuk detail</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Testimoni <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Pengguna</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dengarkan pengalaman warga yang telah menggunakan BERINGIN
            </p>
          </motion.div>

          <div style={{ height: '500px', position: 'relative' }}>
            <InfiniteScroll
              items={[
                {
                  content: (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        &ldquo;BERINGIN sangat membantu saya mendapatkan informasi real-time tentang kondisi di sekitar rumah. 
                        Alert banjir kemarin sangat akurat dan membantu saya menyelamatkan kendaraan tepat waktu!&rdquo;
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          SB
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Siti Budiarti</div>
                          <div className="text-sm text-gray-500">Warga Kelurahan Merdeka</div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  content: (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        &ldquo;Platform ini membuat komunitas kami lebih terhubung. Saya bisa dengan mudah berbagi informasi 
                        penting dan mendapatkan update dari tetangga sekitar. Sangat praktis dan mudah digunakan!&rdquo;
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          AR
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Ahmad Rahman</div>
                          <div className="text-sm text-gray-500">Ketua RT 05</div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  content: (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        &ldquo;Sebagai ibu rumah tangga, saya sangat terbantu dengan fitur peta komunitas. Saya bisa melihat 
                        kondisi jalan sebelum pergi ke pasar atau mengantar anak sekolah. Informasinya selalu update!&rdquo;
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          DW
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Dewi Wulandari</div>
                          <div className="text-sm text-gray-500">Ibu Rumah Tangga</div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  content: (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        &ldquo;BERINGIN membantu organisasi kami mengkoordinasikan kegiatan gotong royong dengan lebih efektif. 
                        Semua warga bisa melihat jadwal dan mendaftar langsung melalui platform. Sangat efisien!&rdquo;
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          BS
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Bambang Sutrisno</div>
                          <div className="text-sm text-gray-500">Ketua Karang Taruna</div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  content: (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        &ldquo;Saya sangat terkesan dengan sistem verifikasi informasi di BERINGIN. Semua alert dan berita 
                        sudah terverifikasi, jadi saya tidak perlu khawatir dengan hoax. Platform yang sangat terpercaya!&rdquo;
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          MR
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Maya Ratnasari</div>
                          <div className="text-sm text-gray-500">Guru SD</div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  content: (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        &ldquo;Sebagai warga baru di daerah ini, BERINGIN sangat membantu saya mengenal lingkungan sekitar. 
                        Saya bisa langsung terhubung dengan komunitas dan mendapatkan informasi penting dengan cepat!&rdquo;
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          RK
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Rizki Kurniawan</div>
                          <div className="text-sm text-gray-500">Warga Baru</div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  content: (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        &ldquo;Fitur notifikasi real-time sangat membantu! Saya selalu mendapat update terbaru tentang 
                        kejadian di sekitar rumah. Aplikasi ini benar-benar meningkatkan keamanan lingkungan kami.&rdquo;
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          LS
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Lina Sari</div>
                          <div className="text-sm text-gray-500">Wiraswasta</div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  content: (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        &ldquo;BERINGIN membuat koordinasi kegiatan komunitas menjadi lebih mudah. Semua informasi terkumpul 
                        di satu tempat dan mudah diakses. Platform yang sangat bermanfaat untuk kemajuan komunitas!&rdquo;
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          HS
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Hendra Setiawan</div>
                          <div className="text-sm text-gray-500">Ketua RW 10</div>
                        </div>
                      </div>
                    </div>
                  )
                }
              ]}
              isTilted={true}
              tiltDirection="left"
              autoplay={true}
              autoplaySpeed={0.1}
              autoplayDirection="down"
              pauseOnHover={true}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-green-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Title Section - Right Side */}
          <div className="flex justify-between items-start mb-12">
            <div className="flex-1"></div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-right"
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-green-700 mb-2">
                PERTANYAAN?
              </h2>
              <p className="text-lg md:text-xl text-green-600 font-medium">
                Kami siap membantu Anda
              </p>
            </motion.div>
          </div>

          {/* Questions Grid */}
          <div className="relative">
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Left Column - Small Questions */}
              <div className="lg:col-span-1 space-y-6">
                {[
                  {
                    id: 1,
                    question: "Apa itu BERINGIN dan bagaimana cara kerjanya?",
                    answer: "BERINGIN adalah platform komunitas yang menghubungkan warga untuk berbagi informasi penting, berita, dan alert real-time. Cukup daftar akun, pilih daerah Anda, dan mulai berbagi informasi! Anda bisa melihat peta komunitas, membuat alert, membaca berita, dan berpartisipasi dalam diskusi komunitas."
                  },
                  {
                    id: 2,
                    question: "Bagaimana cara membuat alert di BERINGIN?",
                    answer: "Klik menu 'Buat Alert', pilih lokasi di peta, isi informasi alert (jenis, deskripsi, tingkat urgensi), dan publikasikan. Alert Anda akan langsung terlihat oleh warga di daerah tersebut dan membantu mereka tetap waspada."
                  },
                  {
                    id: 3,
                    question: "Apakah informasi di BERINGIN terverifikasi?",
                    answer: "Ya, semua informasi di BERINGIN melalui proses verifikasi. Tim moderasi kami meninjau setiap alert dan postingan untuk memastikan keakuratan informasi. Pengguna terverifikasi memiliki badge khusus yang menunjukkan bahwa akun mereka telah diverifikasi."
                  }
                ].filter(faq => faq.id !== highlightedQuestion).map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setHighlightedQuestion(faq.id)}
                    className="cursor-pointer"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-green-200 hover:border-green-400 hover:shadow-lg transition-all h-full">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 font-bold border-2 border-green-200 flex-shrink-0">
                          {faq.id}
                        </div>
                        <span className="text-green-500 text-xs font-medium uppercase">
                          Pertanyaan
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-800 leading-tight">
                        {faq.question}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Center Column - Highlighted Question */}
              <div className="lg:col-span-1">
                {(() => {
                  const highlighted = [
                    {
                      id: 1,
                      question: "Apa itu BERINGIN dan bagaimana cara kerjanya?",
                      answer: "BERINGIN adalah platform komunitas yang menghubungkan warga untuk berbagi informasi penting, berita, dan alert real-time. Cukup daftar akun, pilih daerah Anda, dan mulai berbagi informasi! Anda bisa melihat peta komunitas, membuat alert, membaca berita, dan berpartisipasi dalam diskusi komunitas."
                    },
                    {
                      id: 2,
                      question: "Bagaimana cara membuat alert di BERINGIN?",
                      answer: "Klik menu 'Buat Alert', pilih lokasi di peta, isi informasi alert (jenis, deskripsi, tingkat urgensi), dan publikasikan. Alert Anda akan langsung terlihat oleh warga di daerah tersebut dan membantu mereka tetap waspada."
                    },
                    {
                      id: 3,
                      question: "Apakah informasi di BERINGIN terverifikasi?",
                      answer: "Ya, semua informasi di BERINGIN melalui proses verifikasi. Tim moderasi kami meninjau setiap alert dan postingan untuk memastikan keakuratan informasi. Pengguna terverifikasi memiliki badge khusus yang menunjukkan bahwa akun mereka telah diverifikasi."
                    },
                    {
                      id: 4,
                      question: "APAKAH BERINGIN AMAN UNTUK DIGUNAKAN?",
                      answer: "Tentu saja! BERINGIN menggunakan enkripsi dan protokol keamanan terbaik untuk melindungi data Anda. Informasi pribadi tidak akan dibagikan tanpa persetujuan Anda. Kami juga memiliki sistem moderasi yang aktif untuk memastikan konten yang tidak pantas segera dihapus. Selain itu, semua alert dan informasi penting melalui proses verifikasi untuk memastikan keakuratan dan keamanan."
                    },
                    {
                      id: 5,
                      question: "Apakah BERINGIN tersedia di seluruh Indonesia?",
                      answer: "Saat ini BERINGIN sudah tersedia di berbagai daerah di Indonesia. Kami terus memperluas jangkauan untuk menjangkau lebih banyak komunitas. Anda bisa memilih provinsi di dropdown untuk melihat informasi dari daerah yang tersedia."
                    },
                    {
                      id: 6,
                      question: "Bagaimana cara bergabung dengan komunitas?",
                      answer: "Tidak perlu bergabung secara khusus! Setelah mendaftar dan memilih daerah, Anda otomatis menjadi bagian dari komunitas daerah tersebut dan bisa melihat serta berbagi informasi dengan warga sekitar."
                    }
                  ].find(faq => faq.id === highlightedQuestion);
                  
                  return highlighted && (
                    <motion.div
                      key={`highlighted-${highlightedQuestion}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="sticky top-8"
                    >
                      <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-green-200 relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-bl-full"></div>
                        <div className="relative z-10">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-green-300">
                              {highlighted.id}
                            </div>
                            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">
                              Pertanyaan Utama
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 leading-tight">
                            {highlighted.question}
                          </h3>
                          <p className="text-gray-600 text-base leading-relaxed">
                            {highlighted.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </div>

              {/* Right Column - Small Questions */}
              <div className="lg:col-span-1 space-y-6">
                {[
                  {
                    id: 4,
                    question: "APAKAH BERINGIN AMAN UNTUK DIGUNAKAN?",
                    answer: "Tentu saja! BERINGIN menggunakan enkripsi dan protokol keamanan terbaik untuk melindungi data Anda. Informasi pribadi tidak akan dibagikan tanpa persetujuan Anda. Kami juga memiliki sistem moderasi yang aktif untuk memastikan konten yang tidak pantas segera dihapus. Selain itu, semua alert dan informasi penting melalui proses verifikasi untuk memastikan keakuratan dan keamanan."
                  },
                  {
                    id: 5,
                    question: "Apakah BERINGIN tersedia di seluruh Indonesia?",
                    answer: "Saat ini BERINGIN sudah tersedia di berbagai daerah di Indonesia. Kami terus memperluas jangkauan untuk menjangkau lebih banyak komunitas. Anda bisa memilih provinsi di dropdown untuk melihat informasi dari daerah yang tersedia."
                  },
                  {
                    id: 6,
                    question: "Bagaimana cara bergabung dengan komunitas?",
                    answer: "Tidak perlu bergabung secara khusus! Setelah mendaftar dan memilih daerah, Anda otomatis menjadi bagian dari komunitas daerah tersebut dan bisa melihat serta berbagi informasi dengan warga sekitar."
                  }
                ].filter(faq => faq.id !== highlightedQuestion).map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setHighlightedQuestion(faq.id)}
                    className="cursor-pointer"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-green-200 hover:border-green-400 hover:shadow-lg transition-all h-full">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 font-bold border-2 border-green-200 flex-shrink-0">
                          {faq.id}
                        </div>
                        <span className="text-green-500 text-xs font-medium uppercase">
                          Pertanyaan
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-800 leading-tight">
                        {faq.question}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Link to Full FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                href="/faq"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span>Lihat Semua Pertanyaan</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 via-green-500 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Siap Bergabung dengan Komunitas?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-green-50 mb-8"
          >
            Mulai berbagi informasi dan terhubung dengan komunitas Anda hari ini
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/authentication-portal"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-green-600 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>Daftar Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Card Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCard(null)}
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative"
              >
                {/* Header */}
                <div className="relative bg-gradient-to-br from-green-50 to-white p-6 border-b border-gray-200">
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all z-10"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <div className="flex items-start gap-4 pr-12">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className={`w-16 h-16 bg-gradient-to-r ${
                        selectedCard.type === 'alert' ? 'from-yellow-500 to-orange-500' :
                        selectedCard.type === 'event' ? 'from-blue-500 to-blue-600' :
                        'from-green-500 to-green-600'
                      } rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      {selectedCard.type === 'alert' && <AlertTriangle className="w-8 h-8 text-white" />}
                      {selectedCard.type === 'event' && <Bell className="w-8 h-8 text-white" />}
                      {selectedCard.type === 'tips' && <Shield className="w-8 h-8 text-white" />}
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`px-3 py-1 ${
                          selectedCard.type === 'alert' ? 'bg-yellow-100 text-yellow-700' :
                          selectedCard.type === 'event' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        } text-xs font-semibold rounded-full`}>
                          {selectedCard.category}
                        </span>
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {selectedCard.time}
                        </span>
                        {selectedCard.severity === 'high' && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                            URGENT
                          </span>
                        )}
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedCard.title}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedCard.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{selectedCard.views} dilihat</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 p-6">
                  <div className="space-y-6">
                    {/* Full Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-lg font-bold text-gray-800 mb-3">Deskripsi Lengkap</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedCard.fullDescription}</p>
                    </motion.div>

                    {/* Updates/Timeline */}
                    {selectedCard.updates && selectedCard.updates.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100"
                      >
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          Timeline Update
                        </h3>
                        <div className="space-y-3">
                          {selectedCard.updates.map((update, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              className="flex gap-3"
                            >
                              <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <div className="text-sm text-gray-500 mb-1">{update.time}</div>
                                <div className="text-gray-700">{update.text}</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Event Details */}
                    {selectedCard.type === 'event' && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="grid md:grid-cols-2 gap-4"
                        >
                          <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-5 h-5 text-green-600" />
                              <span className="font-semibold text-gray-800">Tanggal & Waktu</span>
                            </div>
                            <p className="text-gray-700">{selectedCard.date}</p>
                            <p className="text-gray-600 text-sm">{selectedCard.timeEvent}</p>
                          </div>
                          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="w-5 h-5 text-blue-600" />
                              <span className="font-semibold text-gray-800">Pendaftaran</span>
                            </div>
                            <p className="text-gray-700">{selectedCard.registered} / {selectedCard.maxParticipants} peserta</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(selectedCard.registered / selectedCard.maxParticipants) * 100}%` }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                              />
                            </div>
                          </div>
                        </motion.div>

                        {selectedCard.activities && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100"
                          >
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Aktivitas</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                              {selectedCard.activities.map((activity, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 + index * 0.1 }}
                                  className="flex items-center gap-2 text-gray-700"
                                >
                                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                  <span>{activity}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {selectedCard.requirements && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 border border-yellow-100"
                          >
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Persyaratan</h3>
                            <div className="space-y-2">
                              {selectedCard.requirements.map((req, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.6 + index * 0.1 }}
                                  className="flex items-start gap-2 text-gray-700"
                                >
                                  <FileText className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                                  <span>{req}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {selectedCard.contact && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100"
                          >
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Kontak Panitia</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                  <Users className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-800">{selectedCard.contact.name}</div>
                                  <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
                                    <a href={`tel:${selectedCard.contact.phone}`} className="flex items-center gap-1 hover:text-green-600">
                                      <Phone className="w-4 h-4" />
                                      {selectedCard.contact.phone}
                                    </a>
                                    <a href={`mailto:${selectedCard.contact.email}`} className="flex items-center gap-1 hover:text-green-600">
                                      <Mail className="w-4 h-4" />
                                      {selectedCard.contact.email}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}

                    {/* Alert Details */}
                    {selectedCard.type === 'alert' && (
                      <>
                        {selectedCard.affectedAreas && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 border border-red-100"
                          >
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-red-600" />
                              Area Terdampak
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedCard.affectedAreas.map((area, index) => (
                                <motion.span
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.4 + index * 0.1 }}
                                  className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
                                >
                                  {area}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {selectedCard.emergencyContacts && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100"
                          >
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <Phone className="w-5 h-5 text-orange-600" />
                              Kontak Darurat
                            </h3>
                            <div className="space-y-3">
                              {selectedCard.emergencyContacts.map((contact, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 + index * 0.1 }}
                                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200"
                                >
                                  <div>
                                    <div className="font-medium text-gray-800">{contact.name}</div>
                                    <a href={`tel:${contact.phone}`} className="text-orange-600 hover:text-orange-700 text-sm flex items-center gap-1 mt-1">
                                      <Phone className="w-3 h-3" />
                                      {contact.phone}
                                    </a>
                                  </div>
                                  <a
                                    href={`tel:${contact.phone}`}
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all text-sm font-medium"
                                  >
                                    Hubungi
                                  </a>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {selectedCard.tips && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100"
                          >
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <Shield className="w-5 h-5 text-blue-600" />
                              Tips & Saran
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                              {selectedCard.tips.map((tip, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.6 + index * 0.1 }}
                                  className="flex items-start gap-2 text-gray-700"
                                >
                                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <span>{tip}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {selectedCard.reporter && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200"
                          >
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Dilaporkan Oleh</h3>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                {selectedCard.reporter.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium text-gray-800 flex items-center gap-2">
                                  {selectedCard.reporter.name}
                                  {selectedCard.reporter.verified && (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">Anggota Terverifikasi</div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}

                    {/* Tips Details */}
                    {selectedCard.type === 'tips' && (
                      <>
                        {selectedCard.tips && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100"
                          >
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <Shield className="w-5 h-5 text-green-600" />
                              Tips Lengkap
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                              {selectedCard.tips.map((tip, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.4 + index * 0.1 }}
                                  className="bg-white p-4 rounded-lg border border-green-200 hover:border-green-300 hover:shadow-md transition-all"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                      <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                                    </div>
                                    <p className="text-gray-700 flex-1">{tip}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {selectedCard.resources && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100"
                          >
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                              <FileText className="w-5 h-5 text-blue-600" />
                              Sumber Daya Terkait
                            </h3>
                            <div className="space-y-2">
                              {selectedCard.resources.map((resource, index) => (
                                <motion.a
                                  key={index}
                                  href={resource.url}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.6 + index * 0.1 }}
                                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all group"
                                >
                                  <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-700 font-medium">{resource.title}</span>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                </motion.a>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {selectedCard.author && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200"
                          >
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Ditulis Oleh</h3>
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                {selectedCard.author.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium text-gray-800 flex items-center gap-2">
                                  {selectedCard.author.name}
                                  {selectedCard.author.verified && (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">Tim Resmi BERINGIN</div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}

                    {/* Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{selectedCard.views}</div>
                        <div className="text-sm text-gray-600">Dilihat</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{selectedCard.comments || 0}</div>
                        <div className="text-sm text-gray-600">Komentar</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{selectedCard.relatedAlerts || 0}</div>
                        <div className="text-sm text-gray-600">Terkait</div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-200 p-6 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 text-gray-700">
                      <Share2 className="w-4 h-4" />
                      Bagikan
                    </button>
                    {selectedCard.coordinates && (
                      <Link
                        href={`/community-map-view?lat=${selectedCard.coordinates.lat}&lng=${selectedCard.coordinates.lng}`}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 text-gray-700"
                      >
                        <NavigationIcon className="w-4 h-4" />
                        Lihat di Peta
                      </Link>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all font-semibold"
                  >
                    Tutup
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
