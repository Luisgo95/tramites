module.exports = (sequelize, Sequelize) => {
    const TC_Spanish_Errors = sequelize.define('TC_Spanish_Errors', {
        MensajeIngles: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        MensajeEspaniol: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Error pendiente de traducción, notifique al administrador"
        }
    });
    return TC_Spanish_Errors;
};