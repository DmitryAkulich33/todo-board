function startClock() {
  setInterval(() => {
    const now = new Date();
    const clock = document.querySelector('.clock');
    clock.innerHTML = now.toLocaleTimeString();
  }, 1000);
}

export default startClock;
