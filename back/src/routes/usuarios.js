import express from "express";
import usuarioController from "../controllers/usuarios.js";
const router = express.Router();

router.get("/usuario/ListarTodos", usuarioController.ListarTodos);
router.get("/usuario/BuscarPorID/:id", usuarioController.BuscarPorID);
router.post("/usuario/UsuarioNuevo", usuarioController.UsuarioNuevo);
router.put("/usuario/ActualizarPorID/:id", usuarioController.ActualizarPorID);
router.delete("/usuario/EliminarPorID/:id", usuarioController.EliminarPorID);

export default router;
