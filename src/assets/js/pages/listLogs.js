const API = "http://localhost:8080";

async function carregarLogs() {
    const tbody = document.getElementById("tabelaLogs");

    tbody.innerHTML = `
        <tr>
            <td colspan="8" class="py-8 text-center text-gray-500">
                Carregando logs...
            </td>
        </tr>
    `;

    try {
        const response = await fetch(`${API}/log-alteracoes/all?page=0&size=50`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro HTTP: " + response.status);
        }

        const pagina = await response.json();
        const logs = pagina.content || [];

        tbody.innerHTML = "";

        if (logs.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="py-8 text-center text-gray-500">
                        Nenhum log encontrado.
                    </td>
                </tr>
            `;
            return;
        }

        logs.forEach(log => {
            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">
                    <td class="py-4 text-center">${log.idLog}</td>
                    <td class="py-4 font-medium text-center">${log.autor}</td>
                    <td class="py-4 text-center">${log.autorRole}</td>
                    <td class="py-4 text-center">${log.tabelaLog}</td>
                    <td class="py-4 text-center">${log.operacaoLog}</td>
                    <td class="py-4 text-center">${log.dataHoraLog}</td>
                    <td class="py-4 text-center">${log.descricaoLog}</td>
                </tr>
            `;
        });
    } catch (erro) {
        console.error(erro);
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="py-8 text-center text-red-600">
                    Erro ao carregar logs do sistema.
                </td>
            </tr>
        `;
    }
}

document.addEventListener("DOMContentLoaded", carregarLogs);

const search = document.getElementById("search");

if (search) {
    search.addEventListener("input", () => {
        const filtro = search.value.toLowerCase();
        document.querySelectorAll("#tabelaLogs tr").forEach(linha => {
            const texto = linha.textContent.toLowerCase();
            linha.style.display = texto.includes(filtro) ? "" : "none";
        });
    });
}