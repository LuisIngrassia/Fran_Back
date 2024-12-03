const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Fran_Portfolio", "root", "Luis1573", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
})();
