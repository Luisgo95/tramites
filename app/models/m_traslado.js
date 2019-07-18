module.exports = (sequelize, Sequelize) => {
    const Traslados = sequelize.define('Traslados', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Origen: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Destino: {
            type: Sequelize.INTEGER,
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
        }
    });
    return Traslados;
};