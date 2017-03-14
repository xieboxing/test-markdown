
/*
打印功能
更新人=梁敏俐
更新时间=2017-02-21
更新原因=更换新平台
版本=v1.2.1
*/


var crypto = require('crypto');
var http = require('http');
var config = require('./config.js');
var Fiber = require('fibers');

var yunprint = {};

/*
 * 打印模板
 */

yunprint.template = function(data){
	if(data.模板类型 == '加油订单'){
		
		var content = "<MN>2</MN> <FW2><FH2>    加油订单</FH2></FW2>\r\n"
	    content = content + "********************************\r\n"
        content = content + "订单编号:"+"\r\n"+data.商品订单号+"\r\n"
        ontent = content + "油站编号：1000005\r\n"
        content = content + "交易油站："+data.商户名称+"\r\n"
        content = content + "付款方式："+data.付款方式+"\r\n"
        content = content + "油枪号："+data.油枪号+"\r\n"
        content = content + "油品类型："+data.油品型号+"\r\n"
        content = content + "交易时间："+data.支付时间+"\r\n"
	    content = content + "<FH><FW> 加油金额:\r\n\t\t\t\t ￥"+data.支付金额+ "</FW></FH>\r\n"
	    content = content + "********************************\r\n"
	    content = content + "备注信息:\r\n"
	    content = content + data.备注+"\r\n"
	    return content;
	}
}



yunprint.jiesuan = function(data){
	if(data.模板类型 == '结算订单'){

		var content = "<FW2><FH2>    结算单</FH2></FW2>\r\n"
	    content = content + "********************************\r\n"
        content = content + "结算单号:"+"\r\n"+data.结算单号+"\r\n"
        content = content + "结算人："+data.结算人+"\r\n"
        content = content + "交易累计："+data.交易累计+"\r\n"
        content = content + "开始时间："+data.开始时间+"\r\n"
        content = content + "结束时间："+data.结束时间+"\r\n"       
	    content = content + "<FB>交易金额:\t￥"+data.金额+"</FB>\r\n"
		content = content + "<FB>到账金额:\t￥"+data.到账金额+"</FB>\r\n"
	    content = content + "********************************\r\n"
	    return content;
	}
}
/*
调用方法：

var data = yunprint.print(终端号,密钥,content);
if (data.回复信息!= 1) {
    	data.失败信息 = "打印失败";
		return  data;
    }

*/



yunprint.print = function(machine_code,msign,content){

    var fiber = Fiber.current;
	var result = {};
    var conf = config.get('yunprint');
    if(conf == null){
		result.状态 = '失败';
		result.回复信息 = '读取配置文件失败';
		return result
	}  
    var partner = conf.partner;
    var apikey = conf.apikey;
    var time = Math.round(new Date().getTime() / 1000);
    var sign = apikey+"machine_code"+machine_code+"partner"+partner+"time"+time+msign;
	var content=encodeURI(content);
    sign = md5(sign).toUpperCase();
	

    var body = "partner="+partner+"&machine_code="+machine_code+"&time="+time+"&sign="+sign+"&content="+content;
    var opt = {  
        method: 'POST',  
        host: 'open.10ss.net',  
        port: 8888,  
        path: '/',  
        headers: {
            "Content-Length": body.length 
        }  
    };  
    var req = http.request(opt, function (res) {  
        var body = "";  
        res.on('data', function (data) {
            body += data; 
        }).on('end', function () {
        	result.状态 = '成功';
			result.回复信息 = JSON.parse(body);
			fiber.run();
        });
    });
        req.on('error', function(e) {
        result.状态 = '失败';
		result.回复信息 = '发送打印失败';
		fiber.run();
    	});; 
  
    req.write(body + "\n");  
    req.end();   
    
    Fiber.yield();
	return result;

}

/*
 添加打印终端
 var data = yunprint.add(终端号,密钥,物联卡号,终端名称);
if (data.回复信息!= 1) {
    	data.失败信息 = "添加失败";
		return  data;
    }
*/
yunprint.add = function(machine_code,msign,mobilephone,printname){

    var fiber = Fiber.current;
	var result = {};
    var conf = config.get('yunprint');
    if(conf == null){
		result.状态 = '失败';
		result.回复信息 = '读取配置文件失败';
		return result
	}  
    var partner = conf.partner;
    var apikey = conf.apikey;
    var username = conf.username;
    var sign = apikey+"partner"+partner+"machine_code"+machine_code+"username"+username+"printname"+printname+"mobilephone"+mobilephone+msign;
    sign = md5(sign).toUpperCase();
    var body = "partner="+partner+"&machine_code="+machine_code+"&username="+username+"&printname="+printname+"&mobilephone="+mobilephone+"&msign="+msign+"&sign="+sign;
   console.log(body);
    var opt = {
        method: 'POST',  
        host: 'open.10ss.net',  
        port: 8888,  
        path: '/addprint.php',  
        headers: {
            "Content-Length": body.length 
        } 
    };  
    var req = http.request(opt, function (res){
        var body = "";  
        res.on('data', function (data) {
            body += data; 
        }).on('end', function (){
        	result.状态 = '成功';
			result.回复信息 = JSON.parse(body);
			if(result.回复信息==1){
				result.回复信息 = '成功';
			}else if(result.回复信息==2){
				result.回复信息 = '该打印机已添加';
			}else{
				result.回复信息 = '添加失败';
			}
			fiber.run();
        });
    });
    req.on('error', function(e) {
	    result.状态 = '失败';
		result.回复信息 = '发送失败';
		fiber.run();
	});
  
    req.write(body + "\n");  
    req.end();   
    
    Fiber.yield();
	return result;

}



/*
 删除打印设备
 var data = yunprint.delete(终端号,密钥);
if (data.回复信息!= 1) {
    	data.失败信息 = "删除失败";
		return  data;
    }
*/
yunprint.delete = function(machine_code,msign){
    var fiber = Fiber.current;
	var result = {};
    var conf = config.get('yunprint');
    if(conf == null){
		result.状态 = '失败';
		result.回复信息 = '读取配置文件失败';
		return result
	}  
    var partner = conf.partner;
    var apikey = conf.apikey;
    var sign = apikey+"machine_code"+machine_code+"partner"+partner+msign;
    sign = md5(sign).toUpperCase();
    var body = "partner="+partner+"&machine_code="+machine_code+"&sign="+sign;
    var opt = { 
        method: 'POST',  
        host: 'open.10ss.net',  
        port: 8888,  
        path: '/removeprint.php',  
        headers: {
            "Content-Length": body.length 
        }
    };  
    var req = http.request(opt, function (res) {  
        var body = "";  
        res.on('data', function (data) {
            body += data; 
        }).on('end', function (){
        	result.状态 = '成功';
			result.回复信息 = JSON.parse(body);
			if(result.回复信息 ==1){
                result.回复信息='成功';
            }else if(result.回复信息 ==2){
                result.回复信息='没有这个设备'
            }else{
                result.回复信息='删除失败'
            }
            fiber.run();
        });
    });
    req.on('error', function(e) {
	    result.状态 = '失败';
		result.回复信息 = '发送失败';
		fiber.run();
	});
    req.write(body + "\n");  
    req.end();   
    Fiber.yield();
	return result;
}



function md5(str){
    var md5 = crypto.createHash('md5');
    md5.update(str);
    var d = md5.digest('hex');
    return d;
}


module.exports = yunprint;