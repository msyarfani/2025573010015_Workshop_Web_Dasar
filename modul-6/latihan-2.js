const produk = [
  { id: 1, nama: "Laptop", harga: 7000000 },
  { id: 2, nama: "Mouse", harga: 150000 },
  { id: 3, nama: "Keyboard", harga: 300000 },
  { id: 4, nama: "Headset", harga: 500000 },
  { id: 5, nama: "Monitor", harga: 2000000 },
];

let keranjang = [];

const produkList = document.getElementById("produk-list");
const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const badge = document.getElementById("badge");

/* FORMAT RUPIAH */
function rupiah(angka) {
  return angka.toLocaleString("id-ID");
}

/* RENDER PRODUK */
function renderProduk() {
  produkList.innerHTML = produk
    .map(
      (p) => `
    <div class="card">
      <img src="https://picsum.photos/200?random=${p.id}">
      <div class="card-body">
        <h4>${p.nama}</h4>
        <p>Rp ${rupiah(p.harga)}</p>
        <button class="btn-add" data-id="${p.id}">Tambah</button>
      </div>
    </div>
  `,
    )
    .join("");
}

/* TAMBAH */
produkList.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  const item = keranjang.find((i) => i.id == id);
  if (item) item.qty++;
  else {
    const p = produk.find((p) => p.id == id);
    keranjang.push({ ...p, qty: 1 });
  }

  renderKeranjang();
});

/* RENDER KERANJANG */
function renderKeranjang() {
  cartItems.innerHTML = keranjang
    .map(
      (i) => `
    <div class="item">
      <strong>${i.nama}</strong><br>
      Rp ${rupiah(i.harga)} x ${i.qty}
      <div class="qty">
        <button data-action="minus" data-id="${i.id}">-</button>
        <button data-action="plus" data-id="${i.id}">+</button>
        <button data-action="hapus" data-id="${i.id}">🗑</button>
      </div>
    </div>
  `,
    )
    .join("");

  const total = keranjang.reduce((s, i) => s + i.harga * i.qty, 0);
  totalEl.textContent = rupiah(total);

  badge.textContent = keranjang.reduce((s, i) => s + i.qty, 0);
}

/* EVENT CART */
cartItems.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  const action = e.target.dataset.action;
  if (!id) return;

  const item = keranjang.find((i) => i.id == id);

  if (action === "plus") item.qty++;
  if (action === "minus") item.qty--;
  if (action === "hapus") keranjang = keranjang.filter((i) => i.id != id);

  keranjang = keranjang.filter((i) => i.qty > 0);
  renderKeranjang();
});

/* CHECKOUT MODAL */
const modal = document.getElementById("modal");
const ringkasan = document.getElementById("ringkasan");

document.getElementById("checkout").addEventListener("click", () => {
  if (keranjang.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  ringkasan.innerHTML = keranjang
    .map((i) => `<p>${i.nama} x${i.qty} = Rp ${rupiah(i.harga * i.qty)}</p>`)
    .join("");

  modal.style.display = "flex";
});

function tutupModal() {
  modal.style.display = "none";
}

renderProduk();
