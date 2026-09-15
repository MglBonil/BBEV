async function carregarJustificativas() {
    const select = document.getElementById("codCat");

    try {
        const response = await fetch(`${API}/categoria/all?page=0&size=100`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const categorias = pagina.content || [];

        categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria.idCat;
            option.dataset.valorPadraoCat = categoria.valorPadraoCat;
            option.dataset.tipoCat = categoria.tipoCat;
            option.textContent = `${categoria.idCat} - ${categoria.descricaoCat}`;
            select.appendChild(option);
        });

    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar justificativas</option>`;
    }
}

async function carregarDisciplina() {
    if (!idDisc) {
        alert("Disciplina não informada.");
        window.location.href = "../pages/loginProf.html";
        return;
    }

    try {
        const response = await fetch(`${API}/disciplina/${idDisc}`);

        if (!response.ok) {
            throw new Error("Disciplina não encontrada.");
        }

        const disciplina = await response.json();

        document.getElementById("codDisc").value = disciplina.idDisc;
        document.getElementById("nomeDisciplina").textContent = disciplina.nomeDisc || "";
        document.getElementById("turmaDisciplina").textContent = `Turma: ${disciplina.codTurma || codTurma}`;

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao carregar disciplina.");
    }
}

async function cadPontoEmMassa(event) {
    event.preventDefault();

    const qtdPontos = document.getElementById("qtdPontos").value.trim();
    const codDisc = document.getElementById("codDisc").value;
    const codCat = document.getElementById("codCat").value;

    const sessao = JSON.parse(sessionStorage.getItem("sessaoBBEV"));
    const ehAdm = sessao?.role === "adm";
    const codProfessor = sessao?.rmProf || null;

    if (!qtdPontos || Number(qtdPontos) === 0) {
        alert("Informe uma quantia de pontos.");
        return;
    }

    if (!codCat) {
        alert("Selecione uma justificativa.");
        return;
    }

    if (!codDisc) {
        alert("Disciplina não identificada.");
        return;
    }

    if (!ehAdm && !codProfessor) {
        alert("Selecione o professor responsável.");
        return;
    }

    const novoPonto = {
        codDisciplina: Number(codDisc),
        codCat: Number(codCat),
        qtdPontos: Number(qtdPontos),
        ...(!ehAdm && codProfessor && { codProf: Number(codProfessor) })
    };

    console.log("JSON que será enviado (em massa):", JSON.stringify(novoPonto));

    try {
        const response = await fetch(`${API}/pontos/em-massa`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoPonto)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao cadastrar pontos em massa.`);
        }

        alert("Pontos aplicados a todos os alunos com sucesso!");
        document.getElementById("formPontoMassa").reset();

    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            return;
        }
        alert(error.message || "Erro ao cadastrar pontos em massa.");
    }
}

function alterarPontos(valor) {
    const input = document.getElementById("qtdPontos");

    let pontos = Number(input.value) || 0;

    pontos += valor;

    input.value = pontos;
}

function atualizarValorPadrao() {
    const select = document.getElementById("codCat");
    const input = document.getElementById("qtdPontos");

    const opcaoSelecionada = select.options[select.selectedIndex];

    if (!opcaoSelecionada || !opcaoSelecionada.value) {
        input.value = "";
        return;
    }

    let valor = Number(opcaoSelecionada.dataset.valorPadraoCat) || 0;
    const tipo = opcaoSelecionada.dataset.tipoCat;

    if (tipo === "Decrescimo") {
        valor = -Math.abs(valor);
    } else {
        valor = Math.abs(valor);
    }

    input.value = valor;
}

document.addEventListener("DOMContentLoaded", () => {
    carregarJustificativas();
    carregarDisciplina();

    document.getElementById("codCat").addEventListener("change", atualizarValorPadrao);

    document.getElementById("formPontoMassa").addEventListener("submit", cadPontoEmMassa);
});
