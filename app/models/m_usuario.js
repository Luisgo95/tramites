module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define('Usuarios', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        Nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        Clave: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Rol: {
            type: Sequelize.STRING,
            allowNull: false
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
        Logueado: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });
    return Usuarios;
};