import { motion } from 'framer-motion';
import { ProjectCard } from './projects/ProjectCard';
import { projects } from '../data/projects';

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
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
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}