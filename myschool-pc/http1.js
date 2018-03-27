var express = require("express");
var LoginDao = require("./dao/LoginDao");
var session = require('express-session');
var app = express();
//配置session
app.use(session({
    secret: 'jsd177',
    name: 'admin_session',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    resave: false,   //强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false
    saveUninitialized: true,   //强制将未初始化的 session 存储。 默认值是true  建议设置成true
    cookie: {maxAge: 1000*60*60*24 },    //设置maxAge单位是ms，设置时间后session和相应的cookie失效过期
}));
app.use(express.static('public'));
//指定模板引擎
app.set("views engine", 'ejs');
//指定模板位置
app.set('views', __dirname + '/views');
//利用模板文件home.ejs渲染为html
app.get('/login',function (req,res) {
    res.render('login',{})
})
//登录页面数据处理开始。。。。。
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
})
//登录页面数据处理结束。。。。。
//获取用户信息开始。。。。。

//获取用户信息结束。。。。。

//主页开始。。。。。。
var indexController = require('./controller/IndexController');
app.get('/',indexController.index);
app.get('/loginedIndex',indexController.loginedIndex)
app.get("/getrecommend",indexController.getrecommend);
app.get("/getnewest",indexController.getnewest);

//主页结束。。。。。。
//登录后的主页开始。。。。。


//登录后的主页结束。。。。。

//所有课程页面开始。。。。。
var courseController = require('./controller/CourseController');
app.get("/course",courseController.course);
app.get('/loginedCourse',courseController.loginedCourse)
app.get("/getCateMenu",courseController.getCateMenu);
app.get("/getCateList",courseController.getCateList);
app.get("/getCateMovie",courseController.getCateMovie)
//所有课程页面结束。。。。。

//视频课程页面开始。。。。
var vedioCourseController = require('./controller/VideoCourseController')
app.get("/videoCourse", vedioCourseController.videoCourse);
app.get("/getVideoCourse",vedioCourseController.getVideoCourse)
//所有视频课程页面结束。。。。。



var server = app.listen(8088, function() {
    console.log("请在浏览器访问：http://localhost:8088/");
});