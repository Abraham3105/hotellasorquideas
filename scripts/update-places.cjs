const fs = require('node:fs');
const base = 'views/pages/';
let hero = fs.readFileSync(base + 'hero.html', 'utf8');
hero = hero.replace('class="hero"', 'class="hero hero-real-photo"').replace(/<img[^>]+>/, '<img src="assets/imagenes/lugares/perrito.jpeg" alt="Perrito disfrutando de las áreas verdes del hotel" fetchpriority="high" width="960" height="1280">');
fs.writeFileSync(base + 'hero.html', hero);
let location = fs.readFileSync(base + 'ubicacion.html', 'utf8');
location = location.replace(/<img[^>]+>/, '<img src="assets/imagenes/lugares/puente.jpeg" alt="Puente peatonal entre las áreas verdes del hotel" loading="lazy" width="960" height="1280">');
fs.writeFileSync(base + 'ubicacion.html', location);
let gallery = fs.readFileSync(base + 'galeria.html', 'utf8');
const photos = [
  ['lugares/sendero.jpeg','Sendero de piedra rodeado de vegetación'],
  ['lugares/puente.jpeg','Puente peatonal en los jardines'],
  ['cabina-5/exterior.jpeg','Fachada de la Cabina 5'],
  ['lugares/panorama.jpeg','Vista panorámica del entorno del hotel']
];
let i = 0;
gallery = gallery.replace(/<img[^>]+>/g, () => { const [src, alt] = photos[i++]; return `<img src="assets/imagenes/${src}" alt="${alt}" loading="lazy" decoding="async">`; });
fs.writeFileSync(base + 'galeria.html', gallery);
let index = fs.readFileSync('views/index.html', 'utf8');
for (const [marker, html] of [['HeroSection',hero],['LocationSection',location],['PhotoGallery',gallery]]) {
  index = index.replace(new RegExp(`<!-- BEGIN: ${marker} -->[\\s\\S]*?<!-- END: ${marker} -->`), () => `<!-- BEGIN: ${marker} -->\n${html}<!-- END: ${marker} -->`);
}
fs.writeFileSync('views/index.html',index);
