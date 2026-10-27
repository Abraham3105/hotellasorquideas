const fs = require('node:fs');
const html = fs.readFileSync('code.html', 'utf8');
for (const dir of ['views/assets/css', 'views/assets/js', 'views/assets/imagenes', 'views/pages', 'controllers', 'models']) fs.mkdirSync(dir, { recursive: true });
const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
fs.writeFileSync('views/assets/css/styles.css', css + '\nsection[id]{scroll-margin-top:80px} footer{background:#14240d;padding-bottom:100px!important} :focus-visible{outline:2px solid #4d7c0f;outline-offset:4px} .booking-result{font-size:12px;line-height:1.6;padding:12px;background:#f2f8f2;border-radius:10px} dialog{border:0;border-radius:18px;padding:16px;max-width:min(90vw,900px)}dialog::backdrop{background:#000b}dialog img{max-width:100%;max-height:75vh;object-fit:contain} dialog button{display:block;margin:8px 0 0 auto;cursor:pointer} @media(min-width:900px){main.max-w-md,header>div.max-w-md,footer>div.max-w-md{max-width:1000px} main>section{margin-top:48px} [data-purpose="hero-banner"]>div{height:520px} [data-purpose="hero-banner"] h1{font-size:56px} [data-purpose="hero-banner"] p{font-size:16px} [data-purpose="experience-features"]>div.grid{grid-template-columns:repeat(4,1fr)} [data-purpose="hotel-gallery"] img{height:200px}}\n');
const scripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)];
fs.writeFileSync('views/assets/js/tailwind.config.js', scripts.find(m => m[2].includes('tailwind.config'))[2].replace("900: '#22380d'", "900: '#22380d', 950: '#14240d'"));
let result = html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '').replace(/<script(?![^>]*src=)[^>]*>[\s\S]*?<\/script>/g, '');
result = result.replace('</head>', '<script src="assets/js/tailwind.config.js"></script>\n<link rel="stylesheet" href="assets/css/styles.css">\n<script defer src="assets/js/app.js"></script>\n</head>');
result = result.replace('initial-scale=1.0, maximum-scale=1.0, user-scalable=no', 'initial-scale=1.0');
result = result.replace(' onsubmit="event.preventDefault();"', '').replace('Temporada 2024 / 2025', 'Consulta tu estadía').replace(/ value="2024-12-1[57]"/g, '').replace('© 2024', '© <span data-year></span>');
result = result.replace('id="menu-btn"', 'id="menu-btn" aria-expanded="false" aria-controls="mobile-menu"').replace('id="close-menu-btn"', 'id="close-menu-btn" aria-label="Cerrar menú"');
let dateIndex = 0;
result = result.replace(/type="date"/g, () => `type="date" required name="${dateIndex++ === 0 ? 'arrival' : 'departure'}"`);
result = result.replace(/<select class=/, '<select name="guests" aria-label="Huéspedes" class=');
result = result.replace(/<label class="([^"]*)">Llegada<\/label>/, '<label for="arrival" class="$1">Llegada</label>').replace('name="arrival"', 'name="arrival" id="arrival"');
result = result.replace(/<label class="([^"]*)">Salida<\/label>/, '<label for="departure" class="$1">Salida</label>').replace('name="departure"', 'name="departure" id="departure"');
result = result.replace(/<label class="([^"]*)">Huéspedes<\/label>/, '<label for="guests" class="$1">Huéspedes</label>').replace('name="guests"', 'name="guests" id="guests"');
result = result.replace(/target="_blank"/g, 'target="_blank" rel="noopener noreferrer"');
result = result.replace('href="https://maps.google.com"', 'href="https://www.google.com/maps/search/?api=1&amp;query=Hotel+Las+Orquideas+San+Lorenzo+de+Tarrazu"');
// The source contains a fictitious phone: avoid presenting it as a verified contact.
result = result.replace('href="tel:+50688888888"', 'href="#reservas"').replace('aria-label="Llamar al hotel"', 'aria-label="Consultar fechas"');
const names = {NavigationBar:'header',MobileNavDrawer:'menu',HeroSection:'hero',QuickBookingSearch:'reservas',HighlightsSection:'experiencias',AccommodationSection:'habitaciones',PhotoGallery:'galeria',LocationSection:'ubicacion',TestimonialsSection:'testimonios',BottomNavigationMobile:'navegacion',MainFooter:'footer'};
for (const [marker, name] of Object.entries(names)) {
  const re = new RegExp(`<!-- BEGIN: ${marker} -->([\\s\\S]*?)<!-- END: ${marker} -->`);
  const match = result.match(re);
  fs.writeFileSync(`views/pages/${name}.html`, match[1].trim() + '\n');
}
fs.writeFileSync('views/index.html', result);
fs.copyFileSync('screen.png', 'views/assets/imagenes/referencia.png');
