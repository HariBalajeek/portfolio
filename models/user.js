var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
    name:String,
	email: String,
	subject: String,
	area: String
}),
User = mongoose.model('User', userSchema);

module.exports = User;