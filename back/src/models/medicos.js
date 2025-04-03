import { Schema, model } from "mongoose";
const medicosSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    especialidad: {
      type: String,
      required: true,
    },
  },
  { collection: "medicos" }
);
export default model("medicos", medicosSchema);