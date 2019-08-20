function sembraradmin(db) {
    //force: true will drop the table if it already exists
    db.sequelize.sync({ force: true }).then(() => {
            db.Empresa.create({ Nombre: "Huehuetenango", Estado:"Activo"})
            .then(empresas => {
                db.Usuario.create({ Email: "legmz@gmail.com", Nombre: "Luis", Clave: "$2b$08$ndvX5xhaNSfcyPOQ/uTrE.SMfzUF7TkTEcpvenZCx1rWJ8lSOrBFG", Logueado: 0, EmpresaId: empresas.dataValues.id })
                db.Usuario.create({ Email: "tu@email.com", Nombre: "UserHuehue", Clave: "$2b$08$ndvX5xhaNSfcyPOQ/uTrE.SMfzUF7TkTEcpvenZCx1rWJ8lSOrBFG", Logueado: 0, EmpresaId: empresas.dataValues.id })
            });

        }).catch(error => {
            console.log(error.message);
        });
}
module.exports = {
    "sembraradmin": sembraradmin
};