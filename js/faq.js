(function () {
  const list = document.querySelector(".faq__list");
  if (!list) return;

  const mobile = window.matchMedia("(max-width: 767px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const TARGET_RATIO = 0.3;
  const LOW_RATIO = 0.5;
  const EDGE_GAP = 16;
  const ANCHOR_PAUSE_MS = 400;
  const root = document.documentElement;

  function setOpen(item, open) {
    const button = item.querySelector(".faq__question");
    button.setAttribute("aria-expanded", String(open));
    item.classList.toggle("is-open", open);
  }

  function pauseAnchoring() {
    root.classList.add("no-anchor");
    setTimeout(function () {
      root.classList.remove("no-anchor");
    }, ANCHOR_PAUSE_MS);
  }

  function releaseInstant(items) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        items.forEach(function (item) {
          item.classList.remove("is-instant");
        });
      });
    });
  }

  function bringIntoView(item, button) {
    if (!mobile.matches) return;

    const viewport = window.innerHeight;
    const rect = button.getBoundingClientRect();
    const answer = item.querySelector(".faq__panel-inner");
    const finalBottom = rect.top + button.offsetHeight + answer.scrollHeight;
    const isLow = rect.top > viewport * LOW_RATIO;
    const isCut = finalBottom > viewport - EDGE_GAP;
    if (!isLow && !isCut) return;

    const shift = rect.top - viewport * TARGET_RATIO;
    if (shift <= 0) return;

    window.scrollBy({
      top: shift,
      behavior: reducedMotion.matches ? "instant" : "smooth",
    });
  }

  list.addEventListener("click", function (event) {
    const button = event.target.closest(".faq__question");
    if (!button) return;

    const item = button.closest(".faq__item");
    const willOpen = !item.classList.contains("is-open");

    if (!willOpen) {
      setOpen(item, false);
      return;
    }

    pauseAnchoring();

    const top = button.getBoundingClientRect().top;
    const instant = [];

    list.querySelectorAll(".faq__item.is-open").forEach(function (other) {
      const isAbove = Boolean(
        other.compareDocumentPosition(item) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
      if (isAbove) {
        other.classList.add("is-instant");
        instant.push(other);
      }
      setOpen(other, false);
    });

    if (instant.length) {
      const delta = button.getBoundingClientRect().top - top;
      if (delta) window.scrollBy({ top: delta, behavior: "instant" });
      releaseInstant(instant);
    }

    setOpen(item, true);
    bringIntoView(item, button);
  });
})();
