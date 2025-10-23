// Arquivo: netlify/functions/enderecos.js (versão completa)
import { neon } from '@netlify/neon';

// Função auxiliar para extrair o ID da URL
function getId(path) {
  const parts = path.split('/');
  // Pega o ID, que pode ser o penúltimo ou antepenúltimo elemento, dependendo do path
  if (parts.at(-1) === 'padrao') {
    return parts.at(-2);
  }
  return parts.at(-1);
}

export async function handler(event) {
  const sql = neon();
  const id = getId(event.path);

  switch (event.httpMethod) {
    case 'GET': {
      const userId = event.queryStringParameters?.user_id;
      if (!userId) return { statusCode: 400, body: 'user_id obrigatório' };
      try {
        const rows = await sql`SELECT * FROM enderecos WHERE user_id = ${userId} ORDER BY padrao DESC, id ASC`;
        return { statusCode: 200, body: JSON.stringify(rows) };
      } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
      }
    }

    case 'POST': {
      const body = JSON.parse(event.body);
      try {
        const [result] = await sql`
          INSERT INTO enderecos (user_id, tipo, nome_destinatario, cep, endereco, numero, complemento, bairro, cidade, estado, telefone, padrao)
          VALUES (${body.user_id}, ${body.tipo}, ${body.nome_destinatario}, ${body.cep}, ${body.endereco}, ${body.numero}, ${body.complemento}, ${body.bairro}, ${body.cidade}, ${body.estado}, ${body.telefone}, ${body.padrao})
          RETURNING *`;
        return { statusCode: 201, body: JSON.stringify(result) };
      } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
      }
    }

    case 'PUT': {
      const body = JSON.parse(event.body);
      // Lógica para definir como padrão
      if (event.path.endsWith('/padrao')) {
        try {
          // Começa uma transação para garantir a consistência dos dados
          await sql.transaction([
            // Define todos os endereços do mesmo tipo como não-padrão
            sql`UPDATE enderecos SET padrao = false WHERE user_id = ${body.user_id} AND tipo = ${body.tipo}`,
            // Define o endereço específico como padrão
            sql`UPDATE enderecos SET padrao = true WHERE id = ${id} AND user_id = ${body.user_id}`
          ]);
          return { statusCode: 200, body: JSON.stringify({ message: 'Endereço padrão atualizado' }) };
        } catch (err) {
          return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
        }
      }
      // Lógica para editar um endereço
      try {
        const [result] = await sql`
          UPDATE enderecos SET
            tipo = ${body.tipo}, nome_destinatario = ${body.nome_destinatario}, cep = ${body.cep},
            endereco = ${body.endereco}, numero = ${body.numero}, complemento = ${body.complemento},
            bairro = ${body.bairro}, cidade = ${body.cidade}, estado = ${body.estado}, telefone = ${body.telefone}
          WHERE id = ${id} AND user_id = ${body.user_id}
          RETURNING *`;
        return { statusCode: 200, body: JSON.stringify(result) };
      } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
      }
    }

    case 'DELETE': {
        const userId = event.queryStringParameters?.user_id; // Passar user_id para segurança
      try {
        await sql`DELETE FROM enderecos WHERE id = ${id}`;
        return { statusCode: 204, body: '' }; // 204 No Content é a resposta padrão para delete
      } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
      }
    }

    default:
      return { statusCode: 405, body: 'Método não permitido' };
  }
}