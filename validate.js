const crypto = require('crypto');

const explorer = 'https://ordinals.com';
const inscriptionId = process.argv[2];
const url = `${explorer}/content/${inscriptionId}`;

const manifestoHash =
  '28b1308528f8be2f20dc2a7ddc23b206bffd76d152cd019a7aacd5b6a5f732d4';
fetch(url)
  .then((res) => res.text())
  .then((text) => {
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    let isValid = hash === manifestoHash;
    if (isValid) {
      console.log('Goose manifesto is valid');
    } else {
      console.log('Goose manifesto is not valid');
    }
  })
  .catch((err) => console.error('error:' + err));
