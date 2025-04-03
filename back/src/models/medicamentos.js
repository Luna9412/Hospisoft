import { Schema, model } from "mongoose";
const medicamentosSchema = new Schema(
  {
    codigo: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    laboratorio: {
      type: String,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
      },
  },
  { collection: "medicamentos" }
);
export default model("Medicamento", medicamentosSchema);