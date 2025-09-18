# 🎓 Sistema de Gestão de Estudantes

Mini-projeto em **Node.js** para controle de estudantes via terminal.  
Permite cadastro, listagem, busca, cálculo de médias e relatórios de desempenho.

---

## Funcionalidades
- ➕ Cadastrar estudantes (nome, idade, notas)  
- 📋 Listar todos os alunos cadastrados  
- 🔍 Buscar por nome  
- 📊 Média individual  
- 🏫 Média da turma  
- 🥇 Melhor aluno  
- ✅ Relatório de aprovados (média ≥ 7)  
- ⚠️ Relatório de recuperação (5 ≤ média < 7)  
- ❌ Relatório de reprovados (média < 5)  
- 🗑️ Remover aluno pelo ID  

---

## Requisitos
- Node.js 16+  
- npm  

## Dependências
- [`readline-sync`](https://www.npmjs.com/package/readline-sync)  
```bash
npm install readline-sync
