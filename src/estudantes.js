const estudantes = require("./data");

// Controla o próximo ID
let idAtual = estudantes.length > 0 ? Math.max(...estudantes.map(e => e.id)) + 1 : 1;

// =========================================================
// Adiciona um novo estudante
// =========================================================
function adicionarEstudante(nome, idade, notas) {
    const aluno = {
        id: idAtual++,
        nome,
        idade,
        notas
    };
    estudantes.push(aluno);
    return aluno;
}

// =========================================================
// Mostra todos os estudantes
// =========================================================
function mostrarEstudantes() {
    if (estudantes.length === 0) {
        console.log("Nenhum aluno cadastrado ainda.");
    } else {
        for (const aluno of estudantes) {
            console.log(`ID: ${aluno.id} | Nome: ${aluno.nome} | Idade: ${aluno.idade} | Notas: ${aluno.notas.join(", ")}`);
        }
    }
}

// =========================================================
// Busca por nome
// =========================================================
function procurarEstudante(nome, exibir = true) {
    const termo = nome.toLowerCase();
    const encontrados = estudantes.filter(est => est.nome.toLowerCase().includes(termo));

    if (exibir) {
        if (encontrados.length === 0) {
            console.log("Nenhum estudante encontrado.");
        } else {
            for (const aluno of encontrados) {
                console.log(`ID: ${aluno.id} | Nome: ${aluno.nome} | Idade: ${aluno.idade} | Notas: ${aluno.notas.join(", ")}`);
            }
        }
    }
    return encontrados;
}

// =========================================================
// Calcula média individual
// =========================================================
function mediaAluno(aluno) {
    if (!aluno.notas || aluno.notas.length === 0) return 0;
    const soma = aluno.notas.reduce((acc, n) => acc + n, 0);
    return soma / aluno.notas.length;
}

// =========================================================
// Média da turma
// =========================================================
function mediaGeral() {
    if (estudantes.length === 0) return 0;
    const somaMedias = estudantes.reduce((acc, aluno) => acc + mediaAluno(aluno), 0);
    return somaMedias / estudantes.length;
}

// =========================================================
// Melhor aluno
// =========================================================
function melhorAluno() {
    if (estudantes.length === 0) return null;
    return estudantes.reduce((top, atual) => mediaAluno(atual) > mediaAluno(top) ? atual : top);
}

// =========================================================
// Relatórios
// =========================================================
function relatorioAprovados() {
    const aprovados = estudantes.filter(a => mediaAluno(a) >= 7);
    if (aprovados.length === 0) {
        console.log("Nenhum aluno aprovado.");
    } else {
        console.log("=== Aprovados ===");
        aprovados.forEach(a => console.log(`${a.nome} | Média: ${mediaAluno(a).toFixed(2)}`));
    }
}

function relatorioRecuperacao() {
    const recuperacao = estudantes.filter(a => {
        const m = mediaAluno(a);
        return m >= 5 && m < 7;
    });
    if (recuperacao.length === 0) {
        console.log("Nenhum aluno em recuperação.");
    } else {
        console.log("=== Recuperação ===");
        recuperacao.forEach(a => console.log(`${a.nome} | Média: ${mediaAluno(a).toFixed(2)}`));
    }
}

function relatorioReprovados() {
    const reprovados = estudantes.filter(a => mediaAluno(a) < 5);
    if (reprovados.length === 0) {
        console.log("Nenhum aluno reprovado.");
    } else {
        console.log("=== Reprovados ===");
        reprovados.forEach(a => console.log(`${a.nome} | Média: ${mediaAluno(a).toFixed(2)}`));
    }
}

// =========================================================
// Remover aluno pelo ID
// =========================================================
function removerEstudante(id) {
    const idx = estudantes.findIndex(a => a.id === id);
    if (idx === -1) {
        console.log("Aluno não encontrado.");
        return false;
    }
    const [removido] = estudantes.splice(idx, 1);
    console.log(`Aluno ${removido.nome} removido com sucesso!`);
    return true;
}

module.exports = {
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
};
