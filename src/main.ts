import "./style.css";
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

const btnEtape1 = document.getElementById("etape1") as HTMLButtonElement | null;
const btnEtape2 = document.getElementById("etape2") as HTMLButtonElement | null;
const btnEtape3 = document.getElementById("etape3") as HTMLButtonElement | null;
const btnEnvoyer = document.getElementById(
  "envoyer",
) as HTMLButtonElement | null;

const btnNavEtape1 = document.getElementById("navEtapes_etape0");
const btnNavEtape2 = document.getElementById("navEtapes_etape1");
const btnNavEtape3 = document.getElementById("navEtapes_etape2");
const btnNavEtape4 = document.getElementById("navEtapes_etape3");

let etape: number;
const sections = new Array();
sections.push(document.getElementById("section0"));
sections.push(document.getElementById("section1"));
sections.push(document.getElementById("section2"));
sections.push(document.getElementById("section3"));

//ÉLÉMENTS DU FORMULAIRE

//Type Radio
//0
const refVersement = document.getElementsByName("versement");
const refMontant = document.getElementsByName("montant");

//Type Number
//0
const refMontantPerso = document.getElementById("montantPerso");
//2
const refNumeroCarte = document.getElementById("numeroCarte");
const refCodeSecuriteCarte = document.getElementById("codeSecuriteCarte");

// Type Select
//2
const refMoisExpiration = document.getElementById("moisExpiration");
const refAnneeExpiration = document.getElementById("anneeExpiration");

//Type Text
//1
const refNom = document.getElementById("nom");
const refPrenom = document.getElementById("prenom");
const refEmail = document.getElementById("email");
const refTelephone = document.getElementById("telephone");
const refAdresse = document.getElementById("adresse");
const refVille = document.getElementById("ville");
const refProvince = document.getElementById("province");
const refCodePostal = document.getElementById("codePostal");

function initialiser(): void {
  etape = 0;
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

//ICI MODIFIER CODE DONNÉ, POUR VALIDER LES MONTANTS - RN VALIDE INFOS, pas ARGENT
//TESTER ET VALIDER
function validerEtape0() {
  console.log("Passé suivant, etape = " + etape);
  afficherEtape();

  const nomElement = document.getElementById("nom") as HTMLInputElement;
  const prenomElement = document.getElementById("prenom") as HTMLInputElement;
  const emailElement = document.getElementById("email") as HTMLInputElement;
  const telephoneElement = document.getElementById(
    "telephone",
  ) as HTMLInputElement;

  const nomValide = validerChamp(nomElement);
  const prenomValide = validerChamp(prenomElement);
  const emailValide = validerChamp(emailElement);
  const telephoneValide = validerChamp(telephoneElement);

  if (!nomValide || !prenomValide || !emailValide || !telephoneValide) {
    console.log("Attention, erreur");
  } else {
    etape++;
  }
}

function validerEtape1() {}

function validerEtape2() {}

function validerChamp(champ: HTMLInputElement): boolean {
  let valide = false;
  const id = champ.id; // email
  const idMessageErreur = "erreur-" + id; // erreur-email
  const erreurElement = document.getElementById(
    idMessageErreur,
  ) as HTMLDivElement;

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
