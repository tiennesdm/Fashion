var mongoose = require('mongoose');
var Schema = mongoose.Schema;

expressuserSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	username: String,
	password: String,
	passwordConf: String
}),
expressUser = mongoose.model('expressUser', expressuserSchema);

module.exports = expressUser;