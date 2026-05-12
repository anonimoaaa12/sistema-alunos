import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import "./Admin.css";

function Admin() {
  const [logado, setLogado] = useState(false);

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [nome, setNome] = useState("");
  const [rm, setRm] = useState("");

  const [alunos, setAlunos] = useState([]);

  async function carregarAlunos() {
    const { data } = await supabase
      .from("alunos")
      .select("*")
      .order("id", { ascending: false });

    setAlunos(data || []);
  }

  useEffect(() => {
    carregarAlunos();
  }, []);

  async function adicionarAluno() {
    if (!nome || !rm) return;

    await supabase.from("alunos").insert([
      {
        nome,
        rm,
      },
    ]);

    setNome("");
    setRm("");

    carregarAlunos();
  }

  async function excluirAluno(id) {
    await supabase.from("alunos").delete().eq("id", id);

    carregarAlunos();
  }

  function fazerLogin() {
    if (usuario === "admin" && senha === "123456") {
      setLogado(true);
    } else {
      alert("Login inválido");
    }
  }

  if (!logado) {
    return (
      <div className="login-page">
        <div className="login-box">
          <h1>Login Admin</h1>

          <input
            type="text"
            placeholder="Usuário"
            onChange={(e) => setUsuario(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
          />

          <button onClick={fazerLogin}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">
        Painel Admin
      </h1>

      <div className="admin-box">
        <input
          type="text"
          placeholder="Nome do aluno"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="RM do aluno"
          value={rm}
          onChange={(e) => setRm(e.target.value)}
        />

        <button onClick={adicionarAluno}>
          Adicionar aluno
        </button>

        <button
          className="voltar-btn"
          onClick={() =>
            (window.location.href = "/")
          }
        >
          Voltar para página inicial
        </button>
      </div>

      <div className="lista">
        {alunos.map((aluno) => (
          <div
            className="aluno-card"
            key={aluno.id}
          >
            <div>
              <strong>{aluno.nome}</strong>

              <p>
                RM: {aluno.rm}
              </p>
            </div>

            <button
              className="btn-delete"
              onClick={() =>
                excluirAluno(aluno.id)
              }
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;