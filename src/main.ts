import "./style.css";
let etape: number;
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

//Références au HTML
const arrSections = new Array();
const arrBtnNav = new Array();
const arrBtnEtapes = new Array();

const nbrEtapes = 4;
for (let index = 0; index < nbrEtapes; index++) {
  arrSections.push(document.getElementById("section" + index));
  arrBtnNav.push(document.getElementById("navEtapes_etape" + index));
  arrBtnEtapes.push(
    document.getElementById("etape" + index) as HTMLButtonElement,
  );
}

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
  etape = 2;
  afficherEtape();
}

function afficherEtape(): void {
  for (let index = 0; index < arrSections.length; index++) {
    //Si la section correspond à l'étape visé, on affiche cette section
    if (arrSections[index]) {
      if (index == etape) {
        arrSections[index].classList.remove("sr-only");
        //Sinon, cacher les autres sections du formulaire
      } else {
        arrSections[index].classList.add("sr-only");
      }
    }
  }
}

function validerEtape(): void {
  switch (etape) {
    case 0:
      //Versement
      const versementValide = Array.from(refVersement).some(
        (element) => (element as HTMLInputElement).checked,
      );
      //Afficher msg erreur versement
      if (!versementValide && champErrVersement) {
        champErrVersement.innerText = messagesJSON.versement.vide;
      } else {
        champErrVersement.innerText = "";
      }

      //Montant
      const montantValide = Array.from(refMontant).some(
        (element) => (element as HTMLInputElement).checked,
      );
      //Afficher msg erreur montant
      if (!montantValide && champErrMontant) {
        champErrMontant.innerText = messagesJSON.montant.vide;
      } else {
        champErrMontant.innerText = "";
      }

      if (!versementValide || !montantValide) {
        console.log("Attention, erreur");
      } else {
        etape++;
        afficherEtape();
      }
      break;

    case 1:
      const nomValide = validerChamp(refNom);
      const prenomValide = validerChamp(refPrenom);
      const emailValide = validerChamp(refEmail);
      const telephoneValide = validerChamp(refTelephone);
      const adresseValide = validerChamp(refAdresse);
      const villeValide = validerChamp(refVille);
      const provinceValide = validerChamp(refProvince);
      const codePostalValide = validerChamp(refCodePostal);

      if (
        !nomValide ||
        !prenomValide ||
        !emailValide ||
        !telephoneValide ||
        !adresseValide ||
        !villeValide ||
        !provinceValide ||
        !codePostalValide
      ) {
        console.log("Attention, erreur");
      } else {
        etape++;
        afficherEtape();
      }
      break;

      case 2:
      const numeroCarteValide = validerChamp(refNumeroCarte);
      const moisExpirationValide = validerChamp(refMoisExpiration);
      const anneeExpirationValide = validerChamp(refAnneeExpiration);
      const codeSecuriteCarteValide = validerChamp(refCodeSecuriteCarte);

      if (
        !numeroCarteValide ||
        !moisExpirationValide ||
        !anneeExpirationValide ||
        !codeSecuriteCarteValide
      ) {
        console.log("Attention, erreur");
      } else {
        etape++;
        afficherEtape();
      }
      break;

    default:
      break;
  }
}

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
    erreurElement.innerText = "";
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

//addEVentListener des boutons
for (let index = 0; index < arrBtnNav.length; index++) {
  arrBtnNav[index].addEventListener("click", revenirEtapePrecedente);
  arrBtnEtapes[index].addEventListener("click", validerEtape);
}

obtenirMessages();
initialiser();
