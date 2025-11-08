'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { 
  Search, Filter, MapPin, AlertTriangle, Droplets, Calendar, 
  Shield, TrendingUp, Clock, Users, Radio, X, Layers, 
  ZoomIn, ZoomOut, Navigation2, Info
} from 'lucide-react';

// Dynamically import map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-green-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Memuat peta...</p>
      </div>
    </div>
  ),
});

export default function CommunityMapView() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'Kemacetan di Jalan Raya Sudirman',
      type: 'traffic',
      location: [-6.2088, 106.8456],
      description: 'Kemacetan panjang di Jalan Raya Sudirman, diperkirakan 2 jam',
      time: '2 jam yang lalu',
      severity: 'medium',
      area: 'Jakarta Pusat',
      verified: true,
      reports: 15
    },
    {
      id: 2,
      title: 'Banjir di Area Depok',
      type: 'flood',
      location: [-6.4025, 106.7942],
      description: 'Tinggi air mencapai 50cm, beberapa jalan tidak bisa dilalui',
      time: '5 jam yang lalu',
      severity: 'high',
      area: 'Depok',
      verified: true,
      reports: 32
    },
    {
      id: 3,
      title: 'Festival Komunitas BERINGIN',
      type: 'event',
      location: [-6.1751, 106.8650],
      description: 'Festival Komunitas BERINGIN akan diadakan di Lapangan Monas',
      time: '1 hari yang lalu',
      severity: 'low',
      area: 'Jakarta Pusat',
      verified: true,
      reports: 8
    },
    {
      id: 4,
      title: 'Aktivitas Mencurigakan',
      type: 'safety',
      location: [-6.2297, 106.8000],
      description: 'Laporkan aktivitas mencurigakan di area sekitar',
      time: '3 jam yang lalu',
      severity: 'high',
      area: 'Jakarta Selatan',
      verified: false,
      reports: 3
    },
    {
      id: 5,
      title: 'Kemacetan di Tol Jagorawi',
      type: 'traffic',
      location: [-6.3000, 106.9000],
      description: 'Kemacetan akibat kecelakaan di KM 15',
      time: '1 jam yang lalu',
      severity: 'high',
      area: 'Bogor',
      verified: true,
      reports: 24
    },
    {
      id: 6,
      title: 'Banjir Bandang',
      type: 'flood',
      location: [-6.3500, 106.8500],
      description: 'Banjir bandang di daerah aliran sungai',
      time: '6 jam yang lalu',
      severity: 'high',
      area: 'Tangerang',
      verified: true,
      reports: 45
    }
  ]);

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [mapLayers, setMapLayers] = useState({
    alerts: true,
    traffic: true,
    events: true,
    safety: true
  });

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.type === filter;
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.area.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      traffic: AlertTriangle,
      flood: Droplets,
      event: Calendar,
      safety: Shield
    };
    return icons[type] || MapPin;
  };

  const getTypeColor = (type) => {
    const colors = {
      traffic: 'text-yellow-600 bg-yellow-100',
      flood: 'text-blue-600 bg-blue-100',
      event: 'text-green-600 bg-green-100',
      safety: 'text-red-600 bg-red-100'
    };
    return colors[type] || 'text-gray-600 bg-gray-100';
  };

  const stats = {
    total: alerts.length,
    high: alerts.filter(a => a.severity === 'high').length,
    verified: alerts.filter(a => a.verified).length,
    today: alerts.filter(a => a.time.includes('jam')).length
  };

  const areas = ['Jakarta Pusat', 'Jakarta Selatan', 'Depok', 'Bogor', 'Tangerang'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-96 bg-white border-r border-gray-200 overflow-y-auto flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-600 to-green-500 sticky top-0 z-10">
            <h1 className="text-2xl font-bold text-white mb-2">Peta Komunitas</h1>
            <p className="text-green-50 text-sm">Jelajahi informasi di sekitar Anda</p>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari alert atau lokasi..."
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                <div className="text-xs text-gray-600">Total Alert</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-red-600">{stats.high}</div>
                <div className="text-xs text-gray-600">Prioritas Tinggi</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
                <div className="text-xs text-gray-600">Terverifikasi</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">{stats.today}</div>
                <div className="text-xs text-gray-600">Hari Ini</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-xs text-green-600 hover:text-green-700"
              >
                {showFilters ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {['all', 'traffic', 'flood', 'event', 'safety'].map((type) => {
                const Icon = type === 'all' ? Filter : getTypeIcon(type);
                return (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                      filter === type
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type !== 'all' && <Icon className="w-3 h-3" />}
                    <span>{type === 'all' ? 'Semua' : type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  </button>
                );
              })}
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3 pt-3 border-t border-gray-200"
              >
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Radius: {radius} km
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Daerah</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    <option>Semua Daerah</option>
                    {areas.map(area => (
                      <option key={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </div>

          {/* Alert List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">
                Alert ({filteredAlerts.length})
              </h3>
              <button className="text-xs text-green-600 hover:text-green-700 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                Terbaru
              </button>
            </div>
            
            {filteredAlerts.map((alert) => {
              const Icon = getTypeIcon(alert.type);
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedAlert(alert)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedAlert?.id === alert.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(alert.type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-800">{alert.title}</h4>
                          {alert.verified && (
                            <Shield className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {alert.area}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {alert.time}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {alert.reports}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ml-2 ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapComponent 
            alerts={filteredAlerts}
            selectedAlert={selectedAlert}
            onAlertSelect={setSelectedAlert}
            mapLayers={mapLayers}
          />
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2 z-[1000]">
            <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-200">
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded transition-colors mb-2">
                <ZoomIn className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded transition-colors mb-2">
                <ZoomOut className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                <Navigation2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700 flex items-center">
                  <Layers className="w-3 h-3 mr-1" />
                  Layer
                </span>
              </div>
              <div className="space-y-2">
                {Object.entries(mapLayers).map(([key, value]) => (
                  <label key={key} className="flex items-center text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setMapLayers({ ...mapLayers, [key]: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="capitalize">{key}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Area Info Panel */}
          {selectedAlert && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-2xl p-6 border border-gray-200 z-[1000] max-w-md"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{selectedAlert.title}</h3>
                    {selectedAlert.verified && (
                      <Shield className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{selectedAlert.description}</p>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-green-600" />
                  {selectedAlert.area}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-green-600" />
                  {selectedAlert.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-green-600" />
                  {selectedAlert.reports} laporan
                </div>
                <div className="flex items-center text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(selectedAlert.severity)}`}>
                    {selectedAlert.severity}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Lihat Detail
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
