import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react'

interface EducationItem {
  id: number
  degree: string
  institution: string
  location: string
  duration: string
  status: string
  description: string
  subjects: string[]
  gpa: string
}

interface EducationSectionProps {
  education: EducationItem[]
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 px-4 bg-white dark:bg-slate-900">
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
            Education
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
            My academic journey and educational background that shaped my development career.
          </motion.p>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800"
            initial={{ height: 0 }}
            whileInView={{ 
              height: "100%",
              transition: { 
                duration: 1.5,
                ease: "easeOut",
                delay: 0.5
              }
            }}
            viewport={{ once: true }}
          />

          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div 
                key={edu.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Timeline Node */}
                <motion.div 
                  className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-purple-600 dark:bg-purple-400 rounded-full border-4 border-white dark:border-slate-900 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ 
                    scale: 1,
                    transition: { 
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.2 + 0.3
                    }
                  }}
                  whileHover={{ 
                    scale: 1.3,
                    transition: { duration: 0.2 }
                  }}
                  viewport={{ once: true }}
                />

                {/* Education Card */}
                <motion.div 
                  className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { type: "spring", stiffness: 300, damping: 25 }
                  }}
                >
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                    {/* Status Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <motion.div 
                        className={`w-3 h-3 rounded-full ${
                          edu.status === 'Currently Pursuing' ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        initial={{ scale: 0 }}
                        whileInView={{ 
                          scale: 1,
                          transition: { 
                            type: "spring",
                            stiffness: 200,
                            delay: index * 0.2 + 0.5
                          }
                        }}
                        viewport={{ once: true }}
                      />
                      <span className={`text-sm font-medium ${
                        edu.status === 'Currently Pursuing' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
                      }`}>
                        {edu.status}
                      </span>
                    </div>

                    {/* Degree Title */}
                    <motion.h3 
                      className="text-xl font-bold text-zinc-900 dark:text-slate-100 mb-2 flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          delay: index * 0.2 + 0.4,
                          duration: 0.5
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      {edu.degree}
                    </motion.h3>

                    {/* Institution */}
                    <motion.p 
                      className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          delay: index * 0.2 + 0.5,
                          duration: 0.5
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      {edu.institution}
                    </motion.p>

                    {/* Duration and Location */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <motion.div 
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-400"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { 
                            delay: index * 0.2 + 0.6,
                            duration: 0.4
                          }
                        }}
                        viewport={{ once: true }}
                      >
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{edu.duration}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-400"
                        initial={{ opacity: 0, y: 10 }}
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
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{edu.location}</span>
                      </motion.div>
                    </div>

                    {/* GPA */}
                    <motion.div 
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.2 + 0.8,
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full">
                        {edu.gpa}
                      </span>
                    </motion.div>

                    {/* Description */}
                    <motion.p 
                      className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.2 + 0.9,
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      {edu.description}
                    </motion.p>

                    {/* Subjects */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.2 + 1.0,
                          duration: 0.4
                        }
                      }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Key Subjects:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {edu.subjects.map((subject, subIndex) => (
                          <motion.span 
                            key={subIndex}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ 
                              opacity: 1, 
                              scale: 1,
                              transition: { 
                                delay: index * 0.2 + 1.1 + subIndex * 0.05,
                                type: "spring",
                                stiffness: 200
                              }
                            }}
                            whileHover={{ 
                              scale: 1.1,
                              transition: { duration: 0.2 }
                            }}
                            viewport={{ once: true }}
                          >
                            {subject}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                      initial={{ scale: 0 }}
                      whileHover={{ 
                        scale: 1,
                        transition: { duration: 0.3 }
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div 
          className="mt-16 text-center"
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
          <motion.p 
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            My academic journey that shaped my analytical thinking and problem-solving skills, 
            providing a strong foundation for my career in web development and software engineering.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}