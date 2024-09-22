import vars from '../../style/export.module.scss';

const CODE = `
main(); // ROOT

fn main() {
    let x = 42;
    let y = 16;
    my_func();
    let z = divide(75.0, 12.5);
}

fn my_func() {
    let x = 123;
}

fn divide(a: f32, b:f32) -> f32 {
    let result = a / b;
    result
}
`;

const STEPS = [
  {
    current: 1,
    next: 2,
    target: {
      parentID: 'panel-target',
      element: {
        tag: 'div',
        id: 'frame-0',
        className: 'frame',
        innerHTML: '<span class="frame__title">Frame 0</span>',
      },
      reset: true,
    },
    comment: `
      <p>
        En interne, Rust appelle <code>main</code>.<br>
        La <b>frame <code>0</code></b> est ajoutée (<i>push</i>) à la pile.
      </p>
    `,
  },
  {
    current: 2,
    next: 4,
    marker: {
      lineNumber: 2,
      text: '0 →',
      color: vars.colorRed,
    },
    comment: `
      <p>On <b>change de contexte</b> vers <code>main</code>.</p>
      <p class="help">
        <b>NOTE</b> à chaque <i>switch de contexte</i>, on marque la position du curseur
        pour pouvoir y revenir plus tard
      </p>
    `,
  },
  {
    current: 4,
    next: 5,
    target: {
      parentID: 'frame-0',
      element: {
        tag: 'span',
        id: 'frame-item-0',
        className: 'frame__item',
        innerHTML: 'x = 42',
      },
      reset: false,
    },
    comment: `
      <p>La variable <code>x</code> est <b>stockée</b> dans la <b>frame <code>0</code>.</p>
    `,
  },
  {
    current: 5,
    next: 6,
    target: {
      parentID: 'frame-0',
      element: {
        tag: 'span',
        id: 'frame-item-1',
        className: 'frame__item',
        innerHTML: 'y = 16',
      },
      reset: false,
    },
    comment: `
      <p>La variable <code>y</code> est <b>stockée</b> dans la <b>frame <code>0</code>.</p>
    `,
  },  
  {
    current: 6,
    next: 7,
    target: {
      parentID: 'panel-target',
      element: {
        tag: 'div',
        id: 'frame-1',
        className: 'frame',
        innerHTML: '<span class="frame__title">Frame 1</span>',
      },
      reset: false,
    },
    comment: `
      <p>
        La fonction <code>my_func</code> est appelée.<br>
        La <b>frame <code>1</code></b> est ajoutée (<i>push</i>) à la pile.
      </p>
      <p class="help">
        <b>NOTE</b> les valeurs <code>x</code> et <code>y</code> restent stockées
        dans la frame <code>0</code>
      </p>
    `,
  },
  {
    current: 7,
    next: 11,
    marker: {
      lineNumber: 7,
      text: '1 →',
      color: vars.colorBlue,
    },
    comment: `
      <p>On <b>change de contexte</b> vers <code>my_func</code>.</p>
      <p class="help">
        <b>NOTE</b> un marqueur de position est ajouté
      </p>
    `,
  },
  {
    current: 11,
    next: 12,
    target: {
      parentID: 'frame-1',
      element: {
        tag: 'span',
        id: 'frame-item-0',
        className: 'frame__item',
        innerHTML: 'x = 123',
      },
      reset: false,
    },
    comment: `
      <p>La variable <code>x</code> est <b>stockée</b> dans la <b>frame <code>1</code></b>.</p>
      <p class="help">
        <b>NOTE</b> la variable <code>x</code> appartient au contexte <code>1</code> ; ce n'est
        pas la même que celle stockée dans la frame <code>0</code>
      </p>
    `,
  },
  {
    current: 12,
    next: 13,
    remove: 'frame-1',
    comment: `
      <p>
        Fin d'exécution de la fonction <code>my_func</code>.<br>
        On effectue le <b>retour de contexte</b> vers <code>main</code> (marqueur <code>1</code>).
      </p>
      <p>
        La frame <code>1</code> est supprimée (<i>pop</i>), <code>x</code> est
        <b>libérée</b>.
      </p>
    `,
  },
  {
    current: 13,
    next: 8,
    target: {
      parentID: 'panel-target',
      element: {
        tag: 'div',
        id: 'frame-1',
        className: 'frame',
        innerHTML: '<span class="frame__title">Frame 1</span>',
      },
      reset: false,
    },
    comment: `
      <p>
        La fonction <code>divide</code> est appelée.<br>
        La <b>frame <code>1</code></b> est ajoutée (<i>push</i>) à la pile.
      </p>
      <p class="help">
        <b>NOTE</b> à cette étape seul le code <code>divide(75.0, 12.5)</code> est lu ;
        on ne s'occupe pas de <code>z</code>
      </p>
    `,
  },
  {
    current: 8,
    next: 15,
    marker: {
      lineNumber: 8,
      text: '2 →',
      color: vars.colorPurple,
    },
    comment: `
      <p>On <b>change de contexte</b> vers <code>divide</code>.</p>
      <p class="help">
        <b>NOTE</b> un marqueur de position est ajouté
      </p>
    `,
  },
  {
    current: 15,
    next: 16,
    target: {
      parentID: 'frame-1',
      element: {
        tag: 'span',
        id: 'frame-item-0',
        className: 'frame__item',
        innerHTML: 'result = 6',
      },
      reset: false,
    },
    comment: `
      <p>
        La variable <code>result</code> est <b>stockée</b> dans la <b>frame <code>1</code></b>
        avec le résultat de la division comme valeur.
      </p>
    `,
  },
  {
    current: 16,
    next: 17,
    remove: 'frame-1',
    comment: `
      <p>
        Le retour marque la fin d'exécution de la fonction <code>divide</code>.<br>
        On effectue le <b>retour de contexte</b> vers <code>main</code> (marqueur <code>2</code>).
      </p>
      <p>
        La frame <code>1</code> est supprimée (<i>pop</i>), <code>result</code> est
        <b>libérée</b>.
      </p>
    `,
  },
  {
    current: 17,
    next: 8,
    target: {
      parentID: 'frame-0',
      element: {
        tag: 'span',
        id: 'frame-item-2',
        className: 'frame__item',
        innerHTML: 'z = 6',
      },
      reset: false,
    },
    comment: `
      <p>
        La variable <code>z</code> est <b>stockée</b> dans la <b>frame <code>0</code></b>
        avec la valeur retournée.
      </p>
    `,
  },
  {
    current: 8,
    next: 9,
    remove: 'frame-0',
    comment: `
      <p>
        Fin d'exécution de la fonction <code>main</code>.<br>
        On effectue le <b>retour de contexte</b> vers <code>ROOT</code> (marqueur <code>0</code>).
      </p>
      <p>
        La frame <code>0</code> est supprimée (<i>pop</i>), <code>x</code>, <code>y</code> et
        <code>z</code> sont <b>libérées</b>.
      </p>
    `,
  },
  {
    current: 9,
    next: 3,
    comment: `<p>Fin du programme.</p>`,
  },
];

export { CODE, STEPS };
