const fs = require('node:fs');
const file = 'views/pages/habitaciones.html';
let html = fs.readFileSync(file, 'utf8');
const images = [...html.matchAll(/<img src="([^"]+)"/g)].map(m => m[1]);
const cards = [
  ['Cabina 6', 'Para dos o tres', images[1], 'Pareja', '35.000', 'Tres personas ₡45.000'],
  ['Cabina 7', 'Compartí entre cuatro', images[2], 'Cuatro personas', '50.000', 'Descanso en grupo'],
  ['Estudio pareja', 'Una escapada para dos', images[3], 'Pareja entre semana', '45.000', 'Fin de semana ₡50.000'],
  ['Villa', 'Más espacio para compartir', images[4], 'Pareja', '40.000', '4 personas ₡55.000 · 5 personas ₡65.000']
];
html = html.replace('<small>Tarifa de referencia desde</small><strong>₡20.000', '<small>Pareja · desayuno incluido</small><strong>₡35.000');
html = html.replace('<div class="room-grid">[unused]', '');
const start = html.indexOf('<div class="room-grid">');
html = html.slice(0, start) + '<div class="room-grid">' + cards.map(([name, title, image, label, price, extra]) => `<article class="room-card"><a class="room-card-photo" href="#reservas" aria-label="Consultar ${name}"><img src="${image}" alt="Imagen ilustrativa para ${name}" loading="lazy"><span class="round-arrow">↗</span></a><div class="room-card-info"><span class="eyebrow">${name}</span><h3>${title}</h3><p>${label} <strong>₡${price}</strong> <span>/ noche</span></p><p>${extra}</p><p>Desayuno incluido · Individual ₡22.000</p></div></article>`).join('') + '</div><p class="breakfast-note">Todos los precios incluyen desayuno. Tarifa individual en todos los alojamientos: <strong>₡22.000 por noche.</strong></p></section>\n';
fs.writeFileSync(file, html);
let index = fs.readFileSync('views/index.html', 'utf8');
index = index.replace(/<!-- BEGIN: AccommodationSection -->[\s\S]*?<!-- END: AccommodationSection -->/, () => '<!-- BEGIN: AccommodationSection -->\n' + html + '<!-- END: AccommodationSection -->');
fs.writeFileSync('views/index.html', index);
