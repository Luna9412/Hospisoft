import express, { json } from "express";
const router = express.Router();
import { getAll, add, updateMedico } from "../controllers/medicos.js";
import { celebrate, Joi, errors, Segments } from "celebrate";
router.get("/medicos/list", async (req, res) => {
  try {
    const response = await getAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});
router.get("/medicos/id:", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await searchById(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/medicos/create",
  Joi.celebrate({
    body: Joi.object({
      nombre: Joi.string().required(),
      email: Joi.string().required(),
      especialidad: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { body: data } = req; // obtenemos los datos del body
      const response = await add(data);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
);
router.put(
  "/medicos/update",
  Joi.celebrate({
    body: Joi.object({
      id: Joi.string().required(),
      nombre: Joi.string().required(),
      email: Joi.string().required(),
      especialidad: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { body: data } = req; 
      const response = await updateMedico(data);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
);
export default router;
