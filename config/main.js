document.addEventListener("DOMContentLoaded", () => {
  const gamesContainer = document.getElementById("gamesContainer");
  const searchInput = document.getElementById("searchInput");

  if (!gamesContainer) return;

  /* -------------------------
     Alphabetical sort (A–Z)
  -------------------------- */
  const games = Array.from(gamesContainer.querySelectorAll(".game"));

  games
    .sort((a, b) => {
      const nameA = a.dataset.name.toLowerCase();
      const nameB = b.dataset.name.toLowerCase();
      return nameA.localeCompare(nameB);
    })
    .forEach((game) => gamesContainer.appendChild(game));

  /* -------------------------
     Click handling (delegated)
  -------------------------- */
  gamesContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".game");
    if (!card) return;

    const url = card.dataset.url;
    if (!url) return;

    window.location.href = `play.html?game=${url}`;
  });

  /* -------------------------
     Search filter
  -------------------------- */
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();

      gamesContainer.querySelectorAll(".game").forEach((game) => {
        const name = game.dataset.name.toLowerCase();
        game.hidden = !name.includes(query);
      });
    });
  }

  /* -------------------------
     Page title
  -------------------------- */
  const titleEl = document.getElementById("title");
  if (titleEl) titleEl.textContent = "voltage.";
});
