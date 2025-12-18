/* -------------------------
   Page title
-------------------------- */
document.title = document.title.replace("voltage.", "voltage.");

/* -------------------------
   DOM ready
-------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const gamesContainer = document.getElementById("gamesContainer");
  const searchInput = document.getElementById("searchInput");

  if (!gamesContainer) {
    console.error("gamesContainer not found");
    return;
  }

  /* -------------------------
     Click handling (delegated)
  -------------------------- */
  gamesContainer.addEventListener("click", (e) => {
    const game = e.target.closest(".game");
    if (!game) return;

    const url = game.dataset.url;
    if (!url) return;

    console.log("Launching game:", url);
    window.location.href = `play.html?game=${url}`;
  });

  /* -------------------------
     Search filter
  -------------------------- */
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();

      document.querySelectorAll(".game").forEach((game) => {
        const name = game.dataset.name.toLowerCase();
        game.hidden = !name.includes(query);
      });
    });
  }
});
