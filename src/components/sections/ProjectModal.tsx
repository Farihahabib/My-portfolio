import { motion } from 'framer-motion'
import { ExternalLink, Github, Server, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  backendUrl?: string
  featured: boolean
  completedDate: string
  challenges: string[]
  improvements: string[]
  detailedDescription: string
}

interface ProjectModalProps {
  selectedProject: Project
  setShowProjectModal: (show: boolean) => void
}

export default function ProjectModal({ selectedProject, setShowProjectModal }: ProjectModalProps) {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowProjectModal(false)}
    >
      <motion.div 
        className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowProjectModal(false)}
          className="absolute top-4 right-4 w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors z-10"
        >
          ✕
        </button>

        {/* Project Image */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <img 
            src={selectedProject.image} 
            alt={selectedProject.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedProject.title}</h2>
            <p className="text-lg opacity-90">{selectedProject.completedDate}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Technology Stack */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-slate-100 mb-3">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-slate-100 mb-3">Project Description</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {selectedProject.detailedDescription}
            </p>
          </div>

          {/* Challenges */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-slate-100 mb-3">Challenges Faced</h3>
            <ul className="space-y-2">
              {selectedProject.challenges.map((challenge: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Future Improvements */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-slate-100 mb-3">Future Improvements</h3>
            <ul className="space-y-2">
              {selectedProject.improvements.map((improvement: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => window.open(selectedProject.liveUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live Project
            </Button>
            
            <Button 
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              onClick={() => window.open(selectedProject.githubUrl, '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              Frontend Code
            </Button>

            {selectedProject.backendUrl && (
              <Button 
                variant="outline"
                className="border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white dark:border-slate-400 dark:text-slate-400"
                onClick={() => window.open(selectedProject.backendUrl, '_blank')}
              >
                <Server className="w-4 h-4 mr-2" />
                Backend Code
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}