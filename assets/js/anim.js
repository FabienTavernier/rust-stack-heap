import { EditorView } from 'codemirror';

import getConfig from './cm/config';

import { moveCursorToLine } from './cm/cm-move_cursor';
import { addArrowMarker } from './cm/cm-gutter_marker';

import { addComment, removeTarget, updateTarget } from './target';

const animation = {
  nextStepBtn: document.getElementById('step-next'),

  editor: null,

  code: null,
  steps: null,

  currentStep: 0,

  nextHandler: () => {},

  init(code, steps) {
    this.code = code;
    this.steps = steps;

    this.run();
  },

  run() {
    this.reset();

    this.editor = new EditorView({
      state: getConfig(this.code),
      parent: document.getElementById('panel-code'),
    });

    this.nextHandler = () => this.next();
    this.nextStepBtn.addEventListener('click', this.nextHandler);
  },

  next() {
    const steps = this.steps[this.currentStep];
    const { next: lastStep } = this.steps[this.steps.length - 1];

    if (this.currentStep < this.steps.length) {
      if (this.editor) {
        moveCursorToLine(this.editor, steps, lastStep);

        if (steps.target) {
          updateTarget(steps.target);
        }

        if (steps.remove) {
          removeTarget(steps.remove);
        }

        if (steps.marker) {
          addArrowMarker(
            this.editor,
            steps.marker,
          );
        }

        if (steps.comment) {
          addComment(steps.comment);
        }

        this.nextStepBtn.textContent = this.currentStep == this.steps.length - 1 ? 'End': 'Next step';
        this.currentStep += 1;
      }
    } else {
      this.run();
    }
  },

  reset() {
    this.currentStep = 0;

    document.getElementById('step-next').textContent = 'Run';
    document.getElementById('panel-code').textContent = '';
    document.getElementById('panel-target').innerHTML = `<p class="help">
      Lancer le programme <kbd>Run</kbd> pour visualiser l'affectation
      et la libération de la mémoire de la Pile…
    </p>`;
    document.getElementById('panel-comment').textContent = '';

    this.nextStepBtn.removeEventListener('click', this.nextHandler);
  },
};

export default animation;
