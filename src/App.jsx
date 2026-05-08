import { useEffect, useState } from "react";
import "./App.css";

function App() {

  // LOGIN
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [logado, setLogado] = useState(false);

  // ALUNOS
  const [alunos, setAlunos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  // CARREGA CSV
  useEffect(() => {

    fetch("/alunos.csv")
      .then((response) => response.text())
      .then((texto) => {

        const linhas = texto.split("\n").slice(1);

        const dados = linhas
          .filter((linha) => linha.trim() !== "")
          .map((linha) => {

            const [nome, rm] = linha.split(",");

            return {
              nome: nome?.trim(),
              rm: rm?.trim()
            };
          });

        setAlunos(dados);
      });

  }, []);

  // PESQUISA
  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(
      pesquisa.toLowerCase()
    )
  );

  // LOGIN
  function fazerLogin() {

    if (usuario === "admin" && senha === "123456") {

      setLogado(true);

    } else {

      alert("Usuário ou senha incorretos");
    }
  }

  // LOGIN SCREEN
  if (!logado) {

    return (
      <div className="login-container">

        <div className="login-box">

          <h1>Sistema Escolar</h1>

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

      </div>
    );
  }

  // SISTEMA
  return (
    <div className="container">

      <h1>Sistema Escolar</h1>

      <input
        type="text"
        placeholder="Pesquisar aluno..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      <div className="lista-alunos">

        {
          alunosFiltrados.length > 0 ? (

            alunosFiltrados.map((aluno, index) => (

              <div className="card" key={index}>

                <p>
                  <strong>Nome:</strong> {aluno.nome}
                </p>

                <p>
                  <strong>RM:</strong> {aluno.rm}
                </p>

              </div>
            ))

          ) : (

            <p>Nenhum aluno encontrado.</p>
          )
        }

      </div>

    </div>
  );
}

export default App;