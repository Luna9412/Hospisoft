import express from "express";
import rolesController from "../controllers/roles.js";
const router = express.Router();

router.get("/roles/ListarTodos", rolesController.ListarTodos);
router.get("/roles/BuscarPorID/:id", rolesController.BuscarPorID);
router.post("/roles/RolNuevo", rolesController.RolNuevo);
router.put("/roles/ActualizarPorID/:id", rolesController.ActualizarPorID);
router.delete("/roles/EliminarPorID/:id", rolesController.EliminarPorID);

export default router;
