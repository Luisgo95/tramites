module.exports = (sequelize, Sequelize) => {
    const Tramites = sequelize.define('tramites', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        DetalleTramite: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        Costo: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0
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
    return Tramites;
};