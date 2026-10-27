'use strict';
const menu = document.getElementById('mobile-menu');
const trigger = document.getElementById('menu-btn');
function setMenu(open) {
  menu.classList.toggle('hidden', !open);
  trigger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
  (open ? document.getElementById('close-menu-btn') : trigger).focus();
}
trigger.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
document.getElementById('close-menu-btn').addEventListener('click', () => setMenu(false));
menu.addEventListener('click', event => { if (event.target === menu || event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (menu.classList.contains('hidden')) return;
  if (event.key === 'Escape') setMenu(false);
  if (event.key === 'Tab') {
    const items = [...menu.querySelectorAll('button,a[href]')];
    const first = items[0], last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
const form = document.getElementById('booking-form');
const arrival = form.elements.arrival, departure = form.elements.departure;
const today = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Costa_Rica',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
arrival.min = today;
function syncDates() {
  if (!arrival.value) return;
  const next = new Date(arrival.value + 'T12:00:00Z'); next.setUTCDate(next.getUTCDate() + 1);
  departure.min = next.toISOString().slice(0,10);
  if (departure.value && departure.value < departure.min) departure.value = '';
}
arrival.addEventListener('change', syncDates);
const output = document.createElement('p'); output.setAttribute('role','status'); output.hidden = true; output.className = 'booking-result'; form.append(output);
form.addEventListener('submit', event => {
  event.preventDefault(); syncDates(); if (!form.reportValidity()) return;
  output.hidden = false;
  if (departure.value <= arrival.value) { output.textContent = 'La salida debe ser posterior a la llegada.'; return; }
  const data = new FormData(form);
  const formatDate = value => value.split('-').reverse().join('/');
  const message = [
    'Hola, Hotel Las Orquídeas. Quisiera consultar disponibilidad.',
    `Alojamiento: ${data.get('room') || 'Sin preferencia'}`,
    `Llegada: ${formatDate(arrival.value)}`,
    `Salida: ${formatDate(departure.value)}`,
    `Huéspedes: ${data.get('guests')}`,
    '¿Me pueden confirmar disponibilidad y tarifa con desayuno incluido?'
  ].join('\n');
  output.textContent = 'Continuá en WhatsApp para confirmar disponibilidad con el hotel. Esta consulta no crea una reserva.';
  window.location.assign('https://wa.me/50686641703?text=' + encodeURIComponent(message));
});
document.querySelectorAll('.nav-item[href^="#"]').forEach(item => item.addEventListener('click', () => {
  document.querySelectorAll('.nav-item[href^="#"]').forEach(link => { link.classList.remove('active','text-forest-800','font-semibold'); link.classList.add('text-gray-500'); link.removeAttribute('aria-current'); });
  item.classList.add('active','text-forest-800','font-semibold'); item.classList.remove('text-gray-500'); item.setAttribute('aria-current','location');
}));
const dialog = document.createElement('dialog');
dialog.className = 'gallery-dialog';
const photo = document.createElement('img');
const close = document.createElement('button'); close.textContent = 'Cerrar fotografía'; close.addEventListener('click', () => dialog.close());
const caption = document.createElement('p'); caption.id = 'gallery-photo-caption'; caption.setAttribute('aria-live', 'polite');
const galleryControls = document.createElement('div'); galleryControls.className = 'gallery-dialog-controls';
const previousPhoto = document.createElement('button'); previousPhoto.type = 'button'; previousPhoto.textContent = '← Anterior';
const nextPhoto = document.createElement('button'); nextPhoto.type = 'button'; nextPhoto.textContent = 'Siguiente →';
galleryControls.append(previousPhoto, close, nextPhoto);
dialog.setAttribute('aria-label','Fotografías del hotel'); dialog.setAttribute('aria-describedby', caption.id); dialog.append(photo, caption, galleryControls); document.body.append(dialog);
const galleryPhotos = [...document.querySelectorAll('#galeria img')];
let galleryIndex = 0, galleryOpener;
function showGalleryPhoto(index) {
  galleryIndex = (index + galleryPhotos.length) % galleryPhotos.length;
  const current = galleryPhotos[galleryIndex]; photo.src = current.src; photo.alt = current.alt;
  caption.textContent = `${current.alt} · ${galleryIndex + 1} de ${galleryPhotos.length}`;
}
previousPhoto.addEventListener('click', () => showGalleryPhoto(galleryIndex - 1));
nextPhoto.addEventListener('click', () => showGalleryPhoto(galleryIndex + 1));
dialog.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); showGalleryPhoto(galleryIndex + (e.key === 'ArrowRight' ? 1 : -1)); }
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; galleryOpener?.focus({preventScroll:true}); });
dialog.addEventListener('click', e => {
  if (e.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close();
});
galleryPhotos.forEach((img, index) => {
  const button = document.createElement('button'); button.type = 'button'; button.setAttribute('aria-label', 'Ampliar: ' + img.alt); button.style.cssText = 'display:block;width:100%;padding:0;border:0';
  img.replaceWith(button); button.append(img);
  button.setAttribute('aria-haspopup', 'dialog');
  button.addEventListener('click', () => { galleryOpener = button; showGalleryPhoto(index); dialog.showModal(); close.focus(); document.body.style.overflow = 'hidden'; });
});
