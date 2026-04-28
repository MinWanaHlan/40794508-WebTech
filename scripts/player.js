document.getElementById("startGame").addEventListener("click", () => {

    const name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name!");
        return;
    }

    // Save player
    localStorage.setItem("currentPlayer", name);

    // Go to difficulty page
    window.location.href = "difficulty.html";
});