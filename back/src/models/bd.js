import mongoose from "mongoose";
import config from "./config.js";

export const cnx = async () => {
  try {
    await mongoose.connect(config.url, config.options);
    console.log("Conexion exitosa");
  } catch {
    console.error(`Hubo un error en la conexion a MongoDB: ${error.message}  `);
    process.exit(1);
  }
};