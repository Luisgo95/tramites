function sembraradmin(db) {
    //force: true will drop the table if it already exists
    db.sequelize.sync({ force: true }).then(() => {
            db.Empresa.create({ Nombre: "Huehuetenango", Estado:"Activo"})
            .then(empresas => {
                db.Usuario.create({ Email: "legmz20@gmail.com", Nombre: "Luis", Clave: "$2b$08$Ol7/snFptt902wdVe8uvnerCdcYb3JPAdZDEZVCoJgmOpm02WGGx6", Rol: "Inge",Logueado: 0, EmpresaId: empresas.dataValues.id })
              });

        }).catch(error => {
            console.log(error.message);
        });
}
module.exports = {
    "sembraradmin": sembraradmin
};