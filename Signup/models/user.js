var mongoose = require('mongoose');  
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({  
    email: String,
    password: String,
    teacher: Boolean,
    designatedWhiteboard: String,
    joinedWhiteboards: Array,
    savedWhiteboards: Array
});

userSchema.methods.generateHash = function(password) {  
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {  
  return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', userSchema);