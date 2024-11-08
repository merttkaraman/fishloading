const akvaryum = document.getElementById("akvaryum");
const balikSayisi = 5;

document.addEventListener('DOMContentLoaded', () => {
    const ambientMusic = document.getElementById('ambientMusic');
    const musicButton = document.getElementById('musicButton');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeControl = document.querySelector('.volume-control'); 
    let musicPlaying = false;

    musicButton.addEventListener('click', () => {
        if (musicPlaying) {
            ambientMusic.pause();
            musicButton.src = "mute.png";
        } else {
            ambientMusic.play();
            musicButton.src = "sound.png";
        }
        musicPlaying = !musicPlaying;
        volumeControl.style.display = musicPlaying ? "flex" : "none"; 
    });

    volumeSlider.addEventListener('input', () => {
        ambientMusic.volume = volumeSlider.value; 
    });
});


for (let i = 0; i < balikSayisi; i++) {
  const balik = document.createElement("img");
  balik.src = "fish.png";
  balik.classList.add("balik");
  akvaryum.appendChild(balik);
  let x = Math.random() * (akvaryum.offsetWidth - balik.offsetWidth);
  let y = Math.random() * (akvaryum.offsetHeight - balik.offsetHeight);
  balik.style.left = x + "px";
  balik.style.top = y + "px";

  hareketEttir(balik, x, y);
}

function hareketEttir(balik, x, y) {
  let hedefX = Math.random() * (akvaryum.offsetWidth - balik.offsetWidth);
  let hedefY = Math.random() * (akvaryum.offsetHeight - balik.offsetHeight);

  let yonX = hedefX > x ? 1 : -1;
  let yonY = hedefY > y ? 1 : -1;
  let mesafeX = Math.abs(hedefX - x);
  let mesafeY = Math.abs(hedefY - y);

  let sure = Math.max(mesafeX, mesafeY) / 50; 

  let hedefAci = yonX > 0 ? 0 : 180; 

  let baslangicZamani = null;
  function animasyon(zaman) {
    if (baslangicZamani === null) baslangicZamani = zaman;
    let gecenSure = zaman - baslangicZamani;
    let ilerleme = Math.min(gecenSure / (sure * 1000), 1); 

    let yeniX = x + (hedefX - x) * ilerleme;
    let yeniY = y + (hedefY - y) * ilerleme;

    balik.style.left = yeniX + "px";
    balik.style.top = yeniY + "px";

    let yeniAci = hedefAci; 
    balik.style.transform = `rotateY(${yeniAci}deg)`; 

    if (ilerleme < 1) {
      requestAnimationFrame(animasyon);
    } else {
      setTimeout(() => {
        hareketEttir(balik, hedefX, hedefY);
      }, 2000);
    }
  }

  requestAnimationFrame(animasyon);
}

function baloncukCikart() {
  const baloncuk = document.createElement("img");
  baloncuk.src = "bubble.png";
  baloncuk.classList.add("baloncuk");
  akvaryum.appendChild(baloncuk);

  let boyut = Math.random() * 30 + 20;
  baloncuk.style.width = boyut + "px";
  baloncuk.style.height = "auto"; 

  let x = Math.random() * (akvaryum.offsetWidth - baloncuk.offsetWidth);
  let y = akvaryum.offsetHeight - baloncuk.offsetHeight + 50; 
  baloncuk.style.left = x + "px";
  baloncuk.style.top = y + "px";

  let hedefY = -baloncuk.offsetHeight; 
  let sure = (y - hedefY) / 100; 


  baloncuk.addEventListener("click", () => {
    let x = baloncuk.offsetLeft + baloncuk.offsetWidth / 2; 
    let y = baloncuk.offsetTop + baloncuk.offsetHeight / 2; 

    baloncuk.remove();

    let patlamaSesi = document.getElementById("patlamaSesi");
    patlamaSesi.currentTime = 0; 
    patlamaSesi.play(); 

    for (let i = 0; i < 10; i++) { 
      let kucukBaloncuk = document.createElement("img");
      kucukBaloncuk.src = "bubble.png";
      kucukBaloncuk.classList.add("baloncuk");
      akvaryum.appendChild(kucukBaloncuk);

      let boyut = Math.random() * 5 + 5; 
      kucukBaloncuk.style.width = boyut + "px";
      kucukBaloncuk.style.height = "auto";
      kucukBaloncuk.style.left = x + "px";
      kucukBaloncuk.style.top = y + "px";

      let aci = Math.random() * 360; 
      let mesafe = Math.random() * 100 + 50; 
      let hedefX = x + mesafe * Math.cos(aci * Math.PI / 180);
      let hedefY = y + mesafe * Math.sin(aci * Math.PI / 180);

      let sure = Math.random() * 1000 + 500;

      let baslangicZamani = null;
      function animasyon(zaman) {
        if (baslangicZamani === null) baslangicZamani = zaman;
        let gecenSure = zaman - baslangicZamani;
        let ilerleme = Math.min(gecenSure / sure, 1);

        let yeniX = x + (hedefX - x) * ilerleme;
        let yeniY = y + (hedefY - y) * ilerleme;

        kucukBaloncuk.style.left = yeniX + "px";
        kucukBaloncuk.style.top = yeniY + "px";

        if (ilerleme < 1) {
          requestAnimationFrame(animasyon);
        } else {
          kucukBaloncuk.remove();
        }
      }

      requestAnimationFrame(animasyon);
    }
  });


  let baslangicZamani = null;
  function animasyon(zaman) {
    if (baslangicZamani === null) baslangicZamani = zaman;
    let gecenSure = zaman - baslangicZamani;
    let ilerleme = Math.min(gecenSure / (sure * 1000), 1); 

    let yeniY = y + (hedefY - y) * ilerleme;

    baloncuk.style.top = yeniY + "px";

    if (ilerleme < 1) {
      requestAnimationFrame(animasyon);
    } else {
      baloncuk.remove();
    }
  }

  requestAnimationFrame(animasyon);
}

setInterval(() => {
  baloncukCikart();
}, Math.random() * 500 + 500);