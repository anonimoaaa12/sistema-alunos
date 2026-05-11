import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function Admin() {

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  const [logado, setLogado] = useState(false)

  const [nome, setNome] = useState('')
  const [rm, setRM] = useState('')

  const [alunos, setAlunos] = useState([])

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

  function fazerLogin() {

    if (
      usuario === 'admin' &&
      senha === '123456'
    ) {

      setLogado(true)

    } else {

      alert('Login inválido')
    }
  }

  async function adicionarAluno() {

    if (!nome || !rm) {
      alert('Preencha tudo')
      return
    }

    await supabase
      .from('alunos')
      .insert([
        {
          nome,
          rm,
        },
      ])

    setNome('')
    setRM('')

    carregarAlunos()
  }

  async function excluirAluno(id) {

    await supabase
      .from('alunos')
      .delete()
      .eq('id', id)

    carregarAlunos()
  }

  if (!logado) {

    return (

      <div className="login-container">

        <div className="login-box">

          <h1>
            Área Admin
          </h1>

          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) =>
              setUsuario(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
          />

          <button onClick={fazerLogin}>
            Entrar
          </button>

        </div>

      </div>
    )
  }

  return (

    <div className="container">

      <div className="topo">

        <h1>
          Painel Admin
        </h1>

        <a
          href="/"
          className="admin-link"
        >
          Voltar
        </a>

      </div>

      <div className="admin-box">

        <input
          type="text"
          placeholder="Nome do aluno"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="RM do aluno"
          value={rm}
          onChange={(e) =>
            setRM(e.target.value)
          }
        />

        <button onClick={adicionarAluno}>
          Adicionar aluno
        </button>

      </div>

      <div className="lista">

        {
          alunos.map((aluno) => (

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

              <button
                className="excluir"
                onClick={() =>
                  excluirAluno(aluno.id)
                }
              >
                Excluir
              </button>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Admin