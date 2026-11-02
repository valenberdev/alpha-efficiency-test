(() => {
  const burger = document.querySelector(".burger");
  const nav = document.getElementById("primary-nav");
  const desktop = window.matchMedia("(min-width: 1200px)");

  if (!burger || !nav) return;

  const isOpen = () => burger.getAttribute("aria-expanded") === "true";

  const setOpen = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  burger.addEventListener("click", () => setOpen(!isOpen()));

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (isOpen() && !event.target.closest(".header")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      burger.focus();
    }
  });

  desktop.addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
})();
