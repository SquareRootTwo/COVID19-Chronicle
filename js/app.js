let currentDay = 40;
let playInterval;
let lastDay = 66;

function playAnimation() {
  playInterval = setInterval(
    function() {
      currentDay = ((currentDay + 1) % 65)+1;
      updateDay();
    }, 100);
}

function stopAnimation() {
  clearInterval(playInterval);
}

window.onload = () => {
  const IINITIAL_WINDOW_SIZE = document.documentElement.clientWidth;
  const MOBILE_WINDOW_SIZE = 768;
  const infobar = document.querySelector('#infobar');
  const infobarButton = document.querySelector('#infobarButton');

  const menuControl = () => {
    infobar.classList.toggle('toggled');
  };

  infobarButton.addEventListener('click', menuControl);
};