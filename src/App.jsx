import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from './supabase'

function App() {
  const [alunos, setAlunos] = useState([])
  const [pesquisa, setPesquisa] = useState('')

  const [adminAberto, setAdminAberto] = useState(false)
  const [senha, setSenha] = useState('')

  const [novoNome, setNovoNome] = useState('')
  const [novoRM, setNovoRM] = useState('')

  async function carregarAlunos() {
    const { data } = await supabase
      .from('alunos')
      .select('*')

    if (data) {
      setAlunos(data)
    }
  }

  useEffect(() => {
    carregarAlunos()
  }, [])

  async function adicionarAluno() {
    if (!novoNome || !novoRM) {
      alert('Preencha tudo')
      return
    }

    await supabase.from('alunos').insert([
      {
        nome: novoNome,
        rm: novoRM,
      },
    ])

    setNovoNome('')
    setNovoRM('')

    carregarAlunos()
  }

  async function removerAluno(id) {
    await supabase.from('alunos').delete().eq('id', id)

    carregarAlunos()
  }

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
            <h3>{aluno.nome}</h3>
            <p>RM: {aluno.rm}</p>

            {adminAberto && (
              <button onClick={() => removerAluno(aluno.id)}>
                Remover
              </button>
            )}
          </div>
        ))}
      </div>

      {!adminAberto ? (
        <div className="loginAdmin">
          <input
            type="password"
            placeholder="Senha admin"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button
            onClick={() => {
              if (senha === '1234') {
                setAdminAberto(true)
              } else {
                alert('Senha errada')
              }
            }}
          >
            Entrar Admin
          </button>
        </div>
      ) : (
        <div className="admin">
          <h2>Painel Admin</h2>

          <input
            type="text"
            placeholder="Nome do aluno"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
          />

          <input
            type="text"
            placeholder="RM do aluno"
            value={novoRM}
            onChange={(e) => setNovoRM(e.target.value)}
          />

          <button onClick={adicionarAluno}>
            Adicionar Aluno
          </button>
        </div>
      )}
    </div>
  )
}

export default App