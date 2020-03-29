let currentDay = 40;
let playInterval;
let lastDay;

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
  playButton.appendChild(icon);
};

const animationControl = () => {
  const mode = playButton.dataset['mode']
  if (mode === 'play') {
    stopAnimation();
  } else {
    playAnimation();
  }
}

function playAnimation(){
  if(currentDay == lastDay) {currentDay = 0;}
  changeButton('play');
  playButton.dataset['mode'] = 'play';
  playInterval = setInterval(
    function() {
      if(currentDay == lastDay) {
        stopAnimation();
      } else {
        increaseDay(1);
      }
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
  changeButton('pause');
  playButton.dataset['mode'] = 'pause';
}

function menuControl() {
  infobar.classList.toggle('toggled');
};

function keyAction(event) {
  let keyID = event.which;
  if (keyID == 32) {
    animationControl();
  } else if (keyID == 39) {
    increaseDay(1);
  } else if (keyID == 37) {
    decreaseDay(1);
  } else if (keyID == 27) {
    decreaseDay(currentDay);
  } else if (keyID == 73) {
    menuControl();
  }
}

window.onload = () => {
  playButton.addEventListener('click', animationControl);
  infobarButton.addEventListener('click', menuControl);
  nextButton.addEventListener('click', function(){increaseDay(1);});
  prevButton.addEventListener('click', function(){decreaseDay(1);});
  document.addEventListener('keydown', keyAction);
};

document.getElementById("slider").addEventListener('input', updateSlider, false);

function updateSlider(e) {
  currentDay = Number(document.getElementById("slider").value);
  updateDay();
}

function printDate() {
  var startDate = new Date("January 22, 2020");
  var currentDate = startDate;
  currentDate.setDate(currentDate.getDate()+currentDay);
  
  const dtf = new Intl.DateTimeFormat('en', { year: '2-digit', month: 'short', day: '2-digit' });
  const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(currentDate);
  return (`${da} ${mo} ${ye}`);
}

function newsOfCurrentDay() {
  let divText = "";
  for(let article of articleData['day_'+currentDay]) {
    divText += "<a target='_blank' href='"+article.url+"' class='boxText headline'>"+article.headline+"</a><br><hr>";
  }
  return divText;
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

