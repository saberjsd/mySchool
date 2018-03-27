var LoginDao = require('../dao/LoginDao');
var md5 = require('md5');
// 数据初始化，连接数据库
var dao = new LoginDao();
dao.init();

exports.loginCheck=  function (req, res) {
    var username = req.body.username;
    var passwd   = md5(req.body.passwd);
    // console.log(passwd)
    dao.login(username,function (err, data) {
        // console.log(data)
        if(data.length != 0){
            // 查询到用户
            if(passwd == data[0].passwd){
                // 登录成功后保存用户名到session
                req.session.username = username;
                res.render('index',{pageMenu:'index',page:''});
            }else{
                res.render('login',{res:"passwordError"})
            }
        }else {
            res.render('login',{res:"usernameError"})
        }
    })

}