let currentDay = 40;
let playInterval;
let lastDay;

const playButton = document.querySelector('#playButton');
const nextDay = document.querySelector('#nextButton');
const prevDay = document.querySelector('#prevButton');
const newsfeed = document.querySelector('#newsfeedId');
const newsfeedButton = document.querySelector('#newsfeedButton');
const settingsButton = document.querySelector('#settingsButton');
const infoButton = document.querySelector('#infoButton');
const settingsMenuContent = document.querySelector('#settingsMenuId');
const infoMenuContent = document.querySelector('#infoMenuId');

const changeButton = (type) => {
  playButton.innerHTML = "";
  const icon = document.createElement('i');
  if (type === 'play') {
    icon.setAttribute('class', 'fas fa-pause');
    playButton.setAttribute('class', 'pause');
  } else if (type === 'pause'){
    icon.setAttribute('class', 'fas fa-play');
    playButton.setAttribute('class', 'play');
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

function newsMenuControl() {
  newsfeed.classList.toggle('toggled');
}

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
    newsMenuControl();
  }
}

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

function toggleInfoMenu() {
  updateInfoMenuPosition();
  infoMenuContent.classList.toggle('toggled');
}

function updateInfoMenuPosition() {
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  let x = vw / 2;
  let y = vh / 2;

  let infoMenuContent = document.querySelector('#infoMenuId');
  infoMenuContent.style.left = (x - 150) + "px";
  infoMenuContent.style.top = (y - 150) + "px";
}

function toggleSettingsMenu() {
  updateSettingsMenuPosition();
  settingsMenuContent.classList.toggle('toggled');
}

function updateSettingsMenuPosition() {
  let {x, y} = getPosition(settingsButton);

  settingsMenuContent.style.left = (x - 90) + "px";
  settingsMenuContent.style.top = (y - 160) + "px";
}

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

window.onload = () => {
  playButton.addEventListener('click', animationControl);
  newsfeedButton.addEventListener('click', newsMenuControl);
  settingsButton.addEventListener('click', toggleSettingsMenu);
  infoButton.addEventListener('click', toggleInfoMenu);
  nextButton.addEventListener('click', function(){increaseDay(1);});
  prevButton.addEventListener('click', function(){decreaseDay(1);});
  document.addEventListener('keydown', keyAction);
  window.addEventListener('resize', updateInfoMenuPosition);
  window.addEventListener('resize', updateSettingsMenuPosition);

  let radioButtons = document.querySelectorAll(".radioButton");
  for(let rb of radioButtons) {
    rb.addEventListener('change', function() {
      if(rb.value == "on" && rb.id !== currentSetting) {
        currentSetting = rb.id;
        updateDay();
        toggleSettingsMenu();
      }
    })
  }
  // for (var i = 0; i < rad.length; i++) {
  //     rad[i].addEventListener('change', function() {
  //         (prev) ? console.log(prev.value): null;
  //         if (this !== prev) {
  //             prev = this;
  //         }
  //         console.log(this.value)
  //     });
  // }
};

function newsOfCurrentDay() {
  let divText = "<h1 class='newsBoxTitle'>Corona Coverage</h1><h3 class=newsBoxSubtitle>New York Times || "+printDate()+"</h3><hr>";
  for(let article of articleData['day_'+currentDay]) {
    divText += "<a target='_blank' href='"+article.url+"' class='boxText headline'>"+article.headline+"</a><hr>";
  }
  return divText;
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


