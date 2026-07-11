const API = "http://localhost:8080";

async function carregarDisciplina() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("ID da disciplina não informado.");
        window.location.href = "painelProfessor.html";
        return;
    }

    try {
        const response = await fetch(`${API}/disciplina/${id}`);

        if (!response.ok) {
            throw new Error("Disciplina não encontrada.");
        }

        const disciplina = await response.json();

        document.getElementById("idDisc").value = disciplina.idDisc;
        document.getElementById("nomeDisc").value = disciplina.nomeDisc ?? "";
        document.getElementById("codProfessor").value = disciplina.codProfessor ?? "";
        document.getElementById("codTurma").value = disciplina.codTurma ?? "";

        await carregarProfessores(disciplina.codProfessor);
        await carregarTurmas(disciplina.codTurma);

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao carregar disciplina.");
    }
}

async function carregarProfessores(codSelecionado) {
    const select = document.getElementById("codProfessor");

    try {
        const response = await fetch(`${API}/professor/all?page=0&size=200`, {
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const professores = pagina.content || [];

        professores.forEach(professor => {
            const option = document.createElement("option");
            option.value = professor.rmProf;
            option.textContent = `${professor.rmProf} - ${professor.nomeProf}`;
            select.appendChild(option);
        });

        if (codSelecionado != null) {
            select.value = codSelecionado;
        }

    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar professores</option>`;
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

async function editDisciplina(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const nomeDisc = document.getElementById("nomeDisc").value.trim();
    const codProfessor = document.getElementById("codProfessor").value;
    const codTurma = document.getElementById("codTurma").value;


    if (!nomeDisc) {
        alert("Informe o nome da disciplina.");
        return;
    }

    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nomeDisc)) {
        alert("O nome não pode conter números ou caracteres especiais.");
        return;
    }

    if (!codProfessor) {
        alert("Selecione o professor responsável.");
        return;
    }

    if (!codTurma) {
        alert("Selecione a turma.");
        return;
    }

    const disciplinaAtualizada = {
        nomeDisc: nomeDisc,
        codProfessor: Number(codProfessor),
        codTurma: Number(codTurma)
    };

    try {
        const response = await fetch(`${API}/disciplina/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(disciplinaAtualizada)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao atualizar disciplina.`);
        }

        alert("Disciplina atualizada com sucesso!");
        window.location.href = "listDisciplina.html";

    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            return;
        }
        alert(error.message || "Erro ao atualizar disciplina.");
    }
}

async function deleteDisciplina(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("ID não informado.");
        return;
    }

    const confirmado = prompt(
        "Tem certeza que deseja excluir esta disciplina? Digite 'CONFIRMAR' para confirmar."
    ).toUpperCase() === "CONFIRMAR";

    if (!confirmado) {
        alert("Exclusão cancelada.");
        return;
    }

    try {
        const response = await fetch(`${API}/disciplina/${id}`, { method: "DELETE" });

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao excluir disciplina.`);
        }

        alert("Disciplina excluída com sucesso!");
        window.location.href = "listDisciplina.html";

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao excluir disciplina.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarDisciplina();
    document.getElementById("formDisciplina").addEventListener("submit", editDisciplina);
    document.getElementById("btnExcluir").addEventListener("click", deleteDisciplina);
});