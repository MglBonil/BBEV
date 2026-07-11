

async function cadProf(event) {
    event.preventDefault();

    console.log("Função executada");

    const rmProf = document.getElementById("rmProf").value.trim();
    const nomeProf = document.getElementById("nomeProf").value.trim();
    const emailProf = document.getElementById("emailProf").value.trim();
    const senhaProf = document.getElementById("senhaProf").value.trim();

    //Validar se todos os campos estão preenchidos
    if (!rmProf || !nomeProf || !emailProf || !senhaProf) {
        alert("Todos os campos devem estar preenchidos!");
        return;
    }

    //Validar RM: Garante que são APENAS números E que tem exatamente 5 dígitos
    if (!/^\d{5}$/.test(rmProf)) {
        alert("RM inválido! Deve conter exatamente 5 números.");
        return;
    }

    //Validar limite do Nome
    if (nomeProf.length > 30) {
        alert("O nome deve ter no máximo 30 caracteres.");
        return;
    }

    //Validar formato do Email
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailProf)) {
        alert("Email inválido!");
        return;
    }

    //Validar limite do Email
    if (emailProf.length > 30) {
        alert("O Email deve ter no máximo 30 caracteres.");
        return;
    }

    // Validar Senha Entre 8 e 32 caracteres, aceitando qualquer caractere, mas exigindo pelo menos um especial ($*&@#)
    if (!/^(?=.*[$*&@#]).{8,32}$/.test(senhaProf)) {
        alert("A senha deve ter entre 8 e 32 caracteres e conter pelo menos um caractere especial ($*&@#).");
        return;
    }

    
    const novoProfessor = {
        rmProf: Number(rmProf),
        nomeProf: nomeProf,
        emailProf: emailProf,
        senhaProf: senhaProf,
        tipoProf: "Prof",
        statusProf: true
    };

    try {
        const response = await fetch("https://bbevapi.onrender.com/professor", {
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
        if (error instanceof TypeError) return;
        alert(error.message || "Erro ao cadastrar professor.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formProf").addEventListener("submit", cadProf);
});
