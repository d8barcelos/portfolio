import { motion } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, Book, BookDashed, BookOpen } from 'lucide-react';
import { GradientText } from './shared/GradientText';

const timeline = [
  {
    year: "2022",
    title: "Início do curso de ADS",
    company: "Uninter",
    description: "Comecei minha jornada acadêmica em Análise e Desenvolvimento de Sistemas.",
    icon: BookOpen,
  },
  {
    year: "2024",
    title: "Início do estágio",
    company: "Proapp",
    description: "Primeira experiência profissional como estagiário em desenvolvimento de software.",
    icon: Briefcase,
  },
  {
    year: "2024",
    title: "Desenvolvedor Back-End Júnior",
    company: "Simple",
    description: "Assumi o cargo de desenvolvedor back-end júnior, ampliando meu aprendizado e experiência profissional.",
    icon: Briefcase,
  },
  {
    year: "2024",
    title: "Graduação em ADS",
    company: "Uninter",
    description: "Me formei em análise e desenvolvimento de sistema.",
    icon: GraduationCap,
  },
  {
    year: "2025",
    title: "Cursando Arquitetura de Software",
    company: "FIAP",
    description: "Comecei minha pós graduação em arquitetura de software na FIAP.",
    icon: BookOpen,
  }
];

export function Timeline() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <GradientText>Minha Jornada</GradientText>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Um breve histórico da minha trajetória profissional e acadêmica
          </p>
        </motion.div>

        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-teal-400" />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex items-center justify-between mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="w-5/12" />
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-5/12 bg-white p-6 rounded-xl shadow-lg relative"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <item.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-gray-600">{item.company}</p>
                  </div>
                </div>
                <p className="text-gray-600">{item.description}</p>

                {/* Ano posicionado no canto superior direito */}
                <div className="absolute top-4 right-4 text-sm font-bold text-blue-500">
                  {item.year}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
