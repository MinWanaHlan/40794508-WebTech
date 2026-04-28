const startBtn = document.getElementById("startBtn");
const quitBtn = document.getElementById("quitBtn");

const quitModal = document.querySelector(".quit-modal");
const cancelQuit = document.getElementById("cancelQuit");
const confirmQuit = document.getElementById("confirmQuit");


// Start game
startBtn.addEventListener("click", () => {

    // Mark game as started
    sessionStorage.setItem("gameStarted", "true");

    // Go to game page
    window.location.href = "player.html";

});


// Show quit modal
quitBtn.addEventListener("click", () => {

    quitModal.classList.add("show");

});


// Cancel quit
cancelQuit.addEventListener("click", () => {

    quitModal.classList.remove("show");

});

// Confirm quit
confirmQuit.addEventListener("click", () => {

    // Clear session
    sessionStorage.removeItem("gameStarted");

    // Close or go blank
    window.location.href = "about:blank";

});