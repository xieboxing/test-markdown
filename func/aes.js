//aes.js
//修改时间20160225
//引入nodejs加密核心库
var crypto = require('crypto');
//加密公共密钥 32位
var keys = 'FHDJsSDJSEbnbnRGSDFGz13602567887';
//编码设置
var clearEncoding = 'utf8';
//加密方式
var algorithm = 'aes-256-ecb';
//向量
var iv = "";
//加密类型 base64/hex...
var cipherEncoding = 'hex';


/*AES加密
	
	参数说明：
	data 加密前原文数据
	key 加密密钥（长度必须为32位）

	调用范例：
	var aes =  require('./aes.js');
	var enString = aes.aesEncodeCipher(data,key);

	*/
exports.aesEncodeCipher = function(data,key){
	
	if(key == null || data == null){
		return 10000;
	}
	
	if(key.length != 32){
		return 10001;
	}

	var datastr = ""
	/*判读是否为字符串,不是转成字符串*/
	if(typeof(data) === 'string'){
		datastr = data;
	}else{
		datastr = JSON.stringify(data);
	}

	/*加密前先进行BASE64编码，编码后进行AES加密*/
	try{
		var buf = new Buffer(datastr);
		var base64String = buf.toString('base64');
	}catch(e){
		return 10002;
	}

	try{
		var cipher = crypto.createCipheriv(algorithm, key, iv);
		var cipherChunks = [];
		cipherChunks.push(cipher.update(base64String, clearEncoding, cipherEncoding));
		cipherChunks.push(cipher.final(cipherEncoding));
		return cipherChunks.join('');
	}catch(e){
		return 10004;
	}
}


/*AES解密


	参数说明：
	data 加密前原文数据
	key 加密密钥（长度必须为32位）

	调用范例：
	var aes =  require('./aes.js');
	var enString = aes.aesDecodeCipher(data,key);

	*/
exports.aesDecodeCipher = function(data,key){
	
	if(key == null || data == null){
		return 10000;
	}
	
	if(key.length != 32){
		return 10001
	}
	
	try{
		var cipherChunks = [data];
		var decipher = crypto.createDecipheriv(algorithm, key, iv);
		var plainChunks = [];
		for (var i = 0;i < cipherChunks.length;i++) {
			plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));
		}
		plainChunks.push(decipher.final(clearEncoding));

		/*AES解密后是BASE64编码，将BASE64编码进行解码*/
		// console.log("解密后base64编码:"+plainChunks.join(''));
		var base64buf = new Buffer(plainChunks.join(''), 'base64')
		var enString = base64buf.toString();
		/*AES解密后是BASE64编码，将BASE64编码进行解码*/
		return  enString
	}catch(e){
		return 10003;
	}
}

/*原生加密方法*/
exports.encodeCipher = function(data){
	try{
		/*加密前先进行BASE64编码，编码后进行AES加密*/
		var buf = new Buffer(data);
		var base64String = buf.toString('base64');
		// console.log("加密前base64编码:"+base64String);
		/*加密前先进行BASE64编码，编码后进行AES加密*/

		var cipher = crypto.createCipheriv(algorithm, keys, iv);
		var cipherChunks = [];
		cipherChunks.push(cipher.update(base64String, clearEncoding, cipherEncoding));
		cipherChunks.push(cipher.final(cipherEncoding));
		return cipherChunks.join('');
	}catch(e){
		return 10004;
	}
}


/*原生解密方法*/
exports.decodeCipher = function(data){
	try{
		var cipherChunks = [data];
		var decipher = crypto.createDecipheriv(algorithm, keys, iv);
		var plainChunks = [];
		for (var i = 0;i < cipherChunks.length;i++) {
			plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));
		}
		plainChunks.push(decipher.final(clearEncoding));

		/*AES解密后是BASE64编码，将BASE64编码进行解码*/
		// console.log("解密后base64编码:"+plainChunks.join(''));
		var base64buf = new Buffer(plainChunks.join(''), 'base64')
		var enString = base64buf.toString();
		/*AES解密后是BASE64编码，将BASE64编码进行解码*/
		return  enString
	}catch(e){
		return 10003;
	}
}
