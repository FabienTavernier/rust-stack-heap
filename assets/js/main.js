import animation from './anim';

import '../style/index.scss';

function getURLParameters() {
  const params = new URLSearchParams(window.location.search);
  
  return {
    theme: params.get('theme') || 'stack',
    setup: params.get('setup') || 'basic',
  };
}

async function init() {
  const { theme, setup } = getURLParameters();
  const { CODE, STEPS } = await import(`./setups/setup-${theme}-${setup}.js`);

  document.getElementById('title-theme').textContent = theme;
   
  document.querySelector(`a[href="${window.location.pathname + window.location.search}"]`)
    .classList.add('active');

  animation.init(CODE, STEPS);
}

init();
