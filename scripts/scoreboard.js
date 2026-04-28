// localStorage.removeItem("scores");
const table = document.getElementById("scoreTable");

let scores = JSON.parse(localStorage.getItem("scores")) || [];

const currentPlayer = localStorage.getItem("currentPlayer");

// Show top 10
scores.slice(0, 10).forEach((player, index) => {

    let highlight = player.name === currentPlayer
        ? "style='color:red;font-weight:bold;'"
        : "";

    table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td ${highlight}>${player.name}</td>
            <td>${player.score}</td>
        </tr>
    `;
});

function playAgain() {
    window.location.href = "player.html";
}

