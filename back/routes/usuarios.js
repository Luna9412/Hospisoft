const express = require("express");
const usuariosCtr = require("../controllers/usuarios");

router.get("/usuarios/listartodos", usuariosCtr.listartodos);
router.post("/usuarios/registro", usuariosCtr.registro);
router.post("/usuarios/login", usuariosCtr.login);

module.exports = router;