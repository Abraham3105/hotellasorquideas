# Hotel Las Orquídeas

Rediseño del hotel con tipografía editorial, paleta verde y crema, portada panorámica y distribución adaptable. HTML, CSS y JavaScript separados con base MVC en Node.js (20 o posterior), sin dependencias npm.

## Ejecutar

```sh
npm start
```

Abrir http://localhost:3000. También se puede abrir `views/index.html` directamente para ver la maqueta; el endpoint de consulta requiere el servidor.

Si npm no está disponible, ejecutar `node server.js`. No hace falta instalar paquetes. Comprobar rutas y validaciones con `node scripts/verify.cjs`.

## Estructura

```text
controllers/homeController.js   Renderiza secciones y atiende la consulta
models/booking.js              Reglas de fechas y huéspedes
server.js                      Rutas HTTP y archivos públicos
views/
  index.html                   Página completa y plantilla de composición
  pages/                       Secciones HTML editables usadas por MVC
  assets/
    css/styles.css             Estilos y adaptación a escritorio
    js/tailwind.config.js      Archivo legado, sin uso en el rediseño
    js/app.js                  Menú, formulario, navegación y galería
    imagenes/referencia.png    Captura original del ZIP
```

Con el servidor, editar las secciones en `views/pages/`; el controlador las incorpora en `views/index.html`. La copia completa en index permite previsualización estática, pero no se sincroniza automáticamente al editar las secciones.

## Alcance y pendientes para producción

Menú con teclado, galería ampliable y consulta con validación en cliente y servidor. La consulta no confirma disponibilidad, no guarda datos y no crea reservas. Conectar inventario, tarifas y persistencia antes de ofrecer reservas reales.

El módulo `views/assets/js/rooms.js` agrega un carrusel táctil de cinco alojamientos y fichas accesibles con cierre por Escape, navegación anterior/siguiente y selección para el formulario. Las fichas muestran las imágenes ilustrativas disponibles del prototipo; reemplazarlas por fotos reales antes de publicar. Cabina 5 incluye tres tarifas; las demás opciones muestran únicamente el precio y los servicios disponibles en la referencia original.

El diseño usa CSS propio y funciona sin Tailwind. Google Fonts y las imágenes remotas originales requieren conexión; las fuentes cuentan con alternativas del sistema. `imagenes/` contiene la referencia; las fotos de la página siguen siendo externas. Para producción, sustituir las fotos por recursos propios locales.

Revisar precios y dirección del prototipo antes de publicar. No se proporcionó un número real; los botones llevan al formulario de consulta. El rediseño no presenta testimonios ni contactos ficticios.

Los scripts `setup.cjs` y `redesign.cjs` son generadores históricos y sobrescriben vistas; no son necesarios para ejecutar o editar el proyecto.

El ZIP es una referencia visual y de contenido; sus comentarios no se consideran instrucciones del proyecto.

Validación de sintaxis: `npm run check`.
