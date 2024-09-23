import vars from '../../style/export.module.scss';

const CODE = `
main(); // ROOT

fn main() {
    let mut numbers: Vec<u32> = vec![1, 42, 16];

    add_123(&mut numbers);

    println!("{numbers:?}");
}

fn add_123(v: &mut Vec<u32>) {
    v.push(123);
}
`;

const STEPS = [
  {
    current: 1,
    next: 2,
    target: [
      {
        parentID: 'panel-target',
        element: {
          tag: 'div',
          id: 'stack',
          className: 'frame frame--red',
          innerHTML: '<span class="frame__title">STACK</span>',
        },
        reset: true,
      },
      {
        parentID: 'panel-target',
        element: {
          tag: 'div',
          id: 'heap',
          className: 'frame frame--blue',
          innerHTML: '<span class="frame__title">HEAP</span>',
        },
        reset: false,
      },
    ],
    comment: `
      <p>
        Le programme est lancé, la Pile (<i>Stack</i>) et le Tas (<i>Heap</i>) sont créés.
      </p>
    `,
  },
  {
    current: 2,
    next: 4,
    target: {
      parentID: 'stack',
      element: {
        tag: 'div',
        id: 'frame-0',
        className: 'frame frame--purple',
        innerHTML: '<span class="frame__title">Frame 0</span>',
      },
      reset: false,
    },
    marker: {
      lineNumber: 2,
      text: '0 →',
      color: vars.colorRed,
    },
    comment: `
      <p>
        La <b>frame <code>0</code></b> est ajoutée (<i>push</i>) à la pile.
      </p>
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
    target: [
      {
        parentID: 'heap',
        element: {
          tag: 'div',
          id: 'heap-0',
          className: 'heap-location',
          innerHTML: `
            <span class="heap__item">1</span>
            <span class="heap__item">42</span>
            <span class="heap__item">l6</span>
          `,
        },
        reset: false,
      },
      {
        parentID: 'frame-0',
        element: {
          tag: 'span',
          id: 'frame-item-0',
          className: 'frame__item',
          innerHTML: `
            numbers = <span class="stack__item">ptr</span><span class="stack__item">3</span><span class="stack__item">3</span>
          `,
        },
        reset: false,
      },
    ],
    comment: `
      <p>
        <code>vec![1, 42, 16]</code> est évalué : Rust cherche un emplacement disponible
        dans le Tas qui peut contenir 3 nombres et retourne l'<b>adresse de l'emplacement</b>.
      </p>
      <p>
        Les métadonnées de la variable <code>s</code> sont <b>stockées</b>
        dans la <b>frame <code>0</code> de la Pile</b>.
      </p>
    `,
  },
  {
    current: 5,
    next: 7,
    target: {
      parentID: 'stack',
      element: {
        tag: 'div',
        id: 'frame-1',
        className: 'frame frame--green',
        innerHTML: '<span class="frame__title">Frame 1</span>',
      },
      reset: false,
    },
    comment: `
      <p>
        La fonction <code>add_123</code> est appelée.<br>
        La <b>frame <code>1</code></b> est ajoutée (<i>push</i>) à la pile.
      </p>
    `,
  },
  {
    current: 7,
    next: 12,
    target: {
      parentID: 'frame-1',
      element: {
        tag: 'span',
        id: 'frame-item-0',
        className: 'frame__item',
        innerHTML: 'v = <span class="stack__item">ptr vers `numbers`</span>',
      },
      reset: false,
    },
    marker: {
      lineNumber: 7,
      text: '1 →',
      color: vars.colorBlue,
    },
    comment: `
      <p>
        La variable locale <code>v</code> est créée : c'est une <b>référence</b> à
        <code>numbers</code>.
      </p>
    `,
  },
  {
    current: 12,
    next: 13,
    target: [
      {
        parentID: 'heap',
        element: {
          tag: 'div',
          innerHTML: `
          <span class="frame__title">HEAP</span>
          <div id="heap-0" class="heap-location">
            <span class="heap__item">1</span>
            <span class="heap__item">42</span>
            <span class="heap__item">16</span>
            <span class="heap__item">123</span>
            <span class="heap__item">&nbsp;</span>
            <span class="heap__item">&nbsp;</span>
          </div>
        `,
        },
        reset: true,
      },
      {
        parentID: 'stack',
        element: {
          tag: 'div',
          innerHTML: `
          <span class="frame__title">STACK</span>
          <div id="frame-0" class="frame frame--purple">
            <span class="frame__title">Frame 0</span>
            <span id="frame-item-0" class="frame__item">
              numbers = <span class="stack__item">ptr</span><span class="stack__item">4</span><span class="stack__item">6</span>
            </span>
          </div>
          <div id="frame-1" class="frame frame--green">
            <span class="frame__title">Frame 1</span>
            <span id="frame-item-0" class="frame__item">
              v = <span class="stack__item">ptr vers \`numbers\`</span>
            </span>
          </div>
        `,
        },
        reset: true,
      },
    ],
    comment: `
      <p>
        On ajoute un nombre au vecteur <code>numbers</code> :
      </p>
      <ol>
        <li>
          on récupère l'adresse des valeurs dans le Tas en passant par le pointeur de <code>numbers</code>
        </li>
        <li>
          on ré-alloue de la mémoire
        </li>
        <li>
          on affecte la nouvelle valeur
        </li>
        <li>
          on modifie les méta-données de <code>numbers</code> (pointeur, longueur, capacité)
        </li>
      </ol>
    `,
  },
  {
    current: 13,
    next: 14,
    remove: 'frame-1',
    comment: `
      <p>
        Fin d'exécution de la fonction <code>add_123</code>.<br>
        On effectue le <b>retour de contexte</b> vers <code>main</code> (marqueur <code>1</code>).
      </p>
      <p>
        La frame <code>1</code> est supprimée (<i>pop</i>), <code>v</code> est <b>libérée</b>.
      </p>
      <p class="help">
        <b>NOTE</b> en passant une référence, on s'est assuré que <code>numbers</code>
        existe toujours dans <code>Frame 0</code>
      </p>
    `,
  },
  {
    current: 14,
    next: 10,
    remove: 'frame-0',
    target: {
      parentID: 'heap',
      element: {
        tag: 'div',
        innerHTML: `
          <span class="frame__title">HEAP</span>
          <div id="heap-0" class="heap-location">
            <span class="heap__item">✝</span>
            <span class="heap__item">✝</span>
            <span class="heap__item">✝</span>
            <span class="heap__item">✝</span>
            <span class="heap__item">✝</span>
            <span class="heap__item">✝</span>
          </div>
        `,
      },
      reset: true,
    },
    comment: `
      <p>
        Après le retour de contexte (marqueur 1), <code>numbers</code> est affichée.
      </p>
      <p>
        À la fin de l'exécution de la fonction <code>main</code>.<br>
        On effectue le <b>retour de contexte</b> vers <code>ROOT</code> (marqueur <code>0</code>).
      </p>
      <p>
        La frame <code>0</code> est supprimée (<i>pop</i>), <code>numbers</code>
        est <b>libérée</b>.<br>
        Les emplacements des valeurs de <code>numbers</code> sont libérés (<i>tomstone</i>).
      </p>
    `,
  },
  {
    current: 10,
    next: 3,
    comment: `<p>Fin du programme.</p>`,
  },
];

export { CODE, STEPS };
