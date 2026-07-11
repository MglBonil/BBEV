const API = "https://bbevapi.onrender.com";


async function cadTurma(event) {
    event.preventDefault();

    const nomeTurma = document.getElementById("nomeTurma").value.trim();
    const anoTurma = document.getElementById("anoTurma").value.trim();
    const grupoTurma = document.getElementById("grupoTurma").value.trim();
    const cursoTurma = document.getElementById("cursoTurma").value.trim();
    const periodoTurma = document.getElementById("periodoTurma").value.trim();

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

    

    const novaTurma = {
        nomeTurma: nomeTurma,
        anoTurma: Number(anoTurma),
        grupoTurma: grupoTurma ? grupoTurma.charAt(0) : null,
        cursoTurma: cursoTurma || null,
        periodoTurma: periodoTurma || null,
        
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
        window.location.href = "painelProfessor.html";

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
    document.getElementById("formTurma").addEventListener("submit", cadTurma);
});
