import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface AboutSectionProps {
  aboutRef: React.RefObject<HTMLElement>
  statsRef: React.RefObject<HTMLDivElement>
  stats: Array<{
    icon: any
    number: string
    label: string
  }>
  skills: Array<{
    icon: any
    name: string
    description: string
  }>
}

export default function AboutSection({ aboutRef, statsRef, stats, skills }: AboutSectionProps) {
  return (
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
              My programming journey started with a simple "Hello World" in JavaScript, but it quickly became an obsession! 
              What began as curiosity about how websites work has evolved into a deep passion for creating digital experiences 
              that solve real problems. Over the past year, I've immersed myself in the MERN stack (MongoDB, Express.js, React, Node.js), 
              building everything from scholarship platforms to food networking sites.
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
              I absolutely love working on full-stack projects where I can see an idea come to life from database design to 
              user interface. There's something magical about writing clean, efficient code that not only works but makes 
              users' lives easier. I'm particularly drawn to projects that involve user authentication, real-time features, 
              and responsive design challenges.
            </motion.p>

            <motion.p 
              className="text-slate-600 dark:text-slate-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
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
              When I'm not coding, you'll find me reading tech blogs, experimenting with new frameworks, 
              or enjoying a good cup of coffee while sketching out my next project idea. I also love photography and capturing 
              beautiful moments, which actually helps me think about user experience from a visual perspective. On weekends, 
              I enjoy exploring local cafes with my laptop, turning them into my temporary coding workspaces.
            </motion.p>

            <motion.p 
              className="text-slate-600 dark:text-slate-400 leading-relaxed"
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
              I believe in continuous learning and staying curious. Every bug is a puzzle to solve, every new feature is 
              an opportunity to learn something new. I'm always excited to collaborate with other developers, share knowledge, 
              and contribute to the amazing developer community that has taught me so much.
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
                className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
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
  )
}