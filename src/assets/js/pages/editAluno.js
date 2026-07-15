async function carregarAluno() {
    const params = new URLSearchParams(window.location.search);
    const rm = params.get("rm");

console.log(window.location.href);
console.log(params.get("rm"));

    if (!rm) {
        alert("RM do aluno não informado.");
        window.location.href = "painelAdmin.html";
        return;
    }

    try {
        const response = await fetch(`${API}/aluno/${rm}`);

        if (!response.ok) {
            throw new Error("Aluno não encontrado.");
        }

        const aluno = await response.json();

        document.getElementById("rmAluno").value = aluno.rmAluno;
        document.getElementById("nomeAluno").value = aluno.nomeAluno ?? "";
        document.getElementById("emailAluno").value = aluno.emailAluno ?? "";
        document.getElementById("dataNascAluno").value = aluno.dataNascAluno ?? "";
        document.getElementById("codTurma").value = aluno.codTurma ?? "";
        await carregarTurmas(aluno.codTurma);

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao carregar aluno.");
    }
}

async function carregarTurmas(codSelecionado) {
    const select = document.getElementById("codTurma");

    try {
        const response = await fetch(`${API}/turma/all?page=0&size=200`, {
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

        if (codSelecionado != null) {
            select.value = codSelecionado;
        }

    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar turmas</option>`;
    }
}

async function editAluno(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const rm = params.get("rm");

    const nomeAluno = document.getElementById("nomeAluno").value.trim();
    const emailAluno = document.getElementById("emailAluno").value.trim();
    const dataNascAluno = document.getElementById("dataNascAluno").value;
    const [ano, mes, dia] = dataNascAluno.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;
    const codTurma = document.getElementById("codTurma").value;

    if (!nomeAluno) {
        alert("Informe o nome do aluno.");
        return;
    }

    if (nomeAluno.length > 30) {
        alert("O nome deve ter no máximo 30 caracteres.");
        return;
    }

    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nomeAluno)) {
        alert("O nome não pode conter números ou caracteres especiais.");
        return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailAluno)) {
        alert("Email inválido!");
        return;
    }

    if (emailAluno.length > 30) {
        alert("O email deve ter no máximo 30 caracteres.");
        return;
    }

    if (!dataNascAluno) {
        alert("Informe a data de nascimento.");
        return;
    }

    if (!codTurma) {
        alert("Selecione a turma.");
        return;
    }

    const alunoAtualizado = {
    rmAluno: Number(rm),
    nomeAluno: nomeAluno,
    emailAluno: emailAluno,
    dataNascAluno: dataNascAluno,
    codTurma: Number(codTurma)
    };

    console.log(alunoAtualizado);

    try {
        const response = await fetch(`${API}/aluno/${rm}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alunoAtualizado)
        });

        const texto = await response.text();
        console.log("Resposta da API:", texto);

        if (!response.ok) {
            throw new Error(texto || `Erro ${response.status}`);
        }

        alert("Aluno atualizado com sucesso!");
        window.location.href = "listAluno.html";

    } catch (error) {
        console.error(error);

        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            return;
        }

        alert(error.message || "Erro ao atualizar aluno.");
    }
}

async function deleteAluno(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const rm = params.get("rm");

    if (!rm) {
        alert("RM não informado.");
        return;
    }

    const confirmado = prompt(
        "Tem certeza que deseja excluir este aluno? Digite 'CONFIRMAR' para confirmar."
    ).toUpperCase() === "CONFIRMAR";

    if (!confirmado) {
        alert("Exclusão cancelada.");
        return;
    }

    try {
        const response = await fetch(`${API}/aluno/${rm}`, { method: "DELETE" });

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao excluir aluno.`);
        }

        alert("Aluno excluído com sucesso!");
        window.location.href = "listAluno.html";

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao excluir aluno.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarAluno();
    document.getElementById("formAluno").addEventListener("submit", editAluno);
    document.getElementById("btnExcluir").addEventListener("click", deleteAluno);
});