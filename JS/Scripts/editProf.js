import { hashSenha } from "../Utils/hashSenha.js";

async function carregarProfessor() {
    const params = new URLSearchParams(window.location.search);
    const rm = params.get("rm");

    if (!rm) {
        alert("RM não informado.");
        window.location.href = "listProf.html";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/professor/${rm}`);

        if (!response.ok) {
            throw new Error("Professor não encontrado.");
        }

        const professor = await response.json();

        document.getElementById("rmProf").value = professor.rmProf;
        document.getElementById("rmProf").readOnly = true;
        document.getElementById("nomeProf").value = professor.nomeProf;
        document.getElementById("emailProf").value = professor.emailProf;

        document.getElementById("statusAtivo").checked = professor.statusProf;
        document.getElementById("statusInativo").checked = !professor.statusProf;

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao carregar professor.");
    }
}

async function editProf(event) {

    

    event.preventDefault();

    const form = document.getElementById("formProf");

    const params = new URLSearchParams(window.location.search);
    const rm = params.get("rm");
    let professor;
    if (document.getElementById("senhaProf").value.trim() == "") {

        if (document.getElementById("statusAtivo").checked) {
            professor = {
                rmProf: Number(rm),
                nomeProf: document.getElementById("nomeProf").value.trim(),
                emailProf: document.getElementById("emailProf").value.trim(),
                senhaProf: null,
                tipo: "Professor",
                statusProf: true
            };
        } else {
            professor = {
                rmProf: Number(rm),
                nomeProf: document.getElementById("nomeProf").value.trim(),
                emailProf: document.getElementById("emailProf").value.trim(),
                senhaProf: null,
                tipo: "Professor",
                statusProf: false
            };
        }

    } else {
        if (document.getElementById("statusAtivo").checked) {
            professor = {
                rmProf: Number(rm),
                nomeProf: document.getElementById("nomeProf").value.trim(),
                emailProf: document.getElementById("emailProf").value.trim(),
                senhaProf: await hashSenha(document.getElementById("senhaProf").value),
                tipo: "Professor",
                statusProf: true

            };
        } else {
            professor = {
                rmProf: Number(rm),
                nomeProf: document.getElementById("nomeProf").value.trim(),
                emailProf: document.getElementById("emailProf").value.trim(),
                senhaProf: await hashSenha(document.getElementById("senhaProf").value),
                tipo: "Professor",
                statusProf: false
            };
        }


    }


    try {

        const response = await fetch(`http://localhost:8080/professor/${rm}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(professor)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao atualizar professor.`);
        }

        alert("Professor atualizado com sucesso!");

        window.location.href = "listProf.html";

    } catch (error) {

        console.error(error);

        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            alert(error.message)
            return;
        }

        alert(error.message || "Erro ao atualizar professor.");
    }
}

document.addEventListener("DOMContentLoaded", () => {

    carregarProfessor();

    document
        .getElementById("formProf")
        .addEventListener("submit", editProf);

    document
        .getElementById("btnExcluir")
        .addEventListener("click", deleteProf);

});

async function deleteProf(event) {
    event.preventDefault();

    const resultado = prompt("Tem certeza que deseja excluir este professor? Digite 'CONFIRMAR' para confirmar. Todos os dados atrelados a esse professor serão perdidos").toUpperCase() === "CONFIRMAR";

    if (resultado) {
        const form = document.getElementById("formProf");

        const rm = document.getElementById("rmProf").value;

        if (!rm) {
            alert("RM não informado.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/professor/${rm}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`Erro ${response.status} ao excluir professor.`);
            }

            alert("Professor excluído com sucesso!");
            window.location.href = "listProf.html";

        } catch (error) {
            console.error(error);
            alert(error.message || "Erro ao excluir professor.");
        }
    } else {
        alert("Exclusão cancelada.");
    }


}


