/**查询银行卡名（by emili）
创建人：梁敏俐
创建时间：2016/9/18 11：08
内容:
func=Bankcard
账号=601260
随机码=1133a0855f7eb6ce76d3a8466d008993
手机ID=123123
手机名称=112312323
手机型号=231123

修 改 人:  谢泊兴
更新时间:  2017/2/3
更新内容: 根据新平台重写
版本=v1.2.1
*/
var pgdb = require('../func/pgdb.js');
var async = require('async');
var moment = require("moment");



module.exports.run = function(body, pg, mo) {
	var f = {}; //没有头部的用变量join
	/*pgdb.create(f, function(client, done) {
		f.状态 = '成功';
		client.query("BEGIN;");
		async.waterfall([
			function(callback) {
				var sql1 = "select id,状态 from 油_会员表";
				pgdb.lists(sql1, client, function(a) {
					//console.log(a);
					callback('','');
				});
			},
			function(f, callback) {
			var t =moment().format("YYYY-MM-DD HH:mm:ss");
			
			    var sql2 = "insert into 油_日志_非钱表(账号,状态,内容,录入时间) values('13266612380','成功','每小时任务','"+t+"')";
				
				pgdb.query(sql2,client,function(a){
					console.log(a);
					callback('','');
				});
				
			}
		], function(err, f) {

			client.query("COMMIT;");
			console.log('test1任务执行成功');
		});
		return ;
	});*/
	console.log('test任务执行成功');
	return f;
}

module.exports.running = function(body,pg,mo){
		var data = {};
		var f ={};
		data.状态='成功';	
		
		
		async.waterfall([
		function(callback) {
				var sql1 = "select id,状态 from 油_会员表";
				pgdb.field(sql1,pg,function(a){
					//console.log(a);
					callback('','');
				});
			
		},function(err,callback){
			var t =moment().format("YYYY-MM-DD HH:mm:ss");
			console.log(t);
			sql = "insert into 油_日志_非钱表(账号,状态,类容,录入时间) values('13266612380','正常','定时任务','"+t+"'";
				pgdb.query(sql,client,function(a){
					console.log(a);
					callback('','');
				});
			
		}
		],function(err,callback){
			console.log('test1任务执行成功');
		});
		return data;
		
}
/*输出
{"状态":"成功"}
*/