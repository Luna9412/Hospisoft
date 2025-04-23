import Roles from "../models/roles.js";

export const ListarTodos = async (req, res) => {
  try {
    const listarRoles = await Roles.find().exec();
    res.status(200).send({
      exito: true,
      listarRoles,
    });
  } catch (error) {
    res.status(500).send({
      exito: false,
      mensaje: `Error: ${error}`,
    });
  }
};

export const RolNuevo = async (req, res) => {
  let datos = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  };
  try {
    const rolNuevo = new Roles(datos);
    rolNuevo.save();
    return res.send({
      estado: true,
      mensaje: `¡Rol creado!`,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error: ${error}`,
    });
  }
};

export const BuscarPorId = async (req, res) => {
  let id = req.params.id;
  try {
    let consulta = await Roles.findById(id).exec();
    return res.send({
      estado: true,
      mensaje: `¡Busqueda exitosa!`,
      consulta: consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error: ${error}`,
    });
  }
};

export const ActualizarPorID = async (req, res) => {
  let id = req.params.id;
  let datos = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  };

  try {
    let consulta = await Roles.findByIdAndUpdate(id, datos).exec();
    return res.send({
      estado: true,
      mensaje: `Rol Actualizado`,
      consulta: consulta,
    });
  } catch (error) {
    return res.send({
      estado: true,
      mensaje: `Error: ${error}`,
      consulta: consulta,
    });
  }
};

export const EliminarPorID = async (req, res) => {
  let id = req.params.id;
  try {
    let consulta = await Roles.findOneAndDelete({ _id: id }).exec();
    return res.send({
      estado: true,
      mensaje: `Eliminado exitosamente`,
      consulta: consulta,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error: ${error}`,
    });
  }
};