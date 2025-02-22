import { motion, useScroll, useInView } from 'framer-motion';
import { ProjectCard } from './projects/ProjectCard';
import { projects } from '../data/projects';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-gray-900 overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ 
          once: true,
          amount: 0.2, // Reduz a quantidade necessária do elemento visível para triggerar
          margin: "0px 0px -200px 0px" // Margem negativa para começar a animação antes
        }}
        variants={containerVariants}
      >
        <motion.div
          variants={titleVariants}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500 inline-block">
              Projetos em Destaque
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Uma seleção dos meus melhores trabalhos, demonstrando minhas habilidades
            e experiência em desenvolvimento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.2,
                  ease: "easeOut"
                }
              }}
              className="transform-gpu"
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}