let currentDay = 40;
let playInterval;

window.onload = () => {
  const playButton = document.querySelector('#playButton');
  const infobar = document.querySelector('#infobar');
  const infobarButton = document.querySelector('#infobarButton');

  const changeButton = (type) => {
    playButton.innerHTML = "";
    const icon = document.createElement('i');
    if (type === 'play') {
      icon.setAttribute('class', 'fas fa-pause-circle');
    } else if (type === 'pause'){
      icon.setAttribute('class', 'fas fa-play-circle');
    }
    console.log(icon);
    playButton.appendChild(icon);
  };

  const playAnimation = () => {
    playInterval = setInterval(
      function() {
        currentDay = (currentDay + 1) % 66;
        updateDay();
      }, 100);
  }
  
  const stopAnimation = () => {
    clearInterval(playInterval);
  }

  const animationControl = () => {
    const mode = playButton.dataset['mode']
    if (mode === 'play') {
      stopAnimation();
      changeButton('play');
      playButton.dataset['mode'] = 'pause';
    } else {
      playAnimation();
      changeButton('pause');
      playButton.dataset['mode'] = 'play';
    }
  }

  const menuControl = () => {
    infobar.classList.toggle('toggled');
  };

  playButton.addEventListener('click', animationControl);
  infobarButton.addEventListener('click', menuControl);
};