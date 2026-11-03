(function () {
  const header = document.querySelector(".header");
  if (!header) return;

  const THRESHOLD = 8;
  let ticking = false;

  function update() {
    header.classList.toggle("header--scrolled", window.scrollY > THRESHOLD);
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
})();
