async function carregarTurma() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("ID da turma não informado.");
        window.location.href = "painelProfessor.html";
        return;
    }

    try {
        const response = await fetch(`${API}/turma/${id}`);

        if (!response.ok) {
            throw new Error("Turma não encontrada.");
        }

        const turma = await response.json();

        document.getElementById("idTurma").value = turma.idTurma;
        document.getElementById("nomeTurma").value = turma.nomeTurma ?? "";
        document.getElementById("anoTurma").value = turma.anoTurma ?? "";
        document.getElementById("cursoTurma").value = turma.cursoTurma ?? "";

        

        if (turma.grupoTurma != null) {
            document.getElementById("grupoTurma").value = turma.grupoTurma;
        }
        if (turma.periodoTurma != null) {
            document.getElementById("periodoTurma").value = turma.periodoTurma;
        }

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao carregar turma.");
    }
}


async function editTurma(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const nomeTurma = document.getElementById("nomeTurma").value.trim();
    const anoTurma = document.getElementById("anoTurma").value.trim();
    const grupoTurma = document.getElementById("grupoTurma").value;
    const cursoTurma = document.getElementById("cursoTurma").value.trim();
    const periodoTurma = document.getElementById("periodoTurma").value;
    

    if (!nomeTurma) {
        alert("Informe o nome da turma.");
        return;
    }

    if (!/^\d{4}$/.test(anoTurma)) {
        alert("Ano inválido. Utilize 4 dígitos (ex.: 2024).");
        return;
    }

    if (!grupoTurma) {
        alert("Selecione o grupo.");
        return;
    }

    if (!periodoTurma) {
        alert("Selecione o período.");
        return;
    }

    

    const turmaAtualizada = {
        nomeTurma: nomeTurma,
        anoTurma: Number(anoTurma),
        grupoTurma: grupoTurma,
        cursoTurma: cursoTurma || null,
        periodoTurma: periodoTurma,
        
    };

    try {
        const response = await fetch(`${API}/turma/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(turmaAtualizada)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao atualizar turma.`);
        }

        alert("Turma atualizada com sucesso!");
        window.location.href = "painelProfessor.html";

    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            return;
        }
        alert(error.message || "Erro ao atualizar turma.");
    }
}

async function deleteTurma(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("ID não informado.");
        return;
    }

    const confirmado = prompt(
        "Tem certeza que deseja excluir esta turma? Digite 'CONFIRMAR' para confirmar."
    ).toUpperCase() === "CONFIRMAR";

    if (!confirmado) {
        alert("Exclusão cancelada.");
        return;
    }

    try {
        const response = await fetch(`${API}/turma/${id}`, { method: "DELETE" });

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao excluir turma.`);
        }

        alert("Turma excluída com sucesso!");
        window.location.href = "painelProfessor.html";

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao excluir turma.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarTurma();
    document.getElementById("formTurma").addEventListener("submit", editTurma);
    document.getElementById("btnExcluir").addEventListener("click", deleteTurma);
});
