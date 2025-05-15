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
