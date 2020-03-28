let currentDay = 40;
let playInterval;

function playAnimation() {
  playInterval = setInterval(
    function() {
      currentDay = (currentDay + 1) % 66;
      updateDay();
    }, 100);
}

function stopAnimation() {
  clearInterval(playInterval);
}

window.onload = () => {
  const playButton = document.querySelector('#playButton');
  const infobar = document.querySelector('#infobar');
  const infobarButton = document.querySelector('#infobarButton');

  const changeButton = (type) => {
    playButton.innerHTML = "";
    const icon = document.createElement('i');
    if (type == 'play') {
      icon.setAttribute('class', 'fas fa-pause-circle');
    } else {
      icon.setAttribute('class', 'fas fa-play-circle');
    }
    playButton.appendChild(icon);
  };

  const menuControl = () => {
    infobar.classList.toggle('toggled');
  };

  playButton.addEventListener('click', increaseDay); //pause button!!
  infobarButton.addEventListener('click', menuControl);
};