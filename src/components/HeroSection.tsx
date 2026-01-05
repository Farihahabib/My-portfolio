import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Code, Database, Server } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  displayedText: string
  socialLinks: Array<{
    icon: any
    label: string
    url: string
    color: string
  }>
  scrollToSection: (sectionId: string) => void
  handleResumeDownload: () => void
}

export default function HeroSection({ 
  displayedText, 
  socialLinks, 
  scrollToSection, 
  handleResumeDownload 
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
        