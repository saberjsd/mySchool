var UserDao = require('../dao/UserDao');
// 数据初始化，连接数据库
var dao = new UserDao();
dao.init();

//用户列表
exports.userList = function (req, res) {
    var result = {
        pageMenu:'userInfo',
        page:'userList'
    };
    var nameKey = req.query.nameKey;
    var roleKey = req.query.roleKey;
    var statusKey = req.query.statusKey;
    if(nameKey){
        // console.log(nameKey)
        dao.searchName(nameKey,function (err1,data1) {
            if(!err1){
                result.userList = data1;
                result.nameKey = nameKey;
                // console.log(result)
                res.render('userList',result)
            }
        })
    }
    else if(roleKey){
        // roleKey=='教师'?roleKey=1:roleKey=0
        console.log(roleKey)
        dao.searchRole(roleKey,function (err1,data1) {
            if(!err1){
                result.userList = data1;
                result.nameKey = "?";
                result.roleKey = roleKey;
                // console.log(result)
                res.render('userList',result)
            }
        })
    }
    else if(statusKey){
        // statusKey=='正常'?statusKey=1:statusKey=0;
        console.log(statusKey)
        dao.searchStatus(statusKey,function (err1,data1) {
            if(!err1){
                result.userList = data1;
                result.nameKey = "?";
                result.statusKey = statusKey;
                // console.log(result)
                res.render('userList',result)
            }
        })
    }
    else{
        dao.userList(function (err1,data1) {
            if(!err1){
                result.userList = data1;
                result.nameKey = "?";
                // console.log(result)
                res.render('userList',result)
            }
        })
    }


};
// 重置密码
exports.resetPwd = function (req, res) {

    dao.resetPwd(req.query.uid,function (err,data) {
        if(!err){
            res.send({"res":"reset_ok"})
        }else {
            res.send({"res":"reset_fail"})
        }
    })

};
// 修改状态
exports.setUserInfo = function (req, res) {
    // console.log(req.body)
    dao.setUserInfo(req.body,function (err,data) {
        res.redirect('/userList')
    })

};

exports.delUser = function (req, res) {
    dao.delUser(req.query.uid,function (err,data) {
        if(!err){
            res.send({"res":"del_ok"})
        }else {
            res.send({"res":"del_fail"})
        }
    })

};

