import vars from '../../style/export.module.scss';

const CODE = `
main(); // ROOT

fn main() {
    let mut s = String::from("Hell");
    s += "o";
    s += "!";
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
    target: {
      parentID: 'heap',
      element: {
        tag: 'div',
        id: 'heap-0',
        className: 'heap-location',
        innerHTML: `
          <span class="heap__item">H</span>
          <span class="heap__item">e</span>
          <span class="heap__item">l</span>
          <span class="heap__item">l</span>
        `,
      },
      reset: false,
    },
    comment: `
      <p>
        <code>String::from("Hell")</code> est évalué : Rust cherche un emplacement disponible
        dans le Tas qui peut contenir 4 «&nbsp;cases&nbsp;».
      </p>
      <p>
        Il <b>alloue</b> cet emplacement, c'est un espace réservé, et y écrit les lettres qui
        représentent <code>s</code>.
      </p>
      <p>
        Enfin, il retourne l'<b>adresse de l'emplacement</b>.
      </p>
    `,
  },
  {
    current: 5,
    next: 5,
    target: {
      parentID: 'frame-0',
      element: {
        tag: 'span',
        id: 'frame-item-0',
        className: 'frame__item',
        innerHTML: `
          s = <span class="stack__item">ptr</span><span class="stack__item">4</span><span class="stack__item">4</span>
        `,
      },
      reset: false,
    },
    comment: `
      <p>
        Les métadonnées de la variable <code>s</code> sont <b>stockées</b>
        dans la <b>frame <code>0</code> de la Pile</b> :
      </p>
      <ul>
        <li><code>ptr</code> : référence vers les valeurs stockées dans le Tas (adresse retournée)</li>
        <li><code>length</code> : la longueur de la taille (ici 4 lettres)</li>
        <li><code>capacity</code> : la capacité de stockage actuel (ici 4)</li>
      </ul>
    `,
  },
  {
    current: 5,
    next: 6,
    target: {
      parentID: 'heap',
      element: {
        tag: 'div',
        innerHTML: `
          <span class="frame__title">HEAP</span>
          <div id="heap-0" class="heap-location">
            <span class="heap__item">H</span>
            <span class="heap__item">e</span>
            <span class="heap__item">l</span>
            <span class="heap__item">l</span>
            <span class="heap__item">o</span>
            <span class="heap__item">&nbsp;</span>
            <span class="heap__item">&nbsp;</span>
            <span class="heap__item">&nbsp;</span>
          </div>
        `,
      },
      reset: true,
    },
    comment: `
      <p>
        On vérifie la taille de ce qui doit être ajouter, si celle-ci dépasse la
        <b>capacité</b>, il faut <b>ré-allouer</b> de la place supplémentaire.
      </p>
      <p>
        Pour éviter de trop nombreuses ré-aalocation, Rust utilise une ré-allocation
        exponentielle : il va doubler la capacité actuelle :
      </p>
      <ul>
        <li>
          si il y a suffisamment de place libre à la suite de l'adresse actuelle,
          il ajoute des « cases » à la suite ;
        </li>
        <li>
          sinon (exemple: ces places sont allouées à une autre variable) :
          <ul>
            <li>il cherche un autre emplacement,</li>
            <li>copie les données existantes,</li>
            <li>ajoute les nouvelles données,</li>
            <li>libère l'ancien emplacement,</li>
            <li>retourne la nouvelle adresse</li>
        </li>
      </ul>
    `,
  },
  {
    current: 6,
    next: 6,
    target: {
      parentID: 'stack',
      element: {
        tag: 'div',
        innerHTML: `
          <span class="frame__title">STACK</span>
          <div id="frame-0" class="frame frame--purple">
            <span class="frame__title">Frame 0</span>
            <span id="frame-item-0" class="frame__item">
              s = <span class="stack__item">ptr</span><span class="stack__item">5</span><span class="stack__item">8</span>
            </span>
          </div>
        `,
      },
      reset: true,
    },
    comment: `
      <p>
        Les méta-données dans la Pile sont mises à jour avec :
      </p>
      <ul>
        <li>l'éventuelle nouvelle adresse</li>
        <li>la nouvelle longueur</li>
        <li>l'éventuelle nouvelle capacitié</li>
      </ul>
    `,
  },
  {
    current: 6,
    next: 7,
    target: {
      parentID: 'heap',
      element: {
        tag: 'div',
        innerHTML: `
          <span class="frame__title">HEAP</span>
          <div id="heap-0" class="heap-location">
            <span class="heap__item">H</span>
            <span class="heap__item">e</span>
            <span class="heap__item">l</span>
            <span class="heap__item">l</span>
            <span class="heap__item">o</span>
            <span class="heap__item">!</span>
            <span class="heap__item">&nbsp;</span>
            <span class="heap__item">&nbsp;</span>
          </div>
        `,
      },
      reset: true,
    },
    comment: `
      <p>
        On vérifie la taille de ce qui doit être ajouter, celle-ci ne dépasse pas
        la <b>capacité</b>, on ajoute à la suite.
      </p>
    `,
  },
  {
    current: 7,
    next: 7,
    target: {
      parentID: 'stack',
      element: {
        tag: 'div',
        innerHTML: `
          <span class="frame__title">STACK</span>
          <div id="frame-0" class="frame frame--purple">
            <span class="frame__title">Frame 0</span>
            <span id="frame-item-0" class="frame__item">
              s = <span class="stack__item">ptr</span><span class="stack__item">6</span><span class="stack__item">8</span>
            </span>
          </div>
        `,
      },
      reset: true,
    },
    comment: `<p>Ici, seule la <b>longueur</b> doit être mise à jour.</p>`,
  },
  {
    current: 7,
    next: 8,
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
            <span class="heap__item">✝</span>
            <span class="heap__item">✝</span>
          </div>
        `,
      },
      reset: true,
    },
    comment: `
      <p>
        À la fin de l'exécution de <code>main</code>, <code>s</code> n'est plus valide :
        elle doit être <b><i>drop</i></b>.
      </p>
      <p>
        Ce signal <code>Drop</code> déclenche le mécanisme de <b>libération de la zone
        mémoire</b> allouée dans le <i>Heap</i> pour stocker <code>Hello!</code>.
      </p>
      <p>
        Pour gagner en performance, Rust <b>n'efface pas</b> les données… Imaginez s'il doit
        effacer plusieurs Giga de données !<br>
        Il va marquer ces cases comme <b>libres</b>, c'est le <i>tombstone</i> : désormais,
        ces emplacements ne sont plus réservés et pourront être aloués par d'autres variables.
      </p>
    `,
  },
  {
    current: 8,
    next: 8,
    remove: 'frame-0',
    comment: `
      <p>
        Fin d'exécution de la fonction <code>main</code>.<br>
        On effectue le <b>retour de contexte</b> vers <code>ROOT</code> (marqueur <code>0</code>).
      </p>
      <p>
        La frame <code>0</code> est supprimée (<i>pop</i>), <code>s</code> est <b>libérée</b>.
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
