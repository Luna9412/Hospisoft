import Usuarios from "../models/usuarios.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const ListarTodos = async (req, res) => {
  try {
    const listarUsuarios = await Usuarios.find().exec();
    res.status(200).send({
      exito: true,
      listarUsuarios
    });
  } catch (error) {
    res.status(500).send({
      exito: false,
      mensaje: `Error: ${error}`
    });
  }
};

export const UsuarioNuevo = async (req, res) => {
  let datos = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono,
    especialidad: req.body.especialidad,
    rol: req.body.rol,
    nombreUsuario: req.body.nombreUsuario,
    passwordUsuario: req.body.passwordUsuario
  };

  try {
    const usuarioNuevo = new Usuarios(datos);
    usuarioNuevo.save(); //Escribe el mongo
    return res.send({
      estado: true,
      mensaje: `Usuario creado exitosamente`,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error: ${error}`
    });
  }
};

export const BuscarPorID = async (req, res) => {
  let id = req.params.id;
  try {
    let consulta = await Usuarios.findById(id).exec();
    return res.send({
      estado: true,
      mensaje: `Busqueda exitosa`,
      consulta: consulta
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error, no se pudo realizar la consulta`
    });
  }
};

export const ActualizarPorID = async (req, res) => {
  let id = req.params.id;
  let datos = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono,
    especialidad: req.body.especialidad,
    rol: req.body.rol,
    nombreUsuario: req.body.nombreUsuario,
    passwordUsuario: req.body.passwordUsuario
  };
  try {
    let consulta = await Usuarios.findByIdAndUpdate(id, datos).exec();
    return res.send({
      estado: true,
      mensaje: `Actualizacion exitosa`,
      consulta: consulta
    });
  } catch (error) {
    return res.send({
      estado: true,
      mensaje: `Error al actualizar`,
      consulta: consulta
    });
  }
};

export const EliminarPorId = async (req, res) => {
  let id = req.params.id;
  try {
    let consulta = await Usuarios.findOneAndDelete({ _id: id }).exec();
    return res.send({
      estado: true,
      mensaje: `Eliminado exitosamente`,
      consulta: consulta
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error: ${error}`
    });
  }
};
