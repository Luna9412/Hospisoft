import { Schema, model } from "mongoose";
const pacienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    documento: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    eps: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  { collection: "pacientes" }
);
export default model("Pacientes", pacienteSchema);
