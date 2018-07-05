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

var getNowFormatTime = () => {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  if(hour >= 0 && hour <= 9){
    hour = "0" + hour;
  }
  if(minute >= 0 && minute <= 9){
    minute = "0" + minute;
  }
  let currentTime = hour + ':' + minute;
  return currentTime;
}

//- 添加今天的flag
var addTodayFlag = (req, res, dbo, whereStr, lastRst) => {
  let newDate = getNowFormatDate();
  let newTime = getNowFormatTime();
  let todayFlag = {
    "setTime": newTime,
    "checkTime": newTime,
    "date": newDate,
    "dateFlag": []
  };
  let updateStr = {$push: { "flags" : todayFlag }};
  
  lastRst[0].flags.push(todayFlag);
  dbo.collection("personal_data").updateOne(whereStr, updateStr, function(err, res) {
    if (err) throw err;
    console.log('\n'+
      '创建时间'+newDate+' '+newTime+'\n'+
      "已添加今日Flag\n"
    );
  });
}


/* post方法 */
router.post('/', function(req, res, next) {
  //console.log(req.body);
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let dbo = db.db("flag_app_db");
      let whereStr = {};  // 根据id查询用户信息
      if (req.body.userID && req.body.pwd) { //用户名和密码不能为空
        whereStr = { userID: req.body.userID };
        dbo.collection("personal_data"). find(whereStr).toArray(function(err, result) {
          if (err) throw err;
            // 判断是否存在该用户
            if (result.length) {
              //存在-返回信息
              let lastRst = [];
              for(idx in result) {
                let newItem = result[idx];
                delete newItem._id;
                lastRst.push(newItem);
              }
              console.log(lastRst[0].name+' 登录了Flag');

              let lastestFlag = lastRst[0].flags[lastRst[0].flags.length-1];
              //- 判断是否有flag
              if(lastestFlag) {
                //- 判断是否存在 今日flag
                console.log('他最新的flag是：'+lastestFlag.date+'\n');
                if(lastestFlag.date != getNowFormatDate()) {
                  console.log('该用户今天还没有立Flag，即将为他创建 今日Flag');
                  //- 不存在则添加 今日flag
                  addTodayFlag(req, res, dbo, whereStr, lastRst);
                }
              }else{
                console.log('该用户没有Flag，即将为他创建 今日Flag');
                //- 不存在则添加 今日flag
                addTodayFlag(req, res, dbo, whereStr, lastRst);
              }
              if(lastRst[0].pwd == req.body.pwd) res.jsonp(lastRst);
              else res.jsonp('密码错误！');
            }else{
              //不存在-提示错误
              let errorTips = "查询错误，用户id"+ (req.body.userID?'('+req.body.userID+')':'') +"不存在!";
              res.jsonp(errorTips);
            }
            db.close();
        });
      }else{
        res.jsonp("用户名或密码为空！req.body("+req.body.userID+':'+req.body.pwd+')');
      }
  });
});

module.exports = router;
