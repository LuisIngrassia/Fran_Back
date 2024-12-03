const verifAuth = (req, res, next) => {
  // Verificar si la sesión contiene información del usuario
  if (req.session && req.session.userId) {
    console.log(`Usuario autenticado: ${req.session.userId}`);
    next();
  } else {
    console.error("Acceso no autorizado");
    res
      .status(401)
      .json({ error: "Acceso no autorizado. Por favor inicia sesión." });
  }
};

module.exports = verifAuth;
