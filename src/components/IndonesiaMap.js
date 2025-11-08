'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { MapPin, Users, AlertTriangle, TrendingUp } from 'lucide-react';

// Dynamic import untuk Leaflet (menghindari SSR issues)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Import L untuk custom icon (hanya di client side)
let L;
if (typeof window !== 'undefined') {
  L = require('leaflet');
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

// Data provinsi dengan koordinat geografis yang akurat (lat, lng)
const provinces = [
  { id: 'aceh', name: 'Aceh', users: '2.5K', alerts: 45, growth: '+12%', lat: 4.6951, lng: 96.7494 },
  { id: 'sumut', name: 'Sumatera Utara', users: '3.2K', alerts: 67, growth: '+15%', lat: 3.5952, lng: 98.6722 },
  { id: 'sumbar', name: 'Sumatera Barat', users: '1.8K', alerts: 34, growth: '+8%', lat: -0.9492, lng: 100.3543 },
  { id: 'riau', name: 'Riau', users: '2.1K', alerts: 42, growth: '+10%', lat: 0.5077, lng: 101.4478 },
  { id: 'jambi', name: 'Jambi', users: '1.5K', alerts: 28, growth: '+7%', lat: -1.6101, lng: 103.6131 },
  { id: 'sumsel', name: 'Sumatera Selatan', users: '2.3K', alerts: 51, growth: '+13%', lat: -2.9761, lng: 104.7754 },
  { id: 'bengkulu', name: 'Bengkulu', users: '0.9K', alerts: 19, growth: '+5%', lat: -3.7928, lng: 102.2608 },
  { id: 'lampung', name: 'Lampung', users: '1.7K', alerts: 38, growth: '+9%', lat: -5.4294, lng: 105.2620 },
  { id: 'jakarta', name: 'DKI Jakarta', users: '8.5K', alerts: 156, growth: '+25%', lat: -6.2088, lng: 106.8456 },
  { id: 'jabar', name: 'Jawa Barat', users: '6.2K', alerts: 134, growth: '+20%', lat: -6.9175, lng: 107.6191 },
  { id: 'jateng', name: 'Jawa Tengah', users: '4.8K', alerts: 98, growth: '+18%', lat: -7.0051, lng: 110.4381 },
  { id: 'jogja', name: 'DI Yogyakarta', users: '2.1K', alerts: 45, growth: '+12%', lat: -7.7956, lng: 110.3695 },
  { id: 'jatim', name: 'Jawa Timur', users: '5.5K', alerts: 112, growth: '+19%', lat: -7.2575, lng: 112.7521 },
  { id: 'banten', name: 'Banten', users: '2.8K', alerts: 58, growth: '+14%', lat: -6.1200, lng: 106.1503 },
  { id: 'bali', name: 'Bali', users: '3.1K', alerts: 67, growth: '+16%', lat: -8.3405, lng: 115.0920 },
  { id: 'kalbar', name: 'Kalimantan Barat', users: '1.2K', alerts: 24, growth: '+6%', lat: -0.0263, lng: 109.3425 },
  { id: 'kalteng', name: 'Kalimantan Tengah', users: '0.8K', alerts: 16, growth: '+4%', lat: -2.2102, lng: 113.9200 },
  { id: 'kalsel', name: 'Kalimantan Selatan', users: '1.4K', alerts: 29, growth: '+8%', lat: -3.3144, lng: 114.5925 },
  { id: 'kaltim', name: 'Kalimantan Timur', users: '1.6K', alerts: 32, growth: '+9%', lat: -0.5021, lng: 117.1536 },
  { id: 'sulut', name: 'Sulawesi Utara', users: '1.1K', alerts: 22, growth: '+6%', lat: 1.4748, lng: 124.8421 },
  { id: 'sulteng', name: 'Sulawesi Tengah', users: '0.9K', alerts: 18, growth: '+5%', lat: -0.9000, lng: 119.8500 },
  { id: 'sulsel', name: 'Sulawesi Selatan', users: '2.2K', alerts: 44, growth: '+11%', lat: -5.1477, lng: 119.4327 },
  { id: 'sultra', name: 'Sulawesi Tenggara', users: '0.7K', alerts: 14, growth: '+4%', lat: -4.1444, lng: 122.4452 },
  { id: 'gorontalo', name: 'Gorontalo', users: '0.5K', alerts: 10, growth: '+3%', lat: 0.5449, lng: 123.0597 },
  { id: 'maluku', name: 'Maluku', users: '0.6K', alerts: 12, growth: '+3%', lat: -3.2385, lng: 128.5970 },
  { id: 'papua', name: 'Papua', users: '0.8K', alerts: 15, growth: '+4%', lat: -2.5333, lng: 140.7167 },
];

// Custom Marker Icon
const createCustomIcon = (isHovered = false) => {
  if (!L) return null;
  const size = isHovered ? 20 : 16;
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background-color: ${isHovered ? '#22c55e' : '#86efac'};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      transition: all 0.3s;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

export default function IndonesiaMap() {
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid synchronous state update in effect
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12 border border-green-100">
            <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-blue-50" style={{ aspectRatio: '16/9', minHeight: '500px' }}>
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Memuat peta...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Jangkauan <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">BERINGIN</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Platform kami telah menjangkau berbagai daerah di seluruh Indonesia
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12 border border-green-100"
        >
          {/* Leaflet Map */}
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9', minHeight: '500px' }}>
            <MapContainer
              center={[-2.5, 118]}
              zoom={5}
              style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
              scrollWheelZoom={true}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {provinces.map((province) => (
                <Marker
                  key={province.id}
                  position={[province.lat, province.lng]}
                  icon={createCustomIcon(hoveredProvince?.id === province.id)}
                  eventHandlers={{
                    mouseover: () => setHoveredProvince(province),
                    mouseout: () => setHoveredProvince(null),
                  }}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-bold text-gray-800 mb-2 text-lg">{province.name}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{province.users} Pengguna</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm">{province.alerts} Alert Aktif</span>
                        </div>
                        <div className="flex items-center space-x-2 text-green-600">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm font-semibold">{province.growth} Pertumbuhan</span>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Custom Tooltip */}
            <AnimatePresence>
              {hoveredProvince && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-4 right-4 bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-6 min-w-[280px] z-50 pointer-events-none"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {hoveredProvince.name}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">{hoveredProvince.users} Pengguna</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium">{hoveredProvince.alerts} Alert Aktif</span>
                        </div>
                        <div className="flex items-center space-x-2 text-green-600">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm font-semibold">{hoveredProvince.growth} Pertumbuhan</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            {[
              { label: 'Total Provinsi', value: '34', icon: MapPin },
              { label: 'Pengguna Aktif', value: '50K+', icon: Users },
              { label: 'Alert Aktif', value: '1.2K+', icon: AlertTriangle },
              { label: 'Pertumbuhan', value: '+18%', icon: TrendingUp }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-100 text-center"
              >
                <stat.icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

