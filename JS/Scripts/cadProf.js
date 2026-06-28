async function cadProf(event) {
    event.preventDefault();

    const form = document.getElementById("formProf");

    const novoProfessor = {
        rmProf: Number(document.getElementById("rmProf").value),
        nomeProf: document.getElementById("nomeProf").value.trim(),
        emailProf: document.getElementById("emailProf").value.trim(),
        senhaProf: document.getElementById("senhaProf").value,
        tipo: "Professor",
        statusProf: true
    };

    try {
        const response = await fetch("http://localhost:8080/professor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoProfessor)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao cadastrar professor`);
        }

        console.log(result);
        alert("Professor cadastrado com sucesso!");
        window.location.href = "listProf.html";
    } catch (error) {
        console.error("Erro ao cadastrar:", error);

        if (error instanceof TypeError) {
            return;
        }

        alert(error.message || "Erro ao cadastrar professor.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formProf").addEventListener("submit", cadProf);
});
