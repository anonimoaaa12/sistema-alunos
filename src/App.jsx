import { useState } from "react";
import { supabase } from "../supabase";

function Admin() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [logado, setLogado] = useState(false);

  const [nome, setNome] = useState("");
  const [rm, setRm] = useState("");

  function fazerLogin() {
    if (usuario === "admin" && senha === "123456") {
      setLogado(true);
    } else {
      alert("Login inválido");
    }
  }

  async function salvarAluno() {
    if (!nome || !rm) {
      alert("Preencha todos os campos");
      return;
    }

    const { error } = await supabase
      .from("alunos")
      .insert([{ nome, rm }]);

    if (error) {
      console.log(error);
      alert("Erro ao salvar");
    } else {
      alert("Aluno salvo com sucesso!");

      setNome("");
      setRm("");
    }
  }

  if (!logado) {
    return (
      <div className="container">
        <h1>Login Admin</h1>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button onClick={fazerLogin}>
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Painel Admin</h1>

      <input
        type="text"
        placeholder="Nome do aluno"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="text"
        placeholder="RM"
        value={rm}
        onChange={(e) => setRm(e.target.value)}
      />

      <button onClick={salvarAluno}>
        Salvar aluno
      </button>
    </div>
  );
}

export default Admin;