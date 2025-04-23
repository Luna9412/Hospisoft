import express, { json } from "express";

const router = express.Router();
import {ListarTodos,PacienteNuevo,ActualizarPorID,BuscarPorID,subirImagen,EliminarPorID,avatar,} from "../controllers/paciente.js";
import { celebrate, Joi, errors, Segments } from "celebrate";

router.get("/pacientes/listar", async (req, res) => {
  try {
    const response = await ListarTodos();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la lista de pacientes" });
  }
});

router.get("/pacientes/img/", async (req, res) => {
  try {
    const response = await avatar();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la imagen" });
  }
});

router.get("/pacientes/:id", async (req, res) => {
  try {
    const data = req.params.id;
    const response = await BuscarPorID(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la informacion" });
  }
});

router.post("/pacientes/crear", celebrate({
    body: Joi.object({
      nombre: Joi.string().required(),
      fecha: Joi.date().required(),
      documento: Joi.number().required(),
      email: Joi.string().required(),
      telefono: Joi.number().required(),
      eps: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { body: data } = req;
      const response = await PacienteNuevo(data);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error al Registrar el Paciente" });
    }
  }
);

router.post("/pacientes/actualizar", celebrate({
    body: Joi.object({
      id: Joi.string().required(),
      nombre: Joi.string().required(),
      fecha: Joi.date().required(),
      documento: Joi.number().required(),
      email: Joi.string().required(),
      telefono: Joi.number().required(),
      eps: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { body: data } = req;
      const response = await ActualizarPorID(data);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar" });
    }
  }
);

router.post("/pacientes/eliminar", celebrate({
    body: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { body: data } = req;
      const response = await EliminarPorID(data);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar" });
    }
  }
);

export default router;