'use client';

import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Plus, Search, Filter, TrendingUp, Clock,
  ThumbsUp, MessageCircle, Share2, Bookmark, MoreVertical,
  Users, MapPin, AlertTriangle, Calendar, Heart, Shield,
  ArrowRight, X, Send, Image as ImageIcon, Newspaper, ChevronDown,
  Paperclip, Smile, Phone, Video, Info
} from 'lucide-react';

export default function Community() {
  const [selectedRegion, setSelectedRegion] = useState('Semua Daerah');
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const messagesEndRef = useRef(null);
  const regionDropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto scroll to bottom when new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedRegion]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(event.target)) {
        setShowRegionDropdown(false);
      }
    };

    if (showRegionDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showRegionDropdown]);

  const indonesianRegions = [
    'Semua Daerah',
    'DKI Jakarta',
    'Jawa Barat',
    'Jawa Tengah',
    'Jawa Timur',
    'Sumatera Utara',
    'Sumatera Selatan',
    'Banten',
    'Bali',
    'Sulawesi Selatan',
    'Kalimantan Timur',
    'Yogyakarta',
    'Aceh',
    'Riau',
    'Lampung'
  ];

  // Messages data - like WhatsApp group chat
  const messages = [
    {
      id: 1,
      author: 'Ahmad Faisal',
      authorAvatar: 'AF',
      content: 'Hati-hati kemacetan panjang di Jalan Raya Sudirman arah selatan. Perkiraan waktu tempuh bertambah 1-2 jam. Hindari rute ini jika memungkinkan.',
      region: 'DKI Jakarta',
      location: 'Jakarta Pusat',
      time: '14:30',
      date: 'Hari ini',
      category: 'traffic',
      verified: true,
      image: null
    },
    {
      id: 2,
      author: 'Siti Nurhaliza',
      authorAvatar: 'SN',
      content: 'Berbagi tips untuk menjaga keamanan lingkungan sekitar. Pastikan lampu jalan berfungsi, lakukan ronda malam secara rutin.',
      region: 'DKI Jakarta',
      location: 'Jakarta Selatan',
      time: '14:45',
      date: 'Hari ini',
      category: 'safety',
      verified: true,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
    },
    {
      id: 3,
      author: 'Budi Santoso',
      authorAvatar: 'BS',
      content: 'Festival Komunitas BERINGIN akan diadakan di Lapangan Monas pada tanggal 25 Januari 2024. Acara dimulai pukul 09:00 WIB. Semua warga diundang!',
      region: 'DKI Jakarta',
      location: 'Jakarta Pusat',
      time: '15:00',
      date: 'Hari ini',
      category: 'events',
      verified: false,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400'
    },
    {
      id: 4,
      author: 'Rina Wati',
      authorAvatar: 'RW',
      content: 'Laporan banjir di beberapa area Depok. Tinggi air mencapai 50cm di beberapa titik. Warga diharapkan waspada dan hindari area yang terdampak.',
      region: 'Jawa Barat',
      location: 'Depok',
      time: '15:15',
      date: 'Hari ini',
      category: 'safety',
      verified: true,
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400'
    },
    {
      id: 5,
      author: 'Reporter Bandung',
      authorAvatar: 'RB',
      content: 'Pemerintah Kota Bandung mengumumkan pembangunan jembatan baru di Jalan Asia Afrika. Proyek ini diharapkan selesai dalam 6 bulan.',
      region: 'Jawa Barat',
      location: 'Bandung',
      time: '15:30',
      date: 'Hari ini',
      category: 'news',
      verified: true,
      image: null
    },
    {
      id: 6,
      author: 'Siti Rahayu',
      authorAvatar: 'SR',
      content: 'Car Free Day akan dilaksanakan setiap Minggu pagi di Jalan Tunjungan. Ajak keluarga untuk berolahraga dan menikmati suasana kota yang lebih segar.',
      region: 'Jawa Timur',
      location: 'Surabaya',
      time: '15:45',
      date: 'Hari ini',
      category: 'events',
      verified: false,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400'
    },
    {
      id: 7,
      author: 'Budi Yogyakarta',
      authorAvatar: 'BY',
      content: 'Festival Budaya Yogyakarta akan digelar di Alun-Alun Utara mulai tanggal 1 Februari. Menampilkan berbagai kesenian tradisional dan kuliner khas Jogja.',
      region: 'Yogyakarta',
      location: 'Yogyakarta',
      time: '16:00',
      date: 'Hari ini',
      category: 'news',
      verified: true,
      image: null
    },
    {
      id: 8,
      author: 'Ahmad Medan',
      authorAvatar: 'AM',
      content: 'Bagaimana pendapat kalian tentang layanan transportasi umum di Medan? Apakah sudah memadai atau perlu perbaikan? Mari diskusikan bersama.',
      region: 'Sumatera Utara',
      location: 'Medan',
      time: '16:15',
      date: 'Hari ini',
      category: 'general',
      verified: false,
      image: null
    },
    {
      id: 9,
      author: 'Kadek Bali',
      authorAvatar: 'KB',
      content: 'Pemerintah Bali mengumumkan pembukaan kembali beberapa pantai populer dengan protokol kesehatan yang ketat. Wisatawan diharapkan mematuhi aturan yang berlaku.',
      region: 'Bali',
      location: 'Denpasar',
      time: '16:30',
      date: 'Hari ini',
      category: 'news',
      verified: true,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'
    },
    {
      id: 10,
      author: 'Polisi Jalan Raya',
      authorAvatar: 'PJ',
      content: 'Kemacetan terjadi di Tol Cipularang KM 45-50 arah Jakarta. Perkiraan waktu tempuh bertambah 2-3 jam. Disarankan menggunakan alternatif rute.',
      region: 'Jawa Barat',
      location: 'Cikampek',
      time: '16:45',
      date: 'Hari ini',
      category: 'traffic',
      verified: true,
      image: null
    },
    {
      id: 11,
      author: 'Ketua RT Semarang',
      authorAvatar: 'KS',
      content: 'Komunitas warga Semarang mengadakan program ronda malam setiap hari mulai pukul 22:00. Mari bergabung untuk menjaga keamanan lingkungan kita.',
      region: 'Jawa Tengah',
      location: 'Semarang',
      time: '17:00',
      date: 'Hari ini',
      category: 'safety',
      verified: false,
      image: null
    }
  ];

  const filteredMessages = messages.filter(msg => {
    if (selectedRegion !== 'Semua Daerah' && msg.region !== selectedRegion) return false;
    return true;
  });

  const handleSendMessage = () => {
    if (newMessage.trim() || selectedImages.length > 0) {
      // In a real app, this would send the message
      console.log('Sending message:', newMessage, selectedImages);
      setNewMessage('');
      setSelectedImages([]);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.slice(0, 4); // Max 4 images
    setSelectedImages(prev => [...prev, ...imageFiles].slice(0, 4));
    setShowImagePicker(false);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const getCategoryColor = (category) => {
    const colors = {
      news: 'bg-purple-100 text-purple-700 border-purple-200',
      safety: 'bg-red-100 text-red-700 border-red-200',
      traffic: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      events: 'bg-green-100 text-green-700 border-green-200',
      general: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      news: 'Berita',
      safety: 'Keamanan',
      traffic: 'Lalu Lintas',
      events: 'Acara',
      general: 'Diskusi'
    };
    return labels[category] || category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header - Like WhatsApp Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  <Users className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-800">Komunitas BERINGIN</h1>
                  <p className="text-sm text-gray-500">Berbagi informasi dan berita</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Info className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Region Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-green-100">
            <div className="relative" ref={regionDropdownRef}>
              <button
                onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all flex items-center justify-between bg-white hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 font-medium">{selectedRegion}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showRegionDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showRegionDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {indonesianRegions.map((region) => (
                    <button
                      key={region}
                      onClick={() => {
                        setSelectedRegion(region);
                        setShowRegionDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-green-50 transition-colors flex items-center space-x-2 ${
                        selectedRegion === region ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{region}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Chat Messages Container - Like WhatsApp */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 280px)', minHeight: '500px' }}>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23e5e7eb\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
            {filteredMessages.map((message, index) => {
              const showDate = index === 0 || filteredMessages[index - 1].date !== message.date;
              return (
                <div key={message.id}>
                  {showDate && (
                    <div className="text-center my-4">
                      <span className="bg-white px-4 py-1 rounded-full text-xs text-gray-500 shadow-sm">
                        {message.date}
                      </span>
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start space-x-2 mb-4 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {message.authorAvatar}
                    </div>
                    <div className="flex-1 max-w-[75%]">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-800 text-sm">{message.author}</span>
                        {message.verified && (
                          <Shield className="w-3 h-3 text-green-600" />
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getCategoryColor(message.category)}`}>
                          {getCategoryLabel(message.category)}
                        </span>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm p-3 border border-gray-200 hover:shadow-md transition-shadow">
                        {message.image && (
                          <div className="mb-2 rounded-xl overflow-hidden">
                            <img 
                              src={message.image} 
                              alt="Shared" 
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{message.region} - {message.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-gray-400 hover:text-green-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-green-600 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-green-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Selected Images Preview */}
          {selectedImages.length > 0 && (
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2 overflow-x-auto">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img 
                      src={URL.createObjectURL(image)} 
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input Area - Like WhatsApp */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-end space-x-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowImagePicker(!showImagePicker)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder="Tulis pesan..."
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all pr-10"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() && selectedImages.length === 0}
                className="p-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
