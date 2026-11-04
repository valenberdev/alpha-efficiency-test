(function () {
  const list = document.querySelector(".faq__list");
  if (!list) return;

  function setOpen(item, open) {
    const button = item.querySelector(".faq__question");
    button.setAttribute("aria-expanded", String(open));
    item.classList.toggle("is-open", open);
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

  list.addEventListener("click", function (event) {
    const button = event.target.closest(".faq__question");
    if (!button) return;

    const item = button.closest(".faq__item");
    const willOpen = !item.classList.contains("is-open");

    if (!willOpen) {
      setOpen(item, false);
      return;
    }

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
  });
})();
