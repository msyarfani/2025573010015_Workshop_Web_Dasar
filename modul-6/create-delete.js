const list = document.getElementById("list-tugas");
const inputTugas = document.getElementById("input-tugas");
const btnTambah = document.getElementById("btn-tambah");
const btnHapusSemua = document.getElementById("btn-hapus-semua");

function tambahTugas(teks) {
  const li = document.createElement("li");
  li.className = "item-tugas";

  const span = document.createElement("span");
  span.textContent = teks;

  const btnHapus = document.createElement("button");
  btnHapus.textContent = "✕";
  btnHapus.className = "btn-hapus";

  li.appendChild(span);
  li.appendChild(btnHapus);
  list.appendChild(li);
}

btnTambah.addEventListener("click", () => {
  const teks = inputTugas.value.trim();

  if (!teks) {
    inputTugas.classList.add("error");
    inputTugas.focus();
    setTimeout(() => inputTugas.classList.remove("error"), 1000);
    return;
  }

  tambahTugas(teks);

  inputTugas.value = "";
  inputTugas.focus();
});

inputTugas.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnTambah.click();
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-hapus")) {
    e.target.parentElement.remove();
  }
});

btnHapusSemua.addEventListener("click", () => {
  list.innerHTML = "";
});
