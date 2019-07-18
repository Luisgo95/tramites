module.exports = (sequelize, Sequelize) => {
    const Empresas = sequelize.define('Empresas', {
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
    });
    return Empresas;
};