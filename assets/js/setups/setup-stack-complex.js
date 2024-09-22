import vars from '../../style/export.module.scss';

const CODE = `
main(); // ROOT

fn main() {
    let x = 42;
    let y = 16;
    my_func();
    let z = divide(25.0, 4.7);
}

fn my_func() {
    let x = 123;
}

fn divide(a: f32, b:f32) -> f32 {
    let result = a / b;
    result;
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
    next: 10,
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
    current: 10,
    next: 11,
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
    current: 11,
    next: 12,
    remove: 'frame-1',
    comment: `
      <p>
        Fin d'exécution de la fonction <code>my_func</code>.<br>
        On effecture le <b>retour de contexte</b> vers <code>main</code> (marqueur <code>1</code>).
      </p>
      <p>
        La frame <code>1</code> est supprimée (<i>pop</i>), <code>x</code> est
        <b>libérée</b>.
      </p>
    `,
  },
  {
    current: 12,
    next: 8,
    remove: 'frame-0',
    comment: `
      <p>
        Fin d'exécution de la fonction <code>main</code>.<br>
        On effecture le <b>retour de contexte</b> vers <code>ROOT</code> (marqueur <code>0</code>).
      </p>
      <p>
        La frame <code>0</code> est supprimée (<i>pop</i>), <code>x</code> et <code>y</code>
        sont <b>libérées</b>.
      </p>
    `,
  },
  {
    current: 8,
    next: 3,
    comment: `<p>Fin du programme.</p>`,
  },
];

export { CODE, STEPS };
