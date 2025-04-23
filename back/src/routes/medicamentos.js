import {ListarTodos,MedicamentoNuevo,ActualizarPorID,renderImagen,BuscarPorID,EliminarPorID} from "../controllers/medicamentos.js";
import { celebrate, Joi, errors, Segments } from "celebrate";
import express, { json } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/medicamentos/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const schema = Joi.object({
  nombre: Joi.string().required(),
  codigo: Joi.string().required(),
  presentacion: Joi.string().required(),
  descripcion: Joi.string().required(),
  concentracion: Joi.string().required(),
  farmaceutica: Joi.string().required(),
  administracion: Joi.string().required(),
  envase: Joi.string().required(),
  medida: Joi.string().required(),
  stock: Joi.number().required(),
  fechaVencimiento: Joi.string().required(),
  precioCompra: Joi.number().required(),
  precioVenta: Joi.number().required()
});

const uploads = multer({ storage });
router.get("/medicamentos/listar", async (req, res) => {
  try {
    const response = await ListarTodos();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error}` });
  }
});
router.get("/medicamentos/image/:file", async (req, res) => {
  const { file } = req.params;
  try {
    const filepath = path.resolve("./src/uploads/medicamentos", file);
    fs.stat(filepath, (err, stats) => {
      if (err || !stats.isFile()) {
        return res.status(404).json({
          status: false,
          message: `La imagen ${file} no existe`
        });
      }
      res.sendFile(filepath);
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la imagen" });
  }
});
router.get("/medicamentos/:id", async (req, res) => {
  try {
    const data = req.params.id;
    const response = await BuscarPorID(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la informacion" });
  }
});
router.post("/medicamentos/crear",uploads.single("img"),celebrate({
    body: schema
  }),
  async (req, res) => {
    try {
      const { body: data } = req;
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No se ha cargado la imagen" });
      }
      const response = await MedicamentoNuevo(data, file);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: `Error al registrar`, error: `${error}` });
    }
  }
);
router.put("/medicamentos/actualizar", uploads.single("img"),celebrate({
    body: schema
  }),
  async (req, res) => {
    try {
      const { body: data } = req;
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No se ha cargado la imagen" });
      }
      const response = await ActualizarPorID(data, file);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: `Error: ${error}` });
    }
  }
);
router.post("/medicamentos/eliminar",celebrate({
    body: Joi.object({
      id: Joi.string().required()
    })
  }),
  async (req, res) => {
    try {
      const { body: data } = req;
      const response = await EliminarPorID(data);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: `Error: ${error}` });
    }
  }
);

router.use(errors());
export default router;