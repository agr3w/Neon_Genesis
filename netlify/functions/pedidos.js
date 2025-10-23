import { neon } from '@netlify/neon';

export async function handler(event) {
  const sql = neon();

  if (event.httpMethod === 'POST') {
    // Criar novo pedido
    const body = JSON.parse(event.body);
    try {
      const [result] = await sql`
        INSERT INTO pedidos (
          user_id, numero_pedido, pagamento, data, valor_total, subtotal,
          freight, discount, status, detalhes, endereco
        ) VALUES (
          ${body.user_id}, ${body.numero_pedido}, ${body.pagamento}, ${body.data},
          ${body.valor_total}, ${body.subtotal}, ${body.freight}, ${body.discount},
          ${body.status}, ${body.detalhes}, ${body.endereco}
        ) RETURNING *
      `;
      return { statusCode: 201, body: JSON.stringify(result) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  if (event.httpMethod === 'GET') {
    // Buscar pedidos de um usuário
    const userId = event.queryStringParameters?.user_id;
    if (!userId) {
      return { statusCode: 400, body: 'user_id obrigatório' };
    }
    try {
      const rows = await sql`SELECT * FROM pedidos WHERE user_id = ${userId}`;
      return { statusCode: 200, body: JSON.stringify(rows) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  return { statusCode: 405, body: 'Método não permitido' };
}