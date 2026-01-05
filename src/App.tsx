import { useState, useEffect, useRef } from 'react'
import { Code, Database, Server, Globe, Award, Users, Coffee, Mail, Phone, MapPin, Terminal, Github, Linkedin, Facebook, MessageCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import EducationSection from '@/components/sections/EducationSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ContactSection from '@/components/sections/ContactSection'
import FooterSection from '@/components/sections/FooterSection'
import ProjectModal from '@/components/sections/ProjectModal'
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
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  
  // Typewriter effect states
  const [displayedText, setDisplayedText] = useState('')
  
  // Refs for animations
  const aboutRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const techSkillsRef = useRef<HTMLDivElement>(null)

  // EmailJS configuration - Replace with your actual EmailJS credentials
  // Get these from your EmailJS dashboard at https://www.emailjs.com/
  const EMAILJS_SERVICE_ID = 'service_1ocinoy'
  const EMAILJS_TEMPLATE_ID = 'template_vqxzbc7'
  const EMAILJS_PUBLIC_KEY = '2PvJo1AWNxWEdzWFU'

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

  const handleResumeDownload = () => {
    // Check if resume file exists, if not show a message
    const resumeUrl = '/resume/Fariha_Habib_Resume.pdf'
    
    // Create a temporary link element to trigger download
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'Fariha_Habib_Resume.pdf'
    link.target = '_blank'
    
    // Try to download, if file doesn't exist, show alert
    link.onerror = () => {
      alert('Resume is being prepared. Please check back soon!')
    }
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
      // Check if EmailJS is properly configured
      if (EMAILJS_SERVICE_ID.includes('REPLACE_WITH_YOUR_') || 
          EMAILJS_TEMPLATE_ID.includes('REPLACE_WITH_YOUR_') || 
          EMAILJS_PUBLIC_KEY.includes('REPLACE_WITH_YOUR_')) {
        
        // Show setup message if not configured
        alert('⚠️ EmailJS Setup Required!\n\n1. Go to https://www.emailjs.com/\n2. Create account with farihahabib2202@gmail.com\n3. Add Gmail service\n4. Create email template\n5. Replace the credentials in App.tsx')
        setSubmitStatus('error')
        return
      }

      // Validate form data
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all fields')
        setSubmitStatus('error')
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address')
        setSubmitStatus('error')
        return
      }

      // EmailJS template parameters - these must match your template variables exactly
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Fariha Habib',
        to_email: 'farihahabib2202@gmail.com',
        reply_to: formData.email
      }

      console.log('Sending email with params:', templateParams)
      console.log('Using credentials:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY.substring(0, 5) + '...' // Only show first 5 chars for security
      })

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY // Pass public key as 4th parameter
      )

      console.log('EmailJS Response:', response)

      if (response.status === 200) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        throw new Error(`EmailJS returned status: ${response.status}`)
      }

    } catch (error: any) {
      console.error('EmailJS Error Details:', error)
      
      // More specific error messages
      let errorMessage = 'Failed to send message. '
      
      if (error.text) {
        console.error('EmailJS Error Text:', error.text)
        if (error.text.includes('Invalid template ID')) {
          errorMessage += 'Template ID is incorrect. '
        } else if (error.text.includes('Invalid service ID')) {
          errorMessage += 'Service ID is incorrect. '
        } else if (error.text.includes('Invalid public key')) {
          errorMessage += 'Public Key is incorrect. '
        } else if (error.text.includes('Template not found')) {
          errorMessage += 'Email template not found. '
        } else {
          errorMessage += `Error: ${error.text} `
        }
      }
      
      errorMessage += 'Please check the console for details or contact me directly at farihahabib2202@gmail.com'
      
      // Show detailed error in console for debugging
      alert(`Debug Info:\nService ID: ${EMAILJS_SERVICE_ID}\nTemplate ID: ${EMAILJS_TEMPLATE_ID}\nPublic Key: ${EMAILJS_PUBLIC_KEY.substring(0, 5)}...\n\nError: ${error.text || error.message}`)
      
      setSubmitStatus('error')
      
      // Reset error message after 8 seconds (longer for debugging)
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 8000)
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
      completedDate: '2025',
      challenges: [
        'Implementing smooth scroll animations with Lenis and GSAP integration',
        'Creating responsive design that works across all device sizes',
        'Optimizing performance while maintaining rich animations',
        'Setting up EmailJS for contact form functionality'
      ],
      improvements: [
        'Add blog section with markdown support',
        'Implement project filtering and search functionality',
        'Add more interactive animations and micro-interactions',
        'Create admin panel for easy content management'
      ],
      detailedDescription: 'This portfolio represents my journey as a MERN stack developer. Built with modern React and TypeScript, it showcases my skills in creating responsive, animated web applications. The site features smooth scrolling, dark/light mode toggle, and a fully functional contact form integrated with EmailJS.'
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
      completedDate: '2025',
      challenges: [
        'Implementing secure user authentication with Firebase Auth',
        'Creating a complex application tracking system',
        'Managing real-time data synchronization across multiple users',
        'Designing an intuitive admin dashboard for scholarship management'
      ],
      improvements: [
        'Add advanced search and filtering options',
        'Implement notification system for application updates',
        'Create mobile app version using React Native',
        'Add document upload and verification system'
      ],
      detailedDescription: 'ScholarStream is a full-stack scholarship management platform that connects students with scholarship opportunities. The platform features user authentication, application tracking, and administrative tools for managing scholarships. Built with React and Firebase, it provides real-time updates and secure data management.'
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
      completedDate: '2025',
      challenges: [
        'Creating an engaging product showcase with smooth animations',
        'Implementing responsive grid layouts for different screen sizes',
        'Managing product data and user interactions efficiently',
        'Optimizing images and performance for fast loading'
      ],
      improvements: [
        'Add shopping cart and checkout functionality',
        'Implement user reviews and rating system',
        'Create wishlist and favorites features',
        'Add product comparison functionality'
      ],
      detailedDescription: 'ToyTopia is an interactive toy marketplace that showcases various toy products with modern web design. The platform features responsive design, product catalogs, and user-friendly navigation. Built with React and modern CSS, it provides an engaging shopping experience for toy enthusiasts.'
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
      completedDate: '2025',
      challenges: [
        'Creating superhero-themed interactive components',
        'Implementing dynamic content rendering',
        'Ensuring cross-browser compatibility',
        'Optimizing for mobile-first responsive design'
      ],
      improvements: [
        'Add character database with search functionality',
        'Implement user profiles and favorites',
        'Create interactive games and quizzes',
        'Add social sharing features'
      ],
      detailedDescription: 'Hero Apps is a superhero-themed web application that demonstrates modern React development practices. The application features interactive UI elements, responsive design, and engaging user experiences. Built with focus on clean code and user-friendly interfaces.'
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
      completedDate: '2025',
      challenges: [
        'Building a social networking platform with user interactions',
        'Implementing recipe sharing and discovery features',
        'Creating responsive design for food photography display',
        'Managing user-generated content and moderation'
      ],
      improvements: [
        'Add real-time chat functionality between users',
        'Implement advanced recipe recommendation algorithm',
        'Create cooking video upload and streaming features',
        'Add restaurant integration and reviews'
      ],
      detailedDescription: 'FoodLovers Network is a social platform designed for food enthusiasts to share recipes, discover new cuisines, and connect with like-minded individuals. The platform features recipe sharing, user profiles, and social networking capabilities, all built with modern web technologies.'
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
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+880 1737463922',
      link: 'https://wa.me/8801737463922'
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
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ]

  const education = [
    {
      id: 1,
      degree: 'Bachelor of Science (BSc)',
      institution: 'University Name',
      location: 'Dhaka, Bangladesh',
      duration: '2022 - Present',
      status: 'Currently Pursuing',
      description: 'Pursuing Bachelor of Science degree with focus on Computer Science and Mathematics. This academic foundation complements my practical development experience and enhances my problem-solving abilities.',
      subjects: ['Computer Science', 'Mathematics', 'Physics', 'Statistics'],
      gpa: 'Expected: 3.5+/4.0'
    },
    {
      id: 2,
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'College Name',
      location: 'Dhaka, Bangladesh',
      duration: '2020 - 2022',
      status: 'Completed',
      description: 'Completed Higher Secondary Certificate in Science Group with excellent results. Built strong foundation in mathematics and science that supports my programming and problem-solving skills.',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
      gpa: '4.5/5.0'
    }
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
      <HeroSection 
        displayedText={displayedText}
        handleResumeDownload={handleResumeDownload}
        scrollToSection={scrollToSection}
        socialLinks={socialLinks}
      />

      {/* About Section */}
      <AboutSection 
        aboutRef={aboutRef}
        statsRef={statsRef}
        stats={stats}
        skills={skills}
      />

      {/* Education Section */}
      <EducationSection 
        education={education}
      />

      {/* Skills Section */}
      <SkillsSection 
        skillsRef={skillsRef}
        techSkillsRef={techSkillsRef}
        technicalSkills={technicalSkills}
        skills={skills}
      />

      {/* Projects Section */}
      <ProjectsSection 
        projects={projects}
        setSelectedProject={setSelectedProject}
        setShowProjectModal={setShowProjectModal}
      />

      {/* Contact Section */}
      <ContactSection 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        contactInfo={contactInfo}
      />

      {/* Footer Section */}
      <FooterSection 
        socialLinks={socialLinks}
        quickLinks={quickLinks}
        scrollToSection={scrollToSection}
        scrollToTop={scrollToTop}
        techStack={techStack}
      />

      {/* Project Details Modal */}
      {showProjectModal && selectedProject && (
        <ProjectModal 
          selectedProject={selectedProject}
          setShowProjectModal={setShowProjectModal}
        />
      )}
    </div>
  )
}

export default App