import { StateField, StateEffect, RangeSet } from '@codemirror/state';
import { EditorView, GutterMarker, gutter } from '@codemirror/view';

const arrowMarker = (text, color) => new class extends GutterMarker {
  toDOM() {
    // return document.createTextNode(text || '  →');
    
    const marker = document.createElement('div');
    marker.textContent = text || '→';
    marker.style.color = color || '#90A4AE';
    
    return marker;
  }
};

const arrowMarkerEffect = StateEffect.define({
  map: (val, mapping) => ({
    pos: mapping.mapPos(val.pos),
    on: val.on,
    text: val.text,
    color: val.color,
  }),
});

const arrowMarkerState = StateField.define({
  create() {
    return RangeSet.empty;
  },
  update(set, transaction) {
    set = set.map(transaction.changes);

    for (const effect of transaction.effects) {
      if (effect.is(arrowMarkerEffect)) {
        if (effect.value.on) {
          set = set.update({
            add: [arrowMarker(effect.value.text, effect.value.color).range(effect.value.pos)],
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

function addArrowMarker(view, marker) {
  const { lineNumber, text = '  →', color = '#90A4AE' } = marker;
  const line = view.state.doc.line(lineNumber);
  
  view.dispatch({
    effects: arrowMarkerEffect.of({ pos: line.from, on: true, text, color }),
  });
}

function removeArrowMarker(view, lineNumber) {
  const line = view.state.doc.line(lineNumber);
  
  view.dispatch({
    effects: arrowMarkerEffect.of({ pos: line.from, on: false }),
  });
}

const arrowMarkerGutter = [
  arrowMarkerState,
  gutter({
    class: 'cm-arrow-gutter',
    markers: (v) => v.state.field(arrowMarkerState),
    initialSpacer: () => arrowMarker,
  }),
  EditorView.baseTheme({
    '.cm-arrow-gutter .cm-gutterElement': {
      color: '#90A4AE',
      cursor: 'default',
      fontWeight: 700,
      paddingLeft: '4px',
    },
  }),
];

export { arrowMarkerGutter, addArrowMarker, removeArrowMarker };
