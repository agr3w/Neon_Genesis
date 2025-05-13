import React, { useState } from 'react';
import axios from 'axios';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    documento: '',
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    dataNascimento: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cadastro', {
        documento: formData.documento,
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        dataNascimento: formData.dataNascimento,
        telefone: formData.telefone,
        endereco: formData.endereco,
        cidade: formData.cidade,
        estado: formData.estado,
        cep: formData.cep
      });

      alert(response.data); // Exibe a mensagem de sucesso
      setFormData({
        documento: '',
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        dataNascimento: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: ''
      });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="documento"
          value={formData.documento}
          onChange={handleChange}
          placeholder="CPF"
          required
        />
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome Completo"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-mail"
          required
        />
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          placeholder="Senha"
          required
        />
        <input
          type="password"
          name="confirmarSenha"
          value={formData.confirmarSenha}
          onChange={handleChange}
          placeholder="Confirmar Senha"
          required
        />
        <input
          type="date"
          name="dataNascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="Telefone"
        />
        <input
          type="text"
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          placeholder="Endereço"
        />
        <input
          type="text"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          placeholder="Cidade"
        />
        <input
          type="text"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          placeholder="Estado"
        />
        <input
          type="text"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          placeholder="CEP"
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;