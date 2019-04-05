const expressUser = require('../models/expressUser');
exports.createexpressUser = function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.expressUsername || !personInfo.password || !personInfo.passwordConf){
        //res.send();
        res.status(500).json({Success:"Bad respone"});
       // res.status(500).json({"We got your details"});
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			expressUser.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					expressUser.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new expressUser({
							unique_id:c,
							email:personInfo.email,
							expressUsername: personInfo.expressUsername,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

                    }).sort({_id: -1}).limit(1);
                    res.status(201).json({Success:"You are regestered,You can login now."});
				//	res.send({"Success":"You are regestered,You can login now."});
				}else{
                    res.status(500).json({Success:"Email is already used."});
				//	res.send({"Success":"Email is already used."});
				}

			});
		}else{
            res.status(500).json({Success:"password is not matched"});
			//res.send({"Success":"password is not matched"});
		}
	}
}
exports.signexpressUser = function (req, res, next) {
	//console.log(req.body);
	expressUser.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
                req.session.expressUserId = data.unique_id;
                req.session.username= data.email;
                //console.log(req.session.expressUserId);
                res.status(201).json({Success: req.session.expressUserId,
                data: req.session.username
                
                });
			//	res.send({"Success":"Success!"});
				
			}else{
                res.status(500).json({Success:"Wrong Password."});
			//	res.send({"Success":"Wrong password!"});
			}
		}else{
            res.status(500).json({Success:"Email not is already register"});
		//	res.send({"Success":"This Email Is not regestered!"});
		}
	});
}
exports.forgetpassword = function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
            res.status(500).json({Success:"Email not is already register"});
		//	res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
                    console.log('Success');
                    res.status(201).json({Success:"password changed"});  
				//	res.send({"Success":"Password changed!"});
			});
		}else{
            res.status(500).json({Success:"Both password not matched"});
			//res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
}