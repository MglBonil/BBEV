
function getElement(id) {
    return document.getElementById(id);
}

function isApiConfigured() {
    return typeof API === "string" && API.trim().length > 0;
}

function showError(message) {
    alert(message);
}

function toggleSenha() {
    const input = getElement("senhaAdmin");
    const icone = getElement("iconeSenha");
    if (!input || !icone) return;

    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    icone.src = isPassword
        ? "../assets/icons/visibility_off.svg"
        : "../assets/icons/visibility.svg";
}

async function loginAdmin(event) {
    event.preventDefault();

    if (!isApiConfigured()) {
        showError("Erro de configuração: variável API não encontrada. Verifique se config.js está sendo carregado.");
        return;
    }

    const email = getElement("emailAdmin")?.value.trim() || "";
    const senha = getElement("senhaAdmin")?.value || "";

    if (!email || !senha) {
        showError("Informe e-mail e senha para continuar.");
        return;
    }

    const authRequest = { email, senha };

    try {
        const response = await fetch(`${API}/auth/login/admin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(authRequest),
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status}: credenciais inválidas.`);
        }

        alert("Login realizado com sucesso!");
        window.location.href = "adminPages/painelAdmin.html";
    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            showError("Não foi possível conectar à API.");
            return;
        }
        showError(error?.message || "Erro ao realizar login.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = getElement("formLoginAdmin");
    const toggleButton = getElement("toggleSenhaButton");

    if (form) {
        form.addEventListener("submit", loginAdmin);
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", toggleSenha);
    }
});

