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

router.post('/', function(req, res, next) {
    //console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("flag_app_db");
        let whereStr = { userID: req.body.userID };  // 根据id查询用户信息
        
        dbo.collection("personal_data").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            var newFlags = [];
            //- 获取个人flag数量
            let = iflagsL = result[0].flags.length-1;
            //- 获取个人flag列表
            newFlags = result[0].flags;
            //- 修改个人flag列表
            newFlags[iflagsL].dateFlag = req.body.flagList

            //flag列表存在 更新数据库flags信息
            if(newFlags.length>0 && newFlags[iflagsL].dateFlag.length>0) {
                let updateStr = {$set: { "flags" : newFlags }};
                console.log('$set allowed')
                dbo.collection("personal_data").updateOne(whereStr, updateStr, function(err, result) {
                    if (err) throw err;
                    console.log(result.result);
                    console.log("用户 "+req.body.name+" 已添加 "+newFlags[iflagsL].date+" 的flag");
                    dbo.collection("personal_data").find(whereStr).toArray(function(err, result) {
                        let resResult = result[0];
                        delete resResult._id;
                        res.jsonp({
                            succeed: true,
                            countFlags: req.body.flagList.length,
                            newUserData: resResult
                        });
                        db.close();
                    });
                });
            }
        });
    });
});

module.exports = router;