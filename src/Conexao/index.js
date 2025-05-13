const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000; // Porta do servidor

// Configuração do middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cadastro_usuario'
});

// Testando a conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

// Rota para cadastrar um usuário
app.post('/api/cadastro', (req, res) => {
  const { documento, nome, email, senha, dataNascimento, telefone, endereco, cidade, estado, cep } = req.body;

  const query = `
    INSERT INTO usuarios (documento, nome, email, senha, data_nascimento, telefone, endereco, cidade, estado, cep)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [documento, nome, email, senha, dataNascimento, telefone, endereco, cidade, estado, cep], (err, results) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
      res.status(500).send('Erro ao cadastrar usuário');
      return;
    }
    res.status(200).send('Usuário cadastrado com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});