import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [alunos, setAlunos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  // CARREGA O CSV
  useEffect(() => {

    fetch("/alunos.csv")
      .then(response => response.text())
      .then(texto => {

        const linhas = texto.split("\n");

        // Remove cabeçalho
        linhas.shift();

        const listaAlunos = linhas
          .filter(linha => linha.trim() !== "")
          .map(linha => {

            const dados = linha.split(",");

            return {
              nome: dados[0]?.trim(),
              rm: dados[1]?.trim(),
              codigo: dados[2]?.trim()
            };
          });

        setAlunos(listaAlunos);
      });

  }, []);

  // PESQUISA
  const resultados = alunos.filter(aluno =>
    aluno.nome?.toLowerCase().includes(
      pesquisa.toLowerCase()
    )
  );

  return (
    <div className="container">

      <h1>Sistema Escolar</h1>

      <input
        type="text"
        placeholder="Pesquisar aluno..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      <div className="resultados">

        {
          pesquisa !== "" && (

            resultados.length > 0 ? (

              resultados.map((aluno, index) => (

                <div className="card" key={index}>

                  <p>
                    <strong>Nome:</strong> {aluno.nome}
                  </p>

                  <p>
                    <strong>RM:</strong> {aluno.rm}
                  </p>

                  <p>
                    <strong>Código:</strong> {aluno.codigo}
                  </p>

                </div>
              ))

            ) : (

              <div className="card">
                <p>Nenhum aluno encontrado.</p>
              </div>
            )
          )
        }

      </div>

    </div>
  );
}

export default App;