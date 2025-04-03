import express from "express";
import cors from "cors";
import { cnx } from "./src/models/bd.js";
const app = express();
const initServe = async () => {
  await cnx();
  // middelware
  app.use(cors);
  app.use(express.json());
  // rutas
  app.use("/api", medical);
const puerto = process.env.PORT || 3000;
  app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
  });
};
initServe().catch(console.error);