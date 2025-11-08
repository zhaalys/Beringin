'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import TextPressure from './TextPressure';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Upper Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Explore Column */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wide">Explore</h3>
            <nav className="space-y-3">
              <Link 
                href="/" 
                className="flex items-center justify-between group text-lg font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                <span>BERANDA</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <div className="h-px bg-gray-200"></div>
              <Link 
                href="/community-map-view" 
                className="flex items-center justify-between group text-lg font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                <span>PETA KOMUNITAS</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <div className="h-px bg-gray-200"></div>
              <Link 
                href="/alert-creation-interface" 
                className="flex items-center justify-between group text-lg font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                <span>BUAT ALERT</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <div className="h-px bg-gray-200"></div>
              <Link 
                href="/resource-center" 
                className="flex items-center justify-between group text-lg font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                <span>PUSAT SUMBER</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <div className="h-px bg-gray-200"></div>
              <Link 
                href="/community" 
                className="flex items-center justify-between group text-lg font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                <span>KOMUNITAS</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </nav>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wide">Connect</h3>
            <nav className="space-y-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between group text-lg font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="h-px bg-gray-200"></div>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between group text-lg font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="h-px bg-gray-200"></div>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between group text-lg font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                <span>TWITTER</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="h-px bg-gray-200"></div>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between group text-lg font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                <span>YOUTUBE</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </nav>
          </div>

          {/* Info Column */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">BERINGIN</p>
                <p className="text-xs text-gray-500">Komunitas Terhubung, Informasi Terpercaya</p>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-0.5 text-gray-400" />
                <span>+62 812 3456 7890</span>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-0.5 text-gray-400" />
                <span>info@beringin.id</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                <span>Jl. Kemang Raya 88A, Jakarta Selatan 12730</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Copyright © <span className="font-bold text-gray-700">BERINGIN</span> 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section - Large BERINGIN Text with TextPressure */}
      <div className="relative bg-gradient-to-b from-white via-green-50 to-green-100" style={{ position: 'relative', minHeight: '350px', paddingTop: '100px', paddingBottom: '50px', overflow: 'visible' }}>
        <TextPressure
          text="BERINGIN"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={false}
          textColor="#10b981"
          strokeColor="#059669"
          minFontSize={120}
        />
      </div>
    </footer>
  );
}
