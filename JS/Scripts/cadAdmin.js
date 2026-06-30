import { hashSenha } from "../Utils/hashSenha.js";

async function cadAdmin(event) {

    
    event.preventDefault();

    const form = document.getElementById("formAdmin");

    const novoAdmin = {
        nomeAdm: document.getElementById("nomeAdmin").value.trim(),
        emailAdm: document.getElementById("emailAdmin").value.trim(),
        senhaAdm: await hashSenha(document.getElementById("senhaAdmin").value),
        statusAdm: true
    };

    try {
        const response = await fetch("http://localhost:8080/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoAdmin)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao cadastrar administrador`);
        }

        console.log(result);
        alert("Administrador cadastrado com sucesso!");
        window.location.href = "listAdmin.html";
    } catch (error) {
        console.error("Erro ao cadastrar:", error);

        if (error instanceof TypeError) {
            return;
        }

        alert(error.message || "Erro ao cadastrar administrador.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formAdmin").addEventListener("submit", cadAdmin);
});
