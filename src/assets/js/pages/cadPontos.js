async function carregarJustificativas() {

    try {
        const response = await fetch(`${API}/justificativa/all?page=0&size=100`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const justificativa = pagina.content || [];

        justificativa.forEach(justificativa => {
            const option = document.createElement("option");
            option.value = justificativa.idCat;
            option.textContent = `${justificativa.idCat} - ${justificativa.descricaoCat}`;
            select.appendChild(option);
        });

    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar professores</option>`;
    }
}
async function carregarProfessores() {
    const select = document.getElementById("codProfessor");

    try {
        const response = await fetch(`${API}/professor/all?page=0&size=100`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const professores = pagina.content || [];

        professores.forEach(professor => {
            const option = document.createElement("option");
            option.value = professor.rmProf;
            option.textContent = `${professor.rmProf} - ${professor.nomeProf}`;
            select.appendChild(option);
        });

    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar professores</option>`;
    }
}

async function carregarDisciplinas() {
    
    try {
        const response = await fetch(`${API}/disciplina/all?page=0&size=100`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const diciplinas = pagina.content || [];

        diciplinas.forEach(diciplina => {
            const option = document.createElement("option");
            option.value = diciplina.idDisc;
            option.textContent = `${disciplina.idDisc} - ${diciplina.nomeDisc}`;
            select.appendChild(option);
        });

    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar disciplinas</option>`;
    }
}

async function carregarAlunos() {
        const params = new URLSearchParams(window.location.search);
        const rm = params.get("rm");

        console.log(window.location.href);
        console.log(params.get("rm"));

    if (!rm) {
        alert("RM do aluno não informado.");
        window.location.href = "painelAdmin.html";
        return;
    }

    
    try {
        const response = await fetch(`${API}/aluno/all?page=0&size=100`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const alunos = pagina.content || [];

        alunos.forEach(aluno => {
            const option = document.createElement("option");
            option.value = aluno.rmAluno;
            option.textContent = `${aluno.rmAluno} - ${aluno.nomeAluno}`;
            select.appendChild(option);
        });

    } catch (erro) {
        console.error(erro);
        select.innerHTML = `<option value="">Erro ao carregar disciplinas</option>`;
    }
}

async function cadPonto(event) {
    event.preventDefault();

    const qntPontos = document.getElementById("qntPontos").value.trim();
    const codDisc = document.getElementById("codDisc").value;
    const codAluno = document.getElementById("codAluno").value;
    const codProfessor = document.getElementById("codProfessor").value;
    const codCat = document.getElementById("codCat").value;

    if (!qntPontos == 0) {
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
        qntPontos: qntPontos,
        codProfessor: Number(codProfessor),
        codAluno: Number(codAluno),
        codDisc: Number(codDisc),
        codCat: Number(codCat)
    };

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

    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            return;
        }
        alert(error.message || "Erro ao cadastrar ponto.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarProfessores();
    carregarJustificativas();  
    carregarAlunos();
    carregarDisciplinas();
    document.getElementById("formPonto").addEventListener("submit", cadPonto);
});
