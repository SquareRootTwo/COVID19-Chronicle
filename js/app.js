// include {scaleLinear} from "node_modules/d3-scale";

window.onload = () => {
  const IINITIAL_WINDOW_SIZE = document.documentElement.clientWidth;
  const MOBILE_WINDOW_SIZE = 768;
  const infobar = document.querySelector('#infobar');
  const infobarButton = document.querySelector('#infobarButton');

  if (MOBILE_WINDOW_SIZE < IINITIAL_WINDOW_SIZE) {
    infobar.setAttribute('data-mobile', 'false');
  }

  const menuControl = () => {
    infobar.classList.toggle('toggled');
  };

  const changeButton = () => {
    const w = document.documentElement.clientWidth;
    console.log(infobar.dataset['mobile']);
    if (infobar.dataset['mobile'] === 'false' && w < MOBILE_WINDOW_SIZE) {
      const btn = document.createElement('i');
      btn.setAttribute('class', 'fas fa-ellipsis-h');
      infobarButton.innerHTML = '';
      infobarButton.appendChild(btn);
      infobar.dataset['mobile'] = 'true';
    } else if (infobar.dataset['mobile'] === 'true' && w >= MOBILE_WINDOW_SIZE) {
      const btn = document.createElement('i');
      btn.setAttribute('class', 'fas fa-ellipsis-v');
      infobarButton.innerHTML = '';
      infobarButton.appendChild(btn);
      infobar.dataset['mobile'] = 'false';
    }
  }

  infobarButton.addEventListener('click', menuControl);
  window.addEventListener('resize', changeButton);
};