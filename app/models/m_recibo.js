module.exports = (sequelize, Sequelize) => {
    const Recibos = sequelize.define('Recibos', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        NoRecibo: {
            type: Sequelize.INTEGER,
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
    return Recibos;
};