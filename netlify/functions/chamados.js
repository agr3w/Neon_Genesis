import { neon } from '@netlify/neon';

export async function handler(event) {
  const sql = neon();

  if (event.httpMethod === 'POST') {
    // Criar novo chamado
    const body = JSON.parse(event.body);
    try {
      const [result] = await sql`
        INSERT INTO chamados (
          user_id, assunto, mensagem, status
        ) VALUES (
          ${body.user_id}, ${body.assunto}, ${body.mensagem}, 'aberto'
        ) RETURNING *
      `;
      return { statusCode: 201, body: JSON.stringify(result) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  if (event.httpMethod === 'GET') {
    // Buscar chamados de um usuário
    const userId = event.queryStringParameters?.user_id;
    if (!userId) {
      return { statusCode: 400, body: 'user_id obrigatório' };
    }
    try {
      const rows = await sql`SELECT * FROM chamados WHERE user_id = ${userId}`;
      return { statusCode: 200, body: JSON.stringify(rows) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  return { statusCode: 405, body: 'Método não permitido' };
}