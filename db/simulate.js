	module.exports = var User = require('./models/user-model');
	var newUser = new User();
	newUser.username = 'siffogh';
	newUser.save(function(err){
		if(err)
		{
			console.log('error');
			throw err;
		}
			
		else
		{
			console.log('inserted');
			return (null,newUser);
		}
			
	});