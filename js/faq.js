(function () {
  const list = document.querySelector(".faq__list");
  if (!list) return;

  const ANIMATION_MS = 320;

  function setOpen(item, open) {
    const button = item.querySelector(".faq__question");
    button.setAttribute("aria-expanded", String(open));
    item.classList.toggle("is-open", open);
  }

  function holdPosition(button) {
    const top = button.getBoundingClientRect().top;
    const start = performance.now();

    function frame(now) {
      const delta = button.getBoundingClientRect().top - top;
      if (delta) window.scrollBy({ top: delta, behavior: "instant" });
      if (now - start < ANIMATION_MS) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  list.addEventListener("click", function (event) {
    const button = event.target.closest(".faq__question");
    if (!button) return;

    const item = button.closest(".faq__item");
    const willOpen = !item.classList.contains("is-open");

    if (willOpen) {
      list.querySelectorAll(".faq__item.is-open").forEach(function (other) {
        setOpen(other, false);
      });
      holdPosition(button);
    }

    setOpen(item, willOpen);
  });
})();
