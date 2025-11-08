'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, Droplets, Calendar, Shield, MapPin, 
  Upload, X, Check, Clock, Users, Bell, Image as ImageIcon,
  Tag, Link as LinkIcon, Eye, Send, ArrowLeft, Info
} from 'lucide-react';

export default function AlertCreationInterface() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    type: 'traffic',
    description: '',
    location: '',
    area: '',
    severity: 'medium',
    latitude: '',
    longitude: '',
    tags: [],
    notifyUsers: true,
    expiresIn: '24',
    image: null
  });

  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Alert created:', formData);
    alert('Alert berhasil dibuat!');
    
    setIsSubmitting(false);
    router.push('/community-map-view');
  };

  const alertTypes = [
    { value: 'traffic', label: 'Kemacetan', icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    { value: 'flood', label: 'Banjir', icon: Droplets, color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { value: 'safety', label: 'Keamanan', icon: Shield, color: 'bg-red-100 text-red-700 border-red-300' },
    { value: 'event', label: 'Acara', icon: Calendar, color: 'bg-green-100 text-green-700 border-green-300' }
  ];

  const getTypeIcon = (type) => {
    return alertTypes.find(t => t.value === type)?.icon || AlertTriangle;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-green-100"
        >
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-green-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Kembali</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Buat Alert Baru</h1>
            <p className="text-gray-600">
              Bagikan informasi penting dengan komunitas Anda
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Judul Alert <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    placeholder="Contoh: Kemacetan di Jalan Raya Sudirman"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 karakter</p>
                </div>

                {/* Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tipe Alert <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {alertTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: type.value })}
                          className={`p-4 rounded-xl border-2 transition-all text-center ${
                            formData.type === type.value
                              ? `${type.color} border-current shadow-md transform scale-105`
                              : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className={`w-8 h-8 mx-auto mb-2 ${formData.type === type.value ? 'text-current' : 'text-gray-400'}`} />
                          <div className="text-sm font-medium">{type.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Deskripsi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={500}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                    placeholder="Jelaskan detail alert Anda secara lengkap..."
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 karakter</p>
                </div>

                {/* Location */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                      Alamat <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                        placeholder="Masukkan alamat lengkap"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-2">
                      Daerah <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    >
                      <option value="">Pilih Daerah</option>
                      <option>Jakarta Pusat</option>
                      <option>Jakarta Selatan</option>
                      <option>Jakarta Utara</option>
                      <option>Jakarta Barat</option>
                      <option>Jakarta Timur</option>
                      <option>Depok</option>
                      <option>Bogor</option>
                      <option>Tangerang</option>
                      <option>Bekasi</option>
                    </select>
                  </div>
                </div>

                {/* Coordinates */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="latitude" className="block text-sm font-semibold text-gray-700 mb-2">
                      Latitude (Opsional)
                    </label>
                    <input
                      type="number"
                      step="any"
                      id="latitude"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                      placeholder="-6.2088"
                    />
                  </div>
                  <div>
                    <label htmlFor="longitude" className="block text-sm font-semibold text-gray-700 mb-2">
                      Longitude (Opsional)
                    </label>
                    <input
                      type="number"
                      step="any"
                      id="longitude"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                      placeholder="106.8456"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Foto (Opsional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      {formData.image ? (
                        <div className="space-y-2">
                          <ImageIcon className="w-12 h-12 text-green-600 mx-auto" />
                          <p className="text-sm text-gray-600">{formData.image.name}</p>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image: null })}
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            Hapus
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                          <p className="text-sm text-gray-600">Klik untuk upload foto</p>
                          <p className="text-xs text-gray-500">PNG, JPG maks 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tag (Opsional)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                      placeholder="Tambahkan tag"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                    >
                      <Tag className="w-5 h-5" />
                    </button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Severity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tingkat Kepentingan <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'low', label: 'Rendah', color: 'bg-green-100 text-green-700 border-green-300' },
                      { value: 'medium', label: 'Sedang', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
                      { value: 'high', label: 'Tinggi', color: 'bg-red-100 text-red-700 border-red-300' }
                    ].map((severity) => (
                      <button
                        key={severity.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, severity: severity.value })}
                        className={`p-4 rounded-xl border-2 transition-all font-medium ${
                          formData.severity === severity.value
                            ? `${severity.color} border-current shadow-md transform scale-105`
                            : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {severity.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Settings */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-700 mb-3">Pengaturan Tambahan</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-800">Notifikasi Pengguna</div>
                        <div className="text-xs text-gray-600">Kirim notifikasi ke pengguna di sekitar</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="notifyUsers"
                        checked={formData.notifyUsers}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Kedaluwarsa (jam)</span>
                      </div>
                    </label>
                    <select
                      name="expiresIn"
                      value={formData.expiresIn}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    >
                      <option value="1">1 Jam</option>
                      <option value="6">6 Jam</option>
                      <option value="12">12 Jam</option>
                      <option value="24">24 Jam</option>
                      <option value="48">48 Jam</option>
                      <option value="72">72 Jam</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Membuat Alert...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Buat Alert</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-6 py-3.5 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/community-map-view')}
                    className="px-6 py-3.5 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar - Preview & Help */}
            <div className="space-y-6">
              {/* Preview Card */}
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-4"
                >
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Preview Alert
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {(() => {
                        const Icon = getTypeIcon(formData.type);
                        return <Icon className="w-5 h-5 text-green-600" />;
                      })()}
                      <h4 className="font-semibold text-gray-800">{formData.title || 'Judul Alert'}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{formData.description || 'Deskripsi alert...'}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{formData.area || 'Daerah'}</span>
                      <span className={`px-2 py-1 rounded ${formData.severity === 'high' ? 'bg-red-100 text-red-700' : formData.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {formData.severity}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Help Card */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-200 sticky top-4">
                <h3 className="font-bold text-green-800 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Tips
                </h3>
                <ul className="text-sm text-green-700 space-y-2">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Pastikan judul alert jelas dan informatif</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Berikan deskripsi yang detail untuk membantu komunitas</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Pilih tingkat kepentingan yang sesuai</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Koordinat GPS akan membantu menampilkan alert di peta</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Foto dapat membantu menjelaskan situasi dengan lebih baik</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
