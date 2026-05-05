const display = document.getElementById("display");
const container = document.getElementById("container-tombol");

let angkaPertama = "";
let operator = "";
let menungguAngkaKedua = false;

// EVENT DELEGATION
container.addEventListener("click", (e) => {
  const tombol = e.target.closest("button");
  if (!tombol) return;

  const value = tombol.dataset.value;
  const op = tombol.dataset.op;
  const action = tombol.dataset.action;

  if (value !== undefined) inputAngka(value);
  if (op !== undefined) pilihOperator(op);
  if (action === "equals") hitung();
  if (action === "clear") reset();
});

// INPUT ANGKA
function inputAngka(angka) {
  if (angka === "." && display.value.includes(".")) return;

  if (menungguAngkaKedua) {
    display.value = angka;
    menungguAngkaKedua = false;
  } else {
    display.value = display.value === "0" ? angka : display.value + angka;
  }
}

// PILIH OPERATOR
function pilihOperator(op) {
  if (operator && menungguAngkaKedua) {
    operator = op;
    return;
  }
  angkaPertama = display.value;
  operator = op;
  menungguAngkaKedua = true;
}

// HITUNG
function hitung() {
  if (!angkaPertama || !operator) return;

  const angkaKedua = display.value;
  let hasil = 0;

  switch (operator) {
    case "+":
      hasil = +angkaPertama + +angkaKedua;
      break;
    case "-":
      hasil = angkaPertama - angkaKedua;
      break;
    case "*":
      hasil = angkaPertama * angkaKedua;
      break;
    case "/":
      if (angkaKedua == 0) {
        display.value = "Error";
        return;
      }
      hasil = angkaPertama / angkaKedua;
      break;
  }

  display.value = hasil;
  angkaPertama = "";
  operator = "";
  menungguAngkaKedua = true;
}

// RESET
function reset() {
  display.value = "0";
  angkaPertama = "";
  operator = "";
  menungguAngkaKedua = false;
}

// KEYBOARD SUPPORT
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) inputAngka(e.key);

  if (["+", "-", "*", "/"].includes(e.key)) {
    pilihOperator(e.key);
  }

  if (e.key === "Enter") hitung();
  if (e.key === "Escape") reset();
  if (e.key === ".") inputAngka(".");
});
