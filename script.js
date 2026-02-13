/* =========================
   PAGES DATA & BASE LOGIC
========================= */
 const pages = [
 `
Happy Valentine & Happy Anniversary yang ke-4 tahun, Sayangku! 🤍

 Jujur aku bingung mau mulai dari mana, 
soalnya kalau soal perasaan ke kamu, 
rasanya jauh lebih gampang buat dirasain 
daripada harus dijelasin pake kata-kata.

`,

/*  `
Ada hal yang pengen banget kamu tau,
dan aku pengen kamu denger ini baik-baik.

Aku bener-bener bahagia banget
sama cara kamu sayangin aku,
cara kamu nge-treat aku,
dan gimana kamu selalu bikin aku ngerasa aman
cuma dengan jadi diri kamu sendiri.
`,

`
Wihhh cayanggg, kita udah 4 tahun aja ni! 
Gak berasa banget ya? Gitu ya kalo nemu orang yang tepat, 
4 tahun pun berasa bentar kalo dijalanin bareng hehe.

Aku bersyukur banget bisa dapetin kamu dan masih bertahan sampai detik ini.
Makasih ya sayang udah sabar banget sama aku selama ini.
`,

`
Aku suka banget gimana cara kamu perhatiin aku.
Gimana kamu selalu peduli, selalu nyariin aku, 
bahkan buat hal-hal kecil sekalipun.

Itu bikin aku ngerasa bener-bener dianggap,
bikin aku ngerasa dipilih,
dan bikin hati aku tenang banget kalau ada di deket kamu.
`,

`
Aku juga mau kamu tau satu hal:
Aku gak pernah ngerasa terbebani sedikitpun
sama apa pun yang kamu minta dari aku.

Selagi aku bisa, pasti bakal aku lakuin.
Dan kalaupun aku belum bisa, aku janji bakal usaha semaksimal mungkin buat kamu.
Karena kebahagiaan kamu itu segalanya buat aku.
`,

`
Ngeliat kamu senyum,
ngeliat kamu ngerasa disayang dan ngerasa aman,
itu udah lebih dari cukup buat bikin aku ikut bahagia juga.

Kamu gak perlu khawatir soal aku atau perasaan aku.
Bahagia aku itu ya adanya di kamu, Sayang.
`,

`
Aku pengen kamu ada di setiap cerita yang aku buat nanti,
sama kayak aku yang berharap bisa ada di setiap momen hidup kamu ke depannya.

Aku gak mau hubungan yang setengah-setengah.
Aku pilih kamu, sepenuhnya, tulus, 
dan gak bakal berubah.
`,

`
Jadi, aku tutup surat ini dengan kejujuran yang paling dalam.
Aku punya kamu, dan kamu punya aku.

Aku janji bakal sayangin kamu terus, 
sayang tanpa syarat, dan bakal selalu ada di samping kamu 
lewat badai apa pun yang datang nanti.

I LOVE YOU SO MUCH, My Love 🤍 
`   */
];

let currentPage = 0;
let isTyping = false;

const introText = document.getElementById("introText");
const readBtn = document.getElementById("readBtn");
const letterBox = document.getElementById("letterBox");
const typedText = document.getElementById("typedText");
const nextBtn = document.getElementById("nextBtn");
const pageEl = document.querySelector(".page");
const music = document.getElementById("bgMusic");
const finalScreen = document.getElementById("finalScreen");

const yesBtn = document.getElementById("yesBtn");
const promiseBtn = document.getElementById("promiseBtn");
const loveMessage = document.getElementById("loveMessage");
const promiseHint = document.getElementById("promiseHint");

/* =========================
   NEW: FLOATING HEARTS LOGIC
========================= */
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart-particle");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";
    heart.style.opacity = Math.random();
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}

/* =========================
   START LETTER (DENGAN EFEK BUKA)
========================= */
readBtn.addEventListener("click", () => {
  introText.style.opacity = 0;
  readBtn.style.display = "none";

  music.volume = 0.6;
  music.play();

  // Mulai hujan hati
  setInterval(createHeart, 300);

  setTimeout(() => {
    introText.style.display = "none";
    
    // Tampilkan box surat dulu
    letterBox.style.display = "block";
    
    // Beri jeda 50ms agar browser sempat merender display:block 
    // sebelum kita jalankan animasi transisinya
    setTimeout(() => {
        letterBox.classList.add("open"); // Memicu rotateX(0deg) di CSS
        showPage(0);
    }, 50);
  }, 600);
});

/* =========================
   SHOW PAGE
========================= */
function showPage(index) {
  isTyping = true;
  typedText.textContent = "";
  
  // Reset animasi halaman
  pageEl.style.animation = "none";
  void pageEl.offsetWidth;
  pageEl.style.animation = "openPage 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards";

  let i = 0;
  const text = pages[index];

  function typeWriter() {
    if (i < text.length) {
      typedText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 60);
    } else {
      isTyping = false;
    }
  }

  typeWriter();
}

/* =========================
   NEXT BUTTON
========================= */
nextBtn.addEventListener("click", () => {
  if (isTyping) return;

  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  } else {
    // Animasi penutup surat
    letterBox.classList.remove("open");
    
    setTimeout(() => {
      letterBox.style.display = "none";
      finalScreen.style.display = "flex";
    }, 1000);
  }
});

/* =========================
   GLASS PROMISE LOGIC
========================= */
let promiseActive = false;

if (promiseBtn) {
  promiseBtn.addEventListener("click", () => {
    promiseBtn.classList.toggle("active");
    promiseActive = promiseBtn.classList.contains("active");

    if (promiseActive) {
      promiseHint.style.opacity = 0;
    } else {
      promiseHint.style.opacity = 0.7;
    }

    checkYesButton();
  });
}

if (loveMessage) {
  loveMessage.addEventListener("input", () => {
    checkYesButton();
  });
}

function checkYesButton() {
  if (promiseActive && loveMessage.value.trim() !== "") {
    yesBtn.disabled = false;
  } else {
    yesBtn.disabled = true;
  }
}

/* =========================
   WHATSAPP REDIRECT
========================= */
yesBtn.addEventListener("click", () => {
  const userMessage = loveMessage.value.trim();

  if (!userMessage) {
    alert("Please write something first.");
    return;
  }

  const message = encodeURIComponent(
    "Yes.\n" +
    "I choose you, always. \n" +
    userMessage
  );

  const phoneNumber = "6282285871925";
  window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
});

/* =========================
   LOTTIE
========================= */
lottie.loadAnimation({
  container: document.getElementById("introAnimation"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "animation2.json"
});

/* =========================
   PHOTO STACK INTERACTION
========================= */
const stackPhotos = document.querySelectorAll(".photo-stack div");

stackPhotos.forEach(photo => {
  photo.addEventListener("mouseenter", () => {
    photo.classList.add("active-focus");
  });
  
  photo.addEventListener("mouseleave", () => {
    photo.classList.remove("active-focus");
  });

  photo.addEventListener("touchstart", (e) => {
    stackPhotos.forEach(p => p.classList.remove("active-focus"));
    photo.classList.add("active-focus");
  });
});

document.querySelectorAll('.photo-stack div').forEach(photo => {
  photo.addEventListener('touchstart', function() {
    this.style.zIndex = "100";
    this.style.transform = "scale(1.15) rotate(0deg)";
  });
  
  photo.addEventListener('touchend', function() {
    setTimeout(() => {
      this.style.zIndex = "";
      this.style.transform = "";
    }, 2000);
  });
});