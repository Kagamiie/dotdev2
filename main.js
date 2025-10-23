document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".navigation-link");
  const main = document.getElementById("content-area");

  async function loadPage(file) {
    try { // https://sqlpey.com/javascript/top-4-methods-to-return-html-using-fetch-api/
      const response = await fetch(file);
      const html = await response.text();

      const parsed = new DOMParser().parseFromString(html, "text/html"); // go from a "normal" html string to a usable DOM object
      console.log(parsed)
      main.innerHTML = parsed.body.innerHTML;
    } catch {
      main.innerHTML = `<div class="error">Erreur lors du chargement de ${file}</div>`;
    }
  }

  links.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      loadPage(link.dataset.page); // link.dataset.page = file
    });
  });

  loadPage("home.html");
});
