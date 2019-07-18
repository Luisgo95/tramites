module.exports = (sequelize, Sequelize) => {
    const Personas = sequelize.define("Personas", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Nombres: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Apellidos: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Nit: {
            type: Sequelize.STRING
        },
        Dpi: {
            type: Sequelize.STRING
        },
        Nacimiento: {
            type: Sequelize.DATE
        },
        Telefono: {
            type: Sequelize.STRING
        },
        Estado: {
            type: Sequelize.ENUM,
            values: [
                'Activo',
                'Inactivo',
            ],
            defaultValue: 'Activo',
            allowNull: false
        },
    });
    return Personas;
};