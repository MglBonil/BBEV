async function carregarProfessores() {

    const tbody = document.getElementById("tabelaProfessores");

    tbody.innerHTML = `
        <tr>
            <td colspan="5" class="py-8 text-center text-gray-500">
                Carregando professores...
            </td>
        </tr>
    `;

    try {

        const response = await fetch("http://localhost:8080/professor/all?page=0&size=200", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const professores = pagina.content || [];

        tbody.innerHTML = "";

        if (professores.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="py-8 text-center text-gray-500">
                        Nenhum professor encontrado.
                    </td>
                </tr>
            `;
            return;
        }

        professores.forEach(professor => {

            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">

                    <td class="py-4">${professor.rmProf}</td>

                    <td class="py-4 font-medium">${professor.nomeProf}</td>

                    <td class="py-4 text-gray-600">${professor.emailProf}</td>

                    <td class="py-4">
                        ${
                            professor.statusProf
                                ? '<span class="text-green-600 font-semibold">Ativo</span>'
                                : '<span class="text-red-600 font-semibold">Inativo</span>'
                        }
                    </td>

                    <td class="py-4 text-right">
                        <button
                            class="text-blue-600 hover:text-blue-800 font-semibold"
                            onclick="window.location.href='editProf.html'+'?rm=${professor.rmProf}'">
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
                <td colspan="5" class="py-8 text-center text-red-600">
                    Erro ao carregar professores.
                </td>
            </tr>
        `;
    }
}

function editarProfessor(rmProf) {
    alert("Editar professor RM: " + rmProf);
}

window.onload = carregarProfessores;

const search = document.getElementById("search");

search.addEventListener("input", () => {
    const filtro = search.value.toLowerCase();

    document.querySelectorAll("#tabelaProfessores tr").forEach(linha => {
        const texto = linha.textContent.toLowerCase();

        linha.style.display = texto.includes(filtro) ? "" : "none";
    });
});