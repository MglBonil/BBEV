const grid = document.getElementById("cardsGrid");

const paletas = [
    { gradiente: "bg-gradient-to-r from-blue-500 to-blue-600", botao: "bg-blue-500", sombra: "shadow-blue-500/30" },
    { gradiente: "bg-gradient-to-r from-blue-900 to-blue-700", botao: "bg-blue-900", sombra: "shadow-blue-900/30" },
    { gradiente: "bg-gradient-to-r from-yellow-400 to-amber-300", botao: "bg-amber-400", sombra: "shadow-amber-400/30" },
    { gradiente: "bg-gradient-to-r from-yellow-500 to-amber-400", botao: "bg-amber-500", sombra: "shadow-amber-500/30" },
];

async function carregarTurmas() {
    grid.innerHTML = `<div class="col-span-full text-center text-gray-500 py-10">Carregando turmas...</div>`;

    try {
        const response = await fetch(`${API}/turma/all?page=0&size=50`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });
        if (!response.ok) throw new Error("Erro HTTP: " + response.status);

        const pagina = await response.json();
        const turmas = pagina.content || [];
        grid.innerHTML = "";

        if (turmas.length === 0) {
            grid.innerHTML = `<div class="col-span-full text-center text-gray-500 py-10">Nenhuma turma cadastrada.</div>`;
            return;
        }

        turmas.forEach((turma, index) => grid.appendChild(criarCardTurma(mapearTurma(turma, index))));

    } catch (erro) {
        console.error(erro);
        grid.innerHTML = `<div class="col-span-full text-center text-red-600 py-10">Erro ao carregar turmas.</div>`;
    }
}

function mapearTurma(turma, index) {
    const paleta = paletas[index % paletas.length];
    const descricao = [turma.cursoTurma, turma.periodoTurma].filter(Boolean).join(" · ");
    return {
        nome: turma.nomeTurma,
        descricao: descricao || "Sem descrição",
        gradiente: paleta.gradiente,
        botao: paleta.botao,
        sombra: paleta.sombra,
        onClick: () => window.location.href = "painelProfessor.html"
    };
}

document.addEventListener("DOMContentLoaded", carregarTurmas);
