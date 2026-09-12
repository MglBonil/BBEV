function parseIntervalo(value) {
    if (value === "" || value == null) return null;
    const normalized = String(value).replace(",", ".").trim();
    const number = Number(normalized);
    if (!Number.isFinite(number)) return null;
    if (number < 0) return null;
    return number;
}

function validarIntervalos() {
    const ids = { I: "intervaloI", R: "intervaloR", B: "intervaloB", MB: "intervaloMB" };
    const resultado = {};

    for (const [mencao, id] of Object.entries(ids)) {
        const raw = document.getElementById(id).value;
        const valor = parseIntervalo(raw);

        if (valor === null) {
            alert(`Informe um valor numérico maior ou igual a zero para a menção ${mencao}.`);
            return null;
        }

        resultado[mencao] = valor;
    }

    if (!(resultado.I <= resultado.R && resultado.R <= resultado.B && resultado.B <= resultado.MB)) {
        alert("Os valores devem seguir a ordem: I ≤ R ≤ B ≤ MB.");
        return null;
    }

    return resultado;
}

function setStatusCarregando(texto, erro = false) {
    const el = document.getElementById("statusCarregando");
    if (!el) return;
    el.textContent = texto;
    el.classList.toggle("text-red-600", erro);
    el.classList.toggle("text-gray-500", !erro);
}

function setFormHabilitado(habilitado) {
    const form = document.getElementById("formEscalam");
    if (!form) return;
    Array.from(form.elements).forEach((el) => {
        if (el.tagName === "BUTTON") return;
        el.disabled = !habilitado;
    });
    const btnSubmit = document.getElementById("btnSalvar");
    if (btnSubmit) btnSubmit.disabled = !habilitado;
}

async function carregarEscala(idEscala) {
    setStatusCarregando("Carregando escala...");
    setFormHabilitado(false);

    try {
        const response = await fetch(`${API}/escala-pontuacao/${idEscala}`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.status === 404) {
            alert(`Escala não encontrada com id: ${idEscala}`);
            window.location.href = "listEscalam.html";
            return;
        }

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao carregar escala.`);
        }

        const escala = await response.json();

        document.getElementById("intervaloI").value = escala.notaI ?? "";
        document.getElementById("intervaloR").value = escala.notaR ?? "";
        document.getElementById("intervaloB").value = escala.notaB ?? "";
        document.getElementById("intervaloMB").value = escala.notaMB ?? "";
        document.getElementById("codDisc").value = escala.codDisc ?? "";

        setStatusCarregando("");
        setFormHabilitado(true);
    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            setStatusCarregando("Não foi possível conectar à API.", true);
        } else {
            setStatusCarregando(error.message || "Erro ao carregar escala.", true);
        }
    }
}

async function carregarEscalaPorDisciplina(idDisc) {
    setStatusCarregando("Carregando escala da disciplina...");
    setFormHabilitado(false);

    try {
        const response = await fetch(`${API}/escala-pontuacao/disc/${idDisc}`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.status === 404 || response.status === 204) {
            setStatusCarregando("Nenhuma escala cadastrada para esta disciplina.", true);
            setFormHabilitado(true);
            document.getElementById("codDisc").value = idDisc;
            return;
        }

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao carregar escala da disciplina.`);
        }

        const escala = await response.json();

        if (escala && escala.idEscala) {
            window.location.replace(`editEscalam.html?id=${escala.idEscala}`);
            return;
        }

        document.getElementById("intervaloI").value = escala.notaI ?? "";
        document.getElementById("intervaloR").value = escala.notaR ?? "";
        document.getElementById("intervaloB").value = escala.notaB ?? "";
        document.getElementById("intervaloMB").value = escala.notaMB ?? "";
        document.getElementById("codDisc").value = escala.codDisc ?? idDisc;

        setStatusCarregando("");
        setFormHabilitado(true);
    } catch (error) {
        console.error(error);
        setStatusCarregando("Não foi possível carregar a escala da disciplina.", true);
        setFormHabilitado(true);
        document.getElementById("codDisc").value = idDisc;
    }
}

async function salvarIntervalos(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
        alert("ID da escala não informado.");
        window.location.href = "listEscalam.html";
        return;
    }

    const dados = validarIntervalos();
    if (!dados) return;

    const codDiscRaw = document.getElementById("codDisc").value;
    const payload = {
        notaI: dados.I,
        notaR: dados.R,
        notaB: dados.B,
        notaMB: dados.MB
    };
    if (codDiscRaw !== "") {
        payload.codDisc = Number(codDiscRaw);
    }

    const btnSalvar = document.getElementById("btnSalvar");
    if (btnSalvar) btnSalvar.disabled = true;

    try {
        const response = await fetch(`${API}/escala-pontuacao/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.status === 404) {
            alert(`Escala não encontrada com id: ${id}`);
            return;
        }

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao atualizar escala.`);
        }

        alert("Escala atualizada com sucesso!");
        window.location.href = "listEscalam.html";
    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
        } else {
            alert(error.message || "Erro ao atualizar escala.");
        }
    } finally {
        if (btnSalvar) btnSalvar.disabled = false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formEscalam");
    if (!form) return;

    const sessao = JSON.parse(sessionStorage.getItem("sessaoBBEV"));
    if (!sessao) {
        window.location.href = "../loginProf.html";
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const idDisc = params.get("idDisc");

    if (!id && !idDisc) {
        window.location.href = "listEscalam.html";
        return;
    }

    form.addEventListener("submit", salvarIntervalos);

    if (id) {
        carregarEscala(id);
    } else if (idDisc) {
        carregarEscalaPorDisciplina(idDisc);
    }
});