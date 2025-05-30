CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  primeiro_nome VARCHAR(100),
  ultimo_nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  tipoDocumento VARCHAR(10),
  documento VARCHAR(30),
  senha VARCHAR(255),
  termos BOOLEAN DEFAULT 0
);

CREATE TABLE enderecos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  tipo VARCHAR(20), -- 'entrega' ou 'cobranca'
  nome_destinatario VARCHAR(100),
  endereco VARCHAR(255),
  cidade VARCHAR(100),
  estado VARCHAR(2),
  cep VARCHAR(15),
  telefone VARCHAR(20),
  padrao BOOLEAN DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  numero_pedido VARCHAR(50),
  pagamento VARCHAR(100),
  data DATETIME,
  valor_total DECIMAL(10,2),	
  subtotal DECIMAL(10,2) DEFAULT 0,
  freight DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(30),
  detalhes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE chamados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  assunto VARCHAR(100),
  mensagem TEXT,
  status VARCHAR(20) DEFAULT 'aberto',
  data_abertura DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_fechamento DATETIME,
  motivo_fechamento VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE chamado_mensagens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chamado_id INT,
  autor ENUM('usuario','suporte'),
  mensagem TEXT,
  data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chamado_id) REFERENCES chamados(id)
);

CREATE TABLE locacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  mensagem TEXT,
  totem_id INT NOT NULL,
  totem_nome VARCHAR(100) NOT NULL,
  data_solicitacao DATETIME DEFAULT CURRENT_TIMESTAMP
);