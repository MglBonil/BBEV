/**
 * Cria um card de turma.
 *
 * @param {Object} grupo
 * @param {string} turma.nome
 * @param {string} turma.descricao
 * @param {string} turma.gradiente
 * @param {string} turma.botao
 * @param {string} turma.sombra
 * @param {Function} turma.onClick
 */
function criarCardTurma(turma) {

    const card = document.createElement("div");

    card.className =
        "relative flex w-full min-w-0 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md overflow-hidden";

    card.innerHTML = `
        <div class="h-28 sm:h-36 ${turma.gradiente}"></div>

        <div class="p-4 sm:p-6">

            <h5 class="mb-2 block font-sans text-base sm:text-lg lg:text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased break-words">

                ${turma.nome}

            </h5>

            <p class="block font-sans text-sm sm:text-base font-light leading-relaxed text-inherit antialiased break-words">

                ${turma.descricao}

            </p>

        </div>

        <div class="p-4 sm:p-6 pt-0 sm:pt-0">

            <button
                class="block mx-auto select-none rounded-lg ${turma.botao} py-2.5 sm:py-3 px-4 sm:px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md ${turma.sombra} transition-all hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50">

                Ver Mais

            </button>

        </div>
    `;

    card.querySelector("button").addEventListener("click", turma.onClick);

    return card;

}