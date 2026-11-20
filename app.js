let currentAnimalIndex = 0;
let currentItem = '🧊';

const items = [
  '🧊', '🥕', '🍫', '🪵', '🍎', '🧁', '🍪', '🌭', '🍓', '🍇',
  '🪙', '🍕', '🌮', '🍔', '🧀', '🍩', '🍌', '🥥', '🧃', '🍷',
  '🍐', '🍊', '🍉', '🍒', '🍑', '🍍', '🥝', '🫐', '🥦', '🥬',
  '🥒', '🌽', '🥔', '🍄', '🥜', '🍞', '🥨', '🥚', '🍗', '🐟'
];

const animalList = [
  'bunny', 'cat', 'donkey', 'duck', 'mouse', 'frog', 'bear', 'snail', 'owl',
  'tiger', 'penguin', 'crab', 'elephant'
];

const animals = {
  bunny: (item) => `(\\_/)
(•_•)
/ >${item}`,

  cat: (item) => ` /\\_/\\
(=^.^=)
 (${item})~`,

  donkey: (item) => `^__^
(oo)\\_______
(__)\\       )\\
    ||----w |
    ||     || ${item}`,

  duck: (item) => ` __
<(o )___
 ( ._>  ${item}
  \\___)` ,

  mouse: (item) => ` (o)_(o)
 ( . . )
  \\_v_/
  (${item})~~`,

  frog: (item) => ` @..@
(----)
( >${item} )
 ^^ ^^`,

  bear: (item) => `  (o)---(o)
  /  . .  \\
 |  ( Y )  |
  \\  \`-'  /
  / ( ${item} ) \\
 (___) (___)`,

  snail: (item) => `  _____
 /     \\
( o  o )
o\\_^_/o ${item}`,

  owl: (item) => ` ,_,
(o,o)
(   )
 "${item}"`,

  tiger: (item) => `  /\\_/\\
 ( o.o )
  > ^ < ${item}`,

  penguin: (item) => `  _~_
 (o o)
 / V \\
/(   )\\
 ^^ ^^ ${item}`,

  crab: (item) => ` \\ /  o  o  \\${item}/
  V   |  |   V
   \\_/----\\_/
    /______\\
    / /  \\ \\`,

  elephant: (item) => `  _.-- ,.--.
 .'   .'     /
 | @       |'..--------._
 /      \\._/              '\\
/  .-.-                     \\
\\_/   ${item}`
};

function changeItem() {
  currentItem = items[Math.floor(Math.random() * items.length)];
  updateArt();
}

function changeAnimal() {
  currentAnimalIndex = (currentAnimalIndex + 1) % animalList.length;
  updateArt();
}

function updateArt() {
  const animalKey = animalList[currentAnimalIndex];
  const art = animals[animalKey](currentItem);
  const artDisplay = document.getElementById('ascii-art');
  artDisplay.textContent = art;
  if (animalKey === 'owl') {
    const feetStart = art.lastIndexOf('\n') + 1;
    const feet = document.createElement('span');
    feet.className = 'owl-feet';
    feet.textContent = art.slice(feetStart);
    artDisplay.textContent = art.slice(0, feetStart);
    artDisplay.append(feet);
  }
  document.getElementById('animal-name').textContent = animalKey;
}

function copyArt(forBluesky = false) {
  const text = document.getElementById('ascii-art').textContent;
  const clipboardText = forBluesky ? text.replace(/^ +/gm, spaces => "\u2002".repeat(spaces.length)) : text;
  navigator.clipboard.writeText(clipboardText).then(() => {
    alert("Text wurde in die Zwischenablage kopiert!");
  }).catch(err => {
    alert("Kopieren fehlgeschlagen: " + err);
  });
}

document.getElementById('change-item').addEventListener('click', changeItem);
document.getElementById('change-animal').addEventListener('click', changeAnimal);
document.getElementById('copy-art').addEventListener('click', () => copyArt());
document.getElementById('copy-bluesky').addEventListener('click', () => copyArt(true));
