import "./style.css";
obtenirMessages();

let etape: number = 0;

interface messageErreur {
  vide?: string;
  pattern?: string;
  type?: string;
}
interface erreursJSON {
  [fieldName: string]: messageErreur;
}
let messagesJSON: erreursJSON;

async function obtenirMessages(): Promise<void> {
  const reponse = await fetch("objJSONMessages.json");
  messagesJSON = await reponse.json();
}

const btnEtape1 = document.getElementById("etape1") as HTMLButtonElement;
const btnEtape2 = document.getElementById("etape2") as HTMLButtonElement;
const btnEtape3 = document.getElementById("etape3") as HTMLButtonElement;
const btnEnvoyer = document.getElementById("envoyer") as HTMLButtonElement;

const btnNavEtape1 = document.getElementById("navEtapes_etape0");
const btnNavEtape2 = document.getElementById("navEtapes_etape1");
const btnNavEtape3 = document.getElementById("navEtapes_etape2");
const btnNavEtape4 = document.getElementById("navEtapes_etape3");

const sections = new Array();
sections.push(document.getElementById("section0"));
sections.push(document.getElementById("section1"));
sections.push(document.getElementById("section2"));
sections.push(document.getElementById("section3"));

//ÉLÉMENTS DU FORMULAIRE
//Type Radio
const refVersement = document.getElementsByName("versement");
const refMontant = document.getElementsByName("montant");
const champErrVersement = document.getElementById("err_versement");
const champErrMontant = document.getElementById("err_montant");

//Type Number
const refMontantPerso = document.getElementById(
  "montantPerso",
) as HTMLInputElement;
const refNumeroCarte = document.getElementById(
  "numeroCarte",
) as HTMLInputElement;
const refCodeSecuriteCarte = document.getElementById(
  "codeSecuriteCarte",
) as HTMLInputElement;

// Type Select
const refMoisExpiration = document.getElementById(
  "moisExpiration",
) as HTMLInputElement;
const refAnneeExpiration = document.getElementById(
  "anneeExpiration",
) as HTMLInputElement;

//Type Text
const refNom = document.getElementById("nom") as HTMLInputElement;
const refPrenom = document.getElementById("prenom") as HTMLInputElement;
const refEmail = document.getElementById("email") as HTMLInputElement;
const refTelephone = document.getElementById("telephone") as HTMLInputElement;
const refAdresse = document.getElementById("adresse") as HTMLInputElement;
const refVille = document.getElementById("ville") as HTMLInputElement;
const refProvince = document.getElementById("province") as HTMLInputElement;
const refCodePostal = document.getElementById("codePostal") as HTMLInputElement;

function initialiser(): void {
  afficherEtape();
}

function afficherEtape(): void {
  for (let index = 0; index < sections.length; index++) {
    //Si la section correspond à l'étape visé, on affiche cette section
    if (sections[index]) {
      if (index == etape) {
        sections[index].classList.remove("sr-only");
        //Sinon, cacher les autres sections du formulaire
      } else {
        sections[index].classList.add("sr-only");
      }
    }
  }
}

function validerEtape0() {
  //Versement
  const versementValide = Array.from(refVersement).some(
    (element) => (element as HTMLInputElement).checked,
  );
  if (!versementValide && champErrVersement) {
    champErrVersement.innerText = messagesJSON.versement.vide;
  } else {
    champErrVersement.innerText = "";
  }

  //Montant
  const montantValide = Array.from(refMontant).some(
    (element) => (element as HTMLInputElement).checked,
  );
  if (!montantValide && champErrMontant) {
    console.log("hi");
    champErrMontant.innerText = messagesJSON.montant.vide;
  } else {
    console.log("hello");
    champErrMontant.innerText = "";
  }

  if (!versementValide || !montantValide) {
    console.log("Attention, erreur");
  } else {
    etape++;
    afficherEtape();
  }
}

function validerEtape1() {
  console.log("Dans validerEtape1, etape = " + etape);
  // afficherEtape();

  const nomValide = validerChamp(refNom);
  const prenomValide = validerChamp(refPrenom);
  const emailValide = validerChamp(refEmail);
  const telephoneValide = validerChamp(refTelephone);

  if (!nomValide || !prenomValide || !emailValide || !telephoneValide) {
    console.log("Attention, erreur");
  } else {
    etape++;
  }
}

function validerEtape2() {}

function validerChamp(champ: HTMLInputElement): boolean {
  let valide = false;
  console.log("Dans valider Champ");
  const id = champ.id; // email

  console.log("Champ testé = " + id);

  const idMessageErreur = "err_" + id; // erreur_email
  const erreurElement = document.getElementById(
    idMessageErreur,
  ) as HTMLSpanElement;

  console.log("valider champ", champ.validity);

  // Vérifie chaque type d'erreur de validation
  if (champ.validity.valueMissing && messagesJSON[id].vide) {
    console.log("erreur", id);

    valide = false;
    erreurElement.innerText = messagesJSON[id].vide;
  } else if (champ.validity.typeMismatch && messagesJSON[id].type) {
    // Type de données incorrect (email, url, tel, etc.)
    valide = false;
    erreurElement.innerText = messagesJSON[id].type;
  } else if (champ.validity.patternMismatch && messagesJSON[id].pattern) {
    // Ne correspond pas au pattern regex défini
    valide = false;
    erreurElement.innerText = messagesJSON[id].pattern;
  } else {
    // La validation n'a pas d'erreur, donc on assigne la variable vraie
    valide = true;
  }

  return valide;
}

function revenirEtapePrecedente(event: MouseEvent): void {
  const target = event.currentTarget as HTMLElement;
  const nbrEtapeVisee: number = parseInt(target.id.slice(15));

  if (nbrEtapeVisee <= etape) {
    etape = nbrEtapeVisee;
    afficherEtape();
  }
}

function envoyer(event: MouseEvent): void {
  console.log("fonction envoyer");
}

//addEventListener des boutons "suivant"
if (btnEtape1) {
  btnEtape1.addEventListener("click", validerEtape0);
}
if (btnEtape2) {
  btnEtape2.addEventListener("click", validerEtape1);
}
if (btnEtape3) {
  btnEtape3.addEventListener("click", validerEtape2);
  if (btnEnvoyer) {
    btnEnvoyer.addEventListener("click", envoyer);
  }
}

//addEVentListener des boutons de navigation d'étapes
if (btnNavEtape1) {
  btnNavEtape1.addEventListener("click", revenirEtapePrecedente);
}
if (btnNavEtape2) {
  btnNavEtape2.addEventListener("click", revenirEtapePrecedente);
}
if (btnNavEtape3) {
  btnNavEtape3.addEventListener("click", revenirEtapePrecedente);
}
if (btnNavEtape4) {
  btnNavEtape4.addEventListener("click", revenirEtapePrecedente);
}

initialiser();
