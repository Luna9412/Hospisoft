let bcrypt = require("bcryptjs");
let Usuarios = require("../models/usuarios");
let jwt = require("jsonwebtoken");

const listartodos = async (req, res) => {
    try {
      // consultar todos sin filtro
      let listaUsuarios = await Usuarios.find().exec();
      res.status(200).send({
        exito: true,
        listaUsuarios,
      });
    } catch (error) {
      res.status(500).send({
        exito: false,
        mensaje: "Error en la consulta",
      });
    }
  };
  const registro = async (req, res) => {
    let data = {
      documento: req.body.documento,  
      nombre: req.body.nombre,
      email: req.body.email,
      telefono: req.body.telefono,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      rol: req.body.rol,
    };
    let usuarioExiste = await Usuarios.findOne({ email: req.body.email });
    if (usuarioExiste) {
      return res.send({
        estado: false,
        mensaje: "el usuario ya esta registrado en el sistema",
      });
    }
    try {
      let usuarioNuevo = new Usuarios(data);
      usuarioNuevo.save();
      res.send({
        estado: true,
        mensaje: "usuario creado",
      });
    } catch (error) {
      res.send({
        estado: false,
        mensaje: "usuario No creado",
        error,
      });
    }
  };
  const login = async (req, res) => {
    let data = req.body.email;
    let usuarioExiste = await Usuarios.findOne({ email: data });
    if (!usuarioExiste) {
      return res.send({
        estado: false,
        mensaje: "usuario no existe en la Bd !",
      });
    }
    if (
      usuarioExiste &&
      bcrypt.compareSync(req.body.password, usuarioExiste.passwordHash)
    ) {
      const token = jwt.sign(
        {
          userId: usuarioExiste.id,
        },
        "seCreTo",
        { expiresIn: "1h" }
      );
      return res.send({
        estado: true,
        mensaje: "ingreso exitoso al sistema",
        token,
      });
    } else {
      return res.send({
        estado: false,
        mensaje: "Credenciales erroneas, intente de nuevo!",
      });
    }
  };
  module.exports = {
    listartodos,
    registro,
    login
  };