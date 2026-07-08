const API = "http://localhost:8080";

async function carregarTurmas() {

    const tbody = document.getElementById("tabelaTurmas");

    tbody.innerHTML = `
        <tr>
            <td colspan="8" class="py-8 text-center text-gray-500">
                Carregando turmas...
            </td>
        </tr>
    `;

    try {

        const response = await fetch(`${API}/turma/all?page=0&size=50`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const turmas = pagina.content || [];

        console.log(turmas);

        tbody.innerHTML = "";

        if (turmas.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="py-8 text-center text-gray-500">
                        Nenhuma turma encontrada.
                    </td>
                </tr>
            `;

            return;
        }

        turmas.forEach(turma => {

            

            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">

                    <td class="py-4">${turma.idTurma}</td>

                    <td class="py-4 font-medium">
                        ${turma.nomeTurma}
                    </td>

                    <td class="py-4">
                        ${turma.anoTurma}
                    </td>

                    <td class="py-4">
                        ${turma.grupoTurma}
                    </td>

                    <td class="py-4">
                        ${turma.cursoTurma ?? "-"}
                    </td>

                    <td class="py-4">
                        ${turma.periodoTurma}
                    </td>

                    <td class="py-4">
                        ${turma.codProfessor ?? "-"}
                    </td>

                    <td class="py-4 text-right">

                        <button
                            class="text-blue-600 hover:text-blue-800 font-semibold"
                            onclick="window.location.href='editTurma.html?id=${turma.idTurma}'">

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
                    Erro ao carregar turmas.
                </td>
            </tr>
        `;
    }
}

window.onload = carregarTurmas;

const search = document.getElementById("search");

search.addEventListener("input", () => {

    const filtro = search.value.toLowerCase();

    document.querySelectorAll("#tabelaTurmas tr").forEach(linha => {

        const texto = linha.textContent.toLowerCase();

        linha.style.display = texto.includes(filtro) ? "" : "none";

    });

});