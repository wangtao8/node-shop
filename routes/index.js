var express = require('express');
var router = express.Router();
var connection = require('../mysql/goods').connection; //引入链接
/* GET home page. */
router.get('/', function(req, response, next) {
	Promise.all([test(), test1(), test2(), test3(),test4(),test5()])//这种方法还可以
		.then(function(result){
			var keys = {data:{},errmsg:"",errno:0}
			for (var i = 0; i < result.length; i++){
				for (var key in result[i]) {
					console.log('key:', key, result[i][key])
					keys.data[key] = result[i][key]
				}
			}
			response.send(keys)
		})
});

router.post('/regiester',function(req,response,next){
	console.log('req.body:', req.body)
	/**设置响应头允许ajax跨域访问**/
//	response.setHeader("Access-Control-Allow-Origin","*");
	/*星号表示所有的异域请求都可以接受，*/
//	response.setHeader("Access-Control-Allow-Methods","GET,POST");
	var sql = "INSERT INTO my_user (name, password) VALUES ('" + req.body.name + "', '" + req.body.pass + "')"//值用单引号包括
		connection.query(sql, function(error, results, fields) {
			try{
				if(error) throw error;
				console.log('添加数据的结果：', results)
				response.send('1')
			}catch(e){
				console.log('错误：', e)
				response.send('0')
			}
		});
	
})
//login
router.post('/login',function(req,response,next){
	console.log('req.body:', req.body)
	/**设置响应头允许ajax跨域访问**/
//	response.setHeader("Access-Control-Allow-Origin","*");
	/*星号表示所有的异域请求都可以接受，*/
//	response.setHeader("Access-Control-Allow-Methods","GET,POST");
	var sql = "SELECT count(1) as nums FROM my_user WHERE name = '" + req.body.name + "'AND password = '" + req.body.pass + "'"//值用单引号包括
//	console.log('sql:', sql)
	connection.query(sql, function(error, results, fields) {
		if(error) throw error;
		if (parseInt(results[0].nums) > 0){
			response.send('1')
		} else {
			response.send('0')
		}
		
	});
})

//获得所有用户信息 分页
router.post('/getUsers',function(req,res,next){
	var pageIndex = req.body.pageIndex//当前页数
	console.log('后台接收的页数：', pageIndex)
	var limit = 15*pageIndex - 15//从多少页开始
	var sql = "SELECT * FROM my_user limit "+ limit +",15"
	var sql2 = "SELECT count(1) as nums FROM my_user"
	connection.query(sql, function(error, results, fields) {
		try{
			if(error) throw error;
			connection.query(sql2, function(err2, res2, fil2) {
				console.log('查询出来总的条数：', Math.ceil(res2[0].nums / 15))
				var pageAll = Math.ceil(res2[0].nums / 15)
				var resData = {total:pageAll,conut:results}
				res.send(resData)
			})
		}catch(e){
			res.send('0')
		}
	});
})


//更新用户信息 分页
router.post('/editUser',function(req,res,next){
	var id = req.body.id
	var name = req.body.name
	var character = req.body.character
	var sql = "UPDATE my_user SET name = '"+ name +"',character1 = '"+ character + "' WHERE id = '"+ id +"'"
	console.log('sql:', sql)
	connection.query(sql, function(error, results, fields) {
		try{
			if(error) throw error;
			console.log('更改用户信息：', results)
			res.send('1')
		}catch(e){
			res.send('0')
		}
	});
})

//删除用户
router.post('/deletUser',function(req,res,next){
	var id = req.body.id
	var sql = "DELETE FROM my_user WHERE id = '"+ id +"' "
	connection.query(sql,function(err, results, fields){
		try{
			if(err) throw err
			res.send('1')
		}catch(e){
			res.send('0')
		}
	})
})
// 查找分类商品
function test() {
	return new Promise(function(resolve, reject) {
		var sql = 'select a.id, a.name, count(b.category_id) from nideshop_category a inner join nideshop_goods b on a.id = b.category_id group by b.category_id having count(b.category_id) > 5 '
		connection.query(sql, function(error, results, fields) {
			if(error) throw error;
			for(let id in results) {//循环结果的次数 注意let
				var sql2 = 'SELECT * FROM nideshop_goods WHERE category_id = ' + results[id].id + ' limit 0,5'//得到当前的sql
				connection.query(sql2, function(error2, results2, fields2) {
					if(error2) throw error2;
					var newData = []
					for(var i = 0; i < results2.length; i++) {//循环结果，并添加到数组中
						newData.push(results2[i])
					}
					results[id].goodsList = newData
					if(id == results.length - 1) {//如果是最后一次  那么返回结果
//						var now = {data:{categoryList:results},errmsg:"",errno:0}
//						console.log('查看当前的值：', now)
						var now = {categoryList:results}
						resolve(now)
					}
				});
			}
		});
	})
}
//查找制造商商品
function test1() {
	return new Promise(function(resolve, reject) {
		var sql = 'SELECT * FROM `nideshop_brand` WHERE new_pic_url != "" '
		connection.query(sql, function(error, results, fields) {
			if(error) throw error;
//			var now = {data:{brandList:results},errmsg:"",errno:0}
			var now = {brandList:results}
			resolve(now)
		});
	})
}

