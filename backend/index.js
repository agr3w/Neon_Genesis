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

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

