const fs = require('fs');
const readline = require('readline');

class SistemaAlunos {

    constructor(caminhoArquivo) {

        this.caminhoArquivo = caminhoArquivo;
        this.alunos = [];
    }

    carregarArquivo() {

        try {

            const arquivo = fs.readFileSync(this.caminhoArquivo, 'utf8');

            const linhas = arquivo
                .split('\n')
                .map(linha => linha.trim())
                .filter(linha => linha !== '');

            // Remove o cabeçalho
            linhas.shift();

            this.alunos = [];

            for (const linha of linhas) {

                const dados = linha.split(',');

                // Ignora linhas inválidas
                if (dados.length < 3) {
                    continue;
                }

                const aluno = {
                    nome: dados[0].trim(),
                    rm: dados[1].trim(),
                    codigo: dados[2].trim()
                };

                this.alunos.push(aluno);
            }

            console.log('=================================');
            console.log(' SISTEMA DE PESQUISA DE ALUNOS');
            console.log('=================================');
            console.log(`Total de alunos carregados: ${this.alunos.length}\n`);

        } catch (error) {

            console.error('Erro ao carregar o arquivo CSV.');
            console.error(error.message);
            process.exit(1);
        }
    }

    pesquisarAluno(nomePesquisa) {

        return this.alunos.filter(aluno => {

            return aluno.nome
                .toLowerCase()
                .includes(nomePesquisa.toLowerCase());
        });
    }

    mostrarResultados(resultados) {

        if (resultados.length === 0) {

            console.log('\nNenhum aluno encontrado.\n');
            return;
        }

        console.log('\n========== RESULTADOS ==========\n');

        resultados.forEach((aluno, index) => {

            console.log(`Aluno ${index + 1}`);
            console.log(`Nome   : ${aluno.nome}`);
            console.log(`RM     : ${aluno.rm}`);
            console.log(`Código : ${aluno.codigo}`);
            console.log('--------------------------------');
        });

        console.log('');
    }

    iniciarSistema() {

        this.carregarArquivo();

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const menu = () => {

            rl.question('Pesquisar aluno (ou SAIR): ', resposta => {

                const texto = resposta.trim();

                if (texto.toUpperCase() === 'SAIR') {

                    console.log('\nSistema encerrado.');
                    rl.close();
                    return;
                }

                const resultados = this.pesquisarAluno(texto);

                this.mostrarResultados(resultados);

                menu();
            });
        };

        menu();
    }
}

// Caminho do arquivo CSV
const sistema = new SistemaAlunos('src/alunos.csv');

// Inicia o sistema
sistema.iniciarSistema();