import { neon } from '@netlify/neon';

export async function handler(event) {
  const sql = neon();

  if (event.httpMethod === 'POST') {
    // Criar nova solicitação de locação
    const body = JSON.parse(event.body);
    try {
      const [result] = await sql`
        INSERT INTO locacoes (
          nome, email, mensagem, totem_id, totem_nome
        ) VALUES (
          ${body.nome}, ${body.email}, ${body.mensagem}, ${body.totem_id}, ${body.totem_nome}
        ) RETURNING *
      `;
      return { statusCode: 201, body: JSON.stringify(result) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  if (event.httpMethod === 'GET') {
    // Buscar todas as solicitações de locação
    try {
      const rows = await sql`SELECT * FROM locacoes`;
      return { statusCode: 200, body: JSON.stringify(rows) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  return { statusCode: 405, body: 'Método não permitido' };
}