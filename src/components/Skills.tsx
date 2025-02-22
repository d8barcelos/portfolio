import { motion } from 'framer-motion';
import { Code2, Database, Globe, Layout, Server, Terminal } from 'lucide-react';
import { GradientText } from './shared/GradientText';

const skills = [
  {
    category: "Front-end",
    icon: Layout,
    items: ["Angular", "TypeScript", "Next.js", "Bootstrap", "React"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    category: "Back-end",
    icon: Server,
    items: ["C#", ".NET", "NestJS", "Python", "Java"],
    color: "from-green-500 to-emerald-500"
  },
  {
    category: "Database",
    icon: Database,
    items: ["SQL Server", "MongoDB", "Redis", "PostgreSQL", "Firebase"],
    color: "from-purple-500 to-pink-500"
  },
  {
    category: "DevOps",
    icon: Terminal,
    items: ["Docker", "Azure", "CI/CD", "Linux", "RabbitMQ"],
    color: "from-orange-500 to-red-500"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.6
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.5
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export function Skills() {
  return (
    <section className="py-32 px-6 bg-gray-900 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <GradientText>Minhas Habilidades</GradientText>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tecnologias e ferramentas que domino e utilizo para criar soluções inovadoras
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.category}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className={`bg-gradient-to-r ${skill.color} p-4 rounded-lg inline-block mb-4`}>
                <skill.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{skill.category}</h3>
              <motion.ul
                variants={containerVariants}
                className="space-y-2"
              >
                {skill.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={itemVariants}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <Code2 className="w-4 h-4 text-blue-500" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}