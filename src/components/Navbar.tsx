import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Menu, X, Home, User, Briefcase, Mail, Code } from 'lucide-react'

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
  scrollToSection: (sectionId: string) => void
}

const Navbar = ({ isDark, toggleTheme, scrollToSection }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)

  // Smooth scroll-based animations
  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 100], [0.9, 0.95])
  const navBlur = useTransform(scrollY, [0, 100], [8, 20])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.95])
  
  // Spring animations for smoother motion
  const smoothOpacity = useSpring(navOpacity, { stiffness: 300, damping: 30 })
  const smoothBlur = useSpring(navBlur, { stiffness: 300, damping: 30 })
  const smoothScale = useSpring(logoScale, { stiffness: 400, damping: 40 })

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ]

  // Smooth easing curves
  const smoothEasing = [0.25, 0.1, 0.25, 1]
  const bounceEasing = [0.68, -0.55, 0.265, 1.55]
  const elasticEasing = [0.175, 0.885, 0.32, 1.275]

  useEffect(() => {
    // Enhanced GSAP timeline with smoother animations
    const tl = gsap.timeline({ ease: "power3.out" })
    
    // Set initial states
    gsap.set([navRef.current, logoRef.current, menuItemsRef.current?.children], {
      opacity: 0,
      y: -30
    })
    
    tl.to(navRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .to(menuItemsRef.current?.children || [], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: {
        amount: 0.3,
        ease: "power2.out"
      }
    }, "-=0.4")

    // Smooth scroll detection with throttling
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY
          setIsScrolled(scrollPosition > 50)
          
          // Update active section with smooth detection
          const sections = ['home', 'about', 'skills', 'projects', 'contact']
          const offset = scrollPosition + 120

          for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
              const { offsetTop, offsetHeight } = element
              if (offset >= offsetTop && offset < offsetTop + offsetHeight) {
                if (activeSection !== section) {
                  setActiveSection(section)
                }
                break
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsOpen(false)
    
    // Smooth GSAP pulse animation
    gsap.to(`.nav-indicator-${sectionId}`, {
      scale: 1.05,
      duration: 0.15,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    })
  }

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen)
    
    // Smooth menu button animation
    gsap.to('.menu-button', {
      rotation: isOpen ? 0 : 180,
      duration: 0.4,
      ease: "back.out(1.7)"
    })
  }

  return (
    <motion.header
      ref={navRef}
      className={`fixed w-full top-0 z-50 transition-all duration-700 ease-out ${
        isScrolled 
          ? 'border-b border-zinc-200/30 dark:border-zinc-800/30 shadow-lg shadow-black/5 dark:shadow-black/20' 
          : ''
      }`}
      style={{
        backgroundColor: isScrolled 
          ? isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'
          : 'transparent',
        backdropFilter: `blur(${smoothBlur.get()}px)`,
        opacity: smoothOpacity.get()
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 1.2, 
        ease: smoothEasing,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Ultra-smooth Logo */}
          <motion.div
            ref={logoRef}
            className="flex-shrink-0 flex items-center"
            style={{ scale: smoothScale }}
            whileHover={{ 
              scale: 1.05,
              transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                mass: 0.8
              }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
          >
            <motion.span 
              className="font-bold text-2xl tracking-wide bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => scrollToSection('home')}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "300% 300%"
              }}
              whileHover={{
                backgroundSize: "400% 400%",
                transition: { duration: 0.6, ease: elasticEasing }
              }}
            >
              Fariha Habib
            </motion.span>
          </motion.div>
          
          {/* Silky-smooth Desktop Navigation */}
          <nav className="hidden md:flex space-x-2" ref={menuItemsRef}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  type: "spring", 
                  stiffness: 200,
                  damping: 20,
                  mass: 0.8
                }}
              >
                <motion.button
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-500 overflow-hidden ${
                    activeSection === item.id
                      ? 'text-white shadow-lg shadow-purple-500/20'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    transition: { 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 25,
                      mass: 0.5
                    }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    y: 0,
                    transition: { duration: 0.1 }
                  }}
                >
                  <span className="relative z-20 flex items-center gap-2">
                    <motion.div
                      animate={activeSection === item.id ? { 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      } : { rotate: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: elasticEasing,
                        times: [0, 0.5, 1]
                      }}
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    {item.label}
                  </span>
                  
                  {/* Smooth Active Background */}
                  {activeSection === item.id && (
                    <motion.div
                      className={`nav-indicator-${item.id} absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-full`}
                      layoutId="activeTab"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30,
                        mass: 0.8
                      }}
                    />
                  )}
                  
                  {/* Buttery Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-indigo-600/5 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { 
                        duration: 0.4,
                        ease: smoothEasing
                      }
                    }}
                  />
                  
                  {/* Ripple Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-indigo-400/20 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileTap={{ 
                      scale: [0, 1.2, 0], 
                      opacity: [0, 0.3, 0],
                      transition: { duration: 0.4 }
                    }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </nav>

          {/* Fluid Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                transition: { 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 20 
                }
              }}
              whileTap={{ 
                scale: 0.95,
                rotate: -5,
                transition: { duration: 0.1 }
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative rounded-full w-12 h-12 bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 dark:from-purple-900 dark:via-pink-900 dark:to-indigo-900 hover:from-purple-200 hover:via-pink-200 hover:to-indigo-200 dark:hover:from-purple-800 dark:hover:via-pink-800 dark:hover:to-indigo-800 border border-purple-200/50 dark:border-purple-700/50 overflow-hidden transition-all duration-500"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ 
                        rotate: -180, 
                        opacity: 0, 
                        scale: 0.3,
                        y: 20
                      }}
                      animate={{ 
                        rotate: 0, 
                        opacity: 1, 
                        scale: 1,
                        y: 0
                      }}
                      exit={{ 
                        rotate: 180, 
                        opacity: 0, 
                        scale: 0.3,
                        y: -20
                      }}
                      transition={{ 
                        duration: 0.5, 
                        ease: bounceEasing,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                    >
                      <Sun className="h-5 w-5 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ 
                        rotate: 180, 
                        opacity: 0, 
                        scale: 0.3,
                        y: -20
                      }}
                      animate={{ 
                        rotate: 0, 
                        opacity: 1, 
                        scale: 1,
                        y: 0
                      }}
                      exit={{ 
                        rotate: -180, 
                        opacity: 0, 
                        scale: 0.3,
                        y: 20
                      }}
                      transition={{ 
                        duration: 0.5, 
                        ease: bounceEasing,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                    >
                      <Moon className="h-5 w-5 text-purple-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Animated Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: isDark 
                      ? "radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)"
                  }}
                  transition={{ duration: 0.6, ease: smoothEasing }}
                />
              </Button>
            </motion.div>
          </div>

          {/* Smooth Mobile Controls */}
          <div className="flex md:hidden items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full w-10 h-10 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun-mobile"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: smoothEasing }}
                    >
                      <Sun className="h-4 w-4 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon-mobile"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: smoothEasing }}
                    >
                      <Moon className="h-4 w-4 text-purple-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="rounded-full w-10 h-10 menu-button transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                      transition={{ 
                        duration: 0.4, 
                        ease: bounceEasing,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 180, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -180, opacity: 0, scale: 0.5 }}
                      transition={{ 
                        duration: 0.4, 
                        ease: bounceEasing,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Silky Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              height: 0, 
              y: -20,
              backdropFilter: "blur(0px)"
            }}
            animate={{ 
              opacity: 1, 
              height: "auto", 
              y: 0,
              backdropFilter: "blur(20px)"
            }}
            exit={{ 
              opacity: 0, 
              height: 0, 
              y: -20,
              backdropFilter: "blur(0px)"
            }}
            transition={{ 
              duration: 0.5, 
              ease: smoothEasing,
              height: { duration: 0.4 },
              backdropFilter: { duration: 0.3 }
            }}
            className="md:hidden bg-white/90 dark:bg-black/90 border-t border-zinc-200/30 dark:border-zinc-800/30 overflow-hidden"
          >
            <motion.div 
              className="px-4 py-6 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-400 flex items-center gap-3 relative overflow-hidden ${
                    activeSection === item.id
                      ? 'text-white shadow-lg shadow-purple-500/20'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
                  }`}
                  initial={{ 
                    opacity: 0, 
                    x: -30,
                    scale: 0.9
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1
                  }}
                  transition={{ 
                    delay: index * 0.08 + 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 0.8
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    x: 8,
                    transition: { 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25 
                    }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  {/* Smooth Active Background */}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl"
                      layoutId="activeMobileTab"
                      initial={{ opacity: 0, scale: 0.8, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 30,
                        mass: 0.8
                      }}
                    />
                  )}
                  
                  <motion.div
                    className="relative z-10 flex items-center gap-3"
                    animate={activeSection === item.id ? { 
                      x: [0, 3, 0],
                      transition: { 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatDelay: 3,
                        ease: smoothEasing
                      }
                    } : {}}
                  >
                    <motion.div
                      animate={activeSection === item.id ? { 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ 
                        duration: 0.8, 
                        ease: elasticEasing,
                        times: [0, 0.5, 1]
                      }}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar