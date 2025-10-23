// Arquivo: netlify/functions/users.js (versão completa)
import { neon } from '@netlify/neon';
import bcrypt from 'bcryptjs';

function getId(path) {
  const parts = path.split('/');
  return parts.at(-1) === 'senha' ? parts.at(-2) : parts.at(-1);
}

export async function handler(event) {
  const sql = neon();
  const id = getId(event.path);
  
  // Rota para CRIAR usuário (POST /users)
  if (event.httpMethod === 'POST') {
    const body = JSON.parse(event.body);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.senha, salt);
    try {
      const [result] = await sql`
        INSERT INTO users (primeiro_nome, ultimo_nome, email, tipoDocumento, documento, senha, termos)
        VALUES (${body.primeiro_nome}, ${body.ultimo_nome}, ${body.email}, ${body.tipoDocumento}, ${body.documento}, ${hashedPassword}, ${body.termos})
        RETURNING id, primeiro_nome, ultimo_nome, email`;
      return { statusCode: 201, body: JSON.stringify(result) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  // Rota para EDITAR (PUT /users/{id}) e ALTERAR SENHA (PUT /users/{id}/senha)
  if (event.httpMethod === 'PUT') {
    const body = JSON.parse(event.body);

    // Lógica para ALTERAR SENHA
    if (event.path.endsWith('/senha')) {
      try {
        const [user] = await sql`SELECT senha FROM users WHERE id = ${id}`;
        if (!user) {
          return { statusCode: 404, body: JSON.stringify({ error: 'Usuário não encontrado.' }) };
        }
        const senhaAtualValida = bcrypt.compareSync(body.senhaAtual, user.senha);
        if (!senhaAtualValida) {
          return { statusCode: 401, body: JSON.stringify({ error: 'SENHA ATUAL INCORRETA.' }) };
        }
        const salt = bcrypt.genSaltSync(10);
        const novaSenhaHashed = bcrypt.hashSync(body.novaSenha, salt);
        await sql`UPDATE users SET senha = ${novaSenhaHashed} WHERE id = ${id}`;
        return { statusCode: 200, body: JSON.stringify({ message: 'Senha alterada com sucesso!' }) };
      } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: 'ERRO INTERNO NO SERVIDOR.' }) };
      }
    }

    // Lógica para EDITAR DADOS
    try {
      const [result] = await sql`
        UPDATE users SET 
          primeiro_nome = ${body.primeiro_nome}, 
          ultimo_nome = ${body.ultimo_nome},
          email = ${body.email},
          tipoDocumento = ${body.tipoDocumento},
          documento = ${body.documento}
        WHERE id = ${id}
        RETURNING id, primeiro_nome, ultimo_nome, email`;
      return { statusCode: 200, body: JSON.stringify(result) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  return { statusCode: 405, body: 'Método não permitido' };
}