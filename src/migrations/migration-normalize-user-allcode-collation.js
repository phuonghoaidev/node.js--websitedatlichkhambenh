'use strict';

// Users.positionId/gender are compared with allcodes.keyMap in the doctor query.
// Keep all linked string columns on one collation to avoid MySQL join errors.
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      "ALTER TABLE Users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE allcodes CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    );
  },

  async down() {
    // Collation normalization is intentionally not reversed because the previous
    // collation can differ between installations.
  }
};
