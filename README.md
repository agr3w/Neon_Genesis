```
my-totem-rental/
├─ public/
│   ├─ index.html
│   └─ ...
├─ src/
│   ├─ assets/
│   │   ├─ images/
│   │   │   └─ (imagens gerais do projeto)
│   │   └─ styles/
│   │       └─ (estilos globais, variáveis de cor, fontes, etc.)
│   ├─ components/
│   │   ├─ Header/
│   │   │   ├─ Header.jsx
│   │   │   └─ Header.module.css (ou .scss/.styled.js, etc.)
│   │   ├─ Footer/
│   │   │   ├─ Footer.jsx
│   │   │   └─ Footer.module.css
│   │   └─ (outros componentes reutilizáveis)
│   ├─ pages/
│   │   ├─ Home/
│   │   │   ├─ Home.jsx
│   │   │   └─ Home.module.css
│   │   ├─ TotensList/
│   │   │   ├─ TotensList.jsx
│   │   │   └─ TotensList.module.css
│   │   ├─ TotemDetails/
│   │   │   ├─ TotemDetails.jsx
│   │   │   └─ TotemDetails.module.css
│   │   ├─ Formulario/
│   │   │   ├─ Formulario.jsx
│   │   │   └─ Formulario.module.css
│   │   ├─ Login/
│   │   │   ├─ Login.jsx
│   │   │   └─ Login.module.css
│   │   ├─ Registro/
│   │   │   ├─ Registro.jsx
│   │   │   └─ Registro.module.css
│   │   └─ (outras páginas)
│   ├─ routes/
│   │   └─ AppRouter.jsx
│   ├─ context/
│   │   └─ AuthContext.jsx (exemplo para contexto de autenticação)
│   ├─ services/
│   │   └─ api.js (configurações de axios ou fetch)
│   ├─ utils/
│   │   └─ helpers.js (funções utilitárias)
│   ├─ App.jsx
│   ├─ index.js
│   └─ ...
├─ package.json
└─ README.md
```

Header (Cabeçalho):

    O Header geralmente aparece no topo da página ou do site. Ele é utilizado para exibir informações importantes e links para facilitar a navegação.
    Normalmente, um header inclui:
        Logo do site ou da empresa.
        Links de navegação (como links para "Home", "Sobre", "Contato", etc.).
        Barra de pesquisa, se necessário.
        Menu de usuário (como login, perfil, configurações, etc.).
    O objetivo do Header é garantir que o usuário possa navegar facilmente e identificar rapidamente o site ou a aplicação.

Footer (Rodapé):

    O Footer é a seção que aparece no final da página.
    Ele normalmente contém informações complementares que não precisam estar visíveis o tempo todo, mas que ainda são importantes.
    O Footer pode incluir:
        Links adicionais (como Política de Privacidade, Termos de Serviço, etc.).
        Informações de contato (como endereço, telefone, email).
        Redes sociais (ícones com links para as redes sociais da empresa).
        Copyright e outras informações legais.
    O objetivo do Footer é fornecer informações de apoio e links úteis, sem sobrecarregar a parte principal da página.
