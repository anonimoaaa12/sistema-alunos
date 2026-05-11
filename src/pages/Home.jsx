import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

function Home() {
  const [pesquisa, setPesquisa] = useState("");
  const [alunos, setAlunos] = useState([]);

  async function carregarAlunos() {
    const { data } = await supabase
      .from("alunos")
      .select("*");

    setAlunos(data || []);
  }

  useEffect(() => {
    carregarAlunos();
  }, []);

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="home">
      <div className="topo">
        <h1>Sistema Escolar</h1>

        <Link to="/admin" className="btn-admin">
          Área Admin
        </Link>
      </div>

      <input
        type="text"
        placeholder="Pesquisar aluno..."
        className="pesquisa"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      {alunosFiltrados.map((aluno) => (
        <div className="aluno-box" key={aluno.id}>
          <h2>{aluno.nome}</h2>
          <p>RM: {aluno.rm}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;