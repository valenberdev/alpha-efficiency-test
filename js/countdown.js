(() => {
  const fields = {
    days: document.querySelector('[data-countdown="days"]'),
    hours: document.querySelector('[data-countdown="hours"]'),
    minutes: document.querySelector('[data-countdown="minutes"]'),
    seconds: document.querySelector('[data-countdown="seconds"]'),
  };

  if (Object.values(fields).some((field) => !field)) return;

  const pad = (value) => String(value).padStart(2, "0");

  const nextMidnight = () => {
    const date = new Date();
    date.setHours(24, 0, 0, 0);
    return date.getTime();
  };

  let deadline = nextMidnight();

  const render = () => {
    let remaining = deadline - Date.now();

    if (remaining <= 0) {
      deadline = nextMidnight();
      remaining = deadline - Date.now();
    }

    const total = Math.floor(remaining / 1000);

    fields.days.textContent = pad(Math.floor(total / 86400));
    fields.hours.textContent = pad(Math.floor((total % 86400) / 3600));
    fields.minutes.textContent = pad(Math.floor((total % 3600) / 60));
    fields.seconds.textContent = pad(total % 60);
  };

  const tick = () => {
    render();
    setTimeout(tick, 1000 - (Date.now() % 1000));
  };

  document.addEventListener("visibilitychange", render);

  tick();
})();
