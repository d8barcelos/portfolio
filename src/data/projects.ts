export const projects = [
  {
    title: ".NET 7 RPG game",
    description: "Projeto de um text-based RPG com funcionalidades completas de criação, leitura, atualização e exclusão de personagens em um mundo de RPG. Além disso, possui autenticação de usuário e autorização para proteger as operações. Inclui recursos de batalha, onde personagens lutam usando habilidades e armas, com estatísticas de batalha registradas e um sistema de pontuação para os melhores combatentes.",
    image: "https://blog.tubikstudio.com/wp-content/uploads/2016/11/back-end-development-1.jpg",
    tags: ["C#", ".NET", "SQL Server", "Entity Framework",],
    github: "https://github.com/Llangraff/Bibliotech",
    featured: true
  },
  {
    title: "Youtube Recap",
    description: "Aplicação em python que constrói uma recap dos seus videos assistidos no youtube por ano utilizando um arquivo json do google takeout. A aplicação possui uma interface gráfica feita utilizando o streamlit, o que permite opções para manipular e analisar os dados dos resultados de forma muito simples e dinâmica. A aplicação também é escalável e flexível, podendo ser utilizada com arquivos JSON de outras fontes de conteúdo.",
    image: "https://m-cdn.phonearena.com/images/article/157259-wide-two_1200/YouTube-Music-Winter-2024-recap-is-finally-here.jpg",
    tags: ["Python", "Pandas", "Streamlit",],
    github: "https://github.com/d8barcelos/yt-content-insights",
    featured: true
  },
  {
    title: "Sistema de gestão de eventos",
    description: "Backend para gestão de eventos, permitindo a criação, atualização, remoção e consulta de eventos com filtros e paginação. O sistema mantém um histórico de alterações e usa GraphQL para uma API eficiente. Desenvolvido com NestJS, TypeORM e banco de dados PostgreSQL.",
    image: "https://broscorp.net/wp-content/uploads/2022/11/back-end_developers-1024x621.png",
    tags: ["TypeScript", "NestJS", "GraphQL", "PostgreSQL",],
    github: "https://github.com/d8barcelos/events-planning",
    featured: true
  },
  {
    title: "API de solicitações",
    description: "API RESTful que gerencia solicitações de usuários, a aplicação utiliza um banco de dados NoSQL (MongoDB), além de um banco de dados em cache (Redis). A API possui autenticação JWT, garantindo a segurança das rotas e permitindo que usuários de diferentes funções acessem endpoints específicos.",
    image: "https://www.brasilcode.com.br/wp-content/uploads/2023/09/javascript-backend.webp",
    tags: ["C#", ".NET 8", "MongoDB", "Redis",],
    github: "https://github.com/d8barcelos/requests-api",
    featured: true
  }
];