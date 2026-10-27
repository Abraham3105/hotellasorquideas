const fs = require('node:fs');
const photos = [
  ['cabana-entre-arboles.jpeg', 'Cabaña entre árboles y jardines del hotel'],
  ['quebrada-puente.jpeg', 'Puente sobre la quebrada entre los jardines'],
  ['cabanas-vista-aerea.jpeg', 'Vista aérea de las cabañas rodeadas de vegetación'],
  ['sendero-bosque.jpeg', 'Sendero para caminar entre los árboles'],
  ['sendero.jpeg', 'Escalones de piedra en el sendero del hotel'],
  ['jardin-puente.jpeg', 'Jardín y puente peatonal bajo el sol'],
  ['hotel-vista-aerea.jpeg', 'Vista aérea del hotel y sus áreas verdes'],
  ['puente.jpeg', 'Puente peatonal junto a los jardines']
];
let gallery = fs.readFileSync('views/pages/galeria.html', 'utf8');
const start = gallery.indexOf('<div class="gallery-grid">');
const end = gallery.indexOf('<div class="gallery-caption">');
gallery = gallery.slice(0,start) + '<div class="gallery-grid gallery-curated">' + photos.map(([file,alt]) => `<div class="gallery-item"><img src="assets/imagenes/lugares/${file}" alt="${alt}" loading="lazy" decoding="async"></div>`).join('') + '</div>' + gallery.slice(end);
fs.writeFileSync('views/pages/galeria.html',gallery);
let location = fs.readFileSync('views/pages/ubicacion.html','utf8');
location = location.replace(/<img[^>]+>/, '<img src="assets/imagenes/lugares/jardin-puente.jpeg" alt="Jardines y puente peatonal del hotel" loading="lazy" width="960" height="1280">');
fs.writeFileSync('views/pages/ubicacion.html',location);
let index = fs.readFileSync('views/index.html','utf8');
for (const [marker,html] of [['PhotoGallery',gallery],['LocationSection',location]]) index = index.replace(new RegExp(`<!-- BEGIN: ${marker} -->[\\s\\S]*?<!-- END: ${marker} -->`), () => `<!-- BEGIN: ${marker} -->\n${html}<!-- END: ${marker} -->`);
fs.writeFileSync('views/index.html',index);
for(const [file] of photos) if(!fs.existsSync('views/assets/imagenes/lugares/'+file)) throw new Error('Falta foto: '+file);
console.log('OK: ocho fotografías locales en la galería y ubicación actualizada.');
