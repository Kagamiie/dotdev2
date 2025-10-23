document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".navigation-link");
  const main = document.getElementById("content-area");

  async function loadPage(file) {
    try {
      const response = await fetch(file);
      const html = await response.text();

      const parsed = new DOMParser().parseFromString(html, "text/html");
      main.innerHTML = parsed.body.innerHTML;
    } catch {
      main.innerHTML = `<div class="error">Erreur lors du chargement de ${file}</div>`;
    }
  }

  function handleNavigation(link) {
    const file = link.dataset.page;
    loadPage(file);

    // Met à jour l’historique du navigateur
    const hash = file.replace(".html", "");
    history.pushState({ page: file }, "", `#${hash}`);
  }

  // --- Événements sur les liens ---
  links.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      handleNavigation(link);
    });
  });

  const initialFile = location.hash ? `${location.hash.substring(1)}.html` : "home.html";
  loadPage(initialFile);
});
