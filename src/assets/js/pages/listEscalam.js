async function carregarEscalas() {
    const tbody = document.getElementById("tabelaEscalas");
    if (!tbody) return;

    tbody.innerHTML = `
        <tr>
            <td colspan="6" class="py-8 text-center text-gray-500">
                Carregando escalas...
            </td>
        </tr>
    `;

    try {
        const response = await fetch(`${API}/escala-pontuacao/all?page=0&size=50`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao carregar escalas.`);
        }

        const pagina = await response.json();
        const escalas = Array.isArray(pagina) ? pagina : (pagina.content || []);

        tbody.innerHTML = "";

        if (escalas.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="py-8 text-center text-gray-500">
                        Nenhuma escala cadastrada.
                    </td>
                </tr>
            `;
            return;
        }

        escalas.forEach((escala) => {
            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">
                    <td class="py-4 text-center">${escala.idEscala}</td>
                    <td class="py-4 text-center">${escala.codDisc ?? "-"}</td>
                    <td class="py-4 text-center">${escala.notaMB ?? "-"}</td>
                    <td class="py-4 text-center">${escala.notaB ?? "-"}</td>
                    <td class="py-4 text-center">${escala.notaR ?? "-"}</td>
                    <td class="py-4 text-center">
                        <button
                            class="text-blue-600 hover:text-blue-800 font-semibold"
                            onclick="window.location.href='editEscalam.html?id=${escala.idEscala}'">
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
                <td colspan="6" class="py-8 text-center text-red-600">
                    Não foi possível carregar as escalas.
                </td>
            </tr>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const sessao = JSON.parse(sessionStorage.getItem("sessaoBBEV"));
    const btnVoltar = document.getElementById("btnVoltar");

    if (!sessao) {
        window.location.href = "../loginProf.html";
        return;
    }

    if (btnVoltar) {
        const ehAdm = sessao.role === "adm";
        btnVoltar.onclick = () => {
            window.location.href = ehAdm ? "adminPages/painelAdmin.html" : "painelProfessor.html";
        };
    }

    carregarEscalas();
});