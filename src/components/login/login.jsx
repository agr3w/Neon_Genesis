import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";

// Componente de Login
export default function Login() {
  // Estados para armazenar o email e a senha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função para lidar com o login
  const handleLogin = async (email, senha) => {
     try {
    const res = await axios.post('http://localhost:3001/login', { email, senha });
    setUser(res.data);
    return true;
  } catch (err) {
    return false;
  }
  };

  return (
    // Container principal centralizado
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card de login */}
      <Card className="w-96 p-6 shadow-xl bg-white rounded-2xl">
        <CardContent>
          {/* Título do formulário */}
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

          {/* Campo de email */}
          <div className="mb-4">
            <Label>Email</Label>
            <div className="relative">
              {/* Ícone de email */}
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {/* Input de email */}
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Campo de senha */}
          <div className="mb-4">
            <Label>Senha</Label>
            <div className="relative">
              {/* Ícone de senha */}
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {/* Input de senha */}
              <Input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Botão de login */}
          <Button className="w-full" onClick={handleLogin}>
            Entrar
          </Button>

          {/* Link para cadastro */}
          <div className="text-center mt-4">
            <p className="text-gray-600">Não tem uma conta?</p>
            <Button variant="link" className="text-blue-500">
              Cadastre-se
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
