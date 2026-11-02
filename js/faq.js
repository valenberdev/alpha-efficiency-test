(() => {
  const list = document.querySelector(".faq__list");

  if (!list) return;

  list.addEventListener("click", (event) => {
    const button = event.target.closest(".faq__question");

    if (!button) return;

    const item = button.closest(".faq__item");
    const open = button.getAttribute("aria-expanded") !== "true";

    button.setAttribute("aria-expanded", String(open));
    item.classList.toggle("is-open", open);
  });
})();
