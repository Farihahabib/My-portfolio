import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Code, Database, Server, Github, Linkedin, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  displayedText: string
  handleResumeDownload: () => void
  scrollToSection: (sectionId: string) => void
  socialLinks: Array<{
    icon: any
    label: string
    url: string
    color: string
  }>
}

export default function HeroSection({ 
  displayedText, 
  handleResumeDownload, 
  scrollToSection, 
  socialLinks 
}: HeroSectionProps) {
  return (
    <section id="home" className="flex-grow pt-24 px-4 flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-slate-900">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-purple-300/30 dark:border-purple-500/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-lg"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -180, -360],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/6 w-12 h-12 border border-indigo-400/40 dark:border-indigo-300/40"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1, 0.8, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/60 dark:bg-purple-300/60 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-1/4 left-4 opacity-20 text-purple-600 dark:text-purple-400 pointer-events-none transform -translate-x-1/2"
        initial={{ x: -100, opacity: 0, rotate: -180 }}
        animate={{ 
          x: 0, 
          opacity: 0.2, 
          rotate: 0,
          transition: { 
            duration: 1.5, 
            ease: "backOut",
            delay: 0.5 
          }
        }}
        whileInView={{
          rotate: [0, 10, -10, 0],
          transition: { 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <ChevronLeft className="w-15 h-25" strokeWidth={2} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-4 opacity-20 text-purple-600 dark:text-purple-400 pointer-events-none transform translate-x-1/2"
        initial={{ x: 100, opacity: 0, rotate: 180 }}
        animate={{ 
          x: 0, 
          opacity: 0.2, 
          rotate: 0,
          transition: { 
            duration: 1.5, 
            ease: "backOut",
            delay: 0.7 
          }
        }}
        whileInView={{
          rotate: [0, -10, 10, 0],
          transition: { 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }
        }}
      >
        <ChevronRight className="w-15 h-25" strokeWidth={2} />
      </motion.div>

      <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-8 md:py-20 relative z-10">
        {/* Text Content */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col items-start space-y-6 text-center md:text-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: 1.2, 
              ease: "easeOut",
              delay: 0.3
            }
          }}
        >
          <div className="space-y-2 w-full">
            <motion.h2 
              className="text-3xl font-bold flex items-center justify-center md:justify-start gap-1 text-zinc-900 dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  delay: 0.5,
                  type: "spring",
                  stiffness: 200
                }
              }}
            >
              Hello
              <motion.span 
                className="text-purple-600 dark:text-purple-400 text-4xl leading-none"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              >
                .
              </motion.span>
            </motion.h2>
            
            <div className="flex items-center justify-center md:justify-start gap-4">
              <motion.div 
                className="h-0.5 w-12 bg-purple-600 dark:bg-purple-400 hidden sm:block"
                initial={{ width: 0 }}
                animate={{ 
                  width: 48,
                  transition: { 
                    duration: 1, 
                    delay: 0.8,
                    ease: "easeOut"
                  }
                }}
              />
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 1, 
                    delay: 0.7,
                    type: "spring",
                    stiffness: 150
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                I'm Fariha
              </motion.h1>
            </div>
            
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-600 dark:text-zinc-400 mt-2 min-h-[2.5rem] flex items-center justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  delay: 0.9
                }
              }}
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                {displayedText}
                <span className="inline-block w-0.5 h-6 bg-purple-600 dark:bg-purple-400 ml-1 animate-pulse" />
              </span>
            </motion.p>
          </div>
          
          <motion.p 
            className="text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto md:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                delay: 1.1
              }
            }}
          >
            Passionate about building scalable web applications and crafting intuitive user experiences using MongoDB, Express, React, and Node.js.
          </motion.p>
          
          {/* Social Links */}
          <motion.div 
            className="flex justify-center md:justify-start gap-4 py-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                delay: 1.2
              }
            }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 bg-white dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all duration-300 ${social.color} hover:border-purple-400 dark:hover:border-purple-500 shadow-sm hover:shadow-md group relative overflow-hidden`}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  transition: { 
                    delay: index * 0.1 + 1.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }
                }}
                whileHover={{ 
                  scale: 1.15,
                  y: -3,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25 
                  }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-indigo-500/10 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0, rotate: 180 }}
                  whileHover={{ 
                    scale: 1, 
                    rotate: 0,
                    transition: { duration: 0.3 }
                  }}
                />
                
                <motion.div
                  whileHover={{ 
                    rotate: 360,
                    transition: { duration: 0.6 }
                  }}
                  className="relative z-10"
                >
                  <social.icon className="w-5 h-5" />
                </motion.div>
                
                {/* Tooltip */}
                <motion.div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  {social.label}
                </motion.div>
                
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 bg-purple-400/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ 
                    scale: [0, 1.5, 0], 
                    opacity: [0, 0.3, 0],
                    transition: { duration: 0.4 }
                  }}
                />
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                delay: 1.5
              }
            }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium px-8 py-3 shadow-lg shadow-pink-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Got a project?</span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleResumeDownload}
                variant="outline" 
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-black font-medium px-8 py-3 transition-all relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-purple-600 dark:bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div 
          className="w-full md:w-1/2 flex justify-center relative"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            scale: 1,
            transition: { 
              duration: 1.2, 
              ease: "easeOut",
              delay: 0.5
            }
          }}
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
            {/* Animated Rings */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-purple-600/20 dark:border-purple-400/30"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute inset-2 rounded-full border border-pink-500/20 dark:border-pink-400/30"
              animate={{
                rotate: [360, 0],
                scale: [1, 0.95, 1]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Gradient Background */}
            <motion.div 
              className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-600/20 via-purple-600/5 to-transparent dark:from-purple-400/30 dark:via-purple-400/10 dark:to-transparent"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Profile Image */}
            <motion.img 
              alt="Fariha Habib - MERN Stack Developer" 
              className="absolute inset-2 w-[95%] h-[95%] object-cover rounded-full shadow-2xl border-4 border-white dark:border-black z-10" 
              src="https://i.ibb.co/DFYYsgH/profile.jpg"
              whileHover={{
                scale: 1.05,
                rotate: [0, 2, -2, 0],
                transition: { 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 300
                }
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating Elements Around Image */}
            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 border border-zinc-300 dark:border-zinc-700 rounded-full opacity-50"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Code Symbols Floating Around */}
            <motion.div
              className="absolute -top-8 left-1/4 text-purple-500 dark:text-purple-400 opacity-60"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Code className="w-6 h-6" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 -left-6 text-pink-500 dark:text-pink-400 opacity-60"
              animate={{
                y: [0, 12, 0],
                x: [0, 8, 0],
                rotate: [0, -180, -360],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Database className="w-6 h-6" />
            </motion.div>
            
            <motion.div
              className="absolute top-1/2 -right-8 text-indigo-500 dark:text-indigo-400 opacity-60"
              animate={{
                x: [0, 15, 0],
                rotate: [0, 90, 180, 270, 360],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <Server className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}