(function () {
  const fields = {
    days: document.querySelector('[data-countdown="days"]'),
    hours: document.querySelector('[data-countdown="hours"]'),
    minutes: document.querySelector('[data-countdown="minutes"]'),
    seconds: document.querySelector('[data-countdown="seconds"]'),
  };
  if (
    Object.values(fields).some(function (field) {
      return !field;
    })
  )
    return;

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  function nextMonday() {
    const now = new Date();
    const ahead = (8 - now.getDay()) % 7 || 7;
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + ahead,
    ).getTime();
  }

  let deadline = nextMonday();

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function render() {
    let remaining = deadline - Date.now();
    if (remaining <= 0) {
      deadline = nextMonday();
      remaining = deadline - Date.now();
    }
    fields.days.textContent = pad(Math.floor(remaining / DAY));
    fields.hours.textContent = pad(Math.floor((remaining % DAY) / HOUR));
    fields.minutes.textContent = pad(Math.floor((remaining % HOUR) / MINUTE));
    fields.seconds.textContent = pad(Math.floor((remaining % MINUTE) / SECOND));
  }

  function tick() {
    render();
    setTimeout(tick, SECOND - (Date.now() % SECOND));
  }

  document.addEventListener("visibilitychange", render);
  tick();
})();
