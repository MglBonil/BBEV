
function validateConfig() {
    if (typeof API !== "string" || !API.trim()) {
        throw new Error("Variável API não configurada. Verifique se config.js está carregado corretamente.");
    }
}

function toggleSenha() {
    const input = document.getElementById("senhaAdmin");
    const icone = document.getElementById("iconeSenha");
    const isPassword = input.type === "password";

    input.type = isPassword ? "text" : "password";
    icone.src = isPassword
        ? "../assets/icons/visibility_off.svg"
        : "../assets/icons/visibility.svg";
}

async function loginAdmin(event) {
    event.preventDefault();
    validateConfig();

    const email = document.getElementById("emailAdmin").value.trim();
    const senha = document.getElementById("senhaAdmin").value;

    if (!email || !senha) {
        alert("Preencha e-mail e senha antes de entrar.");
        return;
    }

    const authRequest = { email, senha };

    try {
        const response = await fetch(`${API}/auth/login/admin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(authRequest)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status}, credenciais inválidas!`);
        }

        alert("Login realizado com sucesso!");
        window.location.href = "adminPages/painelAdmin.html";
    } catch (error) {
        console.error(error);

        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            return;
        }

        alert(error.message || "Erro ao realizar login.");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formLoginAdmin");
    const toggleButton = document.getElementById("toggleSenhaButton");

    form?.addEventListener("submit", loginAdmin);
    toggleButton?.addEventListener("click", toggleSenha);
});

