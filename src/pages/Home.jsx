import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function Home() {

  const [alunos, setAlunos] = useState([])
  const [pesquisa, setPesquisa] = useState('')

  async function carregarAlunos() {

    const { data } = await supabase
      .from('alunos')
      .select('*')
      .order('nome')

    if (data) {
      setAlunos(data)
    }
  }

  useEffect(() => {
    carregarAlunos()
  }, [])

  const alunosFiltrados = alunos.filter((aluno) => {

    return (
      aluno.nome
        .toLowerCase()
        .includes(
          pesquisa.toLowerCase()
        )
    )
  })

  return (
    <div className="container">

      <div className="topo">

        <h1>
          Sistema Escolar
        </h1>

        <a
          href="/admin"
          className="admin-link"
        >
          Área Admin
        </a>

      </div>

      <input
        type="text"
        placeholder="Pesquisar aluno..."
        value={pesquisa}
        onChange={(e) =>
          setPesquisa(e.target.value)
        }
        className="pesquisa"
      />

      <div className="lista">

        {
          alunosFiltrados.map((aluno) => (

            <div
              className="card"
              key={aluno.id}
            >

              <h2>
                {aluno.nome}
              </h2>

              <p>
                RM: {aluno.rm}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Home