import { EditorView } from 'codemirror';

import getConfig from './cm/config';

import { moveCursorToLine } from './cm/cm-move_cursor';
import { addArrowMarker } from './cm/cm-gutter_marker';

import { addComment, removeTarget, updateTarget } from './target';

// import { CODE, STEPS } from './setup';

import '../style/index.scss';

const nextStepBtn = document.getElementById('step-next');

let currentStep = 0;
let editor;

let steps;
let code;

function run() {
  reset();

  const state = getConfig(code);

  editor = new EditorView({
    state,
    parent: document.getElementById('panel-code'),
  });

  nextStepBtn.addEventListener('click', next);
}

function reset() {
  currentStep = 0;

  document.getElementById('step-next').textContent = 'Run';
  document.getElementById('panel-code').textContent = '';
  document.getElementById('panel-target').innerHTML = `<p class="help">
    Lancer le programme <kbd>Run</kbd> pour visualiser l'affectation
    et la libération de la mémoire de la Pile…
  </p>`;
  document.getElementById('panel-comment').textContent = '';

  nextStepBtn.removeEventListener('click', next);
}

function next() {  
  const { next: lastStep } = steps[steps.length - 1];

  if (currentStep < steps.length) {
    if (editor) {
      moveCursorToLine(editor, steps[currentStep], lastStep);

      if (steps[currentStep].target) {
        updateTarget(steps[currentStep].target);
      }

      if (steps[currentStep].remove) {
        removeTarget(steps[currentStep].remove);
      }

      if (steps[currentStep].marker) {
        addArrowMarker(
          editor,
          steps[currentStep].marker,
        );
      }

      if (steps[currentStep].comment) {
        addComment(steps[currentStep].comment);
      }

      nextStepBtn.textContent = currentStep == steps.length - 1 ? 'End': 'Next step';
      currentStep += 1;
    }
  } else {
    run();
  }
}

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

  code = CODE;
  steps = STEPS;

  run();
}

init();
