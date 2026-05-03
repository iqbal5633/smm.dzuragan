/* =======================
   ELEMENT
======================= */
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

const notif = document.querySelector(".live-notif");

let metode = "DANA";

/* =======================
   DATA SERVICE
======================= */
const data = {
  followers_ig: { name: "Instagram Followers", price: 10000 },
  views_tiktok: { name: "TikTok Views", price: 5000 },
  likes_ig: { name: "Instagram Likes", price: 6000 },
  followers_tt: { name: "TikTok Followers", price: 12000 },
  likes_tt: { name: "TikTok Likes", price: 7000 },
  views_tt: { name: "TikTok Views", price: 4000 }
};

const dana = {
  nomor: "088242668174",
  nama: "SALMA"
};

const qris = "https://i.ibb.co.com/7dwRjNR4/IMG-20260428-225830.jpg";

/* =======================
   FORMAT RUPIAH
======================= */
const rupiah = n => Number(n).toLocaleString("id-ID");

/* =======================
   HITUNG HARGA
======================= */
function updateHarga() {
  const key = service.value;
  const q = parseInt(qty.value);
  
  if (!data[key] || isNaN(q)) {
    total.innerText = "Rp 0";
    return;
  }
  
  const h = (q / 1000) * data[key].price;
  total.innerText = "Rp " + rupiah(Math.round(h));
}

service.onchange = updateHarga;
qty.oninput = updateHarga;

/* =======================
   ORDER CLICK
======================= */
document.getElementById("orderBtn").onclick = () => {
  const key = service.value;
  const user = target.value.trim();
  const q = parseInt(qty.value);
  
  if (user.length < 3) return alert("Username tidak valid");
  if (q < 100) return alert("Minimal 100");
  
  const h = (q / 1000) * data[key].price;
  
  modal.style.display = "flex";
  
  detail.innerText = `
${data[key].name}
Target: ${user}
Jumlah: ${q}
`;
  
  harga.innerText = "Rp " + rupiah(Math.round(h));
  
  setPayment("DANA");
};

/* =======================
   PAYMENT
======================= */
function setPayment(type) {
  metode = type;
  
  btnDana.classList.remove("active");
  btnQris.classList.remove("active");
  
  if (type === "DANA") {
    btnDana.classList.add("active");
    paymentInfo.innerHTML = `
DANA: ${dana.nomor}
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

btnDana.onclick = () => setPayment("DANA");
btnQris.onclick = () => setPayment("QRIS");

/* =======================
   CLOSE MODAL
======================= */
modal.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

/* =======================
   WHATSAPP
======================= */
sendWA.onclick = () => {
  const key = service.value;
  
  const text = `ORDER BARU

Layanan: ${data[key].name}
Target: ${target.value}
Jumlah: ${qty.value}
Total: ${total.innerText}
Metode: ${metode}`;
  
  window.open("https://wa.me/6281271617785?text=" + encodeURIComponent(text));
};

updateHarga();

/* =======================
   LOADER (3 STEP CEPAT)
======================= */
window.onload = () => {
  const t = document.getElementById("loadingText");
  
  setTimeout(() => t.innerText = "Loading...", 300);
  setTimeout(() => t.innerText = "Proses...", 800);
  setTimeout(() => t.innerText = "Memuat Stock...", 1200);
  setTimeout(() => document.body.classList.add("loaded"), 1500);
};

/* =======================
   FAKE LIVE ORDER (FORMAT BARU)
   NOMOR → ORDER → HARGA
======================= */

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber() {
  let num = "08";
  for (let i = 0; i < 10; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

const layanan = ["Followers IG", "Likes IG", "Views TikTok"];
const jumlah = [100, 250, 500, 1000, 2000, 5000, 200000 ,4839];
const hargaFake = [5000, 10000, 15000, 20000, 30000, 50000, 200000 ,2000];

function showNotif() {
  const phone = randomNumber();
  const order = random(layanan);
  const qtyFake = random(jumlah);
  const price = random(hargaFake);
  
  notif.innerText = `${phone} → ${order} ${qtyFake} → Rp ${price.toLocaleString("id-ID")}`;
  
  notif.classList.add("show");
  
  setTimeout(() => {
    notif.classList.remove("show");
  }, 2200);
}

/* lebih natural & tidak spam */
setInterval(showNotif, 4000);
setTimeout(showNotif, 1200);
