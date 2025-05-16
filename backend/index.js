const express = require('express');
const mysql   = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors    = require('cors');
const app     = express();
app.use(cors(), bodyParser.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'agr3w123',
  database: 'users'
};

mysql.createConnection(dbConfig)
  .then(conn => console.log('MySQL conectado!'))
  .catch(err => console.error('Erro MySQL:', err));

app.listen(3001, () => console.log('API rodando na porta 3001'));

/**
 * @todo ajustar o retorno do cadastro
 * @todo ajustar o retorno do login
 * @todo ajustar tabela no MySQL
 * @todo ajustar validações
 */
app.post('/users', async (req, res) => {
  const { nome, email, tipoDocumento, documento, senha, termos } = req.body;
  // (já validou senha === confirmarSenha no frontend)

  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
      INSERT INTO users
        (name, email, tipoDocumento, documento, senha, termos)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [nome, email, tipoDocumento, documento, senha, termos];
    const [result] = await conn.execute(sql, params);

    res.status(201).json({ id: result.insertId, nome, email });
  } catch (err) {
    console.error('Erro no POST /users:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body; // Use email ou documento, conforme seu frontend
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute(
      'SELECT * FROM users WHERE email = ? AND senha = ?',
      [email, senha]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }
    // Nunca envie a senha de volta!
    const { senha: _, ...user } = rows[0];
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//metodo para adicionar um usuário
// async function addUser() {
//   try {
//     const res = await axios.post('http://localhost:3001/users', {
//       name: 'Maria',
//       email: 'maria@exemplo.com'
//     });
//     console.log('Usuário criado:', res.data);
//   } catch (err) {
//     console.error('Erro API:', err);
//   }
// }
