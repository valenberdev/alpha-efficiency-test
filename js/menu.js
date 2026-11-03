(function () {
  const header = document.querySelector(".header");
  const burger = document.querySelector(".burger");
  if (!header || !burger) return;

  const desktop = window.matchMedia("(min-width: 1200px)");

  function isOpen() {
    return burger.getAttribute("aria-expanded") === "true";
  }

  function setOpen(open) {
    burger.setAttribute("aria-expanded", String(open));
  }

  burger.addEventListener("click", function () {
    setOpen(!isOpen());
  });

  header.querySelectorAll(".nav__link").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("click", function (event) {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !isOpen()) return;
    setOpen(false);
    burger.focus();
  });

  desktop.addEventListener("change", function (event) {
    if (event.matches) setOpen(false);
  });
})();
