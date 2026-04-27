
const buttons = document.querySelectorAll(".difficulty-buttons button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const level = button.dataset.level;

        sessionStorage.setItem("difficulty", level);
        sessionStorage.setItem("gameStarted", "true");

        window.location.href = "index.html";

    });

});


document.getElementById("backBtn").addEventListener("click", () => {

    window.location.href = "intro.html";

});

document.getElementById("easyBtn").onclick = () => {
    sessionStorage.setItem("difficulty", "easy");
    sessionStorage.setItem("gameStarted", "true");
    window.location.href = "index.html";
};

document.getElementById("mediumBtn").onclick = () => {
    sessionStorage.setItem("difficulty", "medium");
    sessionStorage.setItem("gameStarted", "true");
    window.location.href = "index.html";
};

document.getElementById("hardBtn").onclick = () => {
    sessionStorage.setItem("difficulty", "hard");
    sessionStorage.setItem("gameStarted", "true");
    window.location.href = "index.html";
};