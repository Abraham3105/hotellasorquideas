function today() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Costa_Rica', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }
function validDate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(value || '') && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value; }
const guests = ['1 Huésped', '2 Huéspedes (Pareja)', '3 - 4 Huéspedes (Familiar)', '5+ Huéspedes'];
function validateBooking(data) {
  if (data.room && !['Cabina 5', 'Cabina 6', 'Cabina 7', 'Estudio pareja', 'Villa'].includes(data.room)) return { error: 'Seleccioná un alojamiento válido.' };
  if (!validDate(data.arrival) || !validDate(data.departure)) return { error: 'Seleccioná fechas válidas.' };
  if (data.arrival < today()) return { error: 'La llegada no puede estar en el pasado.' };
  if (data.departure <= data.arrival) return { error: 'La salida debe ser posterior a la llegada.' };
  if (!guests.includes(data.guests)) return { error: 'Seleccioná la cantidad de huéspedes.' };
  return { status: 'inquiry', room: data.room || null, nights: (Date.parse(data.departure) - Date.parse(data.arrival)) / 86400000, message: 'Fechas válidas. La disponibilidad y la tarifa deben confirmarse con el hotel; esta consulta no crea una reserva.' };
}
module.exports = { validateBooking };
