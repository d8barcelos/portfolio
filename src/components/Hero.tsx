import { motion, useScroll, useTransform } from 'framer-motion';
import { GithubIcon, LinkedinIcon, MailIcon, Code2Icon } from 'lucide-react';
import { GradientText } from './shared/GradientText';
import { Badge } from './shared/Badge';
import { FloatingIcons } from './effects/FloatingIcons';
import { socialLinks } from '../data/socialLinks';
import { personalInfo } from '../data/personalInfo';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-gray-900">
      <FloatingIcons />
      
      <motion.div 
        style={{ y, opacity }} 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent pointer-events-none" 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 text-gray-200"
      >
        <motion.div 
          variants={itemVariants} 
          className="mb-6 inline-block"
          whileHover={{ scale: 1.05 }}
        >
          <Badge variant="secondary" className="text-lg px-6 py-2 bg-gray-800 text-gray-300 border-gray-600 flex items-center">
  <Code2Icon className="inline-block w-5 h-5 mr-2 text-teal-400 relative" style={{ top: '-0.125rem' }} />
  {personalInfo.title}
</Badge>
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          className="text-6xl md:text-8xl font-bold mb-8"
          whileHover={{ scale: 1.02 }}
        >
          <GradientText>{personalInfo.name}</GradientText>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {personalInfo.description}
        </motion.p>

        <motion.div 
          variants={itemVariants} 
          className="flex justify-center gap-8 mb-12"
        >
          {[
            { Icon: GithubIcon, href: socialLinks.github, label: "GitHub" },
            { Icon: LinkedinIcon, href: socialLinks.linkedin, label: "LinkedIn" },
            { Icon: MailIcon, href: `mailto:${socialLinks.email}`, label: "Email" }
          ].map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-4 bg-gray-800 rounded-full shadow-lg group-hover:shadow-xl transition-all">
                <Icon className="w-8 h-8 text-teal-400" />
              </div>
              <span className="text-sm text-gray-400">{label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.a
            href="#projects"
            className="inline-block bg-gradient-to-r from-teal-500 to-blue-500 text-white px-12 py-5 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Conheça meu trabalho
          </motion.a>
        </motion.div>

      </motion.div>
    </section>
  );
}