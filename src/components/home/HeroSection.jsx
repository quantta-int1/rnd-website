'use client';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const stats = [
    { number: "10,000+", label: "Cured" },
    { number: "95%", label: "Success" },
    { number: "99%", label: "Referrals" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      style={{ y, opacity }}
      className="relative min-h-[90vh] flex items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/40 z-10" />
        <img
          src="/images/IMother.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={containerVariants}>
            <motion.h1 
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Optimize{" "}
              <motion.span 
                className="text-orange-500"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                your health
              </motion.span>{" "}
              through{" "}
              <motion.span 
                className="text-orange-500"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                balanced
              </motion.span>{" "}
              nutrition
            </motion.h1>

            <motion.h2 
              className="text-2xl md:text-3xl text-white mb-8"
              variants={itemVariants}
            >
              Simple. Scientific. Sustainable.
            </motion.h2>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mb-8"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-start justify-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.h3 
                    className="text-orange-500 text-2xl md:text-4xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {stat.number}
                  </motion.h3>
                  <motion.p 
                    className="text-white text-2xl md:text-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.1 }}
                  >
                    {stat.label}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p 
              className="text-xl text-white/90 mb-8"
              variants={itemVariants}
            >
              BreatheAgain is a global platform that helps you live a long & healthy life
            </motion.p>

            <motion.div variants={itemVariants}>
              <motion.button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side image placeholder */}
          {/* <motion.div
            className="hidden md:block"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/health-illustration.png"
              alt="Health Illustration"
              className="w-full h-auto"
            />
          </motion.div> */}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection; 