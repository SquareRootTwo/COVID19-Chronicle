let currentDay = 40;
let playInterval;
let lastDay;

function playAnimation(){
  playInterval = setInterval(
    function() {
      increaseDay(1);
    }, 100);
}

function increaseDay(step){
  if(currentDay < lastDay) {
    currentDay = currentDay + step;
    updateDay();
  }
}

function decreaseDay(step){
  if(currentDay > 0) {
    currentDay = (currentDay - step);
    updateDay();
  }
}

function stopAnimation() {
  clearInterval(playInterval);
}

window.onload = () => {
  const playButton = document.querySelector('#playButton');
  const nextDay = document.querySelector('#nextButton');
  const prevDay = document.querySelector('#prevButton');
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
  
  const animationControl = () => {
    const mode = playButton.dataset['mode']
    if (mode === 'play') {
      stopAnimation();
      changeButton('pause');
      playButton.dataset['mode'] = 'pause';
    } else {
      playAnimation();
      changeButton('play');
      playButton.dataset['mode'] = 'play';
    }
  }

  const menuControl = () => {
    infobar.classList.toggle('toggled');
  };

  playButton.addEventListener('click', animationControl);
  infobarButton.addEventListener('click', menuControl);
  nextButton.addEventListener('click', function(){increaseDay(1);});
  prevButton.addEventListener('click', function(){decreaseDay(1);});
};