async function carregarAdmin() {

    const tbody = document.getElementById("tabelaAdmin");

    tbody.innerHTML = `
        <tr>
            <td colspan="5" class="py-8 text-center text-gray-500">
                Carregando Administradores...
            </td>
        </tr>
    `;

    try {

        const response = await fetch("http://localhost:8080/admin/all?page=0&size=200", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const admins = pagina.content || [];

        tbody.innerHTML = "";

        if (admins.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="py-8 text-center text-gray-500">
                        Nenhum Administrador encontrado.
                    </td>
                </tr>
            `;
            return;
        }

        admins.forEach(admin => {

            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">

                    <td class="py-4">${admin.idAdm}</td>

                    <td class="py-4 font-medium">${admin.nomeAdm}</td>

                    <td class="py-4 text-gray-600">${admin.emailAdm}</td>

                    <td class="py-4">
                        ${
                            admin.statusAdm
                                ? '<span class="text-green-600 font-semibold">Ativo</span>'
                                : '<span class="text-red-600 font-semibold">Inativo</span>'
                        }
                    </td>

                    <td class="py-4 text-right">
                        <button
                            class="text-blue-600 hover:text-blue-800 font-semibold"
                            onclick="window.location.href='editAdmin.html'+'?id=${admin.idAdm}'">
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
                    Erro ao carregar Administradores.
                </td>
            </tr>
        `;
    }
}

function editarAdmin(idAdm) {
    alert("Editar Administrador ID: " + idAdm);
}

window.onload = carregarAdmin;

const search = document.getElementById("search");

search.addEventListener("input", () => {
    const filtro = search.value.toLowerCase();

    document.querySelectorAll("#tabelaAdmin tr").forEach(linha => {
        const texto = linha.textContent.toLowerCase();

        linha.style.display = texto.includes(filtro) ? "" : "none";
    });
});