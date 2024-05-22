'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      address: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      cdc_version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    })
  },

  async down(queryInterface, Sequelize) {
    // Xóa bảng 'Users'
    await queryInterface.dropTable('Users')
  }
};


// CDC AUTO INCREMENT WHEN INSERT, UPDATE, DELETE
// CREATE OR REPLACE FUNCTION update_cdc_version() RETURNS TRIGGER AS $$
// BEGIN
//   IF OLD.name <> NEW.name OR OLD.phone <> NEW.phone OR OLD.email <> NEW.email OR OLD.address <> NEW.address OR OLD.password <> NEW.password OR OLD.role <> NEW.role OR OLD.avatar <> NEW.avatar THEN
//     NEW.cdc_version := OLD.cdc_version + 1;
//   END IF;
//   RETURN NEW;
// END;
// $$ LANGUAGE plpgsql;

// CREATE TRIGGER trigger_increment_cdc_version
// BEFORE UPDATE ON Users
// FOR EACH ROW
// EXECUTE FUNCTION update_cdc_version();

