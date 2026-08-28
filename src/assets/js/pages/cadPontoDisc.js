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
            option.textContent = `${categoria.idCat} - ${categoria.descricaoCat}`;
            select.appendChild(option);
        });

    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar justificativase</option>`;
    }
}

async function carregarDisciplina() {
    const params = new URLSearchParams(window.location.search);
    const id= params.get("idDisc");

    if (!id) {
        alert("Disciplina não informado.");
        window.location.href = "../assets/pages/adminPages/painelAdmin.html";
        return;
    }

    try {
        const response = await fetch(`${API}/disciplina/${id}`);

        if (!response.ok) {
            throw new Error("Disciplina não encontrada.");
        }

        const disciplina = await response.json();

        document.getElementById("codDisc").value = disciplina.idDisc;

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao carregar disciplina.");
    }
}


async function carregarAluno() {
    const params = new URLSearchParams(window.location.search);
    const rm = params.get("rm");

    if (!rm) {
        alert("RM do aluno não informado.");
        window.location.href = "../assets/pages/adminPages/painelAdmin.html";
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



async function cadPonto(event) {
    event.preventDefault();

    const qtdPontos = document.getElementById("qtdPontos").value.trim();
    const codDisc = document.getElementById("codDisc").value;
    const codAluno = document.getElementById("rmAluno").textContent.trim();
    const codCat = document.getElementById("codCat").value;

    const sessao = JSON.parse(sessionStorage.getItem("sessaoBBEV"));
    const codProfessor = sessao?.rmProf;

    if (!qtdPontos || Number(qtdPontos) === 0) {
        alert("Informe uma quantia de pontos.");
        return;
    }
    
    if (!codProfessor) {
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

    

const novoPonto = {
    codAluno: Number(codAluno),
    codCat: Number(codCat),
    codProf: Number(codProfessor),
    codDisciplina: Number(codDisc),
    qtdPontos: Number(qtdPontos)
    
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
        document.getElementById("formPonto").reset();

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
    const params = new URLSearchParams(window.location.search);
    const rm = params.get("rm");

    if (!rm) {
        alert("RM do aluno não informado.");
        window.location.href = "../assets/pages/adminPages/painelAdmin.html";
        return;
    }


    try {
        const response = await fetch(`${API}/pontos/aluno/${rm}/total`);

        if (!response.ok) {
            throw new Error("Aluno não encontrado.");
        }

        const pontos = await response.json();

        document.getElementById("rmAluno").textContent = pontos.rmAluno;
        document.getElementById("totalPontos").textContent = pontos.totalPontos ?? "";

    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao carregar aluno.");
    }
}

function alterarPontos(valor) {
    const input = document.getElementById("qtdPontos");

    let pontos = Number(input.value) || 0;

    pontos += valor;

    input.value = pontos;
}

function cancelarCadPonto() {
    const params = new URLSearchParams(window.location.search);
    const idDisc = params.get("idDisc");
    const codTurma = params.get("codTurma");

    if (codTurma) {
        window.location.href = `listAlunoPontosDisc.html?idDisc=${idDisc}&codTurma=${codTurma}`;
    } else {
        window.location.href = `listAlunoDisc.html?idDisc=${idDisc}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarJustificativas();  
    carregarAluno();
    totalPontos();
    carregarDisciplina();
    

    document.getElementById("formPonto").addEventListener("submit", cadPonto);
});
