const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const giftBtn = document.querySelector(".gift-btn");
const giftOptions = document.getElementById("gift-options");
const chocolateBtn = document.getElementById("chocolate");
const flowersBtn = document.getElementById("flowers");
const iceCreamBtn = document.getElementById("ice-cream");
const teddyBtn = document.getElementById("teddy");

const chooseGiftText = document.getElementById("choose-gift-text");




// Versucht automatisch Musik zu starten
document.addEventListener("DOMContentLoaded", () => {
    music.volume = 0.5; // Leiser Start
    music.play();
});

// Play/Pause umschalten
musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        musicBtn.innerText = "⏸ Pause Music";
    } else {
        music.pause();
        musicBtn.innerText = "🎵 Play Music";
    }
});

// Setze Startposition des No-Buttons beim Laden
document.addEventListener("DOMContentLoaded", setInitialNoPosition);

// Funktion für eine sinnvolle Startposition des No-Buttons
function setInitialNoPosition() {
    const wrapper = document.querySelector(".wrapper");
    const yesBtnRect = yesBtn.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();

    let randomX;
    do {
        noBtn.style.top = `${yesBtnRect.top - wrapperRect.top}px`;
        randomX = Math.floor(Math.random() * (wrapperRect.width - noBtnRect.width));
    } while (Math.abs(randomX - yesBtnRect.left) < 80);

    noBtn.style.left = `${randomX}px`;
}

// Yes-Button: Liebesbotschaft & Herzanimation
yesBtn.addEventListener("click", () => {
    question.innerHTML = "OMG, DANKE! DU BIST DIE BESTE, LASS DICH DRÜCKEN!! ❤️";
    gif.src = "happy.gif";

    // No-Button ausblenden
    noBtn.style.display = "none";

    // Herzanimationen erstellen
    createHeart();
    
    // "Gift"-Button anzeigen
    giftBtn.style.display = "inline-block";  // Button anzeigen
});

// Wenn auf den "Gift"-Button geklickt wird, zeigen wir den Text und die Geschenk-Buttons
giftBtn.addEventListener("click", () => {
    chooseGiftText.style.display = "block";  // Text "Choose your gift" anzeigen
    giftOptions.style.display = "block";    // Geschenk-Buttons anzeigen
});

// No-Button bewegt sich zufällig + hinterlässt eine Spur
noBtn.addEventListener("mouseover", () => {
    createGhost(noBtn);

    const wrapper = document.querySelector(".wrapper");
    const wrapperRect = wrapper.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();

    const maxX = wrapperRect.width - noBtnRect.width;
    const maxY = wrapperRect.height - noBtnRect.height;

    let randomX, randomY;
    do {
        randomX = Math.min(Math.floor(Math.random() * maxX), maxX);
        randomY = Math.min(Math.floor(Math.random() * maxY), maxY);
    } while (
        Math.abs(randomX - noBtn.offsetLeft) < 50 || 
        Math.abs(randomY - noBtn.offsetTop) < 50
    );

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
});

// Funktion für den Ghost-Effekt (Spur)
function createGhost(button) {
    const ghost = document.createElement("div");
    ghost.classList.add("ghost");
    ghost.innerText = button.innerText;

    const rect = button.getBoundingClientRect();
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;

    document.body.appendChild(ghost);

    setTimeout(() => {
        ghost.style.opacity = "0";  // Langsam verschwinden lassen
        setTimeout(() => ghost.remove(), 300);
    }, 100);
}

// Funktion für Herzanimation mit breiterer Streuung
function createHeart() {
    const heart = document.createElement("div");
    heart.innerText = "❤️";
    heart.classList.add("heart");

    const startX = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;  
    heart.style.left = `${startX}px`;

    const startY = Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.25;
    heart.style.top = `${startY}px`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// "Gift"-Button klickt und zeigt Geschenk-Optionen
giftBtn.addEventListener("click", () => {
    // Geschenk-Optionen anzeigen
    giftOptions.style.display = "block"; 
});



// Animation für das Klick auf die Geschenke
function createGift(giftType) {
    const gift = document.createElement("div");
    gift.classList.add("gift");

    // Je nach Geschenktyp das Bild und die Animation setzen
    switch (giftType) {
        case "chocolate":
            gift.innerHTML = "🍫";
            break;
        case "flowers":
            gift.innerHTML = "💐";
            break;
        case "ice-cream":
            gift.innerHTML = "🍦";
            break;
        case "teddy":
            gift.innerHTML = "🧸";
            break;
    }

    // Platzierung des Geschenks zufällig
    gift.style.left = `${Math.random() * window.innerWidth}px`;
    gift.style.top = `${Math.random() * window.innerHeight}px`;

    document.body.appendChild(gift);

    // Animation für das Geschenk
    setTimeout(() => gift.remove(), 4000);  // Entfernt das Geschenk nach der Animation
}

// Geschenkauswahl-Buttons
chocolateBtn.addEventListener("click", () => createGift("chocolate"));
flowersBtn.addEventListener("click", () => createGift("flowers"));
iceCreamBtn.addEventListener("click", () => createGift("ice-cream"));
teddyBtn.addEventListener("click", () => createGift("teddy"));
