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

async function cadTurma(event) {
    event.preventDefault();

    const nomeTurma = document.getElementById("nomeTurma").value.trim();
    const anoTurma = document.getElementById("anoTurma").value.trim();
    const grupoTurma = document.getElementById("grupoTurma").value.trim();
    const cursoTurma = document.getElementById("cursoTurma").value.trim();
    const periodoTurma = document.getElementById("periodoTurma").value.trim();
    const codProfessor = document.getElementById("codProfessor").value;

    if (!nomeTurma) {
        alert("Informe o nome da turma.");
        return;
    }

    if (!/^\d{4}$/.test(anoTurma)) {
        alert("Ano inválido. Utilize 4 dígitos (ex.: 2024).");
        return;
    }

    if (grupoTurma.length > 1) {
        alert("O grupo deve ter no máximo 1 caractere.");
        return;
    }

    if (!codProfessor) {
        alert("Selecione o professor responsável.");
        return;
    }

    const novaTurma = {
        nomeTurma: nomeTurma,
        anoTurma: Number(anoTurma),
        grupoTurma: grupoTurma ? grupoTurma.charAt(0) : null,
        cursoTurma: cursoTurma || null,
        periodoTurma: periodoTurma || null,
        codProfessor: Number(codProfessor)
    };

    try {
        const response = await fetch(`${API}/turma`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaTurma)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao cadastrar turma.`);
        }

        alert("Turma cadastrada com sucesso!");
        window.location.href = "hub.html";

    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            return;
        }
        alert(error.message || "Erro ao cadastrar turma.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarProfessores();
    document.getElementById("formTurma").addEventListener("submit", cadTurma);
});
