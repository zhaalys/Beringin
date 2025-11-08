'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Mail, Phone, MapPin, AlertTriangle, MessageCircle, 
  Calendar, BookOpen, Award, TrendingUp, User, BarChart3, 
  Activity, Settings, Shield, CheckCircle, Star, Heart, 
  Edit2, Save, X, Bell, Lock, Eye, EyeOff, Trash2, 
  Download, Share2, Filter, Search, Clock, Map, FileText,
  Zap, Users, Globe, BellRing, Moon, Sun, LogOut, Key, ArrowRight
} from 'lucide-react';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    alerts: true,
    community: true,
    darkMode: false
  });
  
  const [profileData, setProfileData] = useState({
    name: 'Ahmad Faisal',
    email: 'ahmad.faisal@example.com',
    phone: '+62 812 3456 7890',
    address: 'Jakarta, Indonesia',
    bio: 'Anggota aktif komunitas BERINGIN yang peduli dengan informasi publik dan keamanan lingkungan.',
    joinDate: '2024-01-01',
    avatar: null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [stats] = useState({
    alertsCreated: 12,
    alertsContributed: 8,
    communityPoints: 245,
    badges: 5,
    alertsViewed: 156,
    commentsMade: 34,
    resourcesAccessed: 28,
    daysActive: 45
  });

  const [badges] = useState([
    { id: 1, name: 'Pioneer', description: 'Anggota pertama di daerah Anda', icon: '🌟', color: 'from-yellow-400 to-yellow-600', earned: true },
    { id: 2, name: 'Alert Master', description: 'Membuat 10+ alert', icon: '🚨', color: 'from-red-400 to-red-600', earned: true },
    { id: 3, name: 'Community Helper', description: 'Membantu 20+ warga', icon: '🤝', color: 'from-blue-400 to-blue-600', earned: true },
    { id: 4, name: 'Verified', description: 'Akun terverifikasi', icon: '✓', color: 'from-green-400 to-green-600', earned: true },
    { id: 5, name: 'Active Member', description: 'Aktif selama 30 hari', icon: '⭐', color: 'from-purple-400 to-purple-600', earned: true },
    { id: 6, name: 'Super Contributor', description: 'Kontribusi 50+ kali', icon: '💎', color: 'from-indigo-400 to-indigo-600', earned: false },
  ]);

  const [recentActivity] = useState([
    { id: 1, type: 'alert', title: 'Membuat alert kemacetan di Jalan Sudirman', date: '2 jam yang lalu', icon: AlertTriangle, location: 'Jakarta Pusat' },
    { id: 2, type: 'comment', title: 'Memberikan komentar pada alert banjir', date: '5 jam yang lalu', icon: MessageCircle, location: 'Jakarta Selatan' },
    { id: 3, type: 'alert', title: 'Membuat alert acara komunitas gotong royong', date: '1 hari yang lalu', icon: Calendar, location: 'Jakarta Utara' },
    { id: 4, type: 'resource', title: 'Mengakses panduan evakuasi banjir', date: '2 hari yang lalu', icon: BookOpen, location: '-' },
    { id: 5, type: 'alert', title: 'Memverifikasi alert keamanan', date: '3 hari yang lalu', icon: Shield, location: 'Jakarta Barat' },
  ]);

  const [myAlerts] = useState([
    { id: 1, title: 'Kemacetan di Jalan Sudirman', type: 'traffic', status: 'active', views: 45, date: '2024-12-15', location: 'Jakarta Pusat' },
    { id: 2, title: 'Acara Gotong Royong Komunitas', type: 'event', status: 'active', views: 128, date: '2024-12-14', location: 'Jakarta Utara' },
    { id: 3, title: 'Banjir di Area Kelurahan Merdeka', type: 'flood', status: 'resolved', views: 234, date: '2024-12-10', location: 'Jakarta Selatan' },
    { id: 4, title: 'Keamanan Lingkungan', type: 'safety', status: 'active', views: 67, date: '2024-12-08', location: 'Jakarta Barat' },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Simulasi save
    setTimeout(() => {
      alert('Profil berhasil diperbarui!');
    }, 300);
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Password baru tidak cocok!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password minimal 8 karakter!');
      return;
    }
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password berhasil diubah!');
  };

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handleDeleteAccount = () => {
    alert('Fitur penghapusan akun akan segera tersedia. Hubungi admin untuk bantuan.');
    setShowDeleteConfirm(false);
  };

  const getAlertTypeColor = (type) => {
    const colors = {
      traffic: 'bg-yellow-100 text-yellow-700',
      flood: 'bg-blue-100 text-blue-700',
      event: 'bg-green-100 text-green-700',
      safety: 'bg-red-100 text-red-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-6 border border-green-100 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100/50 to-transparent rounded-bl-full"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-5xl md:text-6xl text-white font-bold shadow-xl ring-4 ring-white relative overflow-hidden">
                {profileData.avatar ? (
                  <Image src={profileData.avatar} alt={profileData.name} fill className="object-cover" />
                ) : (
                  profileData.name.charAt(0)
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-700 transition-all cursor-pointer group-hover:scale-110">
                <Camera className="w-6 h-6" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2 flex-wrap">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          className="border-2 border-green-500 rounded-lg px-3 py-1 outline-none bg-transparent text-3xl md:text-4xl font-bold"
                        />
                      ) : (
                        profileData.name
                      )}
                    </h1>
                    <span className="px-4 py-1.5 bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-full text-sm font-semibold border border-green-200 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Anggota Aktif
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 max-w-2xl">
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border-2 border-green-500 rounded-lg p-3 outline-none resize-none"
                      />
                    ) : (
                      profileData.bio
                    )}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-center md:justify-start">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <Mail className="w-4 h-4 text-green-600" />
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          className="border-b-2 border-green-500 outline-none bg-transparent min-w-[200px]"
                        />
                      ) : (
                        <span>{profileData.email}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <Phone className="w-4 h-4 text-green-600" />
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleChange}
                          className="border-b-2 border-green-500 outline-none bg-transparent min-w-[150px]"
                        />
                      ) : (
                        <span>{profileData.phone}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <MapPin className="w-4 h-4 text-green-600" />
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={profileData.address}
                          onChange={handleChange}
                          className="border-b-2 border-green-500 outline-none bg-transparent min-w-[150px]"
                        />
                      ) : (
                        <span>{profileData.address}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all shadow-lg flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Simpan
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Batal
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all shadow-lg flex items-center gap-2"
                >
                  <Edit2 className="w-5 h-5" />
                  Edit Profil
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          {[
            { label: 'Alert Dibuat', value: stats.alertsCreated, icon: AlertTriangle, color: 'from-green-500 to-green-600' },
            { label: 'Kontribusi', value: stats.alertsContributed, icon: MessageCircle, color: 'from-blue-500 to-blue-600' },
            { label: 'Poin Komunitas', value: stats.communityPoints, icon: Star, color: 'from-yellow-500 to-yellow-600' },
            { label: 'Lencana', value: stats.badges, icon: Award, color: 'from-purple-500 to-purple-600' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg`}
            >
              <stat.icon className="w-8 h-8 mb-3 opacity-90" />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl mb-6 border border-green-100 overflow-hidden"
        >
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'profile', label: 'Profil', icon: User },
              { id: 'alerts', label: 'Alert Saya', icon: AlertTriangle },
              { id: 'badges', label: 'Lencana', icon: Award },
              { id: 'stats', label: 'Statistik', icon: BarChart3 },
              { id: 'activity', label: 'Aktivitas', icon: Activity },
              { id: 'settings', label: 'Pengaturan', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[120px] px-6 py-4 font-medium transition-all relative ${
                    activeTab === tab.id
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 inline mr-2" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Informasi Pribadi</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Bergabung</label>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <span>{new Date(profileData.joinDate).toLocaleDateString('id-ID', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status Akun</label>
                      <div className="flex items-center gap-2 text-green-600 font-medium">
                        <Shield className="w-4 h-4" />
                        <span>✓ Terverifikasi</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hari Aktif</label>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Activity className="w-4 h-4 text-green-600" />
                        <span>{stats.daysActive} hari</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Kontribusi</label>
                      <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span>{stats.alertsCreated + stats.alertsContributed} kontribusi</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'alerts' && (
                <motion.div
                  key="alerts"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Alert Saya</h3>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        Cari
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {myAlerts.map((alert) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all"
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg font-bold text-gray-800">{alert.title}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAlertTypeColor(alert.type)}`}>
                                {alert.type}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(alert.status)}`}>
                                {alert.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {alert.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {new Date(alert.date).toLocaleDateString('id-ID')}
                              </div>
                              <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                {alert.views} dilihat
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'badges' && (
                <motion.div
                  key="badges"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Lencana & Prestasi</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {badges.map((badge) => (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className={`bg-gradient-to-br ${badge.color} rounded-2xl p-6 text-white shadow-lg relative overflow-hidden ${
                          !badge.earned ? 'opacity-50 grayscale' : ''
                        }`}
                      >
                        {!badge.earned && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Lock className="w-8 h-8 opacity-50" />
                          </div>
                        )}
                        <div className="text-5xl mb-3">{badge.icon}</div>
                        <h4 className="text-xl font-bold mb-2">{badge.name}</h4>
                        <p className="text-sm opacity-90">{badge.description}</p>
                        {badge.earned && (
                          <div className="mt-4 flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Diperoleh</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Statistik Detail</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      { label: 'Alert Dibuat', value: stats.alertsCreated, icon: AlertTriangle, color: 'green' },
                      { label: 'Kontribusi', value: stats.alertsContributed, icon: MessageCircle, color: 'blue' },
                      { label: 'Alert Dilihat', value: stats.alertsViewed, icon: Eye, color: 'purple' },
                      { label: 'Komentar', value: stats.commentsMade, icon: MessageCircle, color: 'yellow' },
                      { label: 'Sumber Daya', value: stats.resourcesAccessed, icon: BookOpen, color: 'indigo' },
                      { label: 'Hari Aktif', value: stats.daysActive, icon: Activity, color: 'pink' },
                      { label: 'Poin Komunitas', value: stats.communityPoints, icon: Star, color: 'orange' },
                      { label: 'Lencana', value: stats.badges, icon: Award, color: 'red' },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className={`bg-gradient-to-br from-${stat.color}-50 to-white p-6 rounded-xl border border-${stat.color}-100`}
                      >
                        <stat.icon className={`w-8 h-8 text-${stat.color}-600 mb-3`} />
                        <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'activity' && (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Aktivitas Terkini</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center gap-4 p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all"
                        >
                          <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-7 h-7 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800 mb-1">{activity.title}</div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {activity.date}
                              </div>
                              {activity.location !== '-' && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {activity.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Pengaturan</h3>
                  
                  {/* Notifications */}
                  <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-green-600" />
                      Notifikasi
                    </h4>
                    <div className="space-y-4">
                      {[
                        { key: 'email', label: 'Notifikasi Email', desc: 'Terima notifikasi melalui email', icon: Mail },
                        { key: 'push', label: 'Notifikasi Push', desc: 'Terima notifikasi push di browser', icon: BellRing },
                        { key: 'sms', label: 'Notifikasi SMS', desc: 'Terima notifikasi melalui SMS', icon: Phone },
                        { key: 'alerts', label: 'Alert Real-time', desc: 'Notifikasi untuk alert penting', icon: AlertTriangle },
                        { key: 'community', label: 'Update Komunitas', desc: 'Berita dan update dari komunitas', icon: Users },
                      ].map((notif) => {
                        const Icon = notif.icon;
                        return (
                          <div key={notif.key} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5 text-green-600" />
                              <div>
                                <div className="font-medium text-gray-800">{notif.label}</div>
                                <div className="text-sm text-gray-600">{notif.desc}</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifications[notif.key]}
                                onChange={() => handleNotificationChange(notif.key)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Security */}
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      Keamanan
                    </h4>
                    <div className="space-y-4">
                      {!showPasswordForm ? (
                        <button
                          onClick={() => setShowPasswordForm(true)}
                          className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <Key className="w-5 h-5 text-blue-600" />
                            <div className="text-left">
                              <div className="font-medium text-gray-800">Ubah Password</div>
                              <div className="text-sm text-gray-600">Perbarui password akun Anda</div>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </button>
                      ) : (
                        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password Saat Ini</label>
                            <input
                              type="password"
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                            <input
                              type="password"
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-green-500 outline-none"
                            />
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={handlePasswordSave}
                              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
                            >
                              Simpan
                            </button>
                            <button
                              onClick={() => {
                                setShowPasswordForm(false);
                                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                              }}
                              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Appearance */}
                  <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      {notifications.darkMode ? <Moon className="w-5 h-5 text-purple-600" /> : <Sun className="w-5 h-5 text-purple-600" />}
                      Tampilan
                    </h4>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div>
                        <div className="font-medium text-gray-800">Mode Gelap</div>
                        <div className="text-sm text-gray-600">Aktifkan tema gelap</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.darkMode}
                          onChange={() => handleNotificationChange('darkMode')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  {/* Danger Zone */}
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-bold text-red-600 mb-4">Zona Berbahaya</h4>
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center gap-2"
                      >
                        <Trash2 className="w-5 h-5" />
                        Hapus Akun
                      </button>
                      <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all flex items-center gap-2">
                        <LogOut className="w-5 h-5" />
                        Keluar
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hapus Akun?</h3>
              <p className="text-gray-600 mb-6">
                Tindakan ini tidak dapat dibatalkan. Semua data Anda akan dihapus secara permanen.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                >
                  Hapus
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Batal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
