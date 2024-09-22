import { StateField, StateEffect } from '@codemirror/state';
import { EditorView, Decoration } from '@codemirror/view';

export const activeLineEffect = StateEffect.define();
export const dectivateLineEffect = StateEffect.define();

const activeLine = StateField.define({
  create() {
    return Decoration.none;
  },
  update(set, transaction) {
    set = set.map(transaction.changes);
    
    for (const effect of transaction.effects) {
      if (effect.is(activeLineEffect)) {
        const line = transaction.state.doc.line(effect.value);
        
        set = set.update({
          add: [Decoration.line({ class: 'cm-activeLine' }).range(line.from)]
        });
      }
      
      if (effect.is(dectivateLineEffect)) {
        const line = transaction.state.doc.line(effect.value);
        set = set.update({
          filter: (from) => from !== line.from,
        });
      }
    }
    
    return set;
  },
  provide: (f) => EditorView.decorations.from(f),
});

export default activeLine;
