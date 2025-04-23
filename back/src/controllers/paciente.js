import Pacientes from "../models/paciente.js";

export const ListarTodos = async () => {
  try {
    let listarMedicos = await Pacientes.find().exec();
    return {
      estado: true,
      data: listarMedicos,
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};

export const InsertarPaciente = async (data) => {
  const pacienteExiste = await Pacientes.findOne({ documento: data.documento });
  if (pacienteExiste) {
    return {
      estado: false,
      mensaje: "El Paciente ya se encuentra registrado",
    };
  }
  try {
    const pacienteNuevo = new Pacientes({
      nombre: data.nombre,
      documento: data.documento,
      email: data.email,
      telefono: data.telefono,
      fechaNacimiento: data.fechaNacimiento,
      eps: data.eps,
      status: 1,
    });
    await pacienteNuevo.save();
    return {
      estado: true,
      mensaje: "Paciente Registrado",
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};
export const ActualizarPorID = async (data) => {
  let id = data.id;
  let info = {
      nombre: data.nombre,
      documento: data.documento,
      email: data.email,
      telefono: data.telefono,
      fechaNacimiento: data.fechaNacimiento,
      eps: data.eps,
  };
  try {
    let PacienteActualizar = await Pacientes.findByIdAndUpdate(id, info);
    return {
      estado: true,
      mensaje: "Actualizado Exitosamente",
      result: PacienteActualizar,
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};
export const BuscarPorID = async (data) => {
  let id = data.id;
  try {
    let result = await Pacientes.findById(id).exec();
    return {
      estado: true,
      mensaje: "¡Consulta Exitosa!",
      result: result,
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};
export const EliminarPorID = async (data) => {
  let id = data.id;
  try {
    let result = await Pacientes.findByIdAndUpdate(id, { status: 0 });
    return {
      estado: true,
      result: result,
    };
  } catch (error) {
    return {
      estado: false,
      mensaje: `Error: ${error}`,
    };
  }
};

export const subirImagen = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        estado: false,
        mensaje: "No se ha cargado ninguna imagen",
      });
    }
    const { originalname, filename, path } = req.file;
    const extension = originalname.split(".").pop().toLowerCase();
    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extensionesValidas.includes(extension)) {
      await unlink(path);
      return res.status(400).json({
        estado: false,
        mensaje: "Archivo invalido",
      });
    }
    const usuarioActualizado = await _findByIdAndUpdate(req.body.id, {
      imagen: filename,
    });
    return res.status(200).json({
      estado: true,
      user: usuarioActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      estado: false,
      nensaje: `Error: ${error}`,
      error: error.message,
    });
  }
};

export const avatar = (req, res) => {
  const file = req.params.file;
  const filePath = "./uploads/usuarios/" + file;
  stat(filePath, (error, exists) => {
    if (!exists) {
      return res.status(404).send({
        status: "error",
        message: "La imagen no existe",
      });
    }
    return res.sendFile(resolve(filePath));
  });
};
