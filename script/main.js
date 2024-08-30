// SELECTEUR POUR LES CARDS
let nbrEtudiants = document.getElementById("nbrEtudiants");
let sommeNotes = document.getElementById("SommeNotes");
let moyennePlusGrand = document.getElementById("MoyenPlusGrand");


// SELECTEUR POUR LA LISTE D'ETUDIAN
let tbody = document.querySelector(".tbody");
let btn = document.querySelector("#btn1");
let prenom = document.querySelector("#prenom");
let nom = document.querySelector("#nom");
let note = document.querySelector("#note");
let moyenne = document.querySelector("#moyenne");
let span = document.querySelector("pageInfo");
let btnCherche = document.querySelector("#recherche")


const etudiansLocal = JSON.parse(localStorage.getItem("liste"));

// VARIABLES
let etudians = [];

if (etudiansLocal === null) {
    etudians = [];
} else {
    etudians = etudiansLocal;
}

let first = 0;
let numberOfItems = 5;
let actuelPage = 1;
let maxPages = Math.ceil(etudians.length / numberOfItems);
let tabMoyenne = [];

// ECOUTEUR
btn.addEventListener("click", reccuperInfo);

btnCherche.addEventListener("click", (e) => {
    let input = document.querySelector("#inputFilter").value;
    let msg = document.querySelector("#Nontrouver")
    filterEtudiants(etudians, input,msg);
})

// Appel la fonction d'affichage
// AfficheEtudiants(etudians);
AfficheCard();
AfficheEtudiants(etudians);


/*--------------------
        FONCTIONS
-----------------------*/


// afficher les infos dans le card
function AfficheCard() {
    let sommeNote = 0;
    for (let i = 0; i < etudians.length; i++) {
        sommeNote += parseInt(etudians[i].note);
        tabMoyenne.push(parseInt(etudians[i].moyenne));
    }
    let max = Math.max(...tabMoyenne);

    sommeNotes.innerText = sommeNote;
    // moyennePlusGrand.innerText = max
    nbrEtudiants.innerText = etudians.length;

    if (max == "-Infinity") {
        moyennePlusGrand.innerText = 0;
    } else {
        moyennePlusGrand.innerText = max;
    }
}

// Fonction de récuperation et enregistrement des donné dans localStorage
function reccuperInfo(event) {
    event.preventDefault();
    let result = document.getElementById("result");

    if (prenom.value === "" || nom.value === "" || note.value === "" || moyenne.value === "") {
        result.innerText = "Remplissage des champs est obligatoire";
        result.classList.add("text-danger");
    } else {
        // Reccuperer les infos et l'enregistrer dans localStorage
        etudians.push({ prenom: prenom.value, nom: nom.value, note: note.value, moyenne: moyenne.value });
        localStorage.setItem("liste", JSON.stringify(etudians));
        prenom.value = "";
        nom.value = "";
        note.value = "";
        moyenne.value = "";

        AfficheEtudiants(etudians);
        showPageInfo();
    }
}

// Fonction pour controler le bouton next
function nextPage() {
    if (first + numberOfItems <= etudians.length) {
        first += numberOfItems;
        actuelPage++;
        AfficheEtudiants(etudians);
    }
}

// fonction pour controler le buton prev
function previous() {
    if (first - numberOfItems >= 0) {
        first -= numberOfItems;
        actuelPage--;
    }
    AfficheEtudiants(etudians);
}


// Function pour réccuperer et afficher les données de localStorage dans le tableau
function AfficheEtudiants(tab) {
    let tableList = '';
    for (let i = first; i < first + numberOfItems; i++) {
        let index = i;
        if (i < tab.length) {
            tableList += `
                    <tr>
                        <td>${tab[i].prenom}</td>
                        <td>${tab[i].nom}</td>
                        <td>${tab[i].note}</td>
                        <td>${tab[i].moyenne}</td>
                        <td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" onclick = "modifEtd(${index})"><i class="fa-solid fa-pen-to-square"></i></button></td>
                        <td><button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#detailModal" onclick = "detailEtd(${index})"><i class="fa-solid fa-eye"></i></button></td>
                        <td><button class="btn btn-danger" onclick="supEtd(${index})"><i class="fa-solid fa-trash-can"></i></button></td>
                    </tr>
                `
        }

    }

    tbody.innerHTML = tableList;
    maxPages = Math.ceil(etudians.length / numberOfItems);
    showPageInfo();
    AfficheCard();
}

// Fonction qui controle et affiche la page actuel
function showPageInfo() {
    document.getElementById('pageInfo').innerHTML = `
        page ${actuelPage} / ${maxPages}
    `
}

// Supprimer
function supEtd(index) {
    etudians.splice(index, 1);
    localStorage.setItem("liste", JSON.stringify(etudians));
    AfficheEtudiants(etudians);
}

// Detail d'un etudiant
function detailEtd(index) {
    document.querySelector("#prenomDetail").innerText = etudians[index].prenom;
    document.querySelector("#nomDetail").innerText = etudians[index].nom;
    document.querySelector("#noteDetail").innerText = etudians[index].note;
    document.querySelector("#moyenneDetail").innerText = etudians[index].moyenne;
}

// Modifier un etudiant
function modifEtd(indice) {
    let prenomEdit = document.querySelector("#prenomEdit");
    let nomEdit = document.querySelector("#nomEdit");
    let noteEdit = document.querySelector("#noteEdit");
    let moyenneEdit = document.querySelector("#moyenneEdit");


    prenomEdit.value = etudians[indice].prenom;
    nomEdit.value = etudians[indice].nom;
    noteEdit.value = etudians[indice].note;
    moyenneEdit.value = etudians[indice].moyenne;

    document.querySelector("#edit-btn").addEventListener("click", (e) => {
        etudians[indice].prenom = prenomEdit.value;
        etudians[indice].nom = nomEdit.value;
        etudians[indice].note = noteEdit.value;
        etudians[indice].moyenne = moyenneEdit.value;

        localStorage.setItem("liste", JSON.stringify(etudians));
        AfficheEtudiants(etudians);
    })
}

// ;


// fonction filter
function filterEtudiants(tableau,input,message) {
    let newTab = [];
    tableau.filter((element) => {
        if (element.prenom.toLowerCase() === input.toLowerCase()) {
            newTab.push(element);
        }
    })

    if (newTab.length === 0) {
        message.innerText = "Etudiant n'existe pas.";
        message.style.color = "red";
    } else {
        message.innerText = "Etudiant existe.";
        message.style.color = "green";
        AfficheEtudiants(newTab);
    }
}