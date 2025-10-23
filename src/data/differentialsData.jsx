import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import interfaceIntuitiva from "../assets/interface-intuitiva.jpg";
import horas from "../assets/24h.png";
import flex from "../assets/flex.webp";

const differentialsData = [
  {
    icon: <AccessTimeIcon fontSize="large" />,
    title: "Atendimento 24h",
    image:
      horas,
    details: "Suporte ininterrupto para garantir funcionamento sem falhas.",
  },
  {
    icon: <TouchAppIcon fontSize="large" />,
    title: "Interface Intuitiva",
    image:
      interfaceIntuitiva,
    details: "Design amigável que facilita a navegação e uso dos totens.",
  },
  {
    icon: <SecurityIcon fontSize="large" />,
    title: "Segurança Avançada",
    image:
      "https://th.bing.com/th/id/OIP.WpmUmp1GJ1RJuofGiaZv0AHaEO?r=0&rs=1&pid=ImgDetMain",
    details: "Criptografia de ponta para proteger dados e transações.",
  },
  {
    icon: <SettingsAccessibilityIcon fontSize="large" />,
    title: "Flexibilidade",
    image:
      flex,
    details:
      "Adaptação às necessidades do seu negócio, com soluções escaláveis.",
  },
  // Adicione mais diferenciais conforme necessário
];

export default differentialsData;
