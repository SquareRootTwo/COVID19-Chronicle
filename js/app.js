let currentDay = 40;

function increaseDay() {
  setInterval(
    function() {
      currentDay = (currentDay + 1) % 66;
      updateDay();
    }, 100);
}

window.onload = () => {
  const playButton = document.querySelector('#playButton');
  const infobar = document.querySelector('#infobar');
  const infobarButton = document.querySelector('#infobarButton');

  const menuControl = () => {
    infobar.classList.toggle('toggled');
  };


  playButton.addEventListener('click', increaseDay); //pause button!!
  infobarButton.addEventListener('click', menuControl);
};