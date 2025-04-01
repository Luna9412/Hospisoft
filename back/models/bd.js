import mongoose from 'mongoose';
import { mongoURI } from './config';
const conexion = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("¡Conexión exitosa!");
  } catch (error) {
    console.log(`Error en la conexión: ${error}`);
    throw new Error(error);
  }
};
export default conexion;