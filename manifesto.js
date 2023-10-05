fetch('/content/f4c92840b4b9c78c20abd8b90638bf589caff0f849bb28d488f74d2b902bd8a4i0')
  .then(response => response.json())
  .then(data => {
    document.getElementById('title').innerText = data.title;

    const manifestoDiv = document.getElementById('manifesto');
    manifestoDiv.innerHTML = `<header>
      <h1>${data.title}</h1>
      </header>
      <p>${data.author}</p>
      <p>${data.date}</p>`;

    // Adding paragraphs
    data.content.forEach(para => {
      manifestoDiv.innerHTML += `<p>${para}</p>`;
    });
  });

let blockHeight;
const mod = 2 ** 31 - 1;
const a = 1103515245;
const c = 12345;
let seed;

async function getBlockHeight() {
  const response = await fetch('/blockheight');
  blockHeight = await response.text() || 0;
  seed = hashCode(blockHeight);
  init();
}

function random() {
  seed = (a * seed + c) % mod;
  return seed / mod;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(random() * 16)];
  }
  return color;
}

function hashCode(str) {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function init() {
  document.body.style.color = getRandomColor();
}
getBlockHeight();
setTimeout(function() {
  location.reload();
}, 60000);