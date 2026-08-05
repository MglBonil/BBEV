
async function loginAdmin(event) {
    event.preventDefault();

    

    const email = document.getElementById("emailAdmin").value
    const senha = document.getElementById("senhaAdmin").value


    

    let authRequest = {

        email: email,
        senha: senha
    };
    
    alert('');

    try {
        const response = await fetch(`${API}/auth/login/admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authRequest)
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(result?.message || `Erro ${response.status}, credenciais inválidas!`);
        }

        alert("Login realizado com sucesso!");
        window.location.href = "adminPages/painelAdmin.html";

    } catch (error) {
        console.error(error);

        if (error instanceof TypeError) {
            alert("Não foi possível conectar à API.");
            return;
        }

        alert(error.message || "Erro ao realizar login.");
    }
}

