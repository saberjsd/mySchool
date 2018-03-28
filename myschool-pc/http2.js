var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var LoginDao = require("./dao/LoginDao");
app.use(session({
    secret: 'jsd177',
    name: 'admin_session',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    resave: false,   //强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false
    saveUninitialized: true,   //强制将未初始化的 session 存储。 默认值是true  建议设置成true
    cookie: {maxAge: 1000*60*60*24 }    //设置maxAge单位是ms，设置时间后session和相应的cookie失效过期
}));
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(express.static('public'));
app.set('views engine','ejs');
app.set('views',__dirname+'/views');
app.get("/list",function (req,res) {
    var username = req.query.username;
    var passwd = req.query.passwd;
    console.log(username,passwd)
    var dao = new LoginDao();
    dao.init();
    dao.userInfoName(username,"userinfo",function (err,data) {
        if(data.length == 0){
            res.send("username-err");
        }else{
            if(passwd == data[0].passwd ){
                req.session.username = username;
                req.session.passwd = passwd;
                res.send("success");
            }else{
                res.send("passwd-err");
            }
        }
    })
});
var courseypController = require('./controller/CourseypController');
app.get('/course',courseypController.courseyp);

var videoController = require('./controller/VideoTextController');
app.get('/video22',videoController.video22);

var server = app.listen(8888, function () {
    console.log("服务器已开启，端口：8888");
})