const nano = require("nano")("http://admin:1234@127.0.0.1:5984");

const connectDB = async (tableName) => {
  let db;
  try {
    await nano.db.get(tableName);
    db = nano.db.use(tableName);
    return db;
  } catch (error) {
    if (error.statusCode === 404) {
      try {
        await nano.db.create(tableName);
        db = nano.db.use(tableName);
        return db;
      } catch (createError) {
        console.log("Error al crear la base de datos:", createError);
        throw createError;
      }
    } else {
      console.log("Error al obtener información de la base de datos:", error);
      throw error2;
    }
  }
};

module.exports = {
  connectDB,
};
