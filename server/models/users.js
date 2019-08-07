'use strict';
const models = require('./index');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
module.exports = function(sequelize, DataTypes){
	const User = sequelize.define('users', {
		id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncreament: true,
			field: "'UserID'"
		},
		uid:{
			type: DataTypes.UUID,
			allowNull: false,
            unique: true,
            field: '"UserUUID"'
		},
		username: {
	      	type: DataTypes.TEXT,
	      	allowNull: false,
	      	unique: true,
	      	field: '"Username"'
	    },
		fullName:{
			type: DataTypes.TEXT,
      		allowNull: false,
      		unique: false,
      		field: '"FullName"'
		},
		email: {
	      	type: DataTypes.TEXT,
	      	allowNull: false,
	      	field: "Email"
	    },
	    phoneNumber: {
	      	type: DataTypes.TEXT,
	      	allowNull: false,
	      	field: '"PhoneNumber"'
	    },
	    Hash: {
	      	type: DataTypes.TEXT,
	      	allowNull: false,
	      	field: "Hash"
	    }
	}, {
    tableName: '"Users"',
    schema: 'schema1',
    createdAt: false,
    updatedAt: false
  });

	  User.prototype.comparePassword = function (passw, cb) {
	    bcrypt.compare(passw, this.Hash, function(err, isMatch){
	        if (err) {
	            return cb(err);
	        }
	        cb(null, isMatch);
	    });  
	  };

	  return User;
};