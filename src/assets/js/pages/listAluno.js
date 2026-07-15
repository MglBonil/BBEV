async function carregarAlunos() {

    const tbody = document.getElementById("tabelaAlunos");

    tbody.innerHTML = `
        <tr>
            <td colspan="8" class="py-8 text-center text-gray-500">
                Carregando alunos...
            </td>
        </tr>
    `;

    try {

        const response = await fetch(`${API}/aluno/all?page=0&size=50`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const alunos = pagina.content || [];

        console.log(alunos);

        tbody.innerHTML = "";

        if (alunos.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="py-8 text-center text-gray-500">
                        Nenhum aluno encontrado.
                    </td>
                </tr>
            `;

            return;
        }

        alunos.forEach(aluno => {


            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">

                    <td class="py-4 text-center">${aluno.rmAluno}</td>

                    <td class="py-4 font-medium text-center">
                        ${aluno.nomeAluno}
                    </td>

                    <td class="py-4 font-medium text-center">
                        ${aluno.emailAluno}
                    </td>

                    <td class="py-4 font-medium text-center">
                        ${aluno.dataNascAluno}
                    </td>

                    <td class="py-4 text-center">
                        ${aluno.codTurma ?? "-"}
                    </td>

                    <td class="py-4 text-center">

                        <button
                            class="text-blue-600 hover:text-blue-800 font-semibold"
                            onclick="window.location.href='editAluno.html?rm=${aluno.rmAluno}'">

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
                    Erro ao carregar alunos.
                </td>
            </tr>
        `;
    }
}

window.onload = carregarAlunos;

const search = document.getElementById("search");

search.addEventListener("input", () => {

    const filtro = search.value.toLowerCase();

    document.querySelectorAll("#tabelaAlunos tr").forEach(linha => {

        const texto = linha.textContent.toLowerCase();

        linha.style.display = texto.includes(filtro) ? "" : "none";

    });

});