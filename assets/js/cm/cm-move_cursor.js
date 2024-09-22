import { activeLineEffect, dectivateLineEffect } from './cm-active_line';

function moveCursorToNextLine(view) {
  const cursorPos = view.state.selection.main.head;
  const currentLine = view.state.doc.lineAt(cursorPos);  

  const nextLineNumber = currentLine.number + 1;
  const totalLines = view.state.doc.lines;

  if (nextLineNumber > totalLines) {
      console.log("Vous êtes à la dernière ligne, impossible d'aller plus bas.");
      return;
  }

  const nextLine = view.state.doc.line(nextLineNumber);

  view.dispatch({
    effects: [
        dectivateLineEffect.of(currentLine.number),
        activeLineEffect.of(nextLine.number),
    ],
  });

  view.dispatch({
      selection: { anchor: nextLine.from },
      scrollIntoView: true,
  });
}

function moveCursorToLine(view, { current, next }, last) {
  const currentNumber = current === 1 ? last : current;
  const currentLine = view.state.doc.line(currentNumber);
  const nextLine = view.state.doc.line(next);

  view.dispatch({
    effects: [
        dectivateLineEffect.of(currentLine.number),
        activeLineEffect.of(nextLine.number),
    ],
  });

  view.dispatch({
      selection: { anchor: nextLine.from },
      scrollIntoView: true,
  });
}

export { moveCursorToNextLine, moveCursorToLine };
