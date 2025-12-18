import "/./config/custom.js";

var currentPageTitle = document.title;
document.title = `${currentPageTitle} | ${sitename}`;

let gamesData = [];

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = "";

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");
    gameImage.src = `/games/${game.url}/${game.image}`;
    gameImage.alt = game.name;

    gameImage.onclick = () => {
      window.location.href = `play.html?game=${game.url}`;
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

function handleSearchInput() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchValue)
  );

  displayFilteredGames(filteredGames);
}

fetch("/config/games.json")
  .then((res) => res.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data);
  })
  .catch((err) => console.error("Failed to load games.json", err));

document
  .getElementById("searchInput")
  .addEventListener("input", handleSearchInput);

document.getElementById("title").innerHTML = sitename;
document.getElementById("subtitle").innerHTML = subtext;
