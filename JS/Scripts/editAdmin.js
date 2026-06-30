import { hashSenha } from "../Utils/hashSenha.js";

async function carregarAdmin() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("Id não informado.");
        window.location.href = "listAdmin.html";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/admin/${id}`);

        if (!response.ok) {
            throw new Error("Administrador não encontrado.");
        }

        const admin = await response.json();

        

        document.getElementById("nomeAdmin").value = admin.nomeAdm;
        document.getElementById("emailAdmin").value = admin.emailAdm;
        document.getElementById("statusAtivo").checked = admin.statusAdm;
        document.getElementById("statusInativo").checked = !admin.statusAdm;

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao carregar administrador.");
    }
}

async function editAdmin(event) {

    

    event.preventDefault();

    const form = document.getElementById("formAdmin");

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    let admin;
    if (document.getElementById("senhaAdmin").value.trim() == "") {

        if (document.getElementById("statusAtivo").checked) {
            admin = {
                idAdm: Number(id),
                nomeAdm: document.getElementById("nomeAdmin").value.trim(),
                emailAdm: document.getElementById("emailAdmin").value.trim(),
                senhaAdm: null,
                statusAdm: true
            };
        } else {
            admin = {
               idAdm: Number(id),
                nomeAdm: document.getElementById("nomeAdmin").value.trim(),
                emailAdm: document.getElementById("emailAdmin").value.trim(),
                senhaAdm: null,
                statusAdm: false
            };
        }

    } else {
        if (document.getElementById("statusAtivo").checked) {
            admin = {
                idAdm: Number(id),
                nomeAdm: document.getElementById("nomeAdmin").value.trim(),
                emailAdm: document.getElementById("emailAdmin").value.trim(),
                senhaAdm: await hashSenha(document.getElementById("senhaAdmin").value),
                statusAdm: true

            };
        } else {
            admin = {
                idAdm: Number(id),
                nomeAdm: document.getElementById("nomeAdmin").value.trim(),
                emailAdm: document.getElementById("emailAdmin").value.trim(),
                senhaAdm: await hashSenha(document.getElementById("senhaAdmin").value),
                statusAdm: false
            };
        }


    }


    try {

        const response = await fetch(`http://localhost:8080/admin/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(admin)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao atualizar aministrador.`);
        }

        alert("Administrador atualizado com sucesso!");

        window.location.href = "listAdmin.html";

    } catch (error) {

        console.error(error);

        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            alert(error.message)
            return;
        }

        alert(error.message || "Erro ao atualizar administrador.");
    }
}

document.addEventListener("DOMContentLoaded", () => {

    carregarAdmin();

    document
        .getElementById("formAdmin")
        .addEventListener("submit", editAdmin);

    document
        .getElementById("btnExcluir")
        .addEventListener("click", deleteAdmin);

});

async function deleteAdmin(event) {
    event.preventDefault();

    const resultado = prompt("Tem certeza que deseja excluir este administrador? Digite 'CONFIRMAR' para confirmar. Todos os dados atrelados a esse professor serão perdidos").toUpperCase() === "CONFIRMAR";

    if (resultado) {
        const form = document.getElementById("formAdmin");

        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        if (!id) {
            alert("id não informado.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/admin/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`Erro ${response.status} ao excluir administrador.`);
            }

            alert("Administrador excluído com sucesso!");
            window.location.href = "listAdmin.html";

        } catch (error) {
            console.error(error);
            alert(error.message || "Erro ao excluir administrador.");
        }
    } else {
        alert("Exclusão cancelada.");
    }


}


