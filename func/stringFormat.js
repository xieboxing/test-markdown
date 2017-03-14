var moment = require('moment');
var fs= require("fs");
var variable = require('../config/share.json');
var aes =  require('./aes.js');
var md5 = require('MD5');
var request = require('request');
/* [当前时间
调用方法:
type:类型,time[2015-02-01 00:00:00],date[2015-02-01]
 */
	module.exports.date = function(type){
		var now = new Date();//指定日期
		var r='';
		if(type=='time'){
			r=moment(now).format('YYYY-MM-DD HH:mm:ss');
		}
		else if(type=='date'){
			r=moment(now).format('YYYY-MM-DD');
		}
		else{
			r=moment(now).format(type);
		}
		return r;
	}
/* ]当前时间 */

/* [月份调整
调用方法:
ee:时间
num:月份,负号为上几月
*/
	module.exports.ee = function(ee,num){
		var r='';
		if(ee==null)
		var now = new Date();//指定日期
		else
		var now = new Date(ee);
		var lastMonth = new Date(now.getFullYear(),num+now.getMonth(),now.getDate());
		var ty='YYYY-MM-DD HH:mm:ss';
		var le=ee.length;
		ty=ty.substr(0,le);
		r = moment(lastMonth).format(ty);
		
		return r;
	}
/* ]月份调整*/

/*取几天后方法
调用方法:
dd:时间，如null则取当天时间
num:距离dd的天数,负号为上几天
*/
module.exports.dd = function(dd,num){

		var r='';
		if(dd==null)
		var now = new Date();//指定日期
		else
		var now = new Date(dd);
		var lastMonth = new Date((now/1000+(num*24*60*60))*1000);
		var ty='YYYY-MM-DD HH:mm:ss';
		r = moment(lastMonth).format(ty);
		
		return r;

	//后几天时间 天数	

}
/*取几天后方法  */

/*[文件写入*/
/*
说明:
files('./aaaaa/2016-10-20/ccccc/test.txt',"中文")
*/
function path_file(arr){
	if(arr.i < arr.path_sum){
			if(arr.path_arr[arr.i] != '.' && arr.path_arr[arr.i] != ''){
				if(arr.path_con == ''){
					arr.path_con = './'+arr.path_arr[arr.i];	
				}
				else{
					arr.path_con += '/'+arr.path_arr[arr.i];
				}
			
				if(arr.path_num != arr.i){
					fs.mkdir(arr.path_con,function(err){
						arr.i++;
						path_file(arr);
					});
				}
				else{
				   if(arr._type == 'all'){
						var writerStream=fs.createWriteStream(arr.path_con);
						writerStream.write(arr.con,'utf8');
						writerStream.end();
						arr.i++;
						path_file(arr);
				   }
				   else{
						fs.appendFile(arr.path_con,arr.con, function (err) {	
							arr.i++;
							path_file(arr);
						});
				   }
				}
			}
			else{
						arr.i++;
						path_file(arr);
			}
	}
}

/*
追加写入
path:文件目录
con:内容
*/
module.exports.files  = function (path,con){
	var arr = {};
	arr.path_arr = path.split('/');
	arr.path_sum = (arr.path_arr).length;
	arr.con = con;
	if(arr.path_sum > 1){
		arr.path_con = '';
		arr.path_num = Number(arr.path_sum) - 1;
		arr.i=0;
		path_file(arr);
		return '文件写入成功';
	}
	else{
		return '目录异常';
	}
}

module.exports.logs  = function (path,con,title,allcallback){
var path = './_logs/'+path+'/'+this.date('YYYY')+'/'+this.date('MM-DD')+'.txt';
var con = '\n\n【'+title+'】\n'+this.date('time')+'\n'+"错误:"+con ;
		this.files(path,con,function(s){
				kv=name.getkv(a.内容);
				kv=kv['id'].split(",");
				allcallback(s);
		});

}




module.exports.month_xc  = function (date2,date1){
		//两个日期
		var date1 = date1;
		var date2 = date2;
		// 拆分年月日
		date1 = date1.split('-');
		// 得到月数
		date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
		// 拆分年月日
		date2 = date2.split('-');
		// 得到月数
		date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
		var m = Math.abs(date1 - date2);
		
		return m;
}

/*-----------------------------------------------*/
/*[读取网址内容 
调用方法:
html_url:网址
r:内容
 var r = {}
 r.aaa="13714397300"
 r.中语言="415be5fdc0107f2ee88d51784d791c07"
type:类型get,post两种,get可以不用传r,type
*/
	exports.file = function(html_url,r,type,allcallback){
		
		 var s={};
		
		 if(type=='post'){
			 request.post({url:html_url, form: r}, function(error,httpResponse,body){
			 	
			   if(!error && httpResponse.statusCode == 200){
				   s._f="成功";
				   s.内容=body;

			   }else{
				   s._f="失败";
			   }
				allcallback(s);
			})
		 }
		 else{
			request(html_url, function (error, response, body) {
			   if(!error && response.statusCode == 200){
				   s._f="成功";
				   s.内容=body;

			   }else{
				   s._f="失败";
			   }
				allcallback(s);
			})
			 
		 }

						
	}
/*]读取网址内容 */


/*[签名
param.平台  例如:平台
type  为数组,填写为满足条件的数据
*/
module.exports.sign  =function (param,type){
	
	if(type !=null && type != ''){
		 type = type.concat(['平台','随机码','func','_时间']);
	}
	var querystring = Object.keys(param).filter(function(key){
		if(type == null || type == '')
		return param[key] !== undefined && param[key] !== '' && ['sign','key'].indexOf(key)<0;
		else{
			return param[key] !== undefined && param[key] !== '' && ['sign','key'].indexOf(key)<0 && type.indexOf(key)>=0;
		}
	}).sort().map(function(key){
		return key + '=' + param[key];
	}).join("&") + "&key="+variable.密钥.服务器key;
	
	return md5(querystring).toUpperCase();
}
/*]签名*/

/* [服务器交互 */
module.exports.interactive  = function (r,allcallback){

	var 返 = {}
	返.状态 = '成功';
	if(r == null || r == ''){
		返.状态 = '数据不能为空';
	}
	else if(r.func == null || r.func == ''){
		返.状态 = '接口名不能为空';
	}
	else if(variable.密钥.服务器地址 == null || variable.密钥.服务器地址 == ''){
		返.状态 = '服务器异常';
	}
	else if(variable.密钥.服务器key == null || variable.密钥.服务器key == ''){
		返.状态 = '签名异常';
	}	
	console.log(r);
	if(r.随机码 == null || r.随机码 == '' || r.随机码==undefined){
	   r.随机码 = md5(r.func)	;
	}
	if(返.状态 == '成功'){
		r._时间 = this.date('time');
		r.平台 = variable.密钥.平台;
		r.sign = this.sign(r);
		var con = JSON.stringify(r);
		con = r.随机码+aes.aesEncodeCipher(con,r.随机码);
		var p = {};
		p.func = r.func;
		p.words = con;
		this.file(variable.密钥['服务器地址'],p,'post',function(s){
				返 = JSON.parse(s.内容);
				allcallback(返);
		})
	}
	else
	   allcallback(返);
}
/* ]服务器交互 */




