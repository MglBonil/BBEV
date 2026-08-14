const grid = document.getElementById("cardsGrid");

const paletas = [
    { gradiente: "bg-gradient-to-r from-blue-500 to-blue-600", botao: "bg-blue-500", sombra: "shadow-blue-500/30" },
    { gradiente: "bg-gradient-to-r from-blue-900 to-blue-700", botao: "bg-blue-900", sombra: "shadow-blue-900/30" },
    { gradiente: "bg-gradient-to-r from-yellow-400 to-amber-300", botao: "bg-amber-400", sombra: "shadow-amber-400/30" },
    { gradiente: "bg-gradient-to-r from-yellow-500 to-amber-400", botao: "bg-amber-500", sombra: "shadow-amber-500/30" },
];

async function carregarDisciplinas() {
    grid.innerHTML = `<div class="col-span-full text-center text-gray-500 py-10">Carregando disciplinas...</div>`;

    const params = new URLSearchParams(window.location.search);
    const idTurma = params.get("idTurma");

    if (!idTurma) {
        grid.innerHTML = `<div class="col-span-full text-center text-red-600 py-10">Turma não informada.</div>`;
        return;
    }

    try {
        const response = await fetch(`${API}/disciplina/turma/${idTurma}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) throw new Error("Erro HTTP: " + response.status);

        const disciplinas = await response.json();

        grid.innerHTML = "";

        if (disciplinas.length === 0) {
            grid.innerHTML = `<div class="col-span-full text-center text-gray-500 py-10">Nenhuma disciplina cadastrada para esta turma.</div>`;
            return;
        }

        disciplinas.forEach((disciplina, index) => {
            grid.appendChild(criarCardDisciplina(mapearDisciplina(disciplina, index)));
        });

    } catch (erro) {
        console.error(erro);
        grid.innerHTML = `<div class="col-span-full text-center text-red-600 py-10">Erro ao carregar disciplinas.</div>`;
    }
}

function mapearDisciplina(disciplina, index) {
    const paleta = paletas[index % paletas.length];
    const descricao = "Estudos de " +[disciplina.nomeDisc].filter(Boolean).join(" · ");
    return {
        nome: disciplina.nomeDisc,
        descricao: descricao || "Sem descrição",
        gradiente: paleta.gradiente,
        botao: paleta.botao,
        sombra: paleta.sombra,
        onClick: () => alert("Disciplina selecionada: " + disciplina.nomeDisc + "Em processo...")
    };
}

document.addEventListener("DOMContentLoaded", carregarDisciplinas);