//查找banner图
function test2() {
	return new Promise(function(resolve, reject) {
		mysql.createConnection(function(err) {
			if(err) {
				console.error('error connecting:' + err.stack)
				reject(err.stack)
			}
			console.log('connected as id ' + connection.threadId);
		})
		var sql = 'SELECT * FROM `nideshop_ad`'
		connection.query(sql, function(error, results, fields) {
			if(error) throw error;
//			var now = {data:{brandList:results},errmsg:"",errno:0}
			var now = {banner:results}
			resolve(now)
		});
	})
}

//查找channel
function test3() {
	return new Promise(function(resolve, reject) {
		mysql.createConnection(function(err) {
			if(err) {
				console.error('error connecting:' + err.stack)
				reject(err.stack)
			}
			console.log('connected as id ' + connection.threadId);
		})
		var sql = 'SELECT * FROM `nideshop_channel`'
		connection.query(sql, function(error, results, fields) {
			if(error) throw error;
//			var now = {data:{brandList:results},errmsg:"",errno:0}
			var now = {channel:results}
			resolve(now)
		});
	})
}
// 查找推荐nideshop_goods
function test4() {
	return new Promise(function(resolve, reject) {
		mysql.createConnection(function(err) {
			if(err) {
				console.error('error connecting:' + err.stack)
				reject(err.stack)
			}
			console.log('connected as id ' + connection.threadId);
		})
		var sql = 'SELECT * FROM nideshop_goods WHERE is_new = 1 limit 0,4'
		connection.query(sql, function(error, results, fields) {
			if(error) throw error;
			var now = {newGoodsList:results}
			resolve(now)
		});
	})
}
// 查找推荐nideshop_topic
function test5() {
	return new Promise(function(resolve, reject) {
		mysql.createConnection(function(err) {
			if(err) {
				console.error('error connecting:' + err.stack)
				reject(err.stack)
			}
			console.log('connected as id ' + connection.threadId);
		})
		var sql = 'SELECT * FROM nideshop_topic'
		connection.query(sql, function(error, results, fields) {
			if(error) throw error;
			var now = {topicList:results}
			resolve(now)
		});
	})
}
/**
 *nodej 使用mysql, 只要mysql.createConnection 就可操作 不須再用 connection.connect connection.end connection.start 否則可能會有 Cannot enqueue Handshake after invoking quit 的錯誤
 */
// 查找
function banner() {
	return new Promise(function(resolve, reject) {
		mysql.createConnection(function(err) {
			if(err) {
				console.error('error connecting:' + err.stack)
				reject(err.stack)
			}
			console.log('connected as id ' + connection.threadId);
		})

		/***
		 * SELECT id FROM nideshop_ad where id = 1
		 * 1.查询  2.查询的字段名，*为所有字段  3.来自什么表  4.表名  5.条件过滤  6.具体的条件是什么
		 */
		connection.query('SELECT * FROM nideshop_ad limit 0,10', function(error, results, fields) {
			if(error) throw error;
			//	        console.log('The solution is:', results);
			resolve(results)
		});
		//	    connection.end();
	})
}



//排序  查询结尾有DESC那么为降序排  没有为升序排列
function pauxu() {
	return new Promise(function(resolve, reject) {
		mysql.createConnection(function(err) {
			if(err) {
				reject(err.stack)
			}
		})
		/**
		 * SELECT * FROM nideshop_product ORDER BY retail_price DESC
		 * 1.查询  2.查询字段名，*为所有字段 3.来自什么表 4.表名 5.ORDER BY 排序固定写法 6.查询排序的字段名 7.是否降序排列，有DESC为降序，没有为升序
		 */
		connection.query('SELECT * FROM nideshop_product ORDER BY retail_price DESC', function(error, results, fields) {
			resolve(results)
		});
		//		connection.end();
	})
}

router.post('/postTest', function(req, res, next) {
	console.log('页面接收的值:', req.body)
	res.send('2')
})
module.exports = router;