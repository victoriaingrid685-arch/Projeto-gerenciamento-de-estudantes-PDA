// Biblioteca para entrada de dados no terminal
const readline = require("readline-sync");

// Funções do módulo de estudantes
const {
    adicionarEstudante,
    mostrarEstudantes,
    procurarEstudante,
    mediaAluno,
    mediaGeral,
    melhorAluno,
    relatorioAprovados,
    relatorioRecuperacao,
    relatorioReprovados,
    removerEstudante
} = require("./estudantes");

// =========================================================
// Mostra o menu principal
// =========================================================
function exibirMenu() {
    console.log(`
======= MENU =======
1. Cadastrar novo estudante
2. Listar todos os estudantes
3. Procurar estudante pelo nome
4. Calcular  de um aluno
5. Calcular média da turma
6. Mostrar melhor aluno
7. Lista de aprovados
8. Lista de recuperação
9. Lista de reprovados
10. Excluir estudante
0. Sair do programa
`);
}

let opcaoEscolhida;

do {
    exibirMenu();
    opcaoEscolhida = readline.questionInt("Escolha uma opcao: ");

    switch (opcaoEscolhida) {

        case 1:
            // Cadastro
            let nomeAluno;
            do {
                nomeAluno = readline.question("Informe o nome do aluno: ");
                if (!nomeAluno || nomeAluno.trim() === "") {
                    console.log("Nome inválido, tente novamente!");
                }
            } while (!nomeAluno || nomeAluno.trim() === "");

            let idadeAluno;
            do {
                idadeAluno = readline.questionInt("Informe a idade: ");
                if (idadeAluno <= 0) {
                    console.log("Idade inválida! Deve ser maior que zero.");
                }
            } while (idadeAluno <= 0);

            const quantidadeNotas = readline.questionInt("Quantas notas deseja inserir? ");
            const notasAluno = [];
            for (let i = 0; i < quantidadeNotas; i++) {
                let nota;
                do {
                    nota = readline.questionFloat(`Nota ${i + 1}: `);
                    if (nota < 0 || nota > 10) {
                        console.log("Nota inválida! Insira um valor entre 0 e 10.");
                    }
                } while (nota < 0 || nota > 10);
                notasAluno.push(nota);
            }

            adicionarEstudante(nomeAluno, idadeAluno, notasAluno);
            console.log(`Aluno ${nomeAluno} cadastrado com sucesso!\n`);
            break;

        case 2:
            mostrarEstudantes();
            break;

        case 3:
            const termoBusca = readline.question("Digite o nome ou parte do nome: ");
            procurarEstudante(termoBusca);
            break;

        case 4:
            const nomeBusca = readline.question("Digite o nome do estudante para calcular media: ");
            const encontrados = procurarEstudante(nomeBusca, false);
            if (encontrados.length === 0) {
                console.log("Nenhum estudante encontrado.");
            } else {
                for (const aluno of encontrados) {
                    console.log(`${aluno.nome} - Media: ${mediaAluno(aluno).toFixed(2)}`);
                }
            }
            break;

        case 5:
            console.log(`Media geral da turma: ${mediaGeral().toFixed(2)}`);
            break;

        case 6:
            const topAluno = melhorAluno();
            if (!topAluno) {
                console.log("Ainda não há alunos cadastrados.");
            } else {
                console.log(`Aluno com melhor media: ${topAluno.nome} | Media: ${mediaAluno(topAluno).toFixed(2)}`);
            }
            break;

        case 7:
            relatorioAprovados();
            break;

        case 8:
            relatorioRecuperacao();
            break;

        case 9:
            relatorioReprovados();
            break;

        case 10:
            mostrarEstudantes();
            const idExcluir = readline.questionInt("Digite o ID do estudante que quer remover: ");
            removerEstudante(idExcluir);
            break;

        case 0:
            console.log("Programa encerrado. Até mais!");
            break;

        default:
            console.log("Opcao inválida, escolha novamente!");
    }

} while (opcaoEscolhida !== 0);
