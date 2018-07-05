var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var getNowFormatDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = ''+year+month+strDate;
    return currentdate;
}
function getTodayFlagInArrayFlags(nowdate, flags) {
    for(let i=0; i<flags.length; i++) {
        if(flags[i].date == nowdate) return flags[i];
    }
    return false;
}

/* post方法 */
router.post('/', function(req, res, next) {
    //console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("flag_app_db");
        dbo.collection("personal_data"). find().toArray(function(err, result) { //- 获取所有用户名
        if (err) throw err;
            // 判断是否存在该用户
            if (result.length) {
                //存在-返回信息
                let lastRst = [];
                for(idx in result) {
                    let newItem = {};
                    newItem.name = result[idx].name;
                    newItem.imgUrl = result[idx].imgUrl;
                    newItem.todayFlag = getTodayFlagInArrayFlags(getNowFormatDate(), result[idx].flags);
                    lastRst.push(newItem);
                }
                res.jsonp(lastRst);
            }else{
            //不存在-提示错误
            res.jsonp("查询错误，用户不存在!");
            }
            db.close();
        });
    });
});

module.exports = router;
