// Middleware para manejar opciones y encabezados de las solicitudes
const handleOptions = (req, res, next) => {
  // Configuración de encabezados comunes
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Cambiar según el cliente
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Manejar solicitudes OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Respuesta sin contenido para las solicitudes preflight
  }

  // Pasar al siguiente middleware o a la ruta
  next();
};

module.exports = handleOptions;
