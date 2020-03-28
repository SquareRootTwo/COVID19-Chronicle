// include {scaleLinear} from "node_modules/d3-scale";

window.onload = () => {
  const IINITIAL_WINDOW_SIZE = document.documentElement.clientWidth;
  const MOBILE_WINDOW_SIZE = 768;
  const infobar = document.querySelector('#infobar');
  const infobarButton = document.querySelector('#infobarButton');
  
  const setButton = (mobile) => {
    const btn = document.createElement('i');

    if (mobile) {
      btn.setAttribute('class', 'fas fa-ellipsis-h');
    } else {
      btn.setAttribute('class', 'fas fa-ellipsis-v');
    }
    infobarButton.innerHTML = '';
    infobarButton.appendChild(btn);
  }

  if (MOBILE_WINDOW_SIZE <= IINITIAL_WINDOW_SIZE) {
    infobar.setAttribute('data-mobile', 'false');
    setButton(false);
  } else {
    infobar.setAttribute('data-mobile', 'true');
    setButton(true);
  }

  const menuControl = () => {
    infobar.classList.toggle('toggled');
  };


  const changeButton = () => {
    const w = document.documentElement.clientWidth;
    console.log(infobar.dataset['mobile']);
    if (infobar.dataset['mobile'] === 'false' && w < MOBILE_WINDOW_SIZE) {
      setButton(true);
      infobar.dataset['mobile'] = 'true';
    } else if (infobar.dataset['mobile'] === 'true' && w >= MOBILE_WINDOW_SIZE) {
      setButton(false);
      infobar.dataset['mobile'] = 'false';
    }
  }

  infobarButton.addEventListener('click', menuControl);
  window.addEventListener('resize', changeButton);
};