import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Coffee } from 'lucide-react';
import { socialLinks } from '../data/socialLinks';

export function Footer() {
  return (
    <footer className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Contato</h3>
            <div className="space-y-4">
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>{socialLinks.email}</span>
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Localização</h3>
            <p className="text-gray-600">
              ES, Brasil
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">Disponibilidade</h3>
            <p className="text-gray-600">
              <span className="flex items-center gap-2">
                Seg a Sex: 9h às 18h - Coding & Coffee <Coffee className="w-4 h-4" />
              </span>
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between text-center text-gray-600 gap-6">
            <p className="flex items-center justify-center gap-2">
              Desenvolvido com <Heart className="w-4 h-4 text-red-500" /> por Diogo Barcelos
            </p>
            <p className="italic">
            "Entre bugs e cafés, nascem grandes ideias."
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
