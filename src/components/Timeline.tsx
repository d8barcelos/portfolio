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
    title: "Desenvolvedor Back-End Junior",
    company: "Simple",
    description: "Assumi o cargo de desenvolvedor back-end júnior, ampliando meu aprendizado e experiência profissional.",
    icon: Briefcase,
  },
  {
    year: "2024",
    title: "Graduação em ADS",
    company: "Uninter",
    description: "Me formei em análise e desenvolvimento de sistemas.",
    icon: GraduationCap,
  }
];

export function Timeline() {
  return (
    <section className="py-16 md:py-32 px-4 md:px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            <GradientText>Minha Jornada</GradientText>
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
            Um breve histórico da minha trajetória profissional e acadêmica
          </p>
        </motion.div>

        <div className="relative">
          {/* Linha vertical central (aparece apenas no desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-500 to-blue-500" />

          {timeline.map((item, index) => {
            const isLeftSide = index % 2 === 0; // Alterna entre os lados
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeftSide ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative mb-8 md:mb-16 md:flex ${
                  isLeftSide ? "md:justify-end" : "md:justify-start"
                }`}
              >
                {/* Marcador no desktop */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-gray-800 shadow-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-teal-400" />
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gray-800 p-5 md:p-6 rounded-xl shadow-lg relative ${
                    isLeftSide ? "md:mr-8 md:ml-0" : "md:ml-8 md:mr-0"
                  } md:w-5/12`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-gray-700">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-xl font-bold text-gray-200">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-400">
                        {item.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-gray-400">
                    {item.description}
                  </p>

                  {/* Ano no canto superior direito */}
                  <div className="absolute top-4 right-4 text-xs md:text-sm font-bold text-teal-400">
                    {item.year}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
