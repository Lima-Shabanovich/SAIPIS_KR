var mongoose = require('mongoose'); //объектно-документный отобразитель(require - директива, которая запрашивает)
var bcrypt = require('bcryptjs');   //для регистрации и сохранении нового пользователя

// User Schema
var UserSchema = mongoose.Schema({ //для разработки схемы БД
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);//module - это переменная, которая представляет текущий модуль, 
//а export - это объект, который будет представлен как модуль. Таким образом, все , что вы назначаете module.exports или 
//экспорта , будут выставлены в качестве модуля.

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {//BCrypt реализует хеширование паролей
	    bcrypt.hash(newUser.password, salt, function(err, hash) { //хэшируем новый для нас пароль
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){ //получить элементы
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) { //сравнивание
    	if(err) throw err;
    	callback(null, isMatch);
	});
}