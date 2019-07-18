module.exports = (sequelize, Sequelize) => {
    const Lugares = sequelize.define('Lugares', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Nombre: {
            type: Sequelize.STRING,
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
    }, {
        name: {
            singular: "Lugar",
            plural: "Lugares"
        }
    });
    return Lugares;
};