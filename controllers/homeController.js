const fs = require('node:fs/promises');
const path = require('node:path');
const { validateBooking } = require('../models/booking');
async function home(req, res) {
  let html = await fs.readFile(path.join(__dirname, '../views/index.html'), 'utf8');
  const sections = { NavigationBar:'header', MobileNavDrawer:'menu', HeroSection:'hero', QuickBookingSearch:'reservas', HighlightsSection:'experiencias', AccommodationSection:'habitaciones', PetFriendlySection:'petfriendly', PhotoGallery:'galeria', LocationSection:'ubicacion', TestimonialsSection:'testimonios', BottomNavigationMobile:'navegacion', MainFooter:'footer' };
  for (const [marker, file] of Object.entries(sections)) {
    const partial = await fs.readFile(path.join(__dirname, '../views/pages', file + '.html'), 'utf8');
    html = html.replace(new RegExp(`<!-- BEGIN: ${marker} -->[\\s\\S]*?<!-- END: ${marker} -->`), () => partial);
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(html);
}
function availability(url, res) {
  const result = validateBooking(Object.fromEntries(url.searchParams));
  res.writeHead(result.error ? 400 : 200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(result));
}
module.exports = { home, availability };
