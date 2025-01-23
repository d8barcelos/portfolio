import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '../shared/Badge';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    github: string;
    demo?: string;
    featured?: boolean;
  };
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 mix-blend-multiply opacity-0 group-hover:opacity-70 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        />
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-700 rounded-full hover:scale-110 transition-transform"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="w-5 h-5 text-teal-400" />
          </motion.a>
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-700 rounded-full hover:scale-110 transition-transform"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-5 h-5 text-teal-400" />
            </motion.a>
          )}
        </div>
      </div>

      <div className="p-6">
        <motion.h3
          className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500"
          whileHover={{ scale: 1.02 }}
        >
          {project.title}
        </motion.h3>
        <p className="text-gray-400 mb-4 text-sm line-clamp-5">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, tagIndex) => (
            <Badge key={tagIndex} className="bg-gray-700 text-gray-300 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}