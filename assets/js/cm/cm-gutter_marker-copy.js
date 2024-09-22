import { StateField, StateEffect, RangeSet } from '@codemirror/state';
import { EditorView, GutterMarker, gutter } from '@codemirror/view';

const arrowMarker = new class extends GutterMarker {
  toDOM() {
    return document.createTextNode('→');
  }
};

const arrowMarkerEffect = StateEffect.define({
  map: (val, mapping) => ({ pos: mapping.mapPos(val.pos), on: val.on }),
});

const arrowMarkerState = StateField.define({
  create() {
    return RangeSet.empty;
  },
  update(set, transaction) {
    set = set.map(transaction.changes);

    for (const effect of transaction.effects) {      
      if (effect.is(arrowMarkerEffect)) {
        console.log(effect);
      
        if (effect.value.on) {
          set = set.update({
            add: [arrowMarker.range(effect.value.pos)],
          });
        } else {
          set = set.update({
            filter: (from) => from !== effect.value.pos,
          });
        }
      }
    }

    return set;
  },
});

function toggleArrowMarker(view, pos) {  
  const arrowMarkers = view.state.field(arrowMarkerState);
  let hasArrowMarker = false;
  
  arrowMarkers.between(pos, pos, () => { hasArrowMarker = true });

  view.dispatch({
    effects: arrowMarkerEffect.of({ pos, on: !hasArrowMarker }),
  });
}

function addArrowMarker(view, pos) {  
  view.dispatch({
    effects: arrowMarkerEffect.of({ pos, on: true }),
  });
}
function removeArrowMarker(view, pos) {  
  view.dispatch({
    effects: arrowMarkerEffect.of({ pos, on: false }),
  });
}

const arrowMarkerGutter = [
  arrowMarkerState,
  gutter({
    class: 'cm-arrow-gutter',
    markers: (v) => v.state.field(arrowMarkerState),
    initialSpacer: () => arrowMarker,
    domEventHandlers: {
      mousedown(view, line) {
        console.log(line);
        
        toggleArrowMarker(view, line.from);
        return true;
      },
    },
  }),
  EditorView.baseTheme({
    '.cm-arrow-gutter .cm-gutterElement': {
      color: 'red',
      paddingLeft: '4px',
      cursor: 'default',
    },
  }),
];

export { arrowMarkerGutter, addArrowMarker, removeArrowMarker, toggleArrowMarker };
