var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// 查询用户登录信息
var usersigns = [];
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("flag_app_db");
    var whereStr = {};  // 查询条件
    dbo.collection("user_sign"). find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        usersigns = result;
        db.close();
    });
});
// 分类
var userArr = function(type) {
  var getArr = [];
  for(let i=0; i<usersigns.length; i++) {
    if(usersigns[i].usertypecode == type) getArr.push(usersigns[i]);
  }
  return getArr;
}
// 查询用户一般信息
var userinfos = [];
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("flag_app_db");
  var whereStr = {};  // 查询条件
  dbo.collection("user_info"). find(whereStr).toArray(function(err, result) {
      if (err) throw err;
      userinfos = result;
      db.close();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Flag-Server',
    users: usersigns,
    userInfos: userinfos,
    admins: userArr(0),
    visitors: userArr(1)
  });
  next();
});

router.get('/test', function(req, res ,next){

});


module.exports = router;
