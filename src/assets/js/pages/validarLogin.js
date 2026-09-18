async function validarLogin() {
    const sessao = sessionStorage.getItem("sessaoBBEV");

    if (!sessao) {
        alert("Usuário não identificado.");

        const caminhoAtual = window.location.pathname;

        if (caminhoAtual.includes("/adminPages/")) {

            window.top.location.href = "../loginProf.html";
        } else {
            
            window.top.location.href = "loginProf.html";
        }

        return;
    }
}

document.addEventListener("DOMContentLoaded", validarLogin);