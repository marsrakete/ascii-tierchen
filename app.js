let currentAnimalIndex = 0;
let currentItemIndex = 0;

const items = [
  ['🧊', 'Eiswürfel'],
  ['🥕', 'Karotte'],
  ['🍫', 'Schokolade'],
  ['🪵', 'Holzscheit'],
  ['🍎', 'Apfel'],
  ['🧁', 'Cupcake'],
  ['🍪', 'Keks'],
  ['🌭', 'Hotdog'],
  ['🍓', 'Erdbeere'],
  ['🍇', 'Weintrauben'],
  ['🪙', 'Münze'],
  ['🍕', 'Pizza'],
  ['🌮', 'Taco'],
  ['🍔', 'Burger'],
  ['🧀', 'Käse'],
  ['🍩', 'Donut'],
  ['🍌', 'Banane'],
  ['🥥', 'Kokosnuss'],
  ['🧃', 'Trinkpäckchen'],
  ['🍷', 'Rotwein'],
  ['🍐', 'Birne'],
  ['🍊', 'Orange'],
  ['🍉', 'Wassermelone'],
  ['🍒', 'Kirschen'],
  ['🍑', 'Pfirsich'],
  ['🍍', 'Ananas'],
  ['🥝', 'Kiwi'],
  ['🫐', 'Blaubeeren'],
  ['🥦', 'Brokkoli'],
  ['🥬', 'Blattgemüse'],
  ['🥒', 'Gurke'],
  ['🌽', 'Maiskolben'],
  ['🥔', 'Kartoffel'],
  ['🍄', 'Pilz'],
  ['🥜', 'Erdnüsse'],
  ['🍞', 'Brot'],
  ['🥨', 'Brezel'],
  ['🥚', 'Ei'],
  ['🍗', 'Hähnchenkeule'],
  ['🐟', 'Fisch'],
];

const animalList = [
  ['bunny', 'Hase'],
  ['cat', 'Katze'],
  ['donkey', 'Esel'],
  ['duck', 'Ente'],
  ['mouse', 'Maus'],
  ['frog', 'Frosch'],
  ['bear', 'Bär'],
  ['snail', 'Schnecke'],
  ['owl', 'Eule'],
  ['tiger', 'Tiger'],
  ['penguin', 'Pinguin'],
  ['crab', 'Krabbe'],
  ['elephant', 'Elefant'],
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
  currentItemIndex = (currentItemIndex + 1) % items.length;
  updateArt();
}

function changeAnimal() {
  currentAnimalIndex = (currentAnimalIndex + 1) % animalList.length;
  updateArt();
}

function updateArt() {
  const [animalKey] = animalList[currentAnimalIndex];
  const art = animals[animalKey](items[currentItemIndex][0]);
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

let copyStatusTimer;

function showCopyStatus(message) {
  const status = document.getElementById('copy-status');
  clearTimeout(copyStatusTimer);
  status.textContent = message;
  copyStatusTimer = setTimeout(() => { status.textContent = ''; }, 1800);
}

function copyArt(forBluesky = false) {
  const text = document.getElementById('ascii-art').textContent;
  const clipboardText = forBluesky ? text.replace(/^ +/gm, spaces => '\u2002'.repeat(spaces.length)) : text;
  return copyText(clipboardText);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showCopyStatus('Kopiert!');
  } catch {
    showCopyStatus('Kopieren fehlgeschlagen.');
  }
}

function copyArtAltText() {
  const [, animalName] = animalList[currentAnimalIndex];
  const [, itemName] = items[currentItemIndex];
  const art = document.getElementById('ascii-art').textContent;
  return copyText(`ASCII-Zeichnung. Tier: ${animalName}. Gegenstand: ${itemName}.\n\n${art}`);
}

function renderArtPng() {
  const art = document.getElementById('ascii-art');
  const lines = art.textContent.split('\n');
  const style = getComputedStyle(art);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const font = `${style.fontSize} ${style.fontFamily}`;
  const lineHeight = parseFloat(style.lineHeight);

  context.font = font;
  const offsets = lines.map(() => 0);
  if (art.querySelector('.owl-feet')) {
    const lastLine = lines.length - 1;
    lines[lastLine] = lines[lastLine].trimStart();
    offsets[lastLine] = (5 * context.measureText('0').width - context.measureText(lines[lastLine]).width) / 2;
  }

  const leftEdge = Math.min(0, ...offsets);
  const rightEdge = Math.max(...lines.map((line, index) => offsets[index] + context.measureText(line).width));
  const artWidth = rightEdge - leftEdge;
  const artHeight = lines.length * lineHeight;
  canvas.width = 800;
  canvas.height = 600;
  const scale = Math.min(canvas.width * 0.75 / artWidth, canvas.height * 0.6 / artHeight);
  const left = (canvas.width - artWidth * scale) / 2;
  const top = (canvas.height - artHeight * scale) / 2;
  context.fillStyle = getComputedStyle(document.body).backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.translate(left, top);
  context.scale(scale, scale);
  context.fillStyle = style.color;
  context.font = font;
  context.textBaseline = 'middle';
  lines.forEach((line, index) => {
    context.fillText(line, offsets[index] - leftEdge, (index + 0.5) * lineHeight);
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) resolve(blob);
      else reject(new Error('PNG konnte nicht erstellt werden.'));
    }, 'image/png');
  });
}

async function copyArtImage() {
  try {
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': renderArtPng() })]);
    showCopyStatus('Kopiert!');
  } catch {
    showCopyStatus('Bild konnte nicht kopiert werden.');
  }
}

document.getElementById('change-item').addEventListener('click', changeItem);
document.getElementById('change-animal').addEventListener('click', changeAnimal);
document.getElementById('copy-art').addEventListener('click', () => copyArt());
document.getElementById('copy-bluesky').addEventListener('click', () => copyArt(true));
document.getElementById('copy-image').addEventListener('click', copyArtImage);
document.getElementById('copy-alt-text').addEventListener('click', copyArtAltText);
