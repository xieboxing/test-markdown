/**日志功能
创建时间：2016-09-23
创建人：吕扶美

更新时间
更新内容：
更新人：

*/
var fs = require("fs");
var path = require('path');
var Fiber = require('fibers');
var co = require('co');
var OSS = require('ali-oss');




var aliyun = {};




aliyunup.write = function(type,data){
	var dir = path.resolve(__dirname ,'../_logs/');
	if(fs.existsSync(dir) == false){
		fs.mkdirSync(dir);
	}
	dir = dir +'/'+type
	if(fs.existsSync(dir) == false){
		fs.mkdirSync(dir);
	}
	var date = new Date();
	var day = 	date.getDate();
	var month = date.getMonth()+ 1;
	var year = date.getUTCFullYear();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds()

	fs.appendFileSync(dir+'/'+year+'-'+month+'-'+day+'.txt', '---'+year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds+'【'+data+'】\n');
}


aliyun.upload = function(filePath){
	var result = {};
	var fiber = Fiber.current;


	var client = new OSS({
		region: 'oss-cn-shanghai',
		accessKeyId: 'd8KVSmfuURJ09Ecq',
		accessKeySecret: 'en2YxD1qrtFmBSSSEOUDxB0w2Vnz67',
		bucket: '45646'
	});


	





	Fiber.yield();
	return result;

}





module.exports = aliyun;