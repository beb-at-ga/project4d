'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: 'Please provide a valid email address.',
          },
        },
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a fist name.',
          },
        },
      },
      lastname: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8, 32],
            msg:
              'Your password should be between 8 and 32 characters in length.',
          },
        },
      },
      agency_id: DataTypes.INTEGER,
      agent_id: DataTypes.INTEGER,
      phonenumber: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate: pendingUser => {
          if (pendingUser && pendingUser.password) {
            // Hash the password with BCrypt
            let hash = bcrypt.hashSync(pendingUser.password, 12);

            // Reassign the user's password to the hashed version of that password
            pendingUser.password = hash;
          }
        },
      },
    }
  );
  user.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(models.event);
  };

  user.prototype.passwordCheck = function(typedPwd) {
    return bcrypt.compareSync(typedPwd, this.password);
  };


  user.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
  
    delete values.password;
    return values;
  }

  return user;
};
