
async function carregarTurmas() {
    const select = document.getElementById("codTurma");

    try {
        const response = await fetch(`${API}/turma/all?page=0&size=200`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const turmas = pagina.content || [];

        turmas.forEach(turma => {
            const option = document.createElement("option");
            option.value = turma.idTurma;
            option.textContent = `${turma.idTurma} - ${turma.nomeTurma}`;
            select.appendChild(option);
        });

    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar turmas</option>`;
    }
}

async function cadAluno(event) {
    event.preventDefault();

    const rmAluno = document.getElementById("rmAluno").value.trim();
    const nomeAluno = document.getElementById("nomeAluno").value.trim(); 
    const emailAluno = document.getElementById("emailAluno").value.trim();
    const dataNascAluno = document.getElementById("dataNascAluno").value;
    const codTurma = document.getElementById("codTurma").value;

    if (!rmAluno || !nomeAluno || !emailAluno || !dataNascAluno || !codTurma) {
        alert("Todos os campos devem estar preenchidos!");
        return;
    }

    if (nomeAluno.length > 30) {
        alert("O nome deve ter no máximo 30 caracteres.");
        return;
    }

    if (!nomeAluno) {
        alert("Informe o nome do aluno.");
        return;
    }

    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nomeAluno)) {
        alert("O nome não pode conter números ou caracteres especiais.");
        return;
    }

    if (!codTurma) {
        alert("Selecione a turma.");
        return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailAluno)) {
        alert("Email inválido!");
        return;
    }

    if (emailAluno.length > 30) {
        alert("O Email deve ter no máximo 30 caracteres.");
        return;
    }

    const novoAluno = {
        rmAluno: rmAluno,
        nomeAluno: nomeAluno,
        emailAluno: emailAluno,
        dataNascAluno: dataNascAluno,
        codTurma: Number(codTurma)
    };

    console.log(JSON.stringify(novoAluno, null, 2));

    try {
        const response = await fetch(`${API}/aluno`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoAluno)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao cadastrar aluno.`);
        }

        alert("Aluno cadastrado com sucesso!");
        document.getElementById("formAluno").reset();

    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            return;
        }
        alert(error.message || "Erro ao cadastrar aluno.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarTurmas();
    document.getElementById("formAluno").addEventListener("submit", cadAluno);
});
