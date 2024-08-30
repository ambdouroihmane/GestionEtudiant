let butonInscription = document.querySelector("#inscription");
let nom = document.querySelector("#nom");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let result = document.querySelector("#result");

butonInscription.addEventListener('click', inscription);

// Variable
let users = [];

// Function d'inscription
function inscription() {
    if (nom.value === "" || email.value === "" || password.value === "") {
        result.innerText = "Remplissage des champs est obligatoire";
        result.classList.add("text-danger");
    } else {
        users = JSON.parse(localStorage.getItem("users"));
        if (users === null) {
            users = [];

            users.push({ nom: nom.value, email: email.value, password: password.value });
            localStorage.setItem("users", JSON.stringify(users));
            document.location.href = 'index.html';
        }else {
            users.push({ nom: nom.value, email: email.value, password: password.value });
            localStorage.setItem("users", JSON.stringify(users));
    
            document.location.href = 'index.html';
        }
    }
}