async function carregarDisciplinas() {

    const tbody = document.getElementById("tabelaDisciplinas");

    tbody.innerHTML = `
        <tr>
            <td colspan="8" class="py-8 text-center text-gray-500">
                Carregando disciplinas...
            </td>
        </tr>
    `;

    try {

        const response = await fetch(`${API}/disciplina/all?page=0&size=50`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const disciplinas = pagina.content || [];

        console.log(disciplinas);

        tbody.innerHTML = "";

        if (disciplinas.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="py-8 text-center text-gray-500">
                        Nenhuma disciplina encontrada.
                    </td>
                </tr>
            `;

            return;
        }

        disciplinas.forEach(disciplina => {


            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">

                    <td class="py-4 text-center">${disciplina.idDisc}</td>

                    <td class="py-4 font-medium text-center">
                        ${disciplina.nomeDisc}
                    </td>

                    <td class="py-4 text-center">
                        ${disciplina.codProfessor ?? "-" }
                    </td>

                    <td class="py-4 text-center">
                        ${disciplina.codTurma ?? "-"}
                    </td>

                    <td class="py-4 text-center">

                        <button
                            class="text-blue-600 hover:text-blue-800 font-semibold"
                            onclick="window.location.href='editDisciplina.html?id=${disciplina.idDisc}'">

                            Editar

                        </button>

                    </td>

                </tr>
            `;

        });

        

    } catch (erro) {

        console.error(erro);

        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="py-8 text-center text-red-600">
                    Erro ao carregar disciplinas.
                </td>
            </tr>
        `;
    }
}

window.onload = carregarDisciplinas;

const search = document.getElementById("search");

search.addEventListener("input", () => {

    const filtro = search.value.toLowerCase();

    document.querySelectorAll("#tabelaDisciplinas tr").forEach(linha => {

        const texto = linha.textContent.toLowerCase();

        linha.style.display = texto.includes(filtro) ? "" : "none";

    });

});