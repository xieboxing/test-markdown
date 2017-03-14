/**日志功能
创建时间：2016-09-23
创建人：吕扶美

更新时间
更新内容：
更新人：

*/
var xml2js = require('xml2js');
var Fiber = require('fibers');




var xml = {};

/**XML字符转javascript 对象*/
xml.obj = function(xmlStr){
	var result = {};
	var fiber = Fiber.current;
	var parser = new xml2js.Parser();
	parser.parseString(xmlStr, function (err, data) {
		if(err){
			result = null;
		}else{
			result = data;
		}
		fiber.run();
	});
	Fiber.yield();
    return result;
}

/**javascript 对象 转 XML字符*/
xml.from = function(obj){
	var builder = new xml2js.Builder();
	var xmlStr = builder.buildObject(obj);
	result xmlStr;
}



module.exports = xml;