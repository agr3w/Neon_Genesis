// Arquivo: netlify/functions/chamados.js (versão completa)
import { neon } from '@netlify/neon';

// Função para extrair o ID e a ação da URL
// Ex: /.../chamados/123/mensagens -> { id: '123', action: 'mensagens' }
function parsePath(path) {
  const parts = path.split('/');
  const chamadosIndex = parts.indexOf('chamados');
  if (chamadosIndex === -1 || chamadosIndex + 1 >= parts.length) {
    return { id: null, action: null };
  }
  const id = parts[chamadosIndex + 1];
  const action = parts[chamadosIndex + 2] || null;
  return { id, action };
}


export async function handler(event) {
  const sql = neon();
  const { id, action } = parsePath(event.path);

  // Rota para CRIAR um novo chamado (POST /chamados)
  if (event.httpMethod === 'POST' && !id) {
    const body = JSON.parse(event.body);
    try {
      // Ajustado para usar 'titulo' e 'tipo' que vêm do frontend
      const [result] = await sql`
        INSERT INTO chamados (user_id, tipo, titulo, mensagem, status)
        VALUES (${body.user_id}, ${body.tipo}, ${body.titulo}, ${body.mensagem}, 'aberto')
        RETURNING *`;
      return { statusCode: 201, body: JSON.stringify(result) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }
  
  // Rota para BUSCAR todos os chamados de um usuário (GET /chamados?user_id=...)
  if (event.httpMethod === 'GET' && !id) {
    const userId = event.queryStringParameters?.user_id;
    if (!userId) return { statusCode: 400, body: 'user_id obrigatório' };
    try {
      const rows = await sql`SELECT * FROM chamados WHERE user_id = ${userId} ORDER BY id DESC`;
      return { statusCode: 200, body: JSON.stringify(rows) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  // A partir daqui, as rotas precisam de um ID de chamado
  if (!id) {
    return { statusCode: 400, body: 'ID do chamado não fornecido no caminho' };
  }
  
  // Rotas para MENSAGENS (GET e POST em /chamados/{id}/mensagens)
  if (action === 'mensagens') {
    if (event.httpMethod === 'GET') {
      // Simulação: buscar mensagens (adapte para sua tabela de mensagens)
      const mensagens = [
        { id: 1, autor: 'suporte', mensagem: 'Olá! Recebemos seu chamado e em breve um técnico irá analisar.', data_envio: new Date() },
        { id: 2, autor: 'usuario', mensagem: 'Ok, obrigado! Fico no aguardo.', data_envio: new Date() }
      ];
      return { statusCode: 200, body: JSON.stringify(mensagens) };
    }
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      // Simulação: salvar mensagem (adapte para sua tabela)
      console.log('Nova mensagem salva:', body.mensagem);
      return { statusCode: 201, body: JSON.stringify({ message: 'Mensagem enviada' }) };
    }
  }

  // Rota para FECHAR um chamado (PUT em /chamados/{id}/fechar)
  if (action === 'fechar' && event.httpMethod === 'PUT') {
    const body = JSON.parse(event.body);
    try {
      await sql`UPDATE chamados SET status = 'fechado', motivo_fechamento = ${body.motivo} WHERE id = ${id}`;
      return { statusCode: 200, body: JSON.stringify({ message: 'Chamado fechado' }) };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }
  
  return { statusCode: 405, body: `Método ${event.httpMethod} não permitido para este caminho.` };
}