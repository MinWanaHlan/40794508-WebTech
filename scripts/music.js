// Global background music system

// create music object if not exists
if (!window.globalMusic) {

    window.globalMusic = new Audio("sounds/backgroundsound.mp3");

    window.globalMusic.loop = true;

}

// detect page
const path = window.location.pathname;

const isGamePage = path.includes("index.html");
const isDifficultyPage = path.includes("difficulty.html");

// set volume
if (isGamePage) {

    // gameplay LOW volume
    window.globalMusic.volume = 0.1;

} else {

    // difficulty + intro NORMAL volume
    window.globalMusic.volume = 0.2;

}

// play music
window.globalMusic.play().catch(() => {
    console.log("Autoplay blocked until user interacts");
});


// ===== MUTE SYSTEM =====

const muteBtn = document.getElementById("muteBtn");

let isMuted = localStorage.getItem("musicMuted") === "true";

window.globalMusic.muted = isMuted;

updateIcon();

if (muteBtn) {

    muteBtn.addEventListener("click", () => {

        isMuted = !isMuted;

        window.globalMusic.muted = isMuted;

        localStorage.setItem("musicMuted", isMuted);

        updateIcon();

    });

}

function updateIcon() {

    if (!muteBtn) return;

    muteBtn.textContent = isMuted ? "🔇" : "🔊";

}