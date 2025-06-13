import ultraPro from "../assets/ultra-pro.png";
import express from "../assets/express.png";
import avancado from "../assets/avancado.png";
import compacto from "../assets/compacto.png";

const totensData = [
  {
    id: 1,
    name: "Totem Ultra Pro",
    description:
      "Controle de acesso e pagamentos.",
    description2:
      "O Totem Express oferece uma excelente performance e estabilidade. Com tela touch responsiva, impressora térmica e espaço para pinpad, é ideal para atendimento digital em pontos de venda. Permite emissão de senhas, consulta de produtos, check-in e coleta de dados com eficiência. Seu design moderno se adapta a ambientes corporativos, clínicas, farmácias e lojas. Integra-se facilmente a sistemas existentes por meio de APIs e softwares customizados. Oferece bom desempenho com baixo consumo de energia e manutenção simplificada. Permite personalização de layout, cor e logomarca. Uma solução versátil para quem busca tecnologia sem abrir mão da economia.",
    image:
      ultraPro,
    price: 2999.99,
    category: "locação",
    type: "locacao",
  },
  {
    id: 2,
    name: "Totem Express",
    description: "Compacto e rápido, ideal para pontos de alto fluxo.",
    description2: "O Totem Express oferece um excelente equilíbrio entre performance e custo. Com tela touch responsiva, e slots USB para expansão e funcionalidades é ideal para atendimento digital em pontos de venda. Permite emissão de senhas, consulta de produtos, check-in e coleta de dados com eficiência. Seu design moderno se adapta a ambientes corporativos, clínicas, farmácias e lojas. Integra-se facilmente a sistemas existentes por meio de APIs e softwares customizados. Oferece bom desempenho com baixo consumo de energia e manutenção simplificada. Permite personalização de layout, cor e logomarca. Uma solução versátil para quem busca tecnologia sem abrir mão da economia.",
    image:
      express,
    price: 1099.99,
    category: "Totens para autopagamento",
    type: "venda",
  },
  {
    id: 3,
    name: "Totem Avançado",
    description: "Este totem é ideal para ambientes corporativos.",
    description2: "O modelo Avançado foi desenvolvido para aplicações rápidas e objetivas. Compacto e eficiente, é ideal para cadastros, emissão de senhas, enquetes e pesquisas de satisfação. Com tela touch de tamanho reduzido e impressora integrada, ocupa pouco espaço e entrega alta performance. Perfeito para recepções, pequenos eventos, feiras, salões de beleza e consultórios. Fácil de transportar e instalar, com estrutura leve e resistente. Integração rápida com sistemas web e mobile. Ideal para fluxos rápidos de atendimento ou automações pontuais. Uma opção prática, moderna e acessível para digitalizar seu atendimento.",
    image:
      avancado,
    price: 1399.99,
    category: "Totens linha Tablet",
    type: "venda",
  },
  {
    id: 4,
    name: "Totem Compacto",
    description: "Totem compacto para espaços reduzidos.",
    description2: "O Totem Compacto é a solução ideal para espaços reduzidos e necessidades básicas de autoatendimento. Conta com tela sensível ao toque e permite exibição de conteúdo interativo, informativo ou promocional. Simples, leve e econômico, é perfeito para recepção de visitantes, totens de consulta e sinalização digital. Design discreto, com estrutura que se adapta facilmente a balcões, paredes ou suportes fixos. Pode funcionar de forma autônoma com conexão à internet ou em rede local. Personalizável com sua identidade visual e aplicações específicas. Ideal para hotéis, pequenos comércios, escolas, academias e condomínios. Tecnologia essencial para digitalizar serviços com baixo investimento.",
    image:
      compacto,
    price: 899.99,
    category: "Totens para impressão de senhas",
    type: "locacao",
  },
  // Adicione mais totens conforme necessário
];

export default totensData;
