const fs = require('node:fs');
const cards = [
  ['Cabina 5','cabina-5/exterior.jpeg','Para una o dos personas','Balcón y cama matrimonial.',[['Pareja','₡35.000']]],
  ['Cabina 6','cabina-6/exterior.jpeg','Hasta tres personas','Cama matrimonial y cama individual.',[['Pareja','₡35.000'],['Tres personas','₡45.000']]],
  ['Estudio pareja','estudio-pareja/exterior.jpeg','Para una escapada en pareja','Un espacio independiente con balcón.',[['Pareja · entre semana','₡45.000'],['Pareja · fin de semana','₡50.000']]],
  ['Villa','villa/exterior-frente.jpeg','Hasta cinco personas','Más espacio para compartir en familia.',[['Pareja','₡40.000'],['Cuatro personas','₡55.000'],['Cinco personas','₡65.000']]]
];
const html = `<section id="habitaciones" class="section rooms rooms-simple"><div class="section-heading"><div><span class="eyebrow">Alojamiento</span><h2>Elegí dónde quedarte.</h2></div><p>Cuatro opciones para tu visita a Tarrazú.<br>Todos los precios incluyen desayuno.</p></div><div class="room-grid">${cards.map(([name,src,capacity,description,rates]) => `<article class="room-card"><a class="room-card-photo" href="#reservas" aria-label="Consultar ${name}"><img src="assets/imagenes/${src}" alt="Fachada de ${name}" loading="lazy" decoding="async"></a><div class="room-card-info"><span class="eyebrow">${name}</span><h3>${capacity}</h3><p class="room-card-description">${description}</p><dl class="card-rates">${rates.map(([label,price])=>`<div><dt>${label}</dt><dd>${price}</dd></div>`).join('')}</dl><small class="rate-unit">Precio por noche · Desayuno incluido</small><a class="room-details-link" href="#reservas">Ver fotos y detalles <span>→</span></a></div></article>`).join('')}</div><p class="room-individual-note">Tarifa individual en todos los alojamientos: <strong>₡22.000 por noche</strong>, con desayuno incluido.</p></section>\n`;
fs.writeFileSync('views/pages/habitaciones.html',html);
let index = fs.readFileSync('views/index.html','utf8');
index = index.replace(/<!-- BEGIN: AccommodationSection -->[\s\S]*?<!-- END: AccommodationSection -->/,()=>`<!-- BEGIN: AccommodationSection -->\n${html}<!-- END: AccommodationSection -->`);
fs.writeFileSync('views/index.html',index);
let js = fs.readFileSync('views/assets/js/rooms.js','utf8');
const start = js.indexOf("  const featured =");
const end = js.indexOf('  const descriptions =');
js = js.slice(0,start) + '  const rooms = [];\n' + js.slice(end);
js = js.replace('  const descriptions = [', `  const descriptions = [\n    ['Cabina 5', 'Cabina para una o dos personas, con cama matrimonial y balcón.', ['Cama matrimonial', 'Baño privado', 'Balcón', 'Agua caliente', 'Parqueo']],`);
js = js.replace("  const ratesByRoom = {", "  const ratesByRoom = {\n    'Cabina 5': [['Individual', '₡22.000'], ['Pareja', '₡35.000']],");
const controlStart = js.indexOf("  track.id = 'room-carousel';");
const controlEnd = js.indexOf("  const modal = document.createElement('dialog');");
js = js.slice(0,controlStart) + "  track.setAttribute('aria-label', 'Opciones de alojamiento');\n" + js.slice(controlEnd);
js = js.replace("    const details = document.createElement('a'); details.href = '#reservas'; details.className = 'room-details-link'; details.textContent = 'Explorar alojamiento ↗';\n    card.querySelector('.room-card-info').append(details); connect(details, index);", "    connect(card.querySelector('.room-details-link'), index);");
js = js.replace(/^  const featuredLink = .*\r?\n/m, '');
js = js.replace('TONOS DE VERDE, MOMENTOS DE CALMA','Fotos y detalles del alojamiento');
fs.writeFileSync('views/assets/js/rooms.js',js);
