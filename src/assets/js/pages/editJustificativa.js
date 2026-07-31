const VALID_TIPOS = ["A", "B", "i"];

function parseValor(valor) {
    if (!valor) return null;
    const normalized = String(valor).replace(/\s+/g, "").replace(",", ".");
    const number = Number(normalized);
    return Number.isFinite(number) ? number : null;
}

function validarJustificativa() {
    const descricaoCat = document.getElementById("descricaoJustificativa").value.trim();
    const tipoCat = document.getElementById("tipoJustificativa").value.trim();
    const valorPadraoCat = document.getElementById("valorJustificativa").value.trim();

    if (!descricaoCat) {
        alert("Informe a descrição da justificativa.");
        return null;
    }

    if (descricaoCat.length < 3) {
        alert("A descrição deve ter pelo menos 3 caracteres.");
        return null;
    }

    if (!VALID_TIPOS.includes(tipoCat)) {
        alert("Selecione o tipo da justificativa.");
        return null;
    }

    const valorNumber = parseValor(valorPadraoCat);
    if (valorNumber === null || valorNumber <= 0) {
        alert("Informe um valor padrão válido maior que zero.");
        return null;
    }

    return {
        descricaoCat,
        tipoCat,
        valorNumber
    };
}

async function carregarJustificativa() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("ID da justificativa não informado.");
        window.location.href = "../listJust.html";
        return;
    }

    try {
        const response = await fetch(`${API}/categoria/${id}`);

        if (!response.ok) {
            throw new Error("Justificativa não encontrada.");
        }

        const categoria = await response.json();

        document.getElementById("descricaoJustificativa").value = categoria.descricaoCat || "";
        document.getElementById("tipoJustificativa").value = categoria.tipoCat || "";
        document.getElementById("valorJustificativa").value = categoria.valorPadraoCat ?? "";

        if (categoria.statusCat != null) {
            const statusAtivo = document.getElementById("statusAtivo");
            const statusInativo = document.getElementById("statusInativo");
            if (categoria.statusCat) {
                if (statusAtivo) statusAtivo.checked = true;
            } else if (statusInativo) {
                statusInativo.checked = true;
            }
        }
    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao carregar justificativa.");
    }
}

async function editarJustificativa(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
        alert("ID da justificativa não informado.");
        return;
    }

    const dados = validarJustificativa();
    if (!dados) {
        return;
    }

    const statusRadio = document.querySelector('input[name="statusJustificativa"]:checked');
    const statusValue = statusRadio ? statusRadio.value === "true" : undefined;

    const justificativaAtualizada = {
        descricaoCat: dados.descricaoCat,
        tipoCat: dados.tipoCat,
        valorPadraoCat: dados.valorNumber,
        ...(statusValue !== undefined && { statusCat: statusValue })
    };

    try {
        const response = await fetch(`${API}/categoria/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(justificativaAtualizada)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao atualizar justificativa.`);
        }

        alert("Justificativa atualizada com sucesso!");
        window.location.href = "../listJust.html";
    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            return;
        }
        alert(error.message || "Erro ao atualizar justificativa.");
    }
}

async function excluirJustificativa(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
        alert("ID da justificativa não informado.");
        return;
    }

    const confirmado = prompt(
        "Tem certeza que deseja excluir esta justificativa? Digite 'CONFIRMAR' para confirmar."
    );

    if (!confirmado || confirmado.toUpperCase() !== "CONFIRMAR") {
        alert("Exclusão cancelada.");
        return;
    }

    try {
        const response = await fetch(`${API}/categoria/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao excluir justificativa.`);
        }

        alert("Justificativa excluída com sucesso!");
        window.location.href = "../listJust.html";
    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao excluir justificativa.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const form = document.getElementById("formTurma");

    if (!form) {
        return;
    }

    if (id) {
        carregarJustificativa();
        form.addEventListener("submit", editarJustificativa);
        const btnExcluir = document.getElementById("btnExcluir");
        if (btnExcluir) {
            btnExcluir.addEventListener("click", excluirJustificativa);
        }
    }
});
