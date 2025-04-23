import Medicamentos from "../models/medicamentos.js";
import path from "path";
import fs from "fs";

export const ListarTodos = async () => {
  try {
    let listaMedicos = await Medicamentos.find({ status: 1 }).exec();
    return {
      estado: true,
      data: listaMedicos
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`
    };
  }
};

export const renderImagen = async (img) => {
  const file = img;
  const filepath = "./src/uploads/medicamentos/" + file;
  await fs.stat(filepath, (error, exists) => {
    if (!exists) {
      return {
        status: false,
        message: `La imagen no existe: ${error}}`
      };
    }
    return sendFile(path.resolve(filepath));
  });
};

export const MedicamentoNuevo = async (data, file) => {
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  const medicalExist = await Medicamentos.findOne({
    codigo: data.codigo
  });
  if (medicalExist) {
    return {
      estado: false,
      mensaje: "El medicamento ya existe"
    };
  }

  let image = "";
  if (file) {
    const extension = path.extname(file.originalname).slice(1).toLowerCase();
    if (!extensionesValidas.includes(extension)) {
      fs.unlink(file.path);
      return {
        estado: false,
        mensaje: "Extensión de archivo no permitida"
      };
    }
    image = file.filename;
  }
  try {
    const medicamentoNuevo = new Medicamentos({
      nombre: data.nombre,
      codigo: data.codigo,
      presentacion: data.presentacion,
      descripcion: data.descripcion,
      concentracion: data.concentracion,
      farmaceutica: data.farmaceutica,
      administracion: data.administracion,
      envase: data.envase,
      medida: data.medida,
      stock: data.stock,
      fechaVencimiento: data.fechaVencimiento,
      imagen: image,
      precioCompra: data.precioCompra,
      precioVenta: data.precioVenta,
      status: 1
    });
    await medicamentoNuevo.save();
    return {
      estado: true,
      mensaje: "Medicamento Registrado"
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`
    };
  }
};

export const ActualizarPorID = async (data,file) => {
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  let image = "";
  if (file) {
    const extension = path.extname(file.originalname).slice(1).toLowerCase();
    if (!extensionesValidas.includes(extension)) {
      fs.unlink(file.path);
      return {
        estado: false,
        mensaje: "archivo no permitido"
      };
    }
    image = file.filename;
  }
  let info = {
    nombre: data.nombre,
    codigo: data.codigo,
    presentacion: data.presentacion,
    descripcion: data.descripcion,
    concentracion: data.concentracion,
    farmaceutica: data.farmaceutica,
    administracion: data.administracion,
    envase: data.envase,
    medida: data.medida,
    stock: data.stock,
    fechaVencimiento: data.fechaVencimiento,
    imagen: image,
    precioCompra: data.precioCompra,
    precioVenta: data.precioVenta
  };
  try {
    let medicamentoUpdate = await Medicamentos.findByIdAndUpdate(data.id, info);
    return {
      estado: true,
      mensaje: "Medicamento Actualizado",
      result: medicamentoUpdate
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`
    };
  }
};

export const BuscarPorID = async (data) => {
  let id = data.id;
  try {
    let result = await Medicamentos.findById(id).exec();
    return {
      estado: true,
      mensaje: "Consulta Exitosa",
      result: result
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`
    };
  }
};

export const EliminarPorID = async (data) => {
  let id = data.id;
  try {
    let result = await Medicamentos.findByIdAndUpdate(id, { status: 0 });
    return {
      estado: true,
      result: result
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`
    };
  }
};
