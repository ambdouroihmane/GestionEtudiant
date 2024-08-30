let butonConnexion = document.querySelector("#btn-connexion");
let mail = document.querySelector("#email");
let password = document.querySelector("#password");
let repons = document.querySelector("#repons")


butonConnexion.addEventListener('click', connexion);
// Function de connexion
function connexion() {
    let users = JSON.parse(localStorage.getItem("users"));

    if (mail.value === "" || password.value === "") {
        repons.innerText = "Remplissage des champs est obligatoire";
        repons.classList.add("text-danger");
    } else {

        let verifie = false;
        users.forEach(element => {
            if (mail.value === element.email && password.value === element.password) {
                verifie = true;
            } 
        });

        if(verifie){
            document.location.href = "acceuil.html"
        }else{
            repons.innerText = "L'email où mot de passe incorrecte";
            repons.classList.add("text-danger");
        }
    }
}