import { Schema, model } from "mongoose";
const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { collection: "usuarios" }
);
export default model("Usuarios", usuarioSchema);
