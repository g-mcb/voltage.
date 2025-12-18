import "/./config/custom.js";

/* -------------------------
   Page title setup
-------------------------- */
document.title = `${document.title} | ${sitename}`;

/* -------------------------
   Wait for DOM to load
-------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const gamesContainer = document.getElementById("gamesContainer");
  const searchInput = document.getElementById("searchInput");

  // If this page doesn't use games, exit cleanly
  if (!gamesContainer) return;

  let gamesData = [];

  /* -------------------------
     Render games
  -------------------------- */
  function renderGames(games) {
    gamesContainer.innerHTML = "";

    if (!games.length) {
      gamesContainer.innerHTML =
        "<p style='color:white;text-align:center;'>No games found.</p>";
      return;
    }

    games.forEach((game) => {
      // Basic path safety
      if (!/^[a-z0-9\-]+$/i.test(game.url)) return;

      const gameDiv = document.createElement("div");
      gameDiv.className = "game";

      const img = document.createElement("img");
      img.src = `/games/${game.url}/${game.image}`;
      img.alt = game.name;
      img.loading = "lazy";

      img.addEventListener("click", () => {
        window.location.href = `play.html?game=${game.url}`;
      });

      const name = document.createElement("p");
      name.textContent = game.name;

      gameDiv.appendChild(img);
      gameDiv.appendChild(name);
      gamesContainer.appendChild(gameDiv);
    });
  }

  /* -------------------------
     Search handling
  -------------------------- */
  function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = gamesData.filter((game) =>
      game.name.toLowerCase().includes(query)
    );

    renderGames(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }

  /* -------------------------
     Load games.json
  -------------------------- */
  fetch("/config/games.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load games.json");
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        throw new Error("games.json must be an array");
      }

      gamesData = data;
      renderGames(gamesData);
    })
    .catch((err) => {
      console.error(err);
      gamesContainer.innerHTML =
        "<p style='color:red;text-align:center;'>Failed to load games.</p>";
    });

  /* -------------------------
     Page text
  -------------------------- */
  const titleEl = document.getElementById("title");
  const subtitleEl = document.getElementById("subtitle");

  if (titleEl) titleEl.textContent = sitename;
  if (subtitleEl) subtitleEl.innerHTML = subtitleEl.innerHTML;
});
