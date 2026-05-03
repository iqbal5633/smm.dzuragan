const service = document.getElementById("service");
const qty = document.getElementById("qty");
const total = document.getElementById("total");
const target = document.getElementById("target");

const modal = document.getElementById("modal");
const detail = document.getElementById("detail");
const harga = document.getElementById("harga");

const btnDana = document.getElementById("btnDana");
const btnQris = document.getElementById("btnQris");

const paymentInfo = document.getElementById("paymentInfo");
const qrisImg = document.getElementById("qrisImg");

const sendWA = document.getElementById("sendWA");

const nomorWA = "6281271617785";

let metode = "DANA";

// DATA SERVICE
const data = {
  followers_ig: { name: "Instagram Followers", price: 10000 },
  views_tiktok: { name: "TikTok Views", price: 5000 },
  likes_ig: { name: "Instagram Likes", price: 6000 },
  followers_tt: { name: "TikTok Followers", price: 12000 },
  likes_tt: { name: "TikTok Likes", price: 7000 },
  views_tt: { name: "TikTok Views", price: 4000 }
};

// PAYMENT
const dana = {
  nomor: "088242668174",
  nama: "SALMA"
};

const qris = "https://i.ibb.co.com/7dwRjNR4/IMG-20260428-225830.jpg";

// FORMAT
const rupiah = n => isNaN(n) ? "0" : Number(n).toLocaleString("id-ID");

// HITUNG
function updateHarga() {
  const key = service.value;
  const q = parseInt(qty.value);
  
  if (!data[key] || isNaN(q) || q < 1) {
    total.innerText = "Rp 0";
    return;
  }
  
  const hasil = (q / 1000) * data[key].price;
  total.innerText = "Rp " + rupiah(Math.round(hasil));
}

service.addEventListener("change", updateHarga);
qty.addEventListener("input", updateHarga);

// ORDER
document.getElementById("orderBtn").addEventListener("click", () => {
  
  const key = service.value;
  const user = target.value.trim();
  const q = parseInt(qty.value);
  
  if (!data[key]) return alert("Service error");
  if (user.length < 3) return alert("Username tidak valid");
  if (isNaN(q) || q < 100) return alert("Minimal 100");
  
  const h = (q / 1000) * data[key].price;
  
  modal.style.display = "flex";
  
  detail.innerText =
    `${data[key].name}
Target: ${user}
Jumlah: ${q}`;
  
  harga.innerText = "Rp " + rupiah(Math.round(h));
  
  setPayment("DANA");
});

// SET PAYMENT
function setPayment(type) {
  
  metode = type;
  
  btnDana.classList.remove("active");
  btnQris.classList.remove("active");
  
  if (type === "DANA") {
    btnDana.classList.add("active");
    paymentInfo.innerHTML = `
DANA: ${dana.nomor}<br>
A/N: ${dana.nama}`;
    qrisImg.style.display = "none";
  }
  
  if (type === "QRIS") {
    btnQris.classList.add("active");
    paymentInfo.innerHTML = "";
    qrisImg.src = qris;
    qrisImg.style.display = "block";
  }
}

// BUTTON EVENT
btnDana.onclick = () => setPayment("DANA");
btnQris.onclick = () => setPayment("QRIS");

// CLOSE MODAL
modal.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// WA
sendWA.onclick = () => {
  
  const key = service.value;
  
  const text =
    `HALO ADMIN SAYA SUDAH MELAKUKAN PROSES PEMBAYARAN SILAHKAN TINDAK LANJUTI 

Layanan: ${data[key].name}
Target: ${target.value}
Jumlah: ${qty.value}
Total: ${total.innerText}
Metode: ${metode}

DANA: ${dana.nomor}
A/N: ${dana.nama}`;
  
  window.open("https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(text));
};

updateHarga();


// LOAD SAAT WEBSITE DIBUKA
document.addEventListener("DOMContentLoaded", loadTestimoni);

function addTestimoni() {
  const input = document.getElementById("uploadTesti");
  const file = input.files[0];

  if (!file) {
    alert("Pilih foto dulu!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    let data = JSON.parse(localStorage.getItem("testimoniData")) || [];

    data.push(e.target.result);

    localStorage.setItem("testimoniData", JSON.stringify(data));

    renderTestimoni();
  };

  reader.readAsDataURL(file);
}

function loadTestimoni() {
  renderTestimoni();
}

function renderTestimoni() {
  const grid = document.getElementById("testiGrid");
  let data = JSON.parse(localStorage.getItem("testimoniData")) || [];

  grid.innerHTML = "";

  data.forEach(img => {
    const card = document.createElement("div");
    card.className = "testi-card";

    card.innerHTML = `
      <img src="${img}" alt="testimoni">
    `;

    grid.appendChild(card);
  });
}
