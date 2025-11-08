'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('nav')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/community-map-view', label: 'Peta Komunitas' },
    { href: '/alert-creation-interface', label: 'Buat Alert' },
    { href: '/resource-center', label: 'Pusat Sumber' },
    { href: '/community', label: 'Komunitas' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <nav className="sticky top-0 sm:top-4 z-50 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Bubble Navbar Container */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-white/95 backdrop-blur-md rounded-full sm:rounded-full shadow-2xl border border-green-100/50 px-3 sm:px-6 py-2 sm:py-3 transition-all ${
            isScrolled ? 'shadow-xl' : 'shadow-2xl'
          }`}
        >
          <div className="flex justify-between items-center">
            {/* Logo Only */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 relative z-10"
            >
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-white rounded-full shadow-lg border-2 border-green-200 overflow-hidden"
                  style={{ minWidth: '48px', minHeight: '48px' }}
                >
                  <img
                    src="/logo.png"
                    alt="BERINGIN Logo"
                    className="w-full h-full object-contain p-1"
                    style={{ 
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      console.error('Logo failed to load from /logo.png');
                      // Show placeholder if logo fails
                      e.target.style.display = 'none';
                      const parent = e.target.parentElement;
                      if (parent && !parent.querySelector('.logo-placeholder')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'logo-placeholder w-full h-full flex items-center justify-center text-green-600 font-bold text-xs';
                        placeholder.textContent = 'B';
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={link.href}
                    className={`px-3 xl:px-4 py-2 rounded-full text-xs xl:text-sm font-medium transition-all relative ${
                      pathname === link.href
                        ? 'bg-green-100 text-green-700 shadow-sm'
                        : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-green-100 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href="/authentication-portal"
                  className="px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium text-gray-700 hover:text-green-600 transition-colors rounded-full"
                >
                  Masuk
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/user-profile"
                  className="px-3 xl:px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full text-xs xl:text-sm font-medium hover:from-green-700 hover:to-green-600 transition-all shadow-md hover:shadow-lg"
                >
                  Profil
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-gray-700 hover:bg-green-50 transition-colors relative z-20"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring", damping: 25 }}
                className="lg:hidden mt-4 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-green-100/50 p-4 overflow-hidden relative z-50"
              >
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                          pathname === link.href
                            ? 'bg-green-100 text-green-700 shadow-sm'
                            : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                        }`}
                      >
                        {link.label}
                        {pathname === link.href && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="ml-auto w-2 h-2 bg-green-600 rounded-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="pt-3 border-t border-gray-200 space-y-2">
                    <Link
                      href="/authentication-portal"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors rounded-xl text-center"
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/user-profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl text-base font-semibold text-center shadow-md hover:shadow-lg transition-all"
                    >
                      Profil
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

