import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function Home() {
  const [alunos, setAlunos] = useState([])
  const [pesquisa, setPesquisa] = useState('')

  async function buscarAlunos() {
    const { data } = await supabase
      .from('alunos')
      .select('*')

    if (data) {
      setAlunos(data)
    }
  }

  useEffect(() => {
    buscarAlunos()
  }, [])

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(pesquisa.toLowerCase())
  )

  return (
    <div className="container">
      <h1>Sistema Escolar</h1>

      <input
        type="text"
        placeholder="Pesquisar aluno..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      <div className="lista">
        {alunosFiltrados.map((aluno) => (
          <div className="card" key={aluno.id}>
            <h2>{aluno.nome}</h2>
            <p>RM: {aluno.rm}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home