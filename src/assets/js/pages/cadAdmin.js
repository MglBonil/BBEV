async function cadAdmin(event) {

    event.preventDefault();


    const nomeAdm = document.getElementById("nomeAdmin").value.trim();
    const emailAdm = document.getElementById("emailAdmin").value.trim();
    const senhaAdm = document.getElementById("senhaAdmin").value.trim();

    
    if (!nomeAdm) {
        alert("O nome é obrigatório.");
        return;
    }

    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nomeAdm)) {
        alert("O nome não pode conter números ou caracteres especiais.");
        return;
    }

    if (nomeAdm.length > 30) {
        alert("O nome deve ter no máximo 30 caracteres.");
        return;
    }

    if (!emailAdm) {
        alert("O email é obrigatório.");
        return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailAdm)) {
        alert("Email inválido!");
        return;
    }

    if (emailAdm.length > 30) {
        alert("O Email deve ter no máximo 30 caracteres.");
        return;
    }

    if (!senhaAdm) {
        alert("A senha é obrigatória.");
        return;
    }

    if (!/^(?=.*[$*&@#]).{8,32}$/.test(senhaAdm)) {
        alert("A senha deve ter entre 8 e 32 caracteres e conter pelo menos um caractere especial ($*&@#).");
        return;
    }

    const novoAdmin = {
        nomeAdm: nomeAdm,
        emailAdm: emailAdm,
        senhaAdm: senhaAdm,
        statusAdm: true
    };



    try {

        const response = await fetch(`${API}/admin`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoAdmin)

        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {

            throw new Error(
                result?.message || `Erro ${response.status} ao cadastrar administrador`
            );

        }

        console.log(result);
        alert("Administrador cadastrado com sucesso!");
        window.location.href = "listAdmin.html";


    } catch (error) {

        console.error("Erro ao cadastrar:", error);

        if (error instanceof TypeError) {

            alert("Não foi possível conectar à API.");

            return;

        }

        alert(error.message || "Erro ao cadastrar administrador.");
    }

}

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("formAdmin")
        .addEventListener("submit", cadAdmin);

});