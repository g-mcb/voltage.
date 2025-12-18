import "/./config/custom.js";

/* -------------------------
   Page title
-------------------------- */
document.title = `${document.title} | ${sitename}`;

document.addEventListener("DOMContentLoaded", () => {
  const gamesContainer = document.getElementById("gamesContainer");
  const searchInput = document.getElementById("searchInput");

  if (!gamesContainer) return;

  /* -------------------------
     Click handling (delegated)
  -------------------------- */
  gamesContainer.addEventListener("click", (e) => {
    const gameCard = e.target.closest(".game");
    if (!gameCard || !gamesContainer.contains(gameCard)) return;

    const url = gameCard.dataset.url;
    if (!url || !/^[a-z0-9\-]+$/i.test(url)) return;

    window.location.href = `play.html?game=${url}`;
  });

  /* -------------------------
     Search filter
  -------------------------- */
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();

      document.querySelectorAll(".game").forEach((game) => {
        const name = game.dataset.name.toLowerCase();
        game.hidden = !name.includes(query);
      });
    });
  }

  /* -------------------------
     Page text
  -------------------------- */
  const titleEl = document.getElementById("title");
  if (titleEl) titleEl.textContent = sitename;
});
