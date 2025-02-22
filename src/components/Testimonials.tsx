import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { GradientText } from './shared/GradientText';

const testimonials = [
  {
    name: "Gustavo Borges",
    role: "CTO @ Nevoa",
    content: "Diogo é um desenvolvedor excepcional. Sua capacidade de resolver problemas complexos e entregar soluções é impressionante.",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQF-7yM5Eb20kQ/profile-displayphoto-shrink_200_200/B4DZTSukLPGcAg-/0/1738702210286?e=1744243200&v=beta&t=H5wxUzaijn1N-jbdXqFH0Tq2ZHThJcitxDPSPJA3TVs"
  },
  {
    name: "Maria Santos",
    role: "Product Manager @ Startup",
    content: "Trabalhar com o Diogo foi incrível. Ele não apenas entrega código de qualidade, mas também contribui com ótimas ideias para o produto.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Pedro Costa",
    role: "Tech Lead @ Innovation",
    content: "A dedicação do Diogo em criar código limpo e bem documentado é notável. Ele eleva o nível de qualquer equipe.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export function Testimonials() {
  return (
    <section className="py-32 px-6 bg-gray-900 overflow-hidden">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ 
          once: true,
          amount: 0.2,
          margin: "0px 0px -200px 0px"
        }}
        variants={containerVariants}
      >
        <motion.div
          variants={titleVariants}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <GradientText>O que dizem sobre mim</GradientText>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Feedback de pessoas com quem já trabalhei em projetos anteriores
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
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
              className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform-gpu"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Quote className="w-12 h-12 text-teal-400 mb-6" />
              </motion.div>
              
              <p className="text-gray-400 mb-6 italic">"{testimonial.content}"</p>
              
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                />
                <div>
                  <h4 className="font-bold text-lg text-gray-200">{testimonial.name}</h4>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}