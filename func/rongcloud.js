/**日志功能
创建时间：2016-09-23
创建人：吕扶美

更新时间
更新内容：
更新人：

*/
var rongcloudSDK = require('rongcloud-sdk');
var Fiber = require('fibers');
var http = require('http'); 
var crypto = require('crypto');
var config = require('./config.js');




var rongcloud = {};

rongcloud.user = {blacklist:{}};
rongcloud.block = {};
rongcloud.message = {
	private:{
		publish:'',
		publish_template:''
	},
	system:{
		publish:'',
		publish_template:''
	},
	group:{
		publish:''
	},
	discussion:{
		publish:''
	},
	chatroom:{
		publish:''
	},
	broadcast:''
};


rongcloud.group = {};


rongcloud.init = function(){
	var conf = config.get('rongcloud');
	if(conf != null){
		rongcloudSDK.init(conf.appkey,conf.appsecret);
		return 'ok'
	}else{
		return '未找到配置文件'
	}


}



rongcloud.user.getToken = function(userId,name,portraitUri){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.user.getToken(userId,name,portraitUri,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});
	
	Fiber.yield();
	return result;
}


rongcloud.user.refresh = function(userId,name,portraitUri){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.user.refresh(userId,name,portraitUri,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});
	
	Fiber.yield();
	return result;
}


rongcloud.user.checkOnline = function(userId){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.user.checkOnline(userId,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});
	
	Fiber.yield();
	return result;
}


rongcloud.user.block = function(userId,numMinutes){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.user.block(userId,numMinutes,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});
	
	Fiber.yield();
	return result;
}

rongcloud.user.unblock = function(userId){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.user.unblock(userId,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});
	
	Fiber.yield();
	return result;
}

rongcloud.user.block.query = function(){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.user.block.query(function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});
	
	Fiber.yield();
	return result;
}

rongcloud.user.blacklist.add = function(userId,blackUserId){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.user.blacklist.add(userId,blackUserId,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});
	
	Fiber.yield();
	return result;
}



rongcloud.user.blacklist.remove = function(userId,blackUserId){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.user.blacklist.remove(userId,blackUserId,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});
	
	Fiber.yield();
	return result;
}


rongcloud.user.blacklist.query = function(userId){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.user.blacklist.query(userId,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});
	
	Fiber.yield();
	return result;
}
 

rongcloud.message.private.publish = function(fromUserId,toUserId,objectName,content,pushContent,pushData){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.message.private.publish(fromUserId,toUserId,objectName,content,pushContent,pushData,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});

	Fiber.yield();
	return result;
}

rongcloud.message.system.publish = function(fromUserId,toUserId,objectName,content,pushContent,pushData){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.message.system.publish(fromUserId,toUserId,objectName,content,pushContent,pushData,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});

	Fiber.yield();
	return result;
}



rongcloud.message.group.publish = function(fromUserId,toGroupId,objectName,content,pushContent,pushData){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.message.group.publish(fromUserId,toGroupId,objectName,content,pushContent,pushData,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});

	Fiber.yield();
	return result;
}

rongcloud.message.chatroom.publish = function(fromUserId,toChatroomId,objectName,content,pushContent,pushData){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.message.chatroom.publish(fromUserId,toChatroomId,objectName,content,pushContent,pushData,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});

	Fiber.yield();
	return result;
}


rongcloud.message.broadcast = function(fromUserId,objectName,content,pushContent,pushData){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.message.broadcast(fromUserId,objectName,content,pushContent,pushData,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});

	Fiber.yield();
	return result;
}

rongcloud.group.sync = function(userId,groupIdNamePairs){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.group.sync(userId,groupIdNamePairs,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});

	Fiber.yield();
	return result;
}


rongcloud.group.create = function(userIDs,groupId,groupName){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.group.create(userIDs,groupId,groupName,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});

	Fiber.yield();
	return result;
}

rongcloud.group.join = rongcloud.group.create;


rongcloud.group.quit = function(userIDs,groupId){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.group.quit(userIDs,groupId,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});

	Fiber.yield();
	return result;
}



rongcloud.group.dismiss = function(userID,groupId){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.group.dismiss(userID,groupId,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});

	Fiber.yield();
	return result;
}


rongcloud.group.refresh = function(groupId,groupName){
	var result = {};
	var fiber = Fiber.current;
	rongcloudSDK.group.refresh(groupId,groupName,function(err,data){
		if(err){
			result = {code:"-1",errmessage:err};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});

	Fiber.yield();
	return result;
}

rongcloud.group.query = function(groupId){
	var result = {};
	return result;
}


//发送图片消息
rongcloud.sendImage = function(touser,fileID){
	
	
	var conf = config.get('rongcloud');
	
	var msg = {
		"fromuser":typeof fromUser === 'object' ? '' : fromUser + "@"+conf.appkey,
		"touser":typeof touser === 'object' ? '' : touser +"@"+conf.appkey,
		"msgtype":"image",
		"image":
		{
			"media_id": fileID
		}
	}

	this.send(msg,function(err,body){
	if(err){
			result = {code:"-1",errmessage:err};
		}else{
			result = body;
		}
		fiber.run();
	});
	
	Fiber.yield();
	return result;
}


//发送文本消息
rongcloud.sendText = function(touser,text,fromUser){
	

	var conf = config.get('rongcloud');
	
	var data = {
		"fromuser":typeof fromUser === 'object' ? '' : fromUser + "@"+conf.appkey,
		"touser":typeof touser === 'object' ? '' : touser +"@"+conf.appkey,
		"msgtype": "text",
		"text": 
		{
			"content": typeof text === 'object' ? '' : text
		}
	};
	var fuser = typeof fromUser === 'object' ? fromUser : null;
	
	if(fuser){
		data.userinfo = fromUser;
	}

	var result = this.send(data);
	if(!result){
		result = {code:"-1",errmessage:"失败"};
	}
	
	console.log(result);
	
	return result;


}

//发送图文消息
rongcloud.sendNews = function(touser,title,description,picurl,url){

	var conf = config.get('rongcloud');

	var data = {
		"fromuser":typeof fromUser === 'object' ? '' : fromUser + "@"+conf.appkey,
		"touser":typeof touser === 'object' ? '' : touser +"@"+conf.appkey,
		"msgtype": "news",
		"news":{
			"articles": [{
				"title":typeof title === 'object' ? '' : title,
				"description":typeof description === 'object' ? '' : description,
				"url":typeof url === 'object' ? '' : url,
				"picurl":typeof picurl === 'object' ? '' : picurl
			}
			]
		}
	};


	// console.log(JSON.stringify(data));

	return this.send(data);

}




/*[发送信息*/

rongcloud.send = function(msg){
	
	
	var result = {};
	var fiber = Fiber.current;
	this.go(msg,function(data){
		if(!data){
			result = {code:"-1",errmessage:"fail"};
		}else{
			var data = JSON.parse(data);
			result = data;
		}
		fiber.run();
	});

	Fiber.yield();
	return result;


}

/*]发送信息*/


rongcloud.go = function(msg,callback){
	
	var data = typeof msg === 'object' ? JSON.stringify(msg) : msg;

	var conf = config.get('rongcloud');

	var appkey = conf.appkey;
	var appsecret = conf.appsecret;
	var NONCE = parseInt(Math.random() * 0xffffff);
	var TIMESTAMP = Date.parse(new Date()) / 1000;
	var SIGNATURE = this.sha1(appsecret + NONCE + TIMESTAMP);
	var TYPE = "application/json";

	var opt = {
		 "method": "POST",
		 "host": "api.ps.ronghub.com",
		 "port": 80,
		 "path": "/message/send.json",
		 "headers": {
			"Content-Type": TYPE,
			"RC-App-Key": appkey,
			"RC-appsecret": appsecret,
			"RC-Nonce": NONCE,
			"RC-Timestamp": TIMESTAMP,
			"RC-Signature": SIGNATURE
		}
	};
	
	
	var request = http.request(opt, function(res) {
		if(res.statusCode == 200){
			var body = "";
			res.on('data', function(data) {
				body += data;
			}).on('end', function() {
				callback(body);
			});
		} else {
			return(res.statusCode,null);
		}
	});

	request.on('error',function(err){
   		callback(err);
	});

	request.write(data + "\n");
	request.end();
	
}


rongcloud.sha1 = function(input){
	var shasum = crypto.createHash('sha1');
    shasum.update(input);
	return shasum.digest('hex');
}




module.exports = rongcloud;