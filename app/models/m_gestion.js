module.exports = (sequelize, Sequelize) => {
    const Gestiones = sequelize.define('Gestiones', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Anticipo: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Total: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0.00
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
    }, {
        name: {
            singular: "Gestion",
            plural: "Gestiones"
        }
    });
    return Gestiones;
};