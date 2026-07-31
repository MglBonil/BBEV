async function carregarTurmas() {

    const tbody = document.getElementById("tabelaJustificativas");

    tbody.innerHTML = `
        <tr>
            <td colspan="8" class="py-8 text-center text-gray-500">
                Carregando Justificativas...
            </td>
        </tr>
    `;

    try {

        const response = await fetch(`${API}/categoria/all?page=0&size=20`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const Justificativas = pagina.content || [];

        console.log(Justificativas);

        tbody.innerHTML = "";

        if (Justificativas.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="py-8 text-center text-gray-500">
                        Nenhuma turma encontrada.
                    </td>
                </tr>
            `;

            return;
        }

        Justificativas.forEach(Justificativas => {

            

            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">

                    <td class="py-4 text-center">${Justificativas.idCat}</td>

                    <td class="py-4 text-center">
                        ${Justificativas.descricaoCat} 
                    </td>

                    <td class="py-4 text-center">
                        ${Justificativas.tipoCat} 
                    </td>

                    <td class="py-4 text-center">
                        ${Justificativas.valorPadraoCat} 
                    </td>


                    <td class="py-4 text-center">
                        ${
                            Justificativas.statusCat
                                ? '<span class="text-green-600 font-semibold">Ativo</span>'
                                : '<span class="text-red-600 font-semibold">Inativo</span>'
                        } 
                    </td>


                    <td class="py-4 text-center">

                        <button
                            class="text-blue-600 hover:text-blue-800 font-semibold"
                            onclick="window.location.href='adminPages/editJust.html?id=${Justificativas.idCat}'">

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

    document.querySelectorAll("#tabelaJustificativas tr").forEach(linha => {
        const texto = linha.textContent.toLowerCase();

        linha.style.display = texto.includes(filtro) ? "" : "none";
    });
});