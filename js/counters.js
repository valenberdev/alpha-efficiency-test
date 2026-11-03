(function () {
  const items = document.querySelectorAll("[data-count-to]");
  if (!items.length) return;

  const DURATION = 900;
  const START_RATIO = 0.6;

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  )
    return;

  function format(value, grouped) {
    return grouped ? value.toLocaleString("en-US") : String(value);
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function startValue(el) {
    return Math.floor(Number(el.dataset.countTo) * START_RATIO);
  }

  function animate(el) {
    const target = Number(el.dataset.countTo);
    const from = startValue(el);
    const grouped = el.hasAttribute("data-count-grouped");
    let start = null;

    function frame(now) {
      if (start === null) start = now;
      const progress = Math.min((now - start) / DURATION, 1);
      el.textContent = format(
        Math.round(from + (target - from) * easeOutCubic(progress)),
        grouped,
      );
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  items.forEach(function (el) {
    el.textContent = format(
      startValue(el),
      el.hasAttribute("data-count-grouped"),
    );
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        animate(entry.target);
      });
    },
    { threshold: 0.6 },
  );

  items.forEach(function (el) {
    observer.observe(el);
  });
})();
