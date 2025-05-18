const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors(), bodyParser.json());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "agr3w123",
  database: "users",
};

mysql
  .createConnection(dbConfig)
  .then((conn) => console.log("MySQL conectado!"))
  .catch((err) => console.error("Erro MySQL:", err));

app.listen(3001, () => console.log("API rodando na porta 3001"));

/**
 * @todo ajustar o retorno do cadastro
 * @todo ajustar o retorno do login
 * @todo ajustar tabela no MySQL
 * @todo ajustar validações
 */
app.post("/users", async (req, res) => {
  const { primeiro_nome, ultimo_nome, email, tipoDocumento, documento, senha, termos } = req.body;
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
      INSERT INTO users
        (primeiro_nome, ultimo_nome, email, tipoDocumento, documento, senha, termos)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [primeiro_nome, ultimo_nome, email, tipoDocumento, documento, senha, termos];
    const [result] = await conn.execute(sql, params);

    res.status(201).json({ id: result.insertId, primeiro_nome, ultimo_nome, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute(
    "SELECT id, primeiro_nome, ultimo_nome, email, tipoDocumento, documento FROM users WHERE email = ? AND senha = ?",
    [email, senha]
  );
  if (rows.length === 0) {
    return res.status(401).json({ error: "Usuário ou senha inválidos." });
  }
  res.json(rows[0]);
});

// --------------------DADOS DA CONTA---------------------
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { primeiro_nome, ultimo_nome, tipoDocumento, documento, email } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  await conn.execute(
    "UPDATE users SET primeiro_nome=?, ultimo_nome=?, tipoDocumento=?, documento=?, email=? WHERE id=?",
    [primeiro_nome, ultimo_nome, tipoDocumento, documento, email, id]
  );
  res.json({ ok: true });
});

app.put("/users/:id/senha", async (req, res) => {
  const { id } = req.params;
  const { senhaAtual, novaSenha } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  // Verifica senha atual
  const [rows] = await conn.execute("SELECT senha FROM users WHERE id = ?", [id]);
  if (!rows.length || rows[0].senha !== senhaAtual) {
    return res.status(400).json({ error: "Senha atual incorreta." });
  }
  await conn.execute("UPDATE users SET senha = ? WHERE id = ?", [novaSenha, id]);
  res.json({ ok: true });
});

// --------------------ENDEREÇOS---------------------
app.get("/enderecos/:userId", async (req, res) => {
  const { userId } = req.params;
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute(
    "SELECT * FROM enderecos WHERE user_id = ?",
    [userId]
  );
  res.json(rows);
});

app.post("/enderecos", async (req, res) => {
  const {
    user_id,
    tipo,
    nome_destinatario,
    endereco,
    cidade,
    estado,
    cep,
    telefone,
    padrao
  } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  const [result] = await conn.execute(
    "INSERT INTO enderecos (user_id, tipo, nome_destinatario, endereco, cidade, estado, cep, telefone, padrao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [user_id, tipo, nome_destinatario, endereco, cidade, estado, cep, telefone, padrao]
  );
  res.status(201).json({ id: result.insertId });
});

// Excluir endereço
app.delete("/enderecos/:id", async (req, res) => {
  const { id } = req.params;
  const conn = await mysql.createConnection(dbConfig);
  await conn.execute("DELETE FROM enderecos WHERE id = ?", [id]);
  res.json({ ok: true });
});

// Definir endereço como padrão
app.put("/enderecos/:id/padrao", async (req, res) => {
  const { id } = req.params;
  const { user_id, tipo } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  // Remove padrão de todos do mesmo tipo
  await conn.execute(
    "UPDATE enderecos SET padrao = 0 WHERE user_id = ? AND tipo = ?",
    [user_id, tipo]
  );
  // Seta padrão no selecionado
  await conn.execute(
    "UPDATE enderecos SET padrao = 1 WHERE id = ?",
    [id]
  );
  res.json({ ok: true });
});

app.put("/enderecos/:id", async (req, res) => {
  const { id } = req.params;
  const {
    tipo,
    nome_destinatario,
    endereco,
    cidade,
    estado,
    cep,
    telefone,
    padrao,
    user_id
  } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  await conn.execute(
    "UPDATE enderecos SET tipo=?, nome_destinatario=?, endereco=?, cidade=?, estado=?, cep=?, telefone=?, padrao=? WHERE id=? AND user_id=?",
    [tipo, nome_destinatario, endereco, cidade, estado, cep, telefone, padrao, id, user_id]
  );
  res.json({ ok: true });
});

// --------------------PEDIDOS---------------------
app.get("/pedidos/:userId", async (req, res) => {
  const { userId } = req.params;
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute("SELECT * FROM pedidos WHERE user_id = ?", [
    userId,
  ]);
  res.json(rows);
});

// --------------------CHAMADOS---------------------
// Listar chamados do usuário
app.get("/chamados/:userId", async (req, res) => {
  const { userId } = req.params;
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute(
    "SELECT * FROM chamados WHERE user_id = ? ORDER BY data_abertura DESC",
    [userId]
  );
  res.json(rows);
});

// Abrir novo chamado
app.post("/chamados", async (req, res) => {
  const { user_id, tipo, titulo, mensagem } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  // Cria chamado
  const [result] = await conn.execute(
    "INSERT INTO chamados (user_id, assunto, mensagem, status) VALUES (?, ?, ?, 'aberto')",
    [user_id, titulo, mensagem]
  );
  // Primeira mensagem do usuário
  await conn.execute(
    "INSERT INTO chamado_mensagens (chamado_id, autor, mensagem) VALUES (?, 'usuario', ?)",
    [result.insertId, mensagem]
  );
  res.status(201).json({ id: result.insertId });
});

// Listar mensagens de um chamado
app.get("/chamados/:id/mensagens", async (req, res) => {
  const { id } = req.params;
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute(
    "SELECT * FROM chamado_mensagens WHERE chamado_id = ? ORDER BY data_envio ASC",
    [id]
  );
  res.json(rows);
});

// Enviar mensagem em um chamado
app.post("/chamados/:id/mensagens", async (req, res) => {
  const { id } = req.params;
  const { autor, mensagem } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  await conn.execute(
    "INSERT INTO chamado_mensagens (chamado_id, autor, mensagem) VALUES (?, ?, ?)",
    [id, autor, mensagem]
  );
  res.status(201).json({ ok: true });
});

app.put("/chamados/:id/fechar", async (req, res) => {
  const { id } = req.params;
  const { motivo } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  await conn.execute(
    "UPDATE chamados SET status = 'fechado', motivo_fechamento = ? WHERE id = ?",
    [motivo, id]
  );
  res.json({ ok: true });
});
