import { motion } from 'framer-motion'
import { Code, Server, Database, Terminal } from 'lucide-react'

interface SkillsSectionProps {
  skillsRef: React.RefObject<HTMLElement>
  techSkillsRef: React.RefObject<HTMLDivElement>
  technicalSkills: Array<{
    category: string
    icon: any
    skills: Array<{
      name: string
      level: number
      color: string
    }>
  }>
  skills: Array<{
    icon: any
    name: string
    description: string
  }>
}

export default function SkillsSection({ skillsRef, techSkillsRef, technicalSkills, skills }: SkillsSectionProps) {
  return (
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
        <div className="skill-animate mb-16">
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
                <p className="text-slate-600 dark:text-slate-400 text-sm text-center">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technologies I Work With */}
        <motion.div 
          className="skill-animate"
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
            Technologies I Work With
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend Technologies */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-800/50"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.6,
                  delay: 0.1
                }
              }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100">Frontend</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'React.js', color: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200' },
                  { name: 'JavaScript', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' },
                  { name: 'TypeScript', color: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200' },
                  { name: 'HTML5', color: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-200' },
                  { name: 'CSS3', color: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200' },
                  { name: 'Tailwind CSS', color: 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-200' },
                  { name: 'Framer Motion', color: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200' },
                  { name: 'GSAP', color: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' }
                ].map((tech, index) => (
                  <motion.span
                    key={index}
                    className={`px-3 py-2 rounded-lg text-sm font-medium text-center ${tech.color}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { 
                        delay: 0.2 + index * 0.05,
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
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Backend Technologies */}
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200/50 dark:border-green-800/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6,
                  delay: 0.2
                }
              }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-green-900 dark:text-green-100">Backend</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Node.js', color: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' },
                  { name: 'Express.js', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' },
                  { name: 'RESTful APIs', color: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200' },
                  { name: 'JWT', color: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200' },
                  { name: 'Middleware', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200' },
                  { name: 'Authentication', color: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-200' }
                ].map((tech, index) => (
                  <motion.span
                    key={index}
                    className={`px-3 py-2 rounded-lg text-sm font-medium text-center ${tech.color}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { 
                        delay: 0.3 + index * 0.05,
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
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Database & Tools */}
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200/50 dark:border-purple-800/50"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.6,
                  delay: 0.3
                }
              }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-purple-900 dark:text-purple-100">Database & Tools</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'MongoDB', color: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' },
                  { name: 'Firebase', color: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-200' },
                  { name: 'Git & GitHub', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' },
                  { name: 'VS Code', color: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200' },
                  { name: 'Figma', color: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200' },
                  { name: 'Netlify', color: 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-200' },
                  { name: 'Vite', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' },
                  { name: 'EmailJS', color: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200' }
                ].map((tech, index) => (
                  <motion.span
                    key={index}
                    className={`px-3 py-2 rounded-lg text-sm font-medium text-center ${tech.color}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { 
                        delay: 0.4 + index * 0.05,
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
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Additional Technologies */}
          <motion.div 
            className="mt-12 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.6,
                delay: 0.5
              }
            }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-zinc-900 dark:text-slate-100 mb-6 text-center">
              Additional Technologies & Concepts
            </h4>
            
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Responsive Design',
                'Mobile-First Development',
                'API Integration',
                'State Management',
                'Component Architecture',
                'Version Control',
                'Deployment & Hosting',
                'Performance Optimization',
                'Cross-Browser Compatibility',
                'Code Review',
                'Testing & Debugging'
              ].map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      delay: 0.6 + index * 0.03,
                      type: "spring",
                      stiffness: 200
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  viewport={{ once: true }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}