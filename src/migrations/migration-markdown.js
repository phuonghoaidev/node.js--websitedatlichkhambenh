'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('markdowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            cdescription: {
                allowNull: true,
                type: Sequelize.TEXT('long')
            },
              cdoctorId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
             cspecialtyId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            clinicId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },


            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('markdowns');
    }
};