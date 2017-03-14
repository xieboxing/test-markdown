
var express = require('express');
var Fiber = require('fibers');
var fs = require('fs');
var async = require('async');
var schedule = require('node-schedule');
var moment = require("moment");
var pgdb = require('./func/pgdb.js');
var logs = require('./func/logs.js');


var time ={};

process.on('uncaughtException', function (err) {
	console.log(err.stack);
	logs.write('err',err.stack);
});

process.on('SyntaxError', function (err) {
	console.log(err.stack);
	logs.write('err',err.stack);
});

var app=express();
app.listen(3000);
var body={};	
interfaces=[];
//执行接口
time.index = function(funcName,conf){
	body.startTime = new Date().getTime();
	
	var obj = new Object();
    body.func = funcName;

	
	
	var fiber = Fiber(function (cb){

		for(var i=0;i<funcName.length;i++){
			var func = require('./interface/'+funcName[i]);
			body.send = func.run(body,'','');
		}
		
	

		cb(null,'');
	});

	async.waterfall([
		function(cb){
			
			cb(null,'');
		},
		function(j,cb){
		
			cb(null,'');
			
		},
        function(j,cb){
			
			cb(null,'');
      
        },
		function(j,cb){
            if(true){
                fiber.run(cb);
            }else{
                var data = {};
                data.code = -3;
                data.message = 'page can not find';
              
                return;
            }

		}
	], function (err, result) {

			fiber = null;
			body.endTime = new Date().getTime();
			body.Time = body.endTime - body.startTime;
			/*console.log('---------------------------------');
			console.log('ejs接口:'+body.func+'---运行时间:'+body.Time+'毫秒');
			console.log('---------------------------------');
*/
	})
}






async.waterfall([
	function(cb){
		
		var files = fs.readdirSync('./task/');
		for(var i = 0; i< files.length ; i++){
			var rule = new schedule.RecurrenceRule();
			var file = files[i];
			Fiber(function(){
				
			
			
			if(file.substring(file.length - 5, file.length ) == ".json"){
				var state =false;
				var number =0;
				var path = './task/' + file;
				var config = fs.readFileSync(path);
				
				try{
					var json = JSON.parse(config.toString());
					
					//任务名称 
					if(json.任务名称==null || json.任务名称=='' || json.任务名称==undefined){
						return
					}
					//dayOfWeek 
					if(json.星期!=null && json.星期!='' && json.星期!=undefined){
						rule.dayOfWeek = json.星期;
					}
					//month 
					if(json.月!=null && json.月!='' && json.月!=undefined){
						rule.month = json.月;
					}
					//day of month 
					if(json.日!=null && json.日!='' && json.日!=undefined){
						rule.dayOfMonth = json.日;
					}
					//hour  
					if(json.时!=null && json.时!='' && json.时!=undefined){
						rule.hour = json.时;
					}
					//minute  
					if(json.分!=null && json.分!='' && json.分!=undefined){
						rule.minute = json.分;
					}
					//second   
					if(json.秒!=null && json.任务名称!='' && json.任务名称!=undefined){
						rule.second =json.秒;
					}
					
					if(json.任务接口!=null && json.任务接口!='' && json.任务接口!=undefined ){
							var OK =0;
							var interfaces = fs.readdirSync('./interface/');
							for(var i =0;i<json.任务接口.length;i++){
								for(var j=0;j<interfaces.length;j++){
									if(json.任务接口[i]==interfaces[j]){
										OK++;
										break;
									}
								}
							}
							
							if(OK==json.任务接口.length){
								state=true;
							}else{
								console.log('接口数量出现错误,无法开始任务');
							}
					}	
				}catch(e){
					console.error('读取任务出错误！');
				}
				try{
						var conf = JSON.parse(fs.readFileSync('./config/app.json'));
						//console.log(conf);
					}catch(e){
								console.error('读取配置文件出错误！！');
					}
			
				if(state){
					console.log(json.任务名称+'定时任务成功开启');
					
					var j = schedule.scheduleJob(rule, function(){	
						
						number++;
						console.log(json.任务名称+'第'+number+'次执行',moment().format("YYYY-MM-DD HH:mm:ss"));
						time.index(json.任务接口,conf);
					});
					
				}else{
					console.log(json.任务名称+'定时任务开启失败');
				}
			
			
			}
			}).run();
		}
		
		
		
	}
	
	], function (err, result) {
			if(err){
				console.log(err);
			}else{
				console.log('成功');
			}
			
})





