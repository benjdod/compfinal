document.body.onload = () => {
const elt = document.createElement('p');
elt.innerHTML = 'hello from index.js';

document.body.appendChild(elt);
}
