const SESSION_KEY = "sessaoBBEV";
const REQUEST_TIMEOUT = 15000;

function getElement(id) {
    return document.getElementById(id);
}

function isApiConfigured() {
    return typeof API === "string" && API.trim().length > 0;
}

function mostrarErro(mensagem) {
    const erroLogin = getElement("erroLogin");
    if (!erroLogin) return;
    erroLogin.textContent = mensagem;
    erroLogin.classList.remove("hidden");
}

function esconderErro() {
    const erroLogin = getElement("erroLogin");
    if (!erroLogin) return;
    erroLogin.classList.add("hidden");
    erroLogin.textContent = "";
}

function toggleSenha() {
    const input = getElement("senhaProf");
    const icone = getElement("iconeSenha");
    if (!input || !icone) return;

    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    icone.src = isPassword
        ? "../assets/icons/visibility_off.svg"
        : "../assets/icons/visibility.svg";
}

function validarEmail(email) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

function setLoading(btnEntrar, ativo) {
    if (!btnEntrar) return;

    if (ativo) {
        btnEntrar.dataset.textoOriginal = btnEntrar.textContent;
        btnEntrar.textContent = "Entrando...";
        btnEntrar.disabled = true;
        btnEntrar.classList.add("opacity-60", "cursor-not-allowed");
    } else {
        btnEntrar.textContent = btnEntrar.dataset.textoOriginal || "Entrar";
        btnEntrar.disabled = false;
        btnEntrar.classList.remove("opacity-60", "cursor-not-allowed");
    }
}

async function loginProf(event) {
    event.preventDefault();
    esconderErro();

    if (!isApiConfigured()) {
        mostrarErro("Erro de configuração: variável API não encontrada. Verifique se config.js está sendo carregado.");
        return;
    }

    const email = getElement("emailProf")?.value.trim() || "";
    const senha = getElement("senhaProf")?.value || "";

    if (!email || !senha) {
        mostrarErro("Informe e-mail e senha para continuar.");
        return;
    }

    if (!validarEmail(email)) {
        mostrarErro("E-mail inválido. Verifique o formato do endereço.");
        return;
    }

    const btnEntrar = document.querySelector('#formLoginProf button[type="submit"]');
    setLoading(btnEntrar, true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const authRequest = { email, senha };

    try {
        const response = await fetch(`${API}/auth/login/professor`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(authRequest),
            signal: controller.signal,
        });


        const data = await response.json().catch(() => null);

        if (!response.ok) {
            const mensagem =
                data?.message ||
                (response.status === 401 || response.status === 403
                    ? "E-mail ou senha incorretos."
                    : `Erro ${response.status}: não foi possível autenticar.`);
            throw new Error(mensagem);
        }

        if (!data) {
            throw new Error("A API não retornou dados válidos.");
        }

        const sessionData = {
            role: "prof",
            ...data
        };

        sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));

        window.location.href = "painelProfessor.html";

    } catch (error) {
        console.error(error);

        if (error.name === "AbortError") {
            mostrarErro("Tempo limite excedido. Verifique sua conexão e tente novamente.");
            return;
        }

        if (error instanceof TypeError) {
            mostrarErro("Não foi possível conectar à API. Verifique sua conexão.");
            return;
        }

        mostrarErro(error?.message || "Erro ao realizar login.");
    } finally {
        clearTimeout(timeoutId);
        setLoading(btnEntrar, false);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = getElement("formLoginProf");
    const toggleButton = getElement("toggleSenhaButton");

    if (form) {
        form.addEventListener("submit", loginProf);
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", toggleSenha);
    }
});x