import Medico, {find,findOne,findByIdAndUpdate,findById,findOneAndDelete,} from "../models/medicos.js";
import { hashSync, compareSync } from "bcryptjs";

export const getAll = async (req, res) => {
  try {
    let listarMedicos = await find().exec();
    res.status(200).send({
      Exito: true,
      data: listarMedicos,
      mensaje: "Exito en la consulta",
    });
  } catch (error) {
    res.status(500).send({
      Exito: false,
      mensaje: "Error, en la consulta.",
    });
  }
};
export const add = async (req, res) => {
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    especialidad: req.especialidad,
    passwordHash: hashSync(req.body.passwordHash, 10),
  };
  const medicoExiste = await findOne({ email: data.email });
  if (medicoExiste) {
    return res.send({
      estado: false,
      mensaje: "el usuario ya existe en el sistema",
    });
  }
  try {
    const usuarioNuevo = new Medicals(data);
    await usuarioNuevo.save();
    return res.send({
      estado: true,
      mensaje: "usuario creado exitosamente",
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `error ${error}`,
    });
  }
};
export const updateMedico = async (req, res) => {
  let id = req.params.id;
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
  };
  try {
    let usuarioUpdate = await findByIdAndUpdate(id, data);
    return res.send({
      estado: true,
      mensaje: "Actualizacion Exitosa!",
      reslut: usuarioUpdate,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error en la Actualizacion: ${error}`,
    });
  }
};
export const searchById = async (req, res) => {
  let id = req.params.id;
  try {
    let result = await findById(id).exec();
    return res.send({
      estado: true,
      mensaje: "Consulta Exitosa",
      result: result,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: "Error, No fue posible encotrar el registro.",
    });
  }
};
export const deleteById = async (req, res) => {
  let id = req.params.id;
  try {
    let result = await findOneAndDelete(id).exec();
    return res.send({
      estado: true,
      mensaje: "Borrado Exitoso",
      result: result,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: "Error, Nos fue posible eliminar.",
    });
  }
};