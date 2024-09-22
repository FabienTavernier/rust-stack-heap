import { EditorView } from 'codemirror';

import getConfig from './cm/config';

import { moveCursorToLine } from './cm/cm-move_cursor';
import { addArrowMarker } from './cm/cm-gutter_marker';

import { addComment, removeTarget, updateTarget } from './target';

import { CODE, STEPS } from './setup';

import '../style/index.scss';

const nextStepBtn = document.getElementById('step-next');
const state = getConfig(CODE);

let currentStep = 0;
let editor;

function run() {
  reset();

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
  console.log('NEXT');
  
  const { next: lastStep } = STEPS[STEPS.length - 1];

  if (currentStep < STEPS.length) {
    if (editor) {
      moveCursorToLine(editor, STEPS[currentStep], lastStep);

      if (STEPS[currentStep].target) {
        updateTarget(STEPS[currentStep].target);
      }

      if (STEPS[currentStep].remove) {
        removeTarget(STEPS[currentStep].remove);
      }

      if (STEPS[currentStep].marker) {
        addArrowMarker(
          editor,
          STEPS[currentStep].marker,
        );
      }

      if (STEPS[currentStep].comment) {
        addComment(STEPS[currentStep].comment);
      }

      nextStepBtn.textContent = currentStep == STEPS.length - 1 ? 'End': 'Next step';
      currentStep += 1;
    }
  } else {
    run();
  }
}

run();
