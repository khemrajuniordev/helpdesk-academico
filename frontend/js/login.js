function logar(event) {
    event.preventDefault(); //  Impede que o formulário seja enviado sem validar os dados

    //  Pega os valores digitados nos campos de e-mail e senha
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    //  Validação dos campos e simulação de login
    if (email === "" || password === "") {
        //  Se algum dos campos estiver vazio, mostra alerta
        alert("Por favor, preencha todos os campos.");
    } else if (!validateEmail(email)) {
        //  Verifica se o e-mail está em um formato válido usando a função validateEmail
        alert("Por favor, insira um e-mail válido.");
    } else if (password.length < 6) {
        //  Se a senha tiver menos de 6 caracteres, mostra alerta
        alert("A senha deve ter pelo menos 6 caracteres.");
    } else if (password.length > 10) {
        //  Se a senha tiver mais de 10 caracteres, mostra alerta
        alert("A senha deve ter no máximo 10 caracteres.");
    } else if (email === "admin@gmail.com" && password === "admin123") {
        //  Se o e-mail e senha forem exatamente "admin@gmail.com" e "admin123"
        alert("Login bem-sucedido!"); // Mostra alerta de sucesso
        window.location.href = "index.html"; // Redireciona para a página principal
    } else {
        //  Se nenhuma condição acima for satisfeita, e-mail ou senha estão incorretos
        alert("E-mail e/ou senha incorretos.");
    }
}


//  Função que verifica se o e-mail está no formato correto
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    // Regex: verifica se tem algo antes do @, depois do @ e um domínio (ex: ".com")
    return re.test(email); // Retorna true se o e-mail estiver correto, false caso contrário
}