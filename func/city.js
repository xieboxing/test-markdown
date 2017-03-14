/**
 * 获取省县区功能
 * 创建人：谢泊兴
 * 创建时间：2017-2-22
 * 更新内容：
 * 增加可扩展性,提高查询效率,减少数据库压力
 */

var config = require('./config.js');
var country = config.get('city').china;
var city={};


/**
 * 查询省份
 * 返回列表和条数
 * @return
 */
city.getProvince = function(){

	var json={};
	json.列表=[];

	for(x in country){
		json.列表[x]=country[x].name;
	}

	json.条数=json.列表.length;
	return json;

}
	
	

/**
 * 查询地级市
 * 传省份1个参数,返回列表和条数
 * @param province
 * @return
 */
city.getCity = function(province){

    var json={};
    var array;
    json.列表=[];

    for(x in country){
        if(country[x].name==province){
            array=country[x].city;
            break;
        }
    }

    for(x in array){
        json.列表[x]=array[x].name;
    }

    json.条数=json.列表.length;
    return json;

}
	
	

/**
 * 查询区镇
 * 传省份和县市2个参数(直辖市2个参数都是直辖市名称),返回列表和条数
 * @param province county
 * @return
 */
city.getTown =function(province,county){
		
	var json={};
	var array;
	json.列表=[];
	
	for(x in country){
		if(country[x].name==province){
			array=country[x].city;
			break;
		}
	}
	
	for(x in array){
		if(array[x].name==county){
			json.列表=array[x].area;
			break;
		}
	}
	
	json.条数=json.列表.length;
	return json;
}




module.exports = city;