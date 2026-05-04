document.addEventListener("DOMContentLoaded", function() {
  
  /* =======================
  AMBIL ELEMENT (SAFE)
  ======================= */
  const service = document.getElementById("service");
  const qty = document.getElementById("qty");
  const total = document.getElementById("total");
  const target = document.getElementById("target");
  
  const modal = document.getElementById("modal");
  const detail = document.getElementById("detail");
  const harga = document.getElementById("harga");
  const qrisImg = document.getElementById("qrisImg");
  
  const sendWA = document.getElementById("sendWA");
  const notif = document.getElementById("liveNotif");
  
  /* =======================
  DATA SERVICE
  ======================= */
  const data = {
    followers_ig: { name: "Instagram Followers", price: 25000 },
    views_tiktok: { name: "Instagram Views", price: 5000 },
    likes_ig: { name: "Instagram Likes", price: 6000 },
    followers_tt: { name: "TikTok Followers", price: 20000 },
    likes_tt: { name: "TikTok Likes", price: 7000 },
    views_tt: { name: "TikTok Views", price: 4000 },
    wa_channel: { name: "WhatsApp Channel Members", price: 41000 }
  };
  
  const QRIS = "https://i.ibb.co.com/7dwRjNR4/IMG-20260428-225830.jpg";
  
  /* =======================
  FORMAT RUPIAH
  ======================= */
  const rupiah = (n) => Number(n).toLocaleString("id-ID");
  
  /* =======================
  HITUNG HARGA
  ======================= */
  function updateHarga() {
    if (!service || !qty || !total) return;
    
    const key = service.value;
    const q = parseInt(qty.value);
    
    if (!data[key] || isNaN(q)) {
      total.innerText = "Rp 0";
      return;
    }
    
    const h = (q / 1000) * data[key].price;
    total.innerText = "Rp " + rupiah(Math.round(h));
  }
  
  /* EVENT */
  if (service) {
    service.addEventListener("change", () => {
      updateHarga();
      
      if (target) {
        target.placeholder = service.value === "wa_channel" ?
          "Masukkan link WhatsApp Channel" :
          "Contoh: @username";
      }
    });
  }
  
  if (qty) {
    qty.addEventListener("input", updateHarga);
  }
  
  /* =======================
  ORDER (AUTO QRIS)
  ======================= */
  const orderBtn = document.getElementById("orderBtn");
  
  if (orderBtn) {
    orderBtn.onclick = () => {
      
      const key = service?.value;
      const user = target?.value.trim();
      const q = parseInt(qty?.value);
      
      if (!user || user.length < 3) return alert("Username tidak valid");
      if (!q || q < 100) return alert("Minimal 100");
      
      const h = (q / 1000) * data[key].price;
      
      if (modal) modal.style.display = "flex";
      
      if (detail) {
        detail.innerText = `${data[key].name}
Target: ${user}
Jumlah: ${q}`;
      }
      
      if (harga) {
        harga.innerText = "Rp " + rupiah(Math.round(h)) + " (Scan QRIS)";
      }
      
      if (qrisImg) {
        qrisImg.src = QRIS;
        qrisImg.style.display = "block";
      }
    };
  }
  
  /* =======================
  WHATSAPP
  ======================= */
  if (sendWA) {
    sendWA.onclick = () => {
      const key = service?.value;
      
      const text = `ORDER BARU

Layanan: ${data[key].name}
Target: ${target?.value}
Jumlah: ${qty?.value}
Total: ${total?.innerText}
Metode: QRIS`;
      
      window.open("https://wa.me/6281271617785?text=" + encodeURIComponent(text));
    };
  }
  
  /* =======================
  CLOSE MODAL
  ======================= */
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }
  
  /* =======================
  COUNTER FIX (INI YANG ERROR DI KAMU)
  ======================= */
  setInterval(() => {
    const u = document.getElementById("userCount");
    const o = document.getElementById("orderCount");
    
    if (u && o) {
      u.innerText = parseInt(u.innerText) + Math.floor(Math.random() * 3);
      o.innerText = parseInt(o.innerText) + Math.floor(Math.random() * 5);
    }
  }, 4000);
  
  /* =======================
  STOCK FIX
  ======================= */
  setInterval(() => {
    const s = document.getElementById("stock");
    
    if (!s) return;
    
    let val = parseInt(s.innerText.replace(/,/g, ""));
    
    if (val > 1000) {
      val -= Math.floor(Math.random() * 50);
      s.innerText = val.toLocaleString("id-ID");
    }
  }, 5000);
  
  /* =======================
  GRAFIK FIX TOTAL
  ======================= */
  setTimeout(() => {
    
    const canvas = document.getElementById("growthChart");
    
    if (!canvas || typeof Chart === "undefined") return;
    
    const ctx = canvas.getContext("2d");
    
    let dataPoints = [120, 180, 260, 400, 550, 720, 900];
    
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
        datasets: [{
          data: dataPoints,
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
    
    /* AUTO GERAK */
    setInterval(() => {
      let last = dataPoints[dataPoints.length - 1];
      let next = last + Math.floor(Math.random() * 120);
      
      dataPoints.push(next);
      dataPoints.shift();
      
      chart.data.datasets[0].data = dataPoints;
      chart.update();
    }, 4000);
    
  }, 1000);
  
  /* =======================
  LOADER FIX
  ======================= */
  const t = document.getElementById("loadingText");
  
  if (t) {
    setTimeout(() => t.innerText = "Memuat Server...", 300);
    setTimeout(() => t.innerText = "Memuat Stock...", 900);
    setTimeout(() => t.innerText = "Silakan Order...", 1500);
  }
  
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 1800);
  
  /* =======================
  NOTIF
  ======================= */
  function showNotif() {
    if (!notif) return;
    
    const names = ["Rudi", "Andi", "Budi", "Sari", "Dewi"];
    const layanan = ["Followers IG", "Likes IG", "Views TikTok"];
    
    const text = `${names[Math.floor(Math.random()*names.length)]} baru saja order ${layanan[Math.floor(Math.random()*layanan.length)]}`;
    
    notif.innerText = text;
    notif.classList.add("show");
    
    setTimeout(() => notif.classList.remove("show"), 2000);
  }
  
  setInterval(showNotif, 6000);
  
});
