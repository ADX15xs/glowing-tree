var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* post方法 */
router.post('/', function(req, res, next) {
    //console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("flag_app_db");
        let myobj = req.body;
        dbo.collection("personal_data").insertOne(myobj, function(err, result) {
            if (err) throw err;
            console.log("成功插入用户 ("+myobj.name+") 的信息");
            res.jsonp("注册成功！请重新登录");
            db.close();
        });
    });
});

module.exports = router;
