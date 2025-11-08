'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, BookOpen, Shield, AlertTriangle, Users, Building2,
  Heart, FileText, Download, ExternalLink, Calendar, TrendingUp,
  CheckCircle, Star, ArrowRight, Filter, X
} from 'lucide-react';

export default function ResourceCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { id: 'all', name: 'Semua', icon: BookOpen, color: 'text-gray-600' },
    { id: 'safety', name: 'Keamanan', icon: Shield, color: 'text-red-600' },
    { id: 'emergency', name: 'Darurat', icon: AlertTriangle, color: 'text-orange-600' },
    { id: 'community', name: 'Komunitas', icon: Users, color: 'text-blue-600' },
    { id: 'government', name: 'Pemerintah', icon: Building2, color: 'text-purple-600' },
    { id: 'health', name: 'Kesehatan', icon: Heart, color: 'text-pink-600' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Panduan Evakuasi Darurat',
      category: 'emergency',
      description: 'Langkah-langkah evakuasi yang aman saat terjadi bencana alam atau keadaan darurat lainnya. Termasuk panduan untuk gempa, banjir, dan kebakaran.',
      icon: AlertTriangle,
      link: '#',
      date: '2024-01-15',
      downloads: 1250,
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      title: 'Tips Keamanan Komunitas',
      category: 'safety',
      description: 'Cara menjaga keamanan lingkungan sekitar dan melaporkan aktivitas mencurigakan. Panduan lengkap untuk ronda malam dan sistem keamanan lingkungan.',
      icon: Shield,
      link: '#',
      date: '2024-01-10',
      downloads: 980,
      rating: 4.6,
      featured: true
    },
    {
      id: 3,
      title: 'Layanan Kesehatan Masyarakat',
      category: 'health',
      description: 'Informasi tentang fasilitas kesehatan terdekat dan layanan kesehatan gratis. Daftar rumah sakit, puskesmas, dan klinik di setiap daerah.',
      icon: Heart,
      link: '#',
      date: '2024-01-08',
      downloads: 2100,
      rating: 4.9,
      featured: false
    },
    {
      id: 4,
      title: 'Program Komunitas BERINGIN',
      category: 'community',
      description: 'Daftar program dan kegiatan komunitas yang dapat diikuti oleh warga. Termasuk workshop, seminar, dan kegiatan sosial.',
      icon: Users,
      link: '#',
      date: '2024-01-05',
      downloads: 750,
      rating: 4.7,
      featured: false
    },
    {
      id: 5,
      title: 'Kontak Layanan Pemerintah',
      category: 'government',
      description: 'Daftar nomor telepon dan alamat kantor layanan pemerintah setempat. Informasi lengkap untuk layanan publik dan pengaduan.',
      icon: Building2,
      link: '#',
      date: '2024-01-03',
      downloads: 3200,
      rating: 4.5,
      featured: false
    },
    {
      id: 6,
      title: 'Prosedur Pelaporan Insiden',
      category: 'safety',
      description: 'Cara melaporkan insiden atau kejadian penting kepada pihak berwenang. Panduan lengkap dengan template laporan.',
      icon: FileText,
      link: '#',
      date: '2024-01-01',
      downloads: 1500,
      rating: 4.8,
      featured: true
    },
    {
      id: 7,
      title: 'Pusat Informasi Bencana',
      category: 'emergency',
      description: 'Sumber informasi resmi tentang bencana alam dan cara menghadapinya. Update real-time dan panduan kesiapsiagaan.',
      icon: AlertTriangle,
      link: '#',
      date: '2023-12-28',
      downloads: 2800,
      rating: 4.9,
      featured: false
    },
    {
      id: 8,
      title: 'Forum Diskusi Komunitas',
      category: 'community',
      description: 'Bergabung dengan forum diskusi untuk berbagi informasi dan pengalaman. Platform interaktif untuk komunikasi warga.',
      icon: Users,
      link: '#',
      date: '2023-12-25',
      downloads: 1200,
      rating: 4.6,
      featured: false
    },
    {
      id: 9,
      title: 'Panduan Pertolongan Pertama',
      category: 'health',
      description: 'Panduan lengkap pertolongan pertama pada kecelakaan. Termasuk CPR, penanganan luka, dan situasi darurat medis.',
      icon: Heart,
      link: '#',
      date: '2023-12-20',
      downloads: 1900,
      rating: 4.7,
      featured: false
    },
    {
      id: 10,
      title: 'Regulasi Keamanan Lingkungan',
      category: 'government',
      description: 'Peraturan dan regulasi terkait keamanan lingkungan. Informasi tentang hak dan kewajiban warga.',
      icon: Building2,
      link: '#',
      date: '2023-12-18',
      downloads: 850,
      rating: 4.4,
      featured: false
    },
    {
      id: 11,
      title: 'Sistem Peringatan Dini',
      category: 'emergency',
      description: 'Cara menggunakan sistem peringatan dini untuk bencana. Panduan instalasi dan penggunaan aplikasi alert.',
      icon: AlertTriangle,
      link: '#',
      date: '2023-12-15',
      downloads: 2400,
      rating: 4.8,
      featured: true
    },
    {
      id: 12,
      title: 'Kesehatan Mental Komunitas',
      category: 'health',
      description: 'Sumber daya untuk kesehatan mental di komunitas. Informasi tentang konseling dan dukungan psikologis.',
      icon: Heart,
      link: '#',
      date: '2023-12-12',
      downloads: 1100,
      rating: 4.5,
      featured: false
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'popular') return b.downloads - a.downloads;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const featuredResources = filteredResources.filter(r => r.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Pusat Sumber Daya
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Akses berbagai sumber informasi penting untuk komunitas Anda
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari sumber daya..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 flex-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-50 hover:border-green-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${selectedCategory === category.id ? 'text-white' : category.color}`} />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              >
                <option value="newest">Terbaru</option>
                <option value="popular">Paling Populer</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              Sumber Daya Unggulan
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <motion.div
                    key={resource.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-green-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center">
                          <Icon className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold">{resource.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(resource.date).toLocaleDateString('id-ID')}
                        </div>
                        <div className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          {resource.downloads}
                        </div>
                      </div>
                      
                      <Link
                        href={resource.link}
                        className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                      >
                        Baca selengkapnya
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* All Resources Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Semua Sumber Daya</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-green-100 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold">{resource.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(resource.date).toLocaleDateString('id-ID')}
                      </div>
                      <div className="flex items-center">
                        <Download className="w-3 h-3 mr-1" />
                        {resource.downloads}
                      </div>
                    </div>
                    
                    <Link
                      href={resource.link}
                      className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors"
                    >
                      Baca selengkapnya
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Tidak ada sumber daya ditemukan
            </h3>
            <p className="text-gray-600">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
          </div>
        )}

        {/* Quick Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-6">Tautan Cepat</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/alert-creation-interface"
              className="bg-white/20 hover:bg-white/30 rounded-xl p-4 transition-all backdrop-blur-sm"
            >
              <div className="font-semibold mb-1">Buat Alert</div>
              <div className="text-sm text-green-50">Bagikan informasi penting</div>
            </Link>
            <Link
              href="/community-map-view"
              className="bg-white/20 hover:bg-white/30 rounded-xl p-4 transition-all backdrop-blur-sm"
            >
              <div className="font-semibold mb-1">Lihat Peta</div>
              <div className="text-sm text-green-50">Jelajahi peta komunitas</div>
            </Link>
            <Link
              href="/community"
              className="bg-white/20 hover:bg-white/30 rounded-xl p-4 transition-all backdrop-blur-sm"
            >
              <div className="font-semibold mb-1">Forum Komunitas</div>
              <div className="text-sm text-green-50">Diskusi dengan warga</div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
