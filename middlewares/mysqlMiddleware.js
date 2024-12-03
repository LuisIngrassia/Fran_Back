const mysql = require("mysql2");

// Crear conexión a la base de datos
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Luis1573",
  database: "Fran_Portfolio",
});

// Probar conexión
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error al conectar a MySQL:", err.message);
  } else {
    console.log("Conexión a MySQL exitosa.");
    connection.release();
  }
});

// Exportar conexión
const connectMySQL = () => pool;
module.exports = connectMySQL;
