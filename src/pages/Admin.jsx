import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function Admin() {
  const [senha, setSenha] = useState('')
  const [logado, setLogado] = useState(false)

  const [nome, setNome] = useState('')
  const [rm, setRM] = useState('')

  const [alunos, setAlunos] = useState([])

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
    if (!nome || !rm) {
      alert('Preencha tudo')
      return
    }

    await supabase.from('alunos').insert([
      {
        nome,
        rm,
      },
    ])

    setNome('')
    setRM('')

    carregarAlunos()
  }

  async function removerAluno(id) {
    await supabase
      .from('alunos')
      .delete()
      .eq('id', id)

    carregarAlunos()
  }

  if (!logado) {
    return (
      <div className="container">
        <h1>Área Admin</h1>

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <br />

        <button
          onClick={() => {
            if (senha === '1234') {
              setLogado(true)
            } else {
              alert('Senha errada')
            }
          }}
        >
          Entrar
        </button>
      </div>
    )
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
        onChange={(e) => setRM(e.target.value)}
      />

      <br />

      <button onClick={adicionarAluno}>
        Adicionar
      </button>

      <div className="lista">
        {alunos.map((aluno) => (
          <div className="card" key={aluno.id}>
            <h2>{aluno.nome}</h2>

            <p>RM: {aluno.rm}</p>

            <button
              onClick={() => removerAluno(aluno.id)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin