usuario.get("/api/usuarios/listarUsuarios", (req, res) => {
    const limite = parseInt(req.query.limite);
    const pagina = parseInt(req.query.pagina);
    const OFFSET = (pagina - 1) * limite;   
    const consulta2 = "SELECT COUNT(*) AS conteoUsuarios FROM usuarios ";
    const consulta = "SELECT rol.nombre AS rol, usuarios.idusuarios, usuarios.nombre, usuarios.password FROM usuarios INNER JOIN rol ON usuarios.rol_idrol = rol.idrol LIMIT ? OFFSET ?;";
    query(consulta2, (error, totalUsuarios) => {
        query(consulta, [limite, OFFSET], (error, usuarios) => {
            res.send({
                TotalUsuarios: totalUsuarios,
                usuarios: usuarios,
                error: error
            });
        });
    });
});
usuario.get("/api/usuarios/listarPorId/:id", (req, res) => {
    const id = req.params.id;
    const consulta = "SELECT * FROM usuarios WHERE idusuarios = ?";
    query(consulta, [id], (error, usuarios) => {
        if (error) {
            res.send({
                status: "Error",
                message: "Ocurrió un error en la consulta",
                error: error
            });
        } else{
            res.send({
                status: "Ok",
                message: "¡Consulta exitosa!",
                usuarios: usuarios
            });
        }
    });
});
usuario.post("/api/usuarios/crearUsuario", (req, res) => {
    const formDatosUsuario = {
        nombre: req.body.nombre,
        password: bcrypt.hashSync(req.body.pass, 10),
        rol_idrol: req.body.rol_idrol
    };
    const consulta = "INSERT INTO usuarios SET ?";
    query(consulta, [formDatosUsuario], (error, usuarios) => {
        if (error) {
            res.send({
                status: "Error",
                message: "Ocurrió un error en la consulta",
                error: error
            });
        } else {
            res.send({
            status: "Ok",
            message: "¡Consulta exitosa!",
            usuarios: usuarios
            });
        }
    });
});
usuario.delete("/api/usuarios/borrarPorId/:id", (req, res) => {
    const id = req.params.id;
    const consulta = "DELETE FROM usuarios WHERE idusuarios = ?";
    query(consulta, [id], (error, usuarios) => {
        if (error) {
            res.send({
                Status: "Error",
                Mensaje: "Ocurrió un error en la consulta",
                error: error
            });
        } else {
            res.send({
                Status: "Ok",
                Mensaje: "¡Registro borrado con éxito!",
                usuarios: usuarios
            });
        }
    });
});
usuario.put("/api/usuarios/editarPorId/:id", (req, res) => {
    const id = req.params.id;
    const formDatosUsuario = {
        nombre: req.body.nombre,
        rol_idrol: req.body.rol_idrol,
        password: bcrypt.hashSync(req.body.pass, 10)
    };
    const consulta = "UPDATE usuarios SET ? WHERE idusuarios = ?";
    query(consulta, [formDatosUsuario, id], (error, usuarios) => {
        if (error) {
            res.send({
                status: "Error",
                message: "Ocurrió un error en la consulta",
                error: error
            });
        } else {
            res.send({
                status: "Ok",
                message: "¡Consulta exitosa!",
                usuarios: usuarios
            });
        }
    });
});
// Exportar la instancia de