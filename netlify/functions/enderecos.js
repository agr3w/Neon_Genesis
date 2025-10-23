import { neon } from '@netlify/neon';

export async function handler(event) {
  const sql = neon();

  if (event.httpMethod === 'GET') {
    // Buscar endereços de um usuário
    const userId = event.queryStringParameters?.user_id;
    if (!userId) {
      return { statusCode: 400, body: 'user_id obrigatório' };
    }
    try {
      const rows = await sql`SELECT * FROM enderecos WHERE user_id = ${userId}`;
      return { statusCode: 200, body: JSON.stringify(rows) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  if (event.httpMethod === 'POST') {
    // Cadastrar novo endereço
    const body = JSON.parse(event.body);
    try {
      const [result] = await sql`
        INSERT INTO enderecos (
          user_id, tipo, nome_destinatario, cep, endereco, numero, complemento,
          bairro, cidade, estado, telefone, padrao
        ) VALUES (
          ${body.user_id}, ${body.tipo}, ${body.nome_destinatario}, ${body.cep},
          ${body.endereco}, ${body.numero}, ${body.complemento}, ${body.bairro},
          ${body.cidade}, ${body.estado}, ${body.telefone}, ${body.padrao}
        ) RETURNING *
      `;
      return { statusCode: 201, body: JSON.stringify(result) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  return { statusCode: 405, body: 'Método não permitido' };
}