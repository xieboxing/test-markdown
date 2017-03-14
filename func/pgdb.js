//pgdb.js
var async = require('async');
/*postgresql 数据库配置*/
var pg = require('pg');
var EventProxy = require('eventproxy');
var constring = "tcp://postgres:123987@192.168.1.154/zyz";

/*[常用变量*/
module.exports.data = function(s,allcallback){
	var data=new Array(); 
	data['俱乐部_提积分额度'] = '1000';
	data['俱乐部_代金券额度'] = '10686';
	data['融云AppKey'] = 'e5t4ouvpt07va';
	data['融云AppSecret'] = 'AGcv9zMBA5';
	return data[s];
}
/*]常用变量*/


/**数据库连接池创建连接*/
module.exports.create = function(conf,callback){
	//创建数据库对象
	//console.log(conf);
  //var constring ="tcp://"+conf.postgresql.user+":"+conf.postgresql.pass+"@"+conf.postgresql.host+"/"+conf.postgresql.db;
  pg.connect(constring, function(err, client, done) {

  		if(err){
			console.error("连接数据库错误！");
		}else{
			callback(client,done);
		}
  });

	
}



module.exports.field = function(sql,client,allcallback){
var s={};
					client.query(sql,function(err,result){
						if(err){
							var str = require("./stringFormat.js"); 
							str.logs("sql",sql,"取单条记录错误(field)");
							console.warn("错误:"+sql);
							s._f="数据错误";
						}else{
							if(result.rowCount>0){
								s=result.rows[0];
							}
							s.条数=result.rowCount;
							s._f='成功';
							allcallback(s);
	
						}
					});	
}


module.exports.lists = function(sql,client,allcallback){
var s={};
					client.query(sql,function(err,result){
						if(err){
							var str = require("./stringFormat.js");
							str.logs("sql",sql,"取多条记录错误(lists)");
							console.warn("错误:"+sql);
							s._f="数据错误";
						}else{
							if(result.rowCount>0){
								s.数据=result.rows;
							}
							s.条数=result.rowCount;
							s._f='成功';
							allcallback(s);
	
						}
					});	
}

module.exports.query = function(sql,client,allcallback){
var s={};
					client.query(sql,function(err,result){
						if(err){
							var str = require("./stringFormat.js");
							str.logs("sql",sql,"插入记录错误(query)");
							console.warn("错误:"+sql);
							s._f="数据错误";
						}else{
							s._f='成功';
							allcallback(s);
	
						}
					});	
}