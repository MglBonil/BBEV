const API = "http://localhost:8080";

async function carregarProfessores() {
    const select = document.getElementById("codProfessor");

    try {
        const response = await fetch(`${API}/professor/all?page=0&size=200`, {
            method: "GET",
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

    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar professores</option>`;
    }
}
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

async function cadDisciplina(event) {
    event.preventDefault();

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

    const novaDisciplina = {
        nomeDisc: nomeDisc,
        codProfessor: Number(codProfessor),
        codTurma: Number(codTurma)
    };

    try {
        const response = await fetch(`${API}/disciplina`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaDisciplina)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao cadastrar disciplina.`);
        }

        alert("Disciplina cadastrada com sucesso!");
        window.location.href = "painelAdmin.html";

    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            return;
        }
        alert(error.message || "Erro ao cadastrar disciplina.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarProfessores();
    carregarTurmas();
    document.getElementById("formDisciplina").addEventListener("submit", cadDisciplina);
});
