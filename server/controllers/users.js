const User = require('../models').users;
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

const getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = {
	create(req, res){
		bcrypt.genSalt(10, function(err, salt){
	       bcrypt.hash(req.body.passwordHash, salt, function(err,hash){
	         return User
				.create({
					id: 1,
					uid: uuidv1(),
					username: req.body.username,
					fullName: req.body.fullName,
					email: req.body.email,
					phoneNumber: req.body.phoneNumber,
					Hash: hash
				})
				.then((user) => res.status(201).send(user))
		      	.catch((error) => res.status(400).send(error));
	       });
	      });
	},

	login(req, res){
		const {username, password} = req.body;
		if(username && password){
			return User
			.findOne({where: {username: username}})
			.then(function(user){
				if(!user){
					res.status(401).json({"message": "No such user found !!"});
				}
				user.comparePassword(password, (err, isMatch) => {
					if(isMatch && !err){
						let token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400*30});
						jwt.verify(token, 'nodeauthsecret', (err, data) => {
							console.log(err, data);
						});
						res.json({success: true, token: `JWT${token}`});
					}else{
						res.status(401).json({success: false, msg: "Authentication failed. Wrong password"})
					}
				});
			})
			.catch((error) => res.status(400).send(error));
		}else{
			res.status(401).json({"message": "Invalid credentials !!"});
		}
	},

	usersList(req, res){
		let token = getToken(req.headers);
		if(token){
			return User
				.findAll()
				.then(function(user){
					if(!user){
						res.status(401).json({"message": "No user found !!"});
					}else{
						res.json({success: true, users: user});
					}
				})
		}
	}
}