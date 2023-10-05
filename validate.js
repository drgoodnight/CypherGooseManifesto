const crypto = require('crypto');

const explorer = 'https://ordinals.com';
const inscriptionId = 'INSCRIPTION_ID';
const url = `${explorer}/content/${inscriptionId}`;

const manifestoHash =
  '1d3c686c4e9a02820bd825700dae97e75a1e157277d0ec2b2f4d851b66f9a5db';
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
