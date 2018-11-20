var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017/goods');
db.on('error', function(error){
	console.log(error);
});
var Schema = mongoose.Schema;
var goodsListSchema = new Schema({
	goodsId: String,
	goodsMoney: String,
	goodsName: String,
	goodsImage: String,
	goodsNums: Number
})

exports.goodsList = db.model('goods', goodsListSchema, 'goods');
exports.db = db;
console.log('数据库启动成功！！！！');
