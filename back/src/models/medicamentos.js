import { Schema, model } from "mongoose";
const medicamentosSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    codigo: {
      type: String,
      required: true
    },
    presentacion: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    concentracion: {
      type: String,
      required: true
    },
    farmaceutica: {
      type: String,
      required: true
    },
    administracion: {
      type: String,
      required: true
    },
    envase: {
      type: String,
      required: true
    },
    medida: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    fechaVencimiento: {
      type: String,
      required: true
    },
    precioCompra: {
      type: Number,
      required: true
    },
    precioVenta: {
      type: Number,
      required: true
    },
    imagen: {
      type: String,
      default: ""
    },
    status: {
      type: Number,
      required: true
    }
  },
  { collection: "medicamentos" }
);
export default model("Medicamentos", medicamentosSchema);