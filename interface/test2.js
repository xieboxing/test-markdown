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




module.exports.run = function(body,pg,mo){
		var data = {};
		data.状态='成功';	
		
		console.log('test2任务执行成功');

		return data;

}

/*输出
{"状态":"成功"}
*/