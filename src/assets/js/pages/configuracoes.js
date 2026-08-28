let professor = null;

async function carregarProfessor() {
    const sessao = JSON.parse(sessionStorage.getItem("sessaoBBEV"));
    const rm = sessao?.rmProf;

    if (!rm) {
        alert("RM não informado.");
        window.location.href = "listProf.html";
        return;
    }

    try {
        const response = await fetch(`${API}/professor/${rm}`);

        if (!response.ok) {
            throw new Error("Professor não encontrado.");
        }

        professor = await response.json();

        document.getElementById("rmProf").textContent = professor.rmProf;
        document.getElementById("nomeProf").textContent = professor.nomeProf;
        document.getElementById("emailProf").value = professor.emailProf;
        document.getElementById("statusAtivo").checked = professor.statusProf;

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao carregar professor.");
    }
}


async function editProf(event) {

    event.preventDefault();

    const sessao = JSON.parse(sessionStorage.getItem("sessaoBBEV"));
    const rm = sessao?.rmProf;
    const emailProf = document.getElementById("emailProf").value.trim();
    const senhaProf = document.getElementById("novaSenha").value.trim();

    // Validações

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

    const professorAtualizado = {
        rmProf: Number(rm),
        nomeProf: professor.nomeProf,
        emailProf: emailProf,
        senhaProf: senhaProf === "" ? null : senhaProf,
        tipoProf: "Professor",
        statusProf: document.getElementById("statusAtivo").checked
    };


    try {

        const response = await fetch(`${API}/professor/${rm}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(professorAtualizado)
        });


        const result = await response.json().catch(() => null);


        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao atualizar professor.`);
        }


        alert("Professor atualizado com sucesso!");

        window.location.href = "configuracoes.html";


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
        .getElementById("formConfig")
        .addEventListener("submit", editProf);

});