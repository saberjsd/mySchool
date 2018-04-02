var LoginDao = require("../dao/LoginDao");
var md5 = require('md5');
var dao = new LoginDao();
dao.init();
// console.log('md5:'+md5('123'))

exports.list = function (req,res) {
    var username = req.query.username;
    var passwd = md5(req.query.passwd);
    dao.userInfoName(username,"userinfo",function (err,data) {
        if(data.length == 0){
            res.send("username-err");
        }else{
            if(passwd == data[0].passwd ){
                // console.log(data)
                req.session.username = username;
                req.session.uid = data[0].uid;
                req.session.role = data[0].role;
                // console.log(data[0].uid);
                res.send("success");
            }else{
                res.send("passwd-err");
            }
        }
    })
}
//检查用户名是否存在
exports.checkName = function (req,res) {
    var username = req.query.username;
    dao.checkName(username,function (err,data) {
        if(data.length == 0){
            res.send("username-ok");
        }else{
            res.send("username-err");
        }
    })
}

exports.getuserInfo = function (req,res) {
    var username = req.session.username;
    var role = req.session.role;
    // console.log("juse:"+role);
    dao.userInfoList(username,"userinfo",function (err,data) {
        res.send(data);
    })
}

exports.getusercollection = function (req,res) {
    var username = req.session.username;
    dao.userInfoList(username,"userinfo",function (err,data) {
        var uid = data[0].uid;
        // console.log(uid);
        dao.getpersonalInfo(uid,function(err,data) {
            res.send(data);
        })

    })
}

exports.StoringUserinfo = function (req,res) {
    var username = req.query.username;
    var passwd  = md5(req.query.passwd);
    dao.StoringuserInfo(username,passwd,function (err,data) {
        req.session.username = username;
        dao.userInfoList(username,"userinfo",function (err,data) {
            // console.log(data[0].uid);
            req.session.uid = data[0].uid;
        })
        res.send("success");
        if(err){
            res.send("err");
        }
    })
}

exports.personalInfo = function (req,res) {
    var role = req.session.role;
    if(role == 0){
        res.render("personalInfo",{})
    }else if(role == 1){
        res.redirect("TeacherInfo");
    }
}

exports.personalInfos = function (req,res) {
    var username = req.session.username;
    var nikcname = req.body.nikcname;
    var position = req.body.position;
    var province = req.body.s_province;
    var city = req.body.s_city;
    var sex = req.body.sex;
    var autograph = req.body.autograph;
    dao.updatauserInfo(nikcname,position,province,city,sex,autograph,username,function(err,data){
        res.render('personalInfo',{});
    })
}

exports.TeacherInfo = function (req,res) {
    var username = req.session.username;
    var nikcname = req.body.nikcname;
    var position = req.body.position;
    var province = req.body.s_province;
    var city = req.body.s_city;
    var sex = req.body.sex;
    var autograph = req.body.autograph;
    dao.updatauserInfo(nikcname,position,province,city,sex,autograph,username,function(err,data){
        res.render('TeacherInfo',{})
    })
}






