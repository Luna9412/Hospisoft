import express from "express";
import cors from "cors";
import { cnn } from "./src/models/bd.js";
import medicamentos from "./src/routes/medicamentos.js";
import pacientes from "./src/routes/pacientes.js";
import roles from "./src/routes/roles.js";
import usuarios from "./src/routes/usuarios.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", medicamentos);
app.use("/api", pacientes);
app.use("/api", roles);
app.use("/api", usuarios);

const IniciarServidor = async () => {
  await cnn();
  const puerto = process.env.PORT || 3000;
  app.listen(puerto, () => {
    console.log(`Servidor en el puerto: ${puerto}`);
  });
};
IniciarServidor().catch(console.error);
