'use strict';
(() => {
  const section = document.getElementById('habitaciones');
  const track = section.querySelector('.room-grid');
  const rooms = [];
  const descriptions = [
    ['Cabina 5', 'Cabina para una persona o pareja, con cama matrimonial y balcón.', ['Individual o pareja', 'Cama matrimonial', 'Baño privado', 'Balcón', 'Agua caliente', 'Parqueo']],
    ['Una escapada para compartir.', 'Disfrutá de Tarrazú en pareja o en un grupo de tres personas.', ['Hasta 3 personas', 'Desayuno incluido']],
    ['Cabina 7', 'Alojamiento para hasta cuatro personas, con balcón y área de cocina.', ['Hasta 4 personas', 'Balcón', 'Área de cocina', 'Desayuno incluido']],
    ['Un estudio para dos.', 'Elegí una escapada entre semana o disfrutá del fin de semana en pareja.', ['Para parejas', 'Desayuno incluido']],
    ['Más espacio para compartir.', 'Una opción para planear una escapada en pareja o en un grupo de hasta cinco personas.', ['Hasta 5 personas', 'Desayuno incluido']]
  ];
  const ratesByRoom = {
    'Cabina 5': [['Individual', '₡22.000'], ['Pareja', '₡35.000']],
    'Cabina 6': [['Individual', '₡22.000'], ['Pareja', '₡35.000'], ['Tres personas', '₡45.000']],
    'Cabina 7': [['Individual', '₡22.000'], ['Cuatro personas', '₡50.000']],
    'Estudio pareja': [['Individual', '₡22.000'], ['Pareja · entre semana', '₡45.000'], ['Pareja · fin de semana', '₡50.000']],
    'Villa': [['Individual', '₡22.000'], ['Pareja', '₡40.000'], ['Cuatro personas', '₡55.000'], ['Cinco personas', '₡65.000']]
  };
  [...track.querySelectorAll('.room-card')].forEach((card, i) => {
    rooms.push({ name: card.querySelector('.eyebrow').textContent,
      title: descriptions[i][0], description: descriptions[i][1], amenities: descriptions[i][2],
      image: card.querySelector('img').src,
      rates: ratesByRoom[card.querySelector('.eyebrow').textContent] });
  });
  const villa = rooms.find(room => room.name === 'Villa');
  villa.photos = [
    ['exterior-frente.jpeg', 'Fachada y entrada de la Villa'],
    ['sala.jpeg', 'Sala de la Villa con sofá y chimenea'],
    ['habitacion-matrimonial.jpeg', 'Habitación matrimonial de la Villa'],
    ['habitacion-dos-camas.jpeg', 'Habitación de la Villa con dos camas'],
    ['sala-desde-escalera.jpeg', 'Vista de la sala desde la escalera'],
    ['planta-alta.jpeg', 'Pasillo y zona de descanso en la planta alta'],
    ['bano.jpeg', 'Baño de la Villa'],
    ['exterior-lateral.jpeg', 'Vista lateral de la Villa y sus jardines']
  ].map(([file, alt]) => ({ src: 'assets/imagenes/villa/' + file, alt }));
  villa.image = villa.photos[0].src;
  const cabin5 = rooms[0];
  cabin5.photos = [
    ['exterior.jpeg', 'Fachada y entrada de la Cabina 5'],
    ['cama-matrimonial.jpeg', 'Cama matrimonial de la Cabina 5'],
    ['habitacion-balcon.jpeg', 'Habitación y acceso al balcón de la Cabina 5'],
    ['comedor-balcon.jpeg', 'Mesa y sillas junto al balcón de la Cabina 5'],
    ['bano.jpeg', 'Baño y ducha de la Cabina 5'],
    ['lavamanos.jpeg', 'Lavamanos y servicios de la Cabina 5']
  ].map(([file, alt]) => ({ src: 'assets/imagenes/cabina-5/' + file, alt }));
  cabin5.image = cabin5.photos[0].src;
  const cabin6 = rooms.find(room => room.name === 'Cabina 6');
  cabin6.photos = [
    ['exterior.jpeg', 'Fachada y entrada de la Cabina 6'],
    ['habitacion.jpeg', 'Cabina 6 con cama matrimonial y cama individual'],
    ['interior-balcon.jpeg', 'Interior de la Cabina 6 y acceso al balcón'],
    ['balcon.jpeg', 'Balcón de la Cabina 6 rodeado de vegetación'],
    ['cocina.jpeg', 'Área de cocina de la Cabina 6'],
    ['bano.jpeg', 'Baño y ducha de la Cabina 6']
  ].map(([file, alt]) => ({ src: 'assets/imagenes/cabina-6/' + file, alt }));
  cabin6.image = cabin6.photos[0].src;
  const cabin7 = rooms.find(room => room.name === 'Cabina 7');
  cabin7.photos = [
    ['habitacion-principal.jpeg', 'Habitación principal de la Cabina 7'],
    ['habitacion-secundaria.jpeg', 'Segunda habitación de la Cabina 7'],
    ['cocina-comedor.jpeg', 'Área de cocina y comedor de la Cabina 7'],
    ['balcon.jpeg', 'Balcón de la Cabina 7 rodeado de vegetación']
  ].map(([file, alt]) => ({ src: 'assets/imagenes/cabina-7/' + file, alt }));
  cabin7.image = cabin7.photos[0].src;
  const studio = rooms.find(room => room.name === 'Estudio pareja');
  studio.photos = [
    ['exterior.jpeg', 'Fachada del Estudio para pareja'],
    ['interior.jpeg', 'Vista general del Estudio para pareja'],
    ['habitacion.jpeg', 'Habitación matrimonial del Estudio'],
    ['jacuzzi.jpeg', 'Jacuzzi del Estudio junto a la ventana'],
    ['balcon.jpeg', 'Balcón de madera rodeado de vegetación'],
    ['cama-y-jacuzzi.jpeg', 'Cama matrimonial y jacuzzi del Estudio'],
    ['cocina-comedor.jpeg', 'Cocina y comedor del Estudio']
  ].map(([file, alt]) => ({ src: 'assets/imagenes/estudio-pareja/' + file, alt }));
  studio.image = studio.photos[0].src;
  track.setAttribute('aria-label', 'Opciones de alojamiento');
  track.id = 'room-carousel';
  const carouselControls = document.createElement('div');
  carouselControls.className = 'room-slider-controls';
  carouselControls.innerHTML = '<span class="room-slider-position" aria-live="polite"></span><div><button type="button" data-room-slide="-1" aria-label="Alojamientos anteriores" aria-controls="room-carousel">←</button><button type="button" data-room-slide="1" aria-label="Más alojamientos" aria-controls="room-carousel">→</button></div>';
  track.after(carouselControls);
  const sliderCards = [...track.querySelectorAll('.room-card')];
  function updateSlider() {
    const width = sliderCards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
    const current = Math.min(sliderCards.length - 1, Math.max(0, Math.round(track.scrollLeft / width)));
    const visible = Math.max(1, Math.round((track.clientWidth + parseFloat(getComputedStyle(track).columnGap)) / width));
    carouselControls.querySelector('.room-slider-position').textContent = `${current + 1}–${Math.min(sliderCards.length, current + visible)} de ${sliderCards.length} alojamientos`;
    carouselControls.querySelector('[data-room-slide="-1"]').disabled = track.scrollLeft <= 2;
    carouselControls.querySelector('[data-room-slide="1"]').disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }
  carouselControls.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    const step = sliderCards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
    track.scrollBy({left: step * Number(button.dataset.roomSlide), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }));
  track.addEventListener('scroll', updateSlider, {passive:true});
  new ResizeObserver(updateSlider).observe(track);
  const modal = document.createElement('dialog'); modal.className = 'room-dialog';
  modal.setAttribute('aria-labelledby','room-dialog-title');
  modal.innerHTML = `<div class="room-dialog-top"><span class="eyebrow">Fotos y detalles del alojamiento</span><button type="button" class="room-close" aria-label="Cerrar detalles del alojamiento" autofocus>✕</button></div>
    <div class="room-dialog-layout"><div class="room-dialog-photo"><img alt=""><span>Imagen ilustrativa del prototipo</span></div><div class="room-dialog-content"><span class="eyebrow" data-room-name></span><h2 id="room-dialog-title"></h2><p data-room-description></p><h3>Servicios de la cabina</h3><ul class="room-amenities"></ul><p class="breakfast-note">Todos los precios incluyen desayuno.</p><div class="room-rates"></div><p class="room-disclaimer">Precios por noche. Tarifa individual de ₡22.000 en todos los alojamientos. Disponibilidad sujeta a confirmación.</p><button type="button" class="button button-dark room-inquire">Consultar este alojamiento ↗</button></div></div>
    <div class="room-dialog-nav"><button type="button" data-step="-1">← Anterior</button><span aria-live="polite" data-room-counter></span><button type="button" data-step="1">Siguiente →</button></div>`;
  document.body.append(modal);
  const photoArea = modal.querySelector('.room-dialog-photo');
  const photoStage = document.createElement('div'); photoStage.className = 'room-photo-stage';
  photoStage.append(...photoArea.childNodes); photoArea.append(photoStage);
  const photoControls = document.createElement('div'); photoControls.className = 'room-photo-controls';
  photoControls.innerHTML = '<button type="button" data-photo-step="-1" aria-label="Foto anterior">←</button><span aria-live="polite" data-photo-counter></span><button type="button" data-photo-step="1" aria-label="Foto siguiente">→</button>';
  photoStage.append(photoControls);
  const thumbs = document.createElement('div'); thumbs.className = 'room-photo-thumbs'; thumbs.setAttribute('aria-label','Fotos del alojamiento'); photoArea.append(thumbs);
  let selected = 0, photoIndex = 0, opener;
  function showPhoto(index) {
    const room = rooms[selected];
    const photos = room.photos || [{src:room.image, alt:'Imagen de referencia para ' + room.name}];
    photoIndex = (index + photos.length) % photos.length;
    const img = photoStage.querySelector('img'); img.src = photos[photoIndex].src; img.alt = photos[photoIndex].alt;
    photoStage.querySelector(':scope > span').textContent = room.photos ? photos[photoIndex].alt : 'Imagen ilustrativa del prototipo';
    photoControls.hidden = photos.length < 2;
    photoControls.querySelector('[data-photo-counter]').textContent = `${photoIndex + 1} / ${photos.length}`;
    [...thumbs.children].forEach((button, i) => button.setAttribute('aria-pressed', String(i === photoIndex)));
  }
  photoControls.querySelectorAll('button').forEach(button => button.addEventListener('click', () => showPhoto(photoIndex + Number(button.dataset.photoStep))));
  let touchStart;
  photoStage.addEventListener('touchstart', e => { touchStart = {x:e.changedTouches[0].clientX, y:e.changedTouches[0].clientY}; }, {passive:true});
  photoStage.addEventListener('touchend', e => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x, dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) showPhoto(photoIndex + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, {passive:true});
  const render = index => {
    selected = (index + rooms.length) % rooms.length;
    const room = rooms[selected];
    modal.querySelector('[data-room-name]').textContent = room.name;
    modal.querySelector('h2').textContent = room.title;
    modal.querySelector('[data-room-description]').textContent = room.description;
    modal.querySelector('.room-disclaimer').textContent = ['Cabina 5', 'Estudio pareja'].includes(room.name)
      ? 'Alojamiento individual o para pareja. Tarifa individual ₡22.000. Precios por noche con desayuno incluido. Disponibilidad sujeta a confirmación.'
      : 'Precios por noche con desayuno incluido. Tarifa individual de ₡22.000. Disponibilidad sujeta a confirmación.';
    thumbs.replaceChildren(); thumbs.hidden = !room.photos;
    photoArea.classList.toggle('has-gallery', Boolean(room.photos));
    (room.photos || []).forEach((photo, i) => {
      const button = document.createElement('button'); button.type = 'button'; button.setAttribute('aria-label', `Ver foto ${i + 1}: ${photo.alt}`);
      const thumb = document.createElement('img'); thumb.src = photo.src; thumb.alt = ''; thumb.loading = 'lazy'; thumb.decoding = 'async'; button.append(thumb);
      button.addEventListener('click', () => showPhoto(i)); thumbs.append(button);
    });
    showPhoto(0);
    const list = modal.querySelector('ul'); list.replaceChildren();
    room.amenities.forEach(text => { const li = document.createElement('li'); li.textContent = text; list.append(li); });
    const rates = modal.querySelector('.room-rates'); rates.replaceChildren();
    room.rates.forEach(([label, price]) => { const row = document.createElement('div'), name = document.createElement('span'), amount = document.createElement('strong'); name.textContent = label; amount.textContent = price; row.append(name, amount); rates.append(row); });
    modal.querySelector('[data-room-counter]').textContent = `${room.name} · ${selected + 1} de ${rooms.length}`;
  };
  function open(index, source) { opener = source; render(index); modal.showModal(); document.body.style.overflow = 'hidden'; }
  const closeModal = () => modal.close();
  modal.querySelector('.room-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) { const box = modal.getBoundingClientRect(); if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) closeModal(); } });
  modal.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus({preventScroll:true}); });
  modal.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => render(selected + Number(button.dataset.step))));
  modal.addEventListener('keydown', e => {
    if (!['ArrowLeft','ArrowRight'].includes(e.key) || e.target.closest('input,select')) return;
    e.preventDefault();
    if (e.target.closest('.room-dialog-photo') && rooms[selected].photos) showPhoto(photoIndex + (e.key === 'ArrowRight' ? 1 : -1));
    else render(selected + (e.key === 'ArrowRight' ? 1 : -1));
  });
  function connect(link, index) {
    link.setAttribute('aria-haspopup','dialog'); link.setAttribute('aria-label', 'Ver fotos, información y tarifas de ' + rooms[index].name);
    link.addEventListener('click', e => { e.preventDefault(); open(index, link); });
  }
  [...track.querySelectorAll('.room-card')].forEach((card, index) => {
    connect(card.querySelector('a'), index);
    connect(card.querySelector('.room-details-link'), index);
  });
  const form = document.getElementById('booking-form');
  const field = document.createElement('div'); field.className = 'field room-choice-field';
  const label = document.createElement('label'); label.htmlFor = 'room-choice'; label.textContent = '04 / ALOJAMIENTO';
  const choice = document.createElement('select'); choice.id = 'room-choice'; choice.name = 'room';
  ['Sin preferencia', ...rooms.map(room => room.name)].forEach(name => { const option = document.createElement('option'); option.value = name === 'Sin preferencia' ? '' : name; option.textContent = name; choice.append(option); });
  field.append(label, choice); form.insertBefore(field, form.querySelector('button[type="submit"]'));
  function syncRoomGuests() {
    const coupleOnly = ['Cabina 5', 'Estudio pareja'].includes(choice.value);
    const guests = form.elements.guests;
    [...guests.options].forEach(option => { option.disabled = coupleOnly && !['1 Huésped', '2 Huéspedes (Pareja)'].includes(option.value); option.hidden = option.disabled; });
    if (coupleOnly && !['1 Huésped', '2 Huéspedes (Pareja)'].includes(guests.value)) guests.value = '2 Huéspedes (Pareja)';
  }
  choice.addEventListener('change', syncRoomGuests);
  modal.querySelector('.room-inquire').addEventListener('click', () => {
    choice.value = rooms[selected].name; syncRoomGuests(); modal.close();
    document.getElementById('reservas').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    document.getElementById('arrival').focus({preventScroll:true});
  });
})();
