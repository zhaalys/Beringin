'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, HelpCircle, Sparkles, Zap, Shield, 
  Users, MapPin, Bell, MessageSquare, ArrowRight,
  CheckCircle, Star, TrendingUp, Lightbulb
} from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      id: 'general',
      title: 'Umum',
      icon: HelpCircle,
      color: 'from-blue-500 to-blue-600',
      questions: [
        {
          q: 'Apa itu BERINGIN?',
          a: 'BERINGIN adalah platform komunitas yang menghubungkan warga untuk berbagi informasi penting, berita, dan alert real-time. Kami membantu masyarakat tetap terhubung dan terinformasi tentang kejadian di sekitar mereka.'
        },
        {
          q: 'Bagaimana cara menggunakan BERINGIN?',
          a: 'Cukup daftar akun, pilih daerah Anda, dan mulai berbagi informasi! Anda bisa melihat peta komunitas, membuat alert, membaca berita, dan berpartisipasi dalam diskusi komunitas.'
        },
        {
          q: 'Apakah BERINGIN gratis?',
          a: 'Ya, BERINGIN sepenuhnya gratis untuk digunakan. Kami berkomitmen untuk memberikan akses informasi yang mudah dan terjangkau bagi semua warga.'
        }
      ]
    },
    {
      id: 'features',
      title: 'Fitur',
      icon: Sparkles,
      color: 'from-purple-500 to-purple-600',
      questions: [
        {
          q: 'Bagaimana cara membuat alert?',
          a: 'Klik menu "Buat Alert", pilih lokasi di peta, isi informasi alert (jenis, deskripsi, tingkat urgensi), dan publikasikan. Alert Anda akan langsung terlihat oleh warga di daerah tersebut.'
        },
        {
          q: 'Apakah saya bisa berbagi foto di komunitas?',
          a: 'Tentu! Di halaman Komunitas, Anda bisa mengunggah hingga 4 foto sekaligus untuk melengkapi informasi yang Anda bagikan. Fitur ini membantu memberikan konteks visual yang lebih jelas.'
        },
        {
          q: 'Bagaimana sistem filter daerah bekerja?',
          a: 'Anda bisa memilih provinsi di dropdown, dan semua postingan/berita akan otomatis terfilter berdasarkan daerah yang dipilih. Ini membantu Anda fokus pada informasi yang relevan dengan lokasi Anda.'
        }
      ]
    },
    {
      id: 'safety',
      title: 'Keamanan',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      questions: [
        {
          q: 'Apakah informasi saya aman?',
          a: 'Ya, kami menggunakan enkripsi dan protokol keamanan terbaik untuk melindungi data Anda. Informasi pribadi tidak akan dibagikan tanpa persetujuan Anda.'
        },
        {
          q: 'Bagaimana cara melaporkan konten yang tidak pantas?',
          a: 'Klik tombol "..." di postingan yang ingin dilaporkan, pilih "Laporkan", dan isi alasan pelaporan. Tim moderasi kami akan meninjau laporan dalam 24 jam.'
        },
        {
          q: 'Apakah ada verifikasi untuk pengguna?',
          a: 'Ya, pengguna terverifikasi memiliki badge khusus yang menunjukkan bahwa akun mereka telah diverifikasi. Ini membantu membedakan informasi dari sumber terpercaya.'
        }
      ]
    },
    {
      id: 'community',
      title: 'Komunitas',
      icon: Users,
      color: 'from-green-500 to-green-600',
      questions: [
        {
          q: 'Bagaimana cara bergabung dengan komunitas?',
          a: 'Tidak perlu bergabung secara khusus! Setelah mendaftar dan memilih daerah, Anda otomatis menjadi bagian dari komunitas daerah tersebut dan bisa melihat serta berbagi informasi.'
        },
        {
          q: 'Bisakah saya mengikuti beberapa daerah sekaligus?',
          a: 'Saat ini, Anda bisa melihat semua daerah dengan memilih "Semua Daerah" di filter. Fitur untuk mengikuti beberapa daerah sekaligus sedang dalam pengembangan.'
        },
        {
          q: 'Bagaimana cara berinteraksi dengan postingan?',
          a: 'Anda bisa memberikan like, komentar, dan share pada postingan. Semua interaksi ini membantu meningkatkan visibilitas informasi penting di komunitas.'
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Pertanyaan yang Sering
            <span className="block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Diajukan
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang BERINGIN dan cara menggunakannya
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              >
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${category.color} p-6`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  </div>
                </div>

                {/* Questions */}
                <div className="p-6 space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const isOpen = openIndex === `${categoryIndex}-${questionIndex}`;
                    return (
                      <motion.div
                        key={questionIndex}
                        initial={false}
                        className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-green-300 transition-colors"
                      >
                        <button
                          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                          className="w-full p-6 flex items-center justify-between text-left group"
                        >
                          <div className="flex items-start space-x-4 flex-1">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0 mt-1`}>
                              <span className="text-white font-bold text-sm">{questionIndex + 1}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors flex-1">
                              {item.q}
                            </h3>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 flex-shrink-0"
                          >
                            <ChevronDown className={`w-6 h-6 text-gray-400 group-hover:text-green-600 transition-colors`} />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pl-16">
                                <div className="bg-gradient-to-r from-green-50 to-transparent rounded-xl p-4 border-l-4 border-green-500">
                                  <p className="text-gray-700 leading-relaxed">{item.a}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-green-600 via-green-500 to-green-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          <div className="relative z-10">
            <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Masih Ada Pertanyaan?
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Tim kami siap membantu Anda. Hubungi kami atau kunjungi pusat sumber daya untuk informasi lebih lanjut.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/resource-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Pusat Sumber Daya</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="/community"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Tanya Komunitas</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: CheckCircle, label: 'Pertanyaan Terjawab', value: '500+', color: 'from-green-500 to-green-600' },
            { icon: Users, label: 'Pengguna Aktif', value: '10K+', color: 'from-blue-500 to-blue-600' },
            { icon: TrendingUp, label: 'Kepuasan', value: '99%', color: 'from-purple-500 to-purple-600' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

