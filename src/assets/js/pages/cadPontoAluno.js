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
            option.dataset.statusCat = categoria.statusCat;
            option.textContent = `${categoria.idCat} - ${categoria.descricaoCat}`;
            select.appendChild(option);
        });


    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar justificativase</option>`;
    }
}

async function carregarAluno() {
    const params = new URLSearchParams(window.location.search);
    const rm = params.get("rm");

    if (!rm) {
            alert("RM do aluno não informado.");
            window.location.href = "../pages/loginProf.html";
            return;

    }


    try {
        const response = await fetch(`${API}/aluno/${rm}`);

        if (!response.ok) {
            throw new Error("Aluno não encontrado.");
        }

        const aluno = await response.json();

        document.getElementById("rmAluno").textContent = aluno.rmAluno;
        document.getElementById("nomeAluno").textContent = aluno.nomeAluno ?? "";

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao carregar aluno.");
    }
}



async function carregarDisciplinas() {
    const select = document.getElementById("codDisc");
    const params = new URLSearchParams(window.location.search);
    const rm = params.get("rm");

    if (!rm) {
            alert("RM do aluno não informado.");
            window.location.href = "../pages/loginProf.html";
            return;
    }

    try {
        const response = await fetch(`${API}/disciplina/aluno/${rm}`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const disciplinas = await response.json();

        disciplinas.forEach(disciplina => {
            const option = document.createElement("option");
            option.value = disciplina.idDisc;
            option.textContent = `${disciplina.idDisc} - ${disciplina.nomeDisc}`;
            select.appendChild(option);
        });

    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar disciplinas</option>`;
    }
}

async function cadPonto(event) {
    event.preventDefault();

    const qtdPontos = document.getElementById("qtdPontos").value.trim();
    const codDisc = document.getElementById("codDisc").value;
    const codAluno = document.getElementById("rmAluno").textContent.trim();
    const codCat = document.getElementById("codCat").value;
    const categoriaSelecionada = document.getElementById("codCat").selectedOptions[0];

    const sessao = JSON.parse(sessionStorage.getItem("sessaoBBEV"));
    const ehAdm = sessao?.role === "adm";
    const codProfessor = sessao?.rmProf || null;

    if (!qtdPontos || Number(qtdPontos) === 0) {
        alert("Informe uma quantia de pontos.");
        return;
    }

    if (!ehAdm && !codProfessor) {
        alert("Selecione o professor responsável.");
        return;
    }

    if (!codCat) {
        alert("Selecione uma justificativa.");
        return;
    }

    if (!codDisc) {
        alert("Selecione uma disciplina.");
        return;
    }

    if (!codAluno) {
        alert("Selecione o aluno.");
        return;
    }

    if (categoriaSelecionada?.dataset.statusCat === "false") {
        alert("A justificativa selecionada está inativa. Por favor, selecione uma justificativa ativa.");
        return;
    }

    const novoPonto = {
        codAluno: Number(codAluno),
        codCat: Number(codCat),
        codDisciplina: Number(codDisc),
        qtdPontos: Number(qtdPontos),
        ...(codProfessor && { codProf: Number(codProfessor) })
    };

console.log("JSON que será enviado:", JSON.stringify(novoPonto));

    try {
        const response = await fetch(`${API}/pontos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoPonto)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status} ao cadastrar ponto.`);
        }

        alert("Ponto cadastrado com sucesso!");
        const disciplinaSelecionada = document.getElementById("codDisc").value;
        document.getElementById("formPonto").reset();
        document.getElementById("codDisc").value = disciplinaSelecionada;
        await totalPontos();

    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            return;
        }
        alert(error.message || "Erro ao cadastrar ponto.");
    }
}

async function carregarTurmas() {

    try {
        const response = await fetch(`${API}/turma/all?page=0&size=100`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const turmas = pagina.content || [];

        turmas.forEach(turma => {
            const option = document.createElement("option");
            option.value = turma.idTurma;
            option.textContent = `${turma.idTurma} - ${turma.nomeTurma}`;
            select.appendChild(option);
        });

    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar turmas</option>`;
    }
}


async function totalPontos() {
    const select = document.getElementById("codDisc");
    const params = new URLSearchParams(window.location.search);
    const rm = params.get("rm");
    const idDisc = select.value;


    if (!idDisc) {
        document.getElementById("totalPontos").textContent = "0";
        return;
    }
    if (!rm) {
            alert("RM do aluno não informado.");
            window.location.href = "../pages/loginProf.html";
            return;
        }
    


    try {
        const response = await fetch(`${API}/pontos/aluno/${rm}/disciplina/${idDisc}/total`);

        if (!response.ok) {
            throw new Error("Aluno não encontrado.");
        }

        const pontos = await response.json();
        document.getElementById("totalPontos").textContent = pontos.totalPontos ?? 0;

    } catch (error) {
        console.error("Erro ao carregar pontos:", error);
        document.getElementById("totalPontos").textContent = "0";
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
    carregarAluno();
    carregarDisciplinas();

    document.getElementById("codCat").addEventListener("change", atualizarValorPadrao);
    document.getElementById("codDisc").addEventListener("change", totalPontos);
    document.getElementById("formPonto").addEventListener("submit", cadPonto);
});
