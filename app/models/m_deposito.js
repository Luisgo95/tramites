module.exports = (sequelize, Sequelize) => {
    const Depositos = sequelize.define('depositos', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        NoBoleta: {
            type: Sequelize.STRING,
            allowNull: false
        },
        DelRecibo: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        AlRecibo: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Cantidad: {
            type: Sequelize.DOUBLE,
            allowNull: false
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
    return Depositos;
};