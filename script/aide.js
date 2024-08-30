let etudiants = JSON.parse(localStorage.getItem("etudiants")) || [
    {
      nom: "Baldé",
      prenom: "Khadijatou",
      note: 12,
      age: 30,
    },
  
    {
      nom: "Baldé",
      prenom: "Abdou aziz",
      note: 18,
      age: 28,
    },
  
    {
      nom: "Baldé",
      prenom: "Zeynab",
      note: 18,
      age: 28,
    },
  
    {
      nom: "Baldé",
      prenom: "assia",
      note: 18,
      age: 28,
    },
  
    {
      nom: "Baldé",
      prenom: "souaibou",
      note: 18,
      age: 28,
    },
  
    {
      nom: "Baldé",
      prenom: "Halimatou",
      note: 18,
      age: 28,
    },
  
    {
      nom: "Baldé",
      prenom: "oumou",
      note: 18,
      age: 28,
    },
  
    {
      nom: "Baldé",
      prenom: "asma",
      note: 18,
      age: 28,
    },
  
    {
      nom: "Baldé",
      prenom: "soumaya",
      note: 18,
      age: 28,
    },
    {
      nom: "Baldé",
      prenom: "Hafsa",
      note: 18,
      age: 28,
    },
    {
      nom: "Baldé",
      prenom: "Hafsa",
      note: 18,
      age: 28,
    },
    {
      nom: "Baldé",
      prenom: "Hafsa",
      note: 18,
      age: 28,
    },
  ];
  
  
  const nbreEtudiantParPage = 5;
  let currentPage = 1;
  //Fonction pour afficher les etudiants
  function showetudiants(EtudiantAffiche) {
    const tbody = document.getElementById("Tbody");
    tbody.innerHTML = "";
    const start = (currentPage - 1) * nbreEtudiantParPage;
    const end = start + nbreEtudiantParPage;
    const pageEtudiants = EtudiantAffiche.slice(start, end);
    pageEtudiants.map((etudiant, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${etudiant.nom}</td>
      <td>${etudiant.prenom}</td> 
      <td>${etudiant.note}</td> 
      <td>${etudiant.age}</td>
      <td>
          <button  class="btn btn-outline-danger" onclick="deleteEtudiant(${
            index + start
          })"><i class="fa-solid fa-trash-can" style="color: #f4101c;"></i></button>
          <button class="btn btn-outline-warning" onclick="updateEtudiant(${
            index + start
          })"><i class="fas fa-edit" style="color: #FFD43B;"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    pagination(EtudiantAffiche.length);
  }
  
  function deleteEtudiant(index) {
    etudiants.splice(index, 1);
    localStorage.setItem("etudiants", JSON.stringify(etudiants));
    filtreEtudiants();
  }
  
  function updateEtudiant(index) {
    const etudiant = etudiants[index];
    document.querySelector("#nom").value = etudiant.nom;
    document.querySelector("#prenom").value = etudiant.prenom;
    document.querySelector("#age").value = etudiant.age;
    document.querySelector("#note").value = etudiant.note;
  
    // Mettre à jour l'étudiant existant au lieu d'ajouter un nouveau
  
      $(modals).modal("show");
   
    submitBtn.addEventListener("click", function updateHandler(e) {
      e.preventDefault();
  
      etudiants[index] = {
        nom: document.querySelector("#nom").value,
        prenom: document.querySelector("#prenom").value,
        age: document.querySelector("#age").value,
        note: document.querySelector("#note").value,
      };
      localStorage.setItem("etudiants", JSON.stringify(etudiants));
      submitBtn.removeEventListener("click", updateHandler); // Remove the handler after updating
      filtreEtudiants();
      form.reset();
    });
  }
  
  // showetudiants(etudiants);
  function Moyenn() {
    let Total = 0;
    for (const etudiant of etudiants) {
      Total += etudiant.note;
    }
    return Total / etudiants.length;
  }
  // document.getElementById('Moyen').innerText=Moyenn();
  
  function pagination(totalItems) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    const pageTotal = Math.ceil(totalItems / nbreEtudiantParPage);
    for (let i = 1; i <= pageTotal; i++) {
      const btn = document.createElement("button"); //creation du lien
      btn.className = "btn btn-secondary me-2"; //Lui ajouter une classe
      btn.innerText = i;
      btn.addEventListener("click", () => {
        currentPage = i;
        filtreEtudiants();
      });
      pagination.appendChild(btn);
    }
  }
  
  function filtreEtudiants() {
    const searchInput = document
      .getElementById("inputRecherche")
      .value.toLowerCase();
    const EtudiantFiltres = etudiants.filter(
      (etudiant) =>
        etudiant.nom.toLowerCase().includes(searchInput) ||
        etudiant.prenom.toLowerCase().includes(searchInput)
    );
    showetudiants(EtudiantFiltres);
    // pagination(EtudiantFiltres);
    document.getElementById("Moyen").innerText = Math.round(Moyenn());
    // pop();
  }
  document.getElementById("inputRecherche").addEventListener("input", () => {
    currentPage = 1; //Réinitialiser la première page lors d'une nouvelle recherch
    filtreEtudiants();
  });
  
  // La somme Total des notes
  // function sommeTotalnote() {
  //   let somme = 0;
  //   for (let i = 0; i < etudiants.length; i++) {
  //     somme +=etudiants[i].note;
  //   }
  //   return somme;
  // }
  function sommeTotalnote() {
    let TotalNOTE = 0;
    for (const chaknote of etudiants) {
      TotalNOTE += chaknote.note;
    }
    return TotalNOTE;
  }
  document.querySelector(
    ".card-title"
  ).innerHTML = `La somme Total des notes est: ${sommeTotalnote()}`;
  
  // La somme Total des ages
  function sommeTotalAge() {
    let sommeage = 0;
    for (let i = 0; i < etudiants.length; i++) {
      sommeage += etudiants[i].age;
    }
    return sommeage;
  }
  
  document.querySelector(
    "#card1"
  ).innerHTML = `La somme Total des ages est: ${sommeTotalAge()}`;
  // calculer le nombre  de Note des etudiants dans ce tableau
  function nbrNote(etudiants) {
    let nbrNote = etudiants.length;
    return nbrNote;
  }
  // console.log("Le nombre de notes des étudiants est : " + nbrNote(etudiants));
  document.querySelector(
    "#card2"
  ).innerHTML = `Le nombre de notes des étudiants est :  ${nbrNote(etudiants)}`;
  
  // nombre  d'age
  function nbrAge(etudiants) {
    let nbrNote = etudiants.length;
    return nbrNote;
  }
  document.querySelector(
    "#card3"
  ).innerHTML = `Le nombre d'age des étudiants est :  ${nbrAge(etudiants)}`;
  
  // document.querySelector('.btn').addEventListener('click',function () {
  //   let card = document.querySelector("modal");
  //     card.style.display="block";
  // })
  
  const modals = document.getElementById("exampleModal");
  document.querySelector(".ajout").addEventListener("click", function () {
    $(modals).modal("show");
  });
  
  const form = document.querySelector("form");
  // Empêche l'envoie du formulaire par défaut
  form.addEventListener("submit", (e) => e.preventDefault());
  
  const submitBtn = document.querySelector("#submit");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // LocaleStorage
    const nomInput = document.querySelector("#nom").value;
    const prénomInput = document.querySelector("#prenom").value;
    const ageInput = document.querySelector("#age").value;
    const noteInput = document.querySelector("#note").value;
  
    const newEtudiant = {
      nom: nomInput,
      prenom: prénomInput,
      age: ageInput,
      note: noteInput,
    };
  
    etudiants.push(newEtudiant);
    localStorage.setItem("etudiants", JSON.stringify(etudiants));
    document.querySelector("#submit").reset();
    filtreEtudiants();
  });
  
  filtreEtudiants();


  // Ma fonction affiche
  function AfficheEtudiants() {
    let tableList = '';
    for (let i = first; i < first + numberOfItems; i++) {
        let index = i;
        if (i < etudians.length) {
            tableList += `
                    <tr>
                        <td>${etudians[i].prenom}</td>
                        <td>${etudians[i].nom}</td>
                        <td>${etudians[i].note}</td>
                        <td>${etudians[i].moyenne}</td>
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


// Fonction filtre
// Fonction pour filtrer les étudiants
function filter() {
  const filterValue = rechercher.value.toLowerCase();
  const rows = tab.querySelectorAll('tr');

  rows.forEach(row => {
    const firstName = row.cells[0].textContent.toLowerCase();
    if (firstName.includes(filterValue)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

rechercher.addEventListener('input', filter);