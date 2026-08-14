/**
 * Cria um card de disciplina.
 *
 * @param {Object} disciplina
 * @param {string} disciplina.nome
 * @param {string} disciplina.descricao
 * @param {string} disciplina.gradiente
 * @param {string} disciplina.botao
 * @param {string} disciplina.sombra
 * @param {Function} disciplina.onClick
 */
function criarCardDisciplina(disciplina) {

    const card = document.createElement("div");

    card.className =
        "relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md overflow-hidden";

    card.innerHTML = `
        <div class="h-40 ${disciplina.gradiente}"></div>

        <div class="p-6">

            <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">

                ${disciplina.nome}

            </h5>

            <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">

                ${disciplina.descricao}

            </p>

        </div>

        <div class="p-6 pt-0">

            <button
                class="block mx-auto select-none rounded-lg ${disciplina.botao} py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md ${disciplina.sombra} transition-all hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50">

                Ver Mais

            </button>

        </div>
    `;

    card.querySelector("button").addEventListener("click", disciplina.onClick);

    return card;

}