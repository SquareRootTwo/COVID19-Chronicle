window.onload = () => {
  const infobar = document.querySelector('#infobar');
  const infobarButton = document.querySelector('#infobarButton');

  const menuControl = () => {
    infobar.classList.toggle('toggled');
  };

  const changeButton = () => {
    const w = document.documentElement.clientWidth;
    if (w < 768) {
      const btn = document.createElement('i');
      btn.setAttribute('class', 'fas fa-ellipsis-v');
      infobarButton.firstChild = btn;
    } else {
      const btn = document.createElement('i');
      btn.setAttribute('class', 'fas fa-ellipsis-h');
      infobarButton.firstChild = btn;
    }
  }

  infobarButton.addEventListener('click', menuControl);
  infobarButton.addEventListener('resize', changeButton);
};