import "/./config/custom.js";

/* -------------------------
   Page title
-------------------------- */
document.title = `${document.title} | ${sitename}`;

/* -------------------------
   DOM ready
-------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const games = document.querySelectorAll(".game");
  const searchInput = document.getElementById("searchInput");

  /* -------------------------
     Click to play
  -------------------------- */
  games.forEach((game) => {
    const url = game.dataset.url;

    game.addEventListener("click", () => {
      if (!/^[a-z0-9\-]+$/i.test(url)) return;
      window.location.href = `play.html?game=${url}`;
    });
  });

  /* -------------------------
     Search filter
  -------------------------- */
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();

      games.forEach((game) => {
        const name = game.dataset.name.toLowerCase();
        game.style.display = name.includes(query) ? "block" : "none";
      });
    });
  }

  /* -------------------------
     Page text
  -------------------------- */
  const titleEl = document.getElementById("title");
  if (titleEl) titleEl.textContent = sitename;
});
