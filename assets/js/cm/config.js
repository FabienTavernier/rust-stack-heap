import { EditorState } from '@codemirror/state';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/view';

import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
import { rust } from '@codemirror/lang-rust';
import { materialLight } from '@fsegurai/codemirror-theme-material-light';

import activeLine from './cm-active_line';
import { arrowMarkerGutter } from './cm-gutter_marker';

function getConfig(docCode) {  
  return EditorState.create({
    doc: docCode,
    extensions: [
      // EditorView.contentAttributes.of({ contenteditable: false }),
      EditorState.readOnly.of(true),
      
      materialLight,
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      rust(),
      
      lineNumbers(),
      arrowMarkerGutter,

      highlightActiveLineGutter(),
      activeLine,
    ],
  });
}

export default getConfig;
