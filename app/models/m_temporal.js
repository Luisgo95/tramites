module.exports = (sequelize, Sequelize) => {
    const Temporales = sequelize.define('temporales', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        IdTramite: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IdPersona: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Precio: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        Descuento: {
            type: Sequelize.DOUBLE
        },
        Detalle: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        Idusuario: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        name: {
            singular: "Temporal",
            plural: "Temporales"
        }
    });
    return Temporales;
};