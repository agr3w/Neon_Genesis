// Arquivo: login.js
import { neon } from '@netlify/neon';
import bcrypt from 'bcryptjs';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido' };
  }
  const body = JSON.parse(event.body);
  const sql = neon();

  try {
    // Primeiro, busca o usuário pelo email
    const [user] = await sql`
      SELECT * FROM users WHERE email = ${body.email}
    `;

    if (!user) {
      return { statusCode: 401, body: 'Usuário ou senha inválidos' };
    }

    // Agora, compara a senha enviada com o hash salvo no banco
    const passwordIsValid = bcrypt.compareSync(body.senha, user.senha);

    if (!passwordIsValid) {
      return { statusCode: 401, body: 'Usuário ou senha inválidos' };
    }
    
    // Não retorne a senha no resultado final!
    delete user.senha;

    return { statusCode: 200, body: JSON.stringify(user) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}