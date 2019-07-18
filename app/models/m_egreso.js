module.exports = (sequelize, Sequelize) => {
    const Egresos = sequelize.define('egresos', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Comprobante: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Monto: {
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
    return Egresos;
};