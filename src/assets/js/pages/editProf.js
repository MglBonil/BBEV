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

    const params = new URLSearchParams(window.location.search);
    const rm = params.get("rm");
    const nomeProf = document.getElementById("nomeProf").value.trim();
    const emailProf = document.getElementById("emailProf").value.trim();
    const senhaProf = document.getElementById("senhaProf").value.trim();

    //Validações

    if (!nomeProf) {
        alert("O nome é obrigatório.");
        return;
    }

    if (nomeProf.length > 30) {
        alert("O nome deve ter no máximo 30 caracteres.");
        return;
    }

    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nomeProf)) {
        alert("O nome não pode conter números ou caracteres especiais.");
        return;
    }

    if (!emailProf) {
        alert("O email é obrigatório.");
        return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailProf)) {
        alert("Email inválido!");
        return;
    }

    if (emailProf.length > 30) {
        alert("O Email deve ter no máximo 30 caracteres.");
        return;
    }

    if (senhaProf !== "") {

        if (!/^(?=.*[$*&@#]).{8,32}$/.test(senhaProf)) {
            alert("A senha deve ter entre 8 e 32 caracteres e conter pelo menos um caractere especial ($*&@#).");
            return;
        }

    }
    let professor;


    if (senhaProf === "") {

        professor = {
            rmProf: Number(rm),
            nomeProf: nomeProf,
            emailProf: emailProf,
            senhaProf: null,
            tipoProf: "Professor",
            statusProf: document.getElementById("statusAtivo").checked
        };


    } else {

        professor = {
            rmProf: Number(rm),
            nomeProf: nomeProf,
            emailProf: emailProf,
            senhaProf: senhaProf,
            tipoProf: "Professor",
            statusProf: document.getElementById("statusAtivo").checked
        };

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


    const resultado = prompt(
        "Tem certeza que deseja excluir este professor? Digite 'CONFIRMAR' para confirmar. Todos os dados atrelados a esse professor serão perdidos"
    ).toUpperCase() === "CONFIRMAR";


    if (resultado) {


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