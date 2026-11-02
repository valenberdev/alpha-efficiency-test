(() => {
  const list = document.querySelector(".faq__list");

  if (!list) return;

  const setOpen = (item, open) => {
    const button = item.querySelector(".faq__question");

    button.setAttribute("aria-expanded", String(open));
    item.classList.toggle("is-open", open);
  };

  list.addEventListener("click", (event) => {
    const button = event.target.closest(".faq__question");

    if (!button) return;

    const item = button.closest(".faq__item");
    const open = button.getAttribute("aria-expanded") !== "true";

    list.querySelectorAll(".faq__item.is-open").forEach((other) => {
      if (other !== item) setOpen(other, false);
    });

    setOpen(item, open);
  });
})();
