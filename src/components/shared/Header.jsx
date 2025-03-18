"use client"
import React, { useState, useEffect, useCallback } from 'react'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();
  let scrollTimeout = null;

  // Transform values for scroll-based animations with smoother transitions
  const headerBackground = useTransform(
    scrollY,
    [0, 50, 100],
    ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.98)"]
  );

  const headerHeight = useTransform(
    scrollY,
    [0, 50, 100],
    ["4.5rem", "4.5rem", "4rem"]
  );

  const logoScale = useTransform(
    scrollY,
    [0, 50, 100],
    [1, 0.95, 0.9]
  );

  const handleScrollbarVisibility = useCallback((show) => {
    if (show) {
      document.documentElement.classList.add('is-scrolling');
    } else {
      document.documentElement.classList.remove('is-scrolling');
    }
  }, []);

  useEffect(() => {
    // Initialize - ensure no scrollbar class is present
    handleScrollbarVisibility(false);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setShowScrollTop(currentScrollY > 400);

      // Show scrollbar
      handleScrollbarVisibility(true);

      // Clear the previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set a new timeout to hide scrollbar with a longer delay for smoother experience
      scrollTimeout = setTimeout(() => {
        if (currentScrollY <= 50) {
          handleScrollbarVisibility(false);
        }
      }, 1500); // Increased delay for smoother transition
    };

    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      // Cleanup - remove scrollbar class
      handleScrollbarVisibility(false);
    };
  }, [handleScrollbarVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <motion.header
        style={{
          backgroundColor: headerBackground,
          height: headerHeight,
        }}
        className={`backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? 'shadow-lg' : 'shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section */}
            <motion.div
              className="relative group"
              style={{ scale: logoScale }}
              whileHover={{ scale: scrolled ? 0.95 : 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <a href="/" className="flex items-center">
                <div className="relative w-32 sm:w-40 md:w-48 h-8 sm:h-10 md:h-12">
                  <Image
                    src="/images/logo.png"
                    alt="Breathe Again Logo"
                    fill
                    className="object-contain object-left"
                    priority
                    quality={100}
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                    style={{
                      filter: 'contrast(1.05) brightness(1.02)'
                    }}
                  />
                </div>
              </a>
            </motion.div>

            <motion.button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon
                icon={isMenuOpen ? faTimes : faBars}
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
            </motion.button>

            <nav className="hidden md:flex items-center gap-x-2 lg:gap-x-3">
              <div className="flex items-center gap-x-1 lg:gap-x-2">
                {["About", "Speaking", "Blog"].map((item) => (
                  <motion.a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className={`relative px-3 lg:px-4 py-2 text-gray-700 hover:text-gray-900 group transition-all duration-300 ${
                      scrolled ? 'text-sm' : 'text-base'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{item}</span>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-400 group-hover:w-full transition-all duration-300 ease-out"></div>
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="/get-started"
                className={`relative inline-flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full overflow-hidden shadow-lg transition-all duration-300 ${
                  scrolled ? 'text-sm py-2' : 'text-base'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <motion.span
                  className="text-lg"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 "></div>
              </motion.a>
            </nav>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md absolute left-0 right-0 top-full border-t border-gray-100"
              >
                <nav className="flex flex-col gap-y-2 py-4 px-4 sm:px-6">
                  {["About", "Speaking", "Blog"].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`/${item.toLowerCase()}`}
                      className="px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-orange-50 rounded-lg text-sm sm:text-base"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                  <motion.a
                    href="/get-started"
                    className="mx-4 mt-2 text-center py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-md text-sm sm:text-base"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.a>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 p-3 sm:p-4 bg-orange-500 text-white rounded-full shadow-lg z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FontAwesomeIcon icon={faArrowUp} className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header