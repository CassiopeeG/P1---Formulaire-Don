import "./style.css";

const btnEtape1 = document.getElementById("etape1");
const btnEtape2 = document.getElementById("etape2");
const btnEtape3 = document.getElementById("etape3");
const btnEnvoyer = document.getElementById("envoyer");

const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");
const section3 = document.getElementById("section3");
const section4 = document.getElementById("section4");

function initialiser(): void {
  if (section2) {
    section2.classList.add("hidden");
  }
  if (section3) {
    section3.classList.add("hidden");
  }
  if (section4) {
    section4.classList.add("hidden");
  }
}

function passerEtape2(event: MouseEvent): void {
  console.log("fonction passerEtape2");

  if (section1) {
    section1.classList.add("hidden");
  }
  if (section2) {
    section2.classList.remove("hidden");
  }
  if (section3) {
    section3.classList.add("hidden");
  }
  if (section4) {
    section4.classList.add("hidden");
  }
}

function passerEtape3(event: MouseEvent): void {
  console.log("fonction passerEtape3");

  if (section1) {
    section1.classList.add("hidden");
  }
  if (section2) {
    section2.classList.add("hidden");
  }
  if (section3) {
    section3.classList.remove("hidden");
  }
  if (section4) {
    section4.classList.add("hidden");
  }
}

function passerEtape4(event: MouseEvent): void {
  console.log("fonction passerEtape4");

  if (section1) {
    section1.classList.add("hidden");
  }
  if (section2) {
    section2.classList.add("hidden");
  }
  if (section3) {
    section3.classList.add("hidden");
  }
  if (section4) {
    section4.classList.remove("hidden");
  }
}

function envoyer(event: MouseEvent): void {
  console.log("fonction envoyer");
}

if (btnEtape1) {
  btnEtape1.addEventListener("click", passerEtape2);
}

if (btnEtape2) {
  btnEtape2.addEventListener("click", passerEtape3);
}

if (btnEtape3) {
  btnEtape3.addEventListener("click", passerEtape4);
}

if (btnEnvoyer) {
  btnEnvoyer.addEventListener("click", envoyer);
}

initialiser();
