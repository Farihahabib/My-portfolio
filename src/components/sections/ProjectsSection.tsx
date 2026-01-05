import { motion } from 'framer-motion'
import { Star, ExternalLink, Github, Server } from 'lucide-react'
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

interface ProjectsSectionProps {
  projects: Project[]
  setSelectedProject: (project: Project) => void
  setShowProjectModal: (show: boolean) => void
}

export default function ProjectsSection({ projects, setSelectedProject, setShowProjectModal }: ProjectsSectionProps) {
  return (
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
                    className="flex gap-3 flex-wrap"
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
                        className="bg-indigo-600 hover:bg-indigo-700 text-white relative overflow-hidden group"
                        onClick={() => {
                          setSelectedProject(project)
                          setShowProjectModal(true)
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center">
                          <motion.div
                            whileHover={{ 
                              rotate: 360,
                              transition: { duration: 0.6 }
                            }}
                          >
                            <Star className="w-4 h-4 mr-2" />
                          </motion.div>
                          View Details
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
                className="bg-white dark:bg-slate-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.03,
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 25 }
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div 
                      className="absolute top-3 right-3 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          delay: index * 0.1 + 0.3,
                          type: "spring",
                          stiffness: 200
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-3 h-3" />
                      Featured
                    </motion.div>
                  )}
                  
                  {/* Completion Date */}
                  <motion.div 
                    className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs"
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
                    {project.completedDate}
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <motion.h4 
                    className="text-xl font-bold text-zinc-900 dark:text-slate-100 mb-3"
                    initial={{ opacity: 0, y: 10 }}
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
                    {project.title}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3"
                    initial={{ opacity: 0, y: 10 }}
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
                    {project.description}
                  </motion.p>
                  
                  {/* Technologies */}
                  <motion.div 
                    className="flex flex-wrap gap-1 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: index * 0.1 + 0.5,
                        duration: 0.4
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ 
                          opacity: 1, 
                          scale: 1,
                          transition: { 
                            delay: index * 0.1 + 0.6 + techIndex * 0.05,
                            type: "spring",
                            stiffness: 200
                          }
                        }}
                        viewport={{ once: true }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-400 rounded text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </motion.div>
                  
                  {/* Action Buttons */}
                  <motion.div 
                    className="flex gap-2 flex-wrap"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: index * 0.1 + 0.7,
                        duration: 0.4
                      }
                    }}
                    viewport={{ once: true }}
                  >
                    {/* View Details Button */}
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
                        className="text-xs border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white relative overflow-hidden group"
                        onClick={() => {
                          setSelectedProject(project)
                          setShowProjectModal(true)
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Details
                        </span>
                      </Button>
                    </motion.div>

                    {/* Live Demo Button */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        size="sm"
                        className="text-xs bg-purple-600 hover:bg-purple-700 text-white relative overflow-hidden group"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          Live
                        </span>
                      </Button>
                    </motion.div>

                    {/* GitHub Button */}
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
                        className="text-xs border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white dark:border-slate-400 dark:text-slate-400 dark:hover:bg-slate-400 dark:hover:text-black"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                    </motion.div>

                    {/* Backend Button (if available) */}
                    {project.backendUrl && (
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
                          className="text-xs border-green-600 text-green-600 hover:bg-green-600 hover:text-white dark:border-green-400 dark:text-green-400"
                          onClick={() => window.open(project.backendUrl, '_blank')}
                        >
                          <Server className="w-3 h-3 mr-1" />
                          API
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={{ scale: 0 }}
                  whileHover={{ 
                    scale: 1,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}