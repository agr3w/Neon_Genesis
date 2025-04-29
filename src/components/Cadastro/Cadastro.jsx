import React, { useState } from 'react';
import './Cadastro.css';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    tipoDocumento: 'cpf', // Valor padrão
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
    cep: '', // Novo campo para o CEP
    termos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validação para o campo CEP
    if (name === 'cep' && !/^\d{0,8}$/.test(value)) {
      return; // Permite apenas números com até 8 dígitos
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    if (!formData.termos) {
      alert('Você deve aceitar os termos de uso para continuar.');
      return;
    }
    alert('Cadastro realizado com sucesso!');
    console.log('Dados do formulário:', formData);
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastrar</h1>
      <p className="cadastro-description">
        Preencha os campos abaixo para criar sua conta
      </p>
      <form onSubmit={handleSubmit} className="cadastro-form">
        <div className="form-section">
          <h2>Informações Pessoais</h2>
          <div className="form-group">
            <label>Tipo de Documento</label>
            <div className="document-type-buttons">
              <button
                type="button"
                className={`document-button ${formData.tipoDocumento === 'cpf' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, tipoDocumento: 'cpf' })}
              >
                CPF
              </button>
              <button
                type="button"
                className={`document-button ${formData.tipoDocumento === 'cnpj' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, tipoDocumento: 'cnpj' })}
              >
                CNPJ
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="documento">
              {formData.tipoDocumento === 'cpf' ? 'CPF' : 'CNPJ'}
            </label>
            <input
              type="text"
              id="documento"
              name="documento"
              value={formData.documento}
              onChange={handleChange}
              placeholder={
                formData.tipoDocumento === 'cpf'
                  ? 'Digite seu CPF'
                  : 'Digite seu CNPJ'
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Contato e Endereço</h2>
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="Digite seu CEP"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Digite seu telefone"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Digite seu endereço"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              placeholder="Digite sua cidade"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            >
              <option value="">Selecione seu estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Segurança</h2>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="termos"
              checked={formData.termos}
              onChange={handleChange}
            />
            Aceito os termos de uso
          </label>
        </div>
        <button type="submit" className="submit-button">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;