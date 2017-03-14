/**pg数据库功能
创建时间：2016-09-23
创建人：吕扶美

更新时间
更新内容：
更新人：

*/
var Fiber = require('fibers');
var pg = require('pg');
//var config = require('./config.js');
var logs = require('./logs.js');
var genericPool = require('generic-pool');
var constring = "tcp://postgres:123987@192.168.1.154/zyz";

var pgdb = {};

var opts = {
    max: 10, // maximum size of the pool 
    min: 2 // minimum size of the pool 
}



const factory = {
    create: function(){
         return new Promise(function(resolve, reject){
            var client = pg.createClient()
            client.on('connected', function(){
                resolve(client)
            })
        })
    },
    destroy: function(client){
        return new Promise(function(resolve){
          client.on('end', function(){
            resolve()
          })
          client.disconnect()
        })
    }
}

const pool = genericPool.createPool(factory,opts);

const someFactory={
	name: 'postgresql',
    //将建 一个 连接的 handler
	create: function(callback) {
			
			var client = new pg.Client(constring);
			client.connect(function(err){
				if(err){
					callback(err, null);
					throw err;
				}else{
                    // console.log("PGSQL创建了一个连接！");
					callback(null, client);
				}
			});
    },
    // 释放一个连接的 handler
    destroy  : function(client) { 
    	client.end(function(err){
    		if (err){
                throw err;
            }else{
                // console.log("PGSQL断开了一个连接！");
            }
    	});
    },
    // 连接池中最大连接数量
    max      : 50,
    // 连接池中最少连接数量
    min      : 10, 
    // 如果一个线程30秒钟内没有被使用过的话。那么就释放
    idleTimeoutMillis : 30000,
    // 如果 设置为 true 的话，就是使用 console.log 打印入职，当然你可以传递一个 function 最为作为日志记录handler
    log : false 
}



pgdb.open = function(cb){
	pool.acquire(function(err, db) {
        cb(err,db);
    });
}

pgdb.close = function(client){
	pool.release(client);
}


pgdb.start = function(client){
	client.query('BEGIN;');
}

pgdb.end = function(client){
	client.query('COMMIT;');
}


pgdb.query = function(client,sql){
	var result = {};
	var fiber = Fiber.current;
	client.query(sql,function(err,resultdata){
		// console.log(err);
		// console.log(result);
		if(err){
			result.状态 = '失败';
			result.信息 = err.stack;
			result.执行语句 = sql;
			console.log(':'+sql+'执行错误:'+err.stack);
			logs.write('sql','错误语句:'+sql+'错误信息:'+err.stack);
			fiber.run();
		}else{
			result.状态 = '成功';
			if(resultdata.command == 'SELECT'){
				result.数据 = resultdata.rows;
			}else if(resultdata.command == 'INSERT'){
				result.影响行数 = resultdata.rowCount;
			}else if(resultdata.command == 'DELETE'){
				result.影响行数 = resultdata.rowCount;
			}else if(resultdata.command == 'UPDATE'){
				result.影响行数 = resultdata.rowCount;
			}
			result.执行语句 = sql;
			fiber.run();
			
		}
	});

	Fiber.yield();

	return result;
}

pgdb.open(function(err,result){
	console.log(result);
})




module.exports = pgdb;