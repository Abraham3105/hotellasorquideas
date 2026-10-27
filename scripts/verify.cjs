const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
for (const file of ['server.js','controllers/homeController.js','models/booking.js','views/assets/js/app.js','views/assets/js/rooms.js','views/assets/js/tailwind.config.js']) new vm.Script(fs.readFileSync(file,'utf8'), {filename:file});
const server = require('../server');
server.listen(0, '127.0.0.1', async () => {
  try {
    const base = 'http://127.0.0.1:' + server.address().port;
    for (const route of ['/', '/assets/css/styles.css', '/assets/js/app.js', '/assets/js/tailwind.config.js', '/assets/imagenes/referencia.png']) assert.equal((await fetch(base + route)).status,200,route);
    const html = await (await fetch(base)).text();
    assert.ok(html.includes('id="booking-form"')); assert.ok(!html.includes('onsubmit='));
    assert.equal((await fetch(base+'/api/availability?arrival=2000-01-01&departure=2000-01-02&guests=1+Hu%C3%A9sped')).status,400);
    assert.equal((await fetch(base+'/api/availability?arrival=2099-02-30&departure=2099-03-04&guests=1+Hu%C3%A9sped')).status,400);
    const query = new URLSearchParams({arrival:'2099-01-01',departure:'2099-01-03',guests:'1 Huésped'});
    const response = await fetch(base+'/api/availability?'+query);
    assert.equal(response.status,200); assert.equal((await response.json()).nights,2);
    query.set('room','Cabina 5');
    assert.equal((await (await fetch(base+'/api/availability?'+query)).json()).room,'Cabina 5');
    query.set('room','No existe');
    assert.equal((await fetch(base+'/api/availability?'+query)).status,400);
    assert.equal((await fetch(base+'/models/booking.js')).status,404);
    console.log('OK: sintaxis, página MVC, recursos, fechas inválidas, consulta válida y protección de archivos internos.');
  } catch(e) { console.error(e); process.exitCode = 1; }
  finally { server.close(); }
});
