// Arquivo: users.js
import { neon } from '@netlify/neon';
import bcrypt from 'bcryptjs';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido' };
  }
  const body = JSON.parse(event.body);
  const sql = neon();

  // Criptografa a senha antes de salvar
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(body.senha, salt);

  try {
    const [result] = await sql`
      INSERT INTO users (primeiro_nome, ultimo_nome, email, tipoDocumento, documento, senha, termos)
      VALUES (${body.primeiro_nome}, ${body.ultimo_nome}, ${body.email}, ${body.tipoDocumento}, ${body.documento}, ${hashedPassword}, ${body.termos})
      RETURNING id, primeiro_nome, ultimo_nome, email
    `;
    return {
      statusCode: 201,
      body: JSON.stringify(result)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}