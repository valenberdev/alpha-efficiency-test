(function () {
  const MESSAGE = "Demo link: not connected yet.";
  const DURATION = 2800;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);

  let timer = null;

  function hide() {
    toast.classList.remove("toast--visible");
    timer = setTimeout(function () {
      toast.textContent = "";
    }, 300);
  }

  function show() {
    clearTimeout(timer);
    toast.textContent = MESSAGE;
    toast.classList.add("toast--visible");
    timer = setTimeout(hide, DURATION);
  }

  document.addEventListener("click", function (event) {
    const link = event.target.closest('a[href="#"]');
    if (!link) return;
    event.preventDefault();
    show();
  });
})();
