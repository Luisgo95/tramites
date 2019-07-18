module.exports = (sequelize, Sequelize) => {
    const Tipos_Tramites = sequelize.define('Tipos_Tramites', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Nombre: {
            type: Sequelize.STRING
        },
        Precio: {
            type: Sequelize.DOUBLE
        },
        Estado: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: [
                'Activo',
                'Inactivo',
            ],
            defaultValue: 'Activo',
        }
    });
    return Tipos_Tramites;
};