import Usuario, {find,findOne,findByIdAndUpdate,findById,findOneAndDelete,}from "../models/usuarios.js";
import { hashSync, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { resolve } from "path";
import { findByIdAndUpdate as _findByIdAndUpdate } from "../models/usuarios.js";

export const getUsuarios = async (req, res) => {
  try {
    let listaUsuarios = await find().exec();
    res.status(200).send({
      Exito: true,
      data: listaUsuarios,
      mensaje: "Exito en la consulta",
    });
  } catch (error) {
    res.status(500).send({
      Exito: false,
      mensaje: "Error, en la consulta.",
    });
  }
};

export const setUsuario = async (req, res) => {
  let data = {
    documento: req.body.documento,
    nombre: req.body.nombre,
    email: req.body.email,
    passwordHash: hashSync(req.body.passwordHash, 10),
  };

  const usuarioExiste = await findOne({ email: data.email });

  if (usuarioExiste) {
    return res.send({
      estado: false,
      mensaje: "el usuario ya existe en el sistema",
    });
  }

  try {
    const usuarioNuevo = new Usuario(data);
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
export const UsuarioUpdate = async (req, res) => {
  let id = req.params.id;
  let data = {
    documento: req.body.documento,
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
      mensaje: "Error, Nos fue posible eliminar el producto.",
    });
  }
};
export const login = async (req, res) => {
  let usuarioExiste = await findOne({ email: req.body.email });
  if (!usuarioExiste) {
    return res.send({
      estado: false,
      mensaje: "no existe el usuario",
    });
  }
  // validamos credemciales
  if (compareSync(req.body.password, usuarioExiste.passwordHash)) {
    //autenticacion de 2 factores con generacion de token
    const token = sign(
      // datos a codificar en le toke
      {
        userId: usuarioExiste.id,
      },
      // Salt de la codificacion o hashing
      "seCreTo",
      // vida util
      { expiresIn: "1h" }
    );
    return res.send({
      estado: true,
      mensaje: "ok",
      token: token,
    });
  } else {
    return res.send({
      estado: false,
      mensaje: "Contraseña incorrecta, Intente de nuevo!",
    });
  }
};