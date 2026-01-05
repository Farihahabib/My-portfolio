import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Code, Database, Server, Globe, Award, Users, Coffee, Heart, ExternalLink, Github, Mail, Phone, MapPin, Send, Calendar, Star, CheckCircle, AlertCircle, Terminal, ArrowUp, Linkedin, Facebook } from 'lucide-react'
import emailjs from '@emailjs/browser'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import './globals.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Extend Window interface for Lenis
declare global {
  interface Window {
    lenis: Lenis | null
  }
}

function App() {
  const [isDark, setIsDark] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  // Typewriter effect states
  const [displayedText, setDisplayedText] = useState('')
  
  // Refs for animations
  const aboutRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const techSkillsRef = useRef<HTMLDivElement>(null)

  // EmailJS configuration - Replace these with your actual EmailJS credentials
  const EMAILJS_SERVICE_ID = 'service_portfolio' // Replace with your EmailJS service ID
  const EMAILJS_TEMPLATE_ID = 'template_contact' // Replace with your EmailJS template ID  
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key

  // Typewriter texts
  const typewriterTexts = [
    "MERN Stack Developer",
    "Full Stack Developer", 
    "React.js Developer",
    "Node.js Developer",
    "MongoDB Expert"
  ]

  useEffect(() => {
    // Initialize Lenis for ultra-smooth scrolling
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
    })

    // Store Lenis instance globally for access in scrollToSection
    window.lenis = lenis

    // Add lenis class to html for CSS integration
    document.documentElement.classList.add('lenis')

    // Connect Lenis with GSAP ScrollTrigger for buttery smooth performance
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    // Enhanced RAF integration for 60fps smooth scrolling
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Disable GSAP's default lag smoothing for better Lenis integration
    gsap.ticker.lagSmoothing(0)

    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY)
    
    // Force light mode initially, then check preferences
    document.documentElement.classList.remove('dark')
    
    // Initialize theme based on preference or system
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }

    // Start typewriter effect after initial delay
    const startTypewriter = () => {
      let textIndex = 0
      let charIndex = 0
      let currentText = ''
      let isDeleting = false

      const typewriterInterval = setInterval(() => {
        const fullText = typewriterTexts[textIndex]
        
        if (!isDeleting) {
          // Typing
          currentText = fullText.substring(0, charIndex + 1)
          charIndex++
          
          if (charIndex === fullText.length) {
            // Pause at end of word
            setTimeout(() => {
              isDeleting = true
            }, 3000)
          }
        } else {
          // Deleting
          currentText = fullText.substring(0, charIndex - 1)
          charIndex--
          
          if (charIndex === 0) {
            isDeleting = false
            textIndex = (textIndex + 1) % typewriterTexts.length
          }
        }
        
        setDisplayedText(currentText)
      }, isDeleting ? 50 : 100)

      return typewriterInterval
    }

    // Start typewriter after 2 seconds
    const typewriterTimeout = setTimeout(startTypewriter, 3000)

    // Animate About section
    if (aboutRef.current) {
      const aboutElements = aboutRef.current.querySelectorAll('.animate-on-scroll')
      
      gsap.fromTo(aboutElements, 
        {
          opacity: 0,
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Animate Skills section
    if (skillsRef.current) {
      const skillElements = skillsRef.current.querySelectorAll('.skill-animate')
      
      gsap.fromTo(skillElements,
        {
          opacity: 0,
          y: 50,
          rotationX: -15
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Animate stats with counter effect
    if (statsRef.current) {
      const statNumbers = statsRef.current.querySelectorAll('.stat-number')
      
      statNumbers.forEach((stat) => {
        const finalValue = stat.textContent || '0'
        const numericValue = parseInt(finalValue.replace(/\D/g, '')) || 0
        
        gsap.fromTo(stat, 
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            onUpdate: function() {
              const current = Math.ceil(this.targets()[0].textContent)
              stat.textContent = finalValue.includes('+') ? `${current}+` : current.toString()
            }
          }
        )
      })
    }

    // Animate technical skills progress bars
    if (techSkillsRef.current) {
      const progressBars = techSkillsRef.current.querySelectorAll('.progress-bar')
      
      progressBars.forEach((bar) => {
        const width = bar.getAttribute('data-width') || '0%'
        
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: width,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })
    }

    // Cleanup function
    return () => {
      lenis.destroy()
      window.lenis = null
      document.documentElement.classList.remove('lenis')
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      clearTimeout(typewriterTimeout)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const scrollToTop = () => {
    const lenis = window.lenis
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Use Lenis for ultra-smooth scrolling to sections
      const lenis = window.lenis
      if (lenis) {
        lenis.scrollTo(element, {
          offset: -80, // Account for navbar height
          duration: 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      } else {
        // Fallback to native smooth scroll
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // EmailJS template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'farihahabib2202@gmail.com',
        reply_to: formData.email
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      )

      if (response.status === 200) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const techStack = [
    'HTML5', 'CSS', 'Javascript', 'Node.js', 'React', 'MongoDB', 'Git', 'Github'
  ]

  const skills = [
    { icon: Code, name: 'Frontend Development', description: 'React, JavaScript, TypeScript, HTML5, CSS3' },
    { icon: Server, name: 'Backend Development', description: 'Node.js, Express.js, RESTful APIs' },
    { icon: Database, name: 'Database Management', description: 'MongoDB, Firebase, NoSQL databases' },
    { icon: Globe, name: 'Full Stack Solutions', description: 'End-to-end web application development' }
  ]

  const technicalSkills = [
    {
      category: 'Frontend Technologies',
      icon: Code,
      skills: [
        { name: 'React.js', level: 90, color: 'bg-blue-500' },
        { name: 'JavaScript', level: 95, color: 'bg-yellow-500' },
        { name: 'TypeScript', level: 85, color: 'bg-blue-600' },
        { name: 'HTML5', level: 98, color: 'bg-orange-500' },
        { name: 'CSS3', level: 92, color: 'bg-blue-400' },
        { name: 'Tailwind CSS', level: 88, color: 'bg-teal-500' }
      ]
    },
    {
      category: 'Backend Technologies',
      icon: Server,
      skills: [
        { name: 'Node.js', level: 88, color: 'bg-green-600' },
        { name: 'Express.js', level: 85, color: 'bg-gray-600' },
        { name: 'RESTful APIs', level: 90, color: 'bg-purple-500' }
      ]
    },
    {
      category: 'Database & Cloud',
      icon: Database,
      skills: [
        { name: 'MongoDB', level: 90, color: 'bg-green-500' },
        { name: 'Firebase', level: 85, color: 'bg-orange-400' }
      ]
    },
    {
      category: 'Tools & Others',
      icon: Terminal,
      skills: [
        { name: 'Git & GitHub', level: 92, color: 'bg-gray-800' },
        { name: 'VS Code', level: 95, color: 'bg-blue-600' },
        { name: 'Figma', level: 80, color: 'bg-purple-600' }
      ]
    }
  ]

  const stats = [
    { icon: Award, number: '1', label: 'Years' },
    { icon: Code, number: '50+', label: 'Projects Completed' },
    { icon: Users, number: '5+', label: 'Happy Clients' },
    { icon: Coffee, number: '1000+', label: 'Cups of Coffee' }
  ]

  const projects = [
    {
      id: 1,
      title: 'Personal Portfolio',
      description: 'A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark/light mode, and interactive contact form.',
      image: '/images/portfolio.png',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'EmailJS'],
      liveUrl: 'https://farihahabibs-portfolio.netlify.app/',
      githubUrl: 'https://github.com/Farihahabib/My-portfolio',
      featured: true,
      completedDate: '2024'
    },
    {
      id: 2,
      title: 'ScholarStream',
      description: 'A comprehensive scholarship management platform built with modern web technologies, featuring user authentication, application tracking, and administrative tools.',
      image: '/images/scholarstream.png',
      technologies: ['React', 'Firebase', 'JavaScript', 'CSS3', 'HTML5'],
      liveUrl: 'https://scholarstream-394b2.web.app/',
      githubUrl: 'https://github.com/Farihahabib/SCHOLARSTREAM',
      backendUrl: 'https://github.com/Farihahabib/SCHOLARSTREAMBACKEND',
      featured: true,
      completedDate: '2024'
    },
    {
      id: 3,
      title: 'ToyTopia',
      description: 'An interactive toy marketplace and showcase platform featuring product catalogs, user reviews, and modern e-commerce functionality with responsive design.',
      image: '/images/toytopia.png',
      technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Netlify'],
      liveUrl: 'https://toytopia2.netlify.app/',
      githubUrl: 'https://github.com/Farihahabib/TOYTOPIA',
      featured: true,
      completedDate: '2024'
    },
    {
      id: 4,
      title: 'Hero Apps',
      description: 'A modern web application built with contemporary technologies, featuring responsive design and interactive user interface elements.',
      image: '/images/herroapps.png',
      technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Netlify'],
      liveUrl: 'https://tangerine-tulumba-8846cf.netlify.app/',
      githubUrl: 'https://github.com/Farihahabib/Hero-Apps',
      featured: false,
      completedDate: '2024'
    },
    {
      id: 5,
      title: 'FoodLovers Network',
      description: 'A social food networking platform where food enthusiasts can share recipes, discover new cuisines, and connect with fellow food lovers.',
      image: '/images/foodlovers.png',
      technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Netlify'],
      liveUrl: 'https://foodlovers-network1.netlify.app/',
      githubUrl: 'https://github.com/Farihahabib/Client',
      backendUrl: 'https://github.com/Farihahabib/Server',
      featured: false,
      completedDate: '2024'
    }
  ]

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'farihahabib2202@gmail.com',
      link: 'mailto:farihahabib2202@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+880 1737463922',
      link: 'tel:+8801737463922'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Dhaka, Bangladesh',
      link: 'https://maps.google.com/?q=Dhaka,+Bangladesh'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/farihahabib',
      link: 'https://github.com/farihahabib'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/farihahabib',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/farihahabib',
      color: 'hover:text-blue-600'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      url: 'https://www.facebook.com/fariha.habib.149414',
      color: 'hover:text-blue-500'
    }
  ]

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ]

  return (
    <div className="bg-white dark:bg-slate-900 text-zinc-900 dark:text-slate-100 font-body transition-colors duration-300 min-h-screen flex flex-col">
      {/* Modern Animated Navbar */}
      <Navbar 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        scrollToSection={scrollToSection} 
      />

      {/* Hero Section */}
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
                  variant="outline" 
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-black font-medium px-8 py-3 transition-all relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-purple-600 dark:bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">My resume</span>
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

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-20 px-4 bg-slate-50 dark:bg-slate-800 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16 animate-on-scroll"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-slate-100 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.6,
                  ease: "backOut",
                  delay: 0.2
                }
              }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ 
                width: 80,
                transition: { 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.4
                }
              }}
              viewport={{ once: true }}
            />
            <motion.p 
              className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  delay: 0.6
                }
              }}
              viewport={{ once: true }}
            >
              I'm a passionate MERN stack developer with a love for creating beautiful, functional, and user-friendly web applications.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* About Text */}
            <motion.div 
              className="space-y-6 animate-on-scroll"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.h3 
                className="text-2xl font-bold text-zinc-900 dark:text-slate-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    delay: 0.2
                  }
                }}
                viewport={{ once: true }}
              >
                My Journey in Web Development
              </motion.h3>
              
              <motion.p 
                className="text-slate-600 dark:text-slate-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    delay: 0.3
                  }
                }}
                viewport={{ once: true }}
              >
                With over 1 years of experience in web development, I specialize in the MERN stack (MongoDB, Express.js, React, Node.js). 
                My journey began with a curiosity about how websites work, and it has evolved into a passion for creating digital experiences 
                that make a difference.
              </motion.p>
              
              <motion.p 
                className="text-slate-600 dark:text-slate-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    delay: 0.4
                  }
                }}
                viewport={{ once: true }}
              >
                I believe in writing clean, maintainable code and staying up-to-date with the latest technologies and best practices. 
                When I'm not coding, you can find me exploring new frameworks, contributing to open-source projects, or mentoring 
                aspiring developers.
              </motion.p>
              
              <motion.div 
                className="flex items-center gap-2 text-purple-600 dark:text-purple-400"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.6,
                    delay: 0.5,
                    type: "spring",
                    stiffness: 200
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Heart className="w-5 h-5" />
                </motion.div>
                <span className="font-medium">Passionate about creating amazing user experiences</span>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              ref={statsRef} 
              className="grid grid-cols-2 gap-6 animate-on-scroll"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.6,
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -8,
                    rotateY: 5,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20 
                    }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.2,
                      transition: { duration: 0.5 }
                    }}
                    className="mb-3"
                  >
                    <stat.icon className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto group-hover:text-pink-500 transition-colors duration-300" />
                  </motion.div>
                  
                  <motion.div 
                    className="text-3xl font-bold text-zinc-900 dark:text-slate-100 mb-1 stat-number"
                    initial={{ scale: 0 }}
                    whileInView={{ 
                      scale: 1,
                      transition: { 
                        type: "spring",
                        stiffness: 200,
                        delay: index * 0.1 + 0.5
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  
                  <motion.div 
                    className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ 
                      opacity: 1,
                      transition: { 
                        delay: index * 0.1 + 0.7
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.label}
                  </motion.div>
                  
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ 
                      scale: 1,
                      transition: { duration: 0.3 }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skills Section */}
          <motion.div 
            className="animate-on-scroll"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3 
              className="text-3xl font-bold text-zinc-900 dark:text-slate-100 text-center mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200
                }
              }}
              viewport={{ once: true }}
            >
              What I Do
            </motion.h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    rotateX: 0,
                    transition: { 
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: "easeOut"
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -15,
                    rotateY: 5,
                    transition: { 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25 
                    }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0, rotate: 180 }}
                    whileHover={{ 
                      scale: 1, 
                      rotate: 0,
                      transition: { duration: 0.4 }
                    }}
                  />
                  
                  <motion.div
                    className="relative z-10"
                    whileHover={{ 
                      rotate: [0, -5, 5, 0],
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <skill.icon className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4 group-hover:text-pink-500 transition-colors duration-300" />
                  </motion.div>
                  
                  <motion.h4 
                    className="text-xl font-semibold text-zinc-900 dark:text-slate-100 mb-3 relative z-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: index * 0.1 + 0.2,
                        duration: 0.4
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {skill.name}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-slate-600 dark:text-slate-400 text-sm relative z-10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: index * 0.1 + 0.3,
                        duration: 0.4
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {skill.description}
                  </motion.p>
                  
                  {/* Floating particles effect */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -8, 0],
                      x: [0, 5, 0],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 skill-animate">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-slate-100 mb-4">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life.
            </p>
          </div>

          {/* Technical Skills Grid */}
          <div ref={techSkillsRef} className="grid md:grid-cols-2 gap-8 mb-16">
            {technicalSkills.map((category, categoryIndex) => (
              <motion.div 
                key={categoryIndex} 
                className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow-lg skill-animate"
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 25 }
                }}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  transition: { 
                    delay: categoryIndex * 0.2,
                    duration: 0.8,
                    ease: "easeOut"
                  }
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  >
                    <category.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-slate-100">
                    {category.category}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skillIndex} 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          delay: (categoryIndex * 0.2) + (skillIndex * 0.1),
                          duration: 0.5
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {skill.name}
                        </span>
                        <motion.span 
                          className="text-sm font-bold text-slate-600 dark:text-slate-400"
                          initial={{ opacity: 0 }}
                          whileInView={{ 
                            opacity: 1,
                            transition: { delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3 }
                          }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className={`h-2 rounded-full ${skill.color} progress-bar`}
                          data-width={`${skill.level}%`}
                          initial={{ width: '0%' }}
                          whileInView={{ 
                            width: `${skill.level}%`,
                            transition: { 
                              delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.5,
                              duration: 1.2,
                              ease: "easeOut"
                            }
                          }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* What I Do Section */}
          <div className="skill-animate">
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-slate-100 text-center mb-12">
              What I Do
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    transition: { 
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: "easeOut"
                    }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto"
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <skill.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-zinc-900 dark:text-slate-100 mb-3 text-center">
                    {skill.name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm text-center leading-relaxed">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Skills Tags */}
          <motion.div 
            className="mt-16 text-center skill-animate"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-slate-100 mb-8">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                'React.js', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Express.js',
                'HTML5', 'CSS3', 'Tailwind CSS', 'Git', 'GitHub', 'VS Code', 
                'Firebase', 'Vercel', 'Netlify', 'Figma', 'REST APIs', 
                'Context API', 'Responsive Design', 'SEO'
              ].map((tech, index) => (
                <motion.span 
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800 dark:hover:to-pink-800 transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      delay: index * 0.05,
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  viewport={{ once: true }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-slate-50 dark:bg-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-slate-100 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.6,
                  ease: "backOut",
                  delay: 0.2
                }
              }}
              viewport={{ once: true }}
            >
              My Projects
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ 
                width: 80,
                transition: { 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.4
                }
              }}
              viewport={{ once: true }}
            />
            <motion.p 
              className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  delay: 0.6
                }
              }}
              viewport={{ once: true }}
            >
              Here are some of my recent projects that showcase my skills in full-stack development.
            </motion.p>
          </motion.div>

          {/* Featured Projects */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3 
              className="text-2xl font-bold text-zinc-900 dark:text-slate-100 mb-8 flex items-center gap-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.6,
                  delay: 0.2
                }
              }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut"
                }}
              >
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </motion.div>
              Featured Projects
            </motion.h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {projects.filter(project => project.featured).map((project, index) => (
                <motion.div 
                  key={project.id} 
                  className="bg-white dark:bg-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group relative"
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.6,
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -10,
                    rotateY: 2,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 25 
                    }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0, rotate: 180 }}
                    whileHover={{ 
                      scale: 1, 
                      rotate: 0,
                      transition: { duration: 0.5 }
                    }}
                  />
                  
                  <div className="relative h-48 overflow-hidden">
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.5 }
                      }}
                    />
                    <motion.div 
                      className="absolute top-4 right-4 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          delay: index * 0.2 + 0.5,
                          type: "spring",
                          stiffness: 200
                        }
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, 5, -5, 0],
                        transition: { duration: 0.4 }
                      }}
                      viewport={{ once: true }}
                    >
                      {project.completedDate}
                    </motion.div>
                    
                    {/* Overlay gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  
                  <div className="p-6 relative z-10">
                    <motion.h4 
                      className="text-xl font-bold text-zinc-900 dark:text-slate-100 mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.2 + 0.3,
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      {project.title}
                    </motion.h4>
                    
                    <motion.p 
                      className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.2 + 0.4,
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      {project.description}
                    </motion.p>
                    
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.2 + 0.5,
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors cursor-default"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ 
                            opacity: 1, 
                            scale: 1,
                            transition: { 
                              delay: index * 0.2 + 0.6 + techIndex * 0.05,
                              type: "spring",
                              stiffness: 200
                            }
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                          }}
                          viewport={{ once: true }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                    
                    <motion.div 
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.2 + 0.7,
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true }}
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
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white relative overflow-hidden group"
                          onClick={() => window.open(project.liveUrl, '_blank')}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "0%" }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="relative z-10 flex items-center">
                            <motion.div
                              whileHover={{ 
                                x: 3,
                                transition: { type: "spring", stiffness: 400, damping: 25 }
                              }}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                            </motion.div>
                            Live Demo
                          </span>
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
                          variant="outline"
                          size="sm"
                          className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white relative overflow-hidden group"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <motion.div
                            className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="relative z-10 flex items-center">
                            <motion.div
                              whileHover={{ 
                                rotate: 360,
                                transition: { duration: 0.6 }
                              }}
                            >
                              <Github className="w-4 h-4 mr-2" />
                            </motion.div>
                            Frontend
                          </span>
                        </Button>
                      </motion.div>

                      {project.backendUrl && (
                        <motion.div
                          whileHover={{ 
                            scale: 1.05,
                            y: -2,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white dark:border-slate-400 dark:text-slate-400 dark:hover:bg-slate-400 dark:hover:text-black relative overflow-hidden group"
                            onClick={() => window.open(project.backendUrl, '_blank')}
                          >
                            <motion.div
                              className="absolute inset-0 bg-slate-600 dark:bg-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                            <span className="relative z-10 flex items-center">
                              <motion.div
                                whileHover={{ 
                                  rotate: 360,
                                  transition: { duration: 0.6 }
                                }}
                              >
                                <Server className="w-4 h-4 mr-2" />
                              </motion.div>
                              Backend
                            </span>
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Floating particles */}
                  <motion.div
                    className="absolute top-4 left-4 w-2 h-2 bg-purple-400/60 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                  <motion.div
                    className="absolute bottom-6 right-6 w-1 h-1 bg-pink-400/60 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* All Projects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3 
              className="text-2xl font-bold text-zinc-900 dark:text-slate-100 mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.6,
                  delay: 0.2
                }
              }}
              viewport={{ once: true }}
            >
              All Projects
            </motion.h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  className="bg-white dark:bg-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    rotateY: 3,
                    transition: { 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25 
                    }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ 
                      scale: 1,
                      transition: { duration: 0.4 }
                    }}
                  />
                  
                  <div className="relative h-40 overflow-hidden">
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {project.featured && (
                      <motion.div 
                        className="absolute top-2 left-2 bg-purple-600 text-white p-1 rounded"
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ 
                          opacity: 1, 
                          scale: 1, 
                          rotate: 0,
                          transition: { 
                            delay: index * 0.1 + 0.3,
                            type: "spring",
                            stiffness: 200
                          }
                        }}
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.2,
                          transition: { duration: 0.6 }
                        }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-4 h-4" />
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="p-4 relative z-10">
                    <motion.h4 
                      className="text-lg font-bold text-zinc-900 dark:text-slate-100 mb-2"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.1 + 0.2,
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      {project.title}
                    </motion.h4>
                    
                    <motion.p 
                      className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.1 + 0.3,
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      {project.description}
                    </motion.p>
                    
                    <motion.div 
                      className="flex flex-wrap gap-1 mb-3"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.1 + 0.4,
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors cursor-default"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ 
                            opacity: 1, 
                            scale: 1,
                            transition: { 
                              delay: index * 0.1 + 0.5 + techIndex * 0.05,
                              type: "spring",
                              stiffness: 200
                            }
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            y: -1,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                          }}
                          viewport={{ once: true }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 3 && (
                        <motion.span 
                          className="px-2 py-1 bg-zinc-200 dark:bg-slate-600 text-slate-600 dark:text-slate-400 rounded text-xs"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ 
                            opacity: 1, 
                            scale: 1,
                            transition: { 
                              delay: index * 0.1 + 0.65,
                              type: "spring",
                              stiffness: 200
                            }
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                          }}
                          viewport={{ once: true }}
                        >
                          +{project.technologies.length - 3}
                        </motion.span>
                      )}
                    </motion.div>
                    
                    <motion.div 
                      className="flex gap-2"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.1 + 0.6,
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        whileHover={{ 
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs relative overflow-hidden group"
                          onClick={() => window.open(project.liveUrl, '_blank')}
                        >
                          <motion.div
                            className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "0%" }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="relative z-10 flex items-center justify-center">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Demo
                          </span>
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ 
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs relative overflow-hidden group"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <motion.div
                            className="absolute inset-0 bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <span className="relative z-10 flex items-center justify-center">
                            <Github className="w-3 h-3 mr-1" />
                            Code
                          </span>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-slate-100 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.6,
                  ease: "backOut",
                  delay: 0.2
                }
              }}
              viewport={{ once: true }}
            >
              Get In Touch
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ 
                width: 80,
                transition: { 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.4
                }
              }}
              viewport={{ once: true }}
            />
            <motion.p 
              className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  delay: 0.6
                }
              }}
              viewport={{ once: true }}
            >
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div>
                <motion.h3 
                  className="text-2xl font-bold text-zinc-900 dark:text-slate-100 mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.6,
                      delay: 0.2
                    }
                  }}
                  viewport={{ once: true }}
                >
                  Let's Connect
                </motion.h3>
                <motion.p 
                  className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.6,
                      delay: 0.3
                    }
                  }}
                  viewport={{ once: true }}
                >
                  Whether you have a project in mind, want to collaborate, or just want to say hello, 
                  I'd love to hear from you. Feel free to reach out through any of the channels below.
                </motion.p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer relative overflow-hidden"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                      transition: { 
                        duration: 0.5,
                        delay: index * 0.1 + 0.4,
                        type: "spring",
                        stiffness: 200
                      }
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
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
                    viewport={{ once: true }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0, rotate: 180 }}
                      whileHover={{ 
                        scale: 1, 
                        rotate: 0,
                        transition: { duration: 0.4 }
                      }}
                    />
                    
                    <motion.div 
                      className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors relative z-10"
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.1,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <info.icon className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors" />
                    </motion.div>
                    
                    <div className="relative z-10">
                      <motion.div 
                        className="font-medium text-zinc-900 dark:text-slate-100"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { 
                            delay: index * 0.1 + 0.5,
                            duration: 0.4
                          }
                        }}
                        viewport={{ once: true }}
                      >
                        {info.label}
                      </motion.div>
                      <motion.div 
                        className="text-slate-600 dark:text-slate-400 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { 
                            delay: index * 0.1 + 0.6,
                            duration: 0.4
                          }
                        }}
                        viewport={{ once: true }}
                      >
                        {info.value}
                      </motion.div>
                    </div>
                    
                    {/* Floating particles */}
                    <motion.div
                      className="absolute top-2 right-2 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  </motion.a>
                ))}
              </div>

              <motion.div 
                className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-sm relative overflow-hidden group"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  transition: { 
                    duration: 0.6,
                    delay: 0.8,
                    type: "spring",
                    stiffness: 200
                  }
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -3,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25 
                  }
                }}
                viewport={{ once: true }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ 
                    scale: 1,
                    transition: { duration: 0.4 }
                  }}
                />
                
                <motion.h4 
                  className="font-bold text-zinc-900 dark:text-slate-100 mb-3 flex items-center gap-2 relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      delay: 0.9,
                      duration: 0.4
                    }
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </motion.div>
                  Availability
                </motion.h4>
                <motion.p 
                  className="text-slate-600 dark:text-slate-400 text-sm relative z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      delay: 1,
                      duration: 0.4
                    }
                  }}
                  viewport={{ once: true }}
                >
                  I'm currently available for freelance projects and full-time opportunities. 
                  I typically respond to messages within 24 hours.
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-lg relative overflow-hidden"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-indigo-500/5"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% 200%" }}
              />
              
              <motion.h3 
                className="text-2xl font-bold text-zinc-900 dark:text-slate-100 mb-6 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    delay: 0.2
                  }
                }}
                viewport={{ once: true }}
              >
                Send a Message
              </motion.h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div 
                    className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400"
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: { 
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.8, 
                      y: -20,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </motion.div>
                    <span className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div 
                    className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400"
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: { 
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.8, 
                      y: -20,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <AlertCircle className="w-5 h-5" />
                    </motion.div>
                    <span className="text-sm font-medium">Failed to send message. Please try again or contact me directly.</span>
                  </motion.div>
                )}

                <motion.div 
                  className="grid md:grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      delay: 0.3
                    }
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-600 text-zinc-900 dark:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500"
                      placeholder="Your name"
                    />
                  </motion.div>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-600 text-zinc-900 dark:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      delay: 0.4
                    }
                  }}
                  viewport={{ once: true }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-600 text-zinc-900 dark:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500"
                    placeholder="What's this about?"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      delay: 0.5
                    }
                  }}
                  viewport={{ once: true }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-600 text-zinc-900 dark:text-slate-100 resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      delay: 0.6
                    }
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -2,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-3 px-6 shadow-lg shadow-purple-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none disabled:shadow-none relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <motion.div 
                            className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <motion.div
                            whileHover={{ 
                              x: 5,
                              transition: { type: "spring", stiffness: 400, damping: 25 }
                            }}
                          >
                            <Send className="w-5 h-5 mr-2" />
                          </motion.div>
                          Send Message
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Footer */}
      <footer className="relative bg-slate-900 dark:bg-black text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Geometric Shapes */}
          <motion.div
            className="absolute top-1/4 left-1/6 w-16 h-16 border border-purple-500/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-12 h-12 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-lg"
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
          
          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h3 
                className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Fariha Habib
              </motion.h3>
              <motion.p 
                className="text-slate-300 mb-6 leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    delay: 0.2
                  }
                }}
                viewport={{ once: true }}
              >
                MERN Stack Developer passionate about creating innovative web solutions and bringing ideas to life through code.
              </motion.p>
              
              {/* Social Links */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    delay: 0.4
                  }
                }}
                viewport={{ once: true }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-slate-800 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 transition-all duration-300 ${social.color} hover:bg-slate-700 dark:hover:bg-slate-600 group relative overflow-hidden`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { 
                        delay: index * 0.1 + 0.5,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -3,
                      transition: { 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 25 
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                    viewport={{ once: true }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-indigo-500/20 rounded-full opacity-0 group-hover:opacity-100"
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
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      {social.label}
                    </motion.div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.2
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h4 
                className="text-lg font-semibold mb-4 text-slate-200"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    duration: 0.6,
                    delay: 0.3
                  }
                }}
                viewport={{ once: true }}
              >
                Quick Links
              </motion.h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        duration: 0.4,
                        delay: index * 0.1 + 0.4
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.button
                      onClick={() => scrollToSection(link.href.substring(1))}
                      className="text-slate-400 hover:text-purple-400 transition-colors duration-300 text-sm group flex items-center gap-2"
                      whileHover={{ 
                        x: 5,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                    >
                      <motion.div
                        className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.5 }}
                      />
                      {link.label}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.4
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h4 
                className="text-lg font-semibold mb-4 text-slate-200"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    duration: 0.6,
                    delay: 0.5
                  }
                }}
                viewport={{ once: true }}
              >
                Get In Touch
              </motion.h4>
              <div className="space-y-3">
                <motion.a
                  href="mailto:farihahabib2202@gmail.com"
                  className="flex items-center gap-3 text-slate-400 hover:text-purple-400 transition-colors duration-300 text-sm group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.4,
                      delay: 0.6
                    }
                  }}
                  whileHover={{ 
                    x: 5,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <Mail className="w-4 h-4" />
                  </motion.div>
                  farihahabib2202@gmail.com
                </motion.a>
                
                <motion.div
                  className="flex items-center gap-3 text-slate-400 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.4,
                      delay: 0.7
                    }
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      transition: { 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                  </motion.div>
                  Dhaka, Bangladesh
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div 
            className="border-t border-slate-700 dark:border-slate-600 pt-8"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ 
              opacity: 1, 
              scaleX: 1,
              transition: { 
                duration: 1,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true }}
          >
            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <motion.p 
                className="text-slate-400 text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    delay: 0.2
                  }
                }}
                viewport={{ once: true }}
              >
                © {new Date().getFullYear()} Fariha Habib. All rights reserved.
              </motion.p>

              {/* Tech Stack */}
              <motion.div 
                className="flex items-center gap-4 text-slate-400 text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    delay: 0.4
                  }
                }}
                viewport={{ once: true }}
              >
                <span>Built with</span>
                <div className="flex items-center gap-2">
                  {techStack.slice(0, 4).map((tech, index) => (
                    <motion.span 
                      key={tech}
                      className="hover:text-purple-400 transition-colors cursor-default"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          delay: index * 0.1 + 0.5,
                          type: "spring",
                          stiffness: 200
                        }
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        y: -2,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                      viewport={{ once: true }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Scroll to Top */}
              <motion.button
                onClick={scrollToTop}
                className="w-10 h-10 bg-slate-800 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 transition-all duration-300 group relative overflow-hidden"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    delay: 0.6,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }
                }}
                whileHover={{ 
                  scale: 1.1,
                  y: -3,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25 
                  }
                }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ 
                    scale: 1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                <motion.div
                  animate={{ 
                    y: [0, -3, 0],
                    transition: { 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="relative z-10"
                >
                  <ArrowUp className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default App