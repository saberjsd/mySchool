//引入express模块
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var md5 = require('md5');
var app = express();

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//设置模板引擎
app.set("views engine", 'ejs');
app.set('views', __dirname + '/views');

//静态文件
app.use(express.static(__dirname+'/public'));
// 配置session
app.use(session({
    secret: 'jsd177',
    name: 'admin_session',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    resave: false,   //强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false
    saveUninitialized: true,   //强制将未初始化的 session 存储。 默认值是true  建议设置成true
    cookie: {maxAge: 1000*60*60*24 }   //设置maxAge单位是ms，设置时间后session和相应的cookie失效过期
}));

var UploadCourseController = require('./controller/UploadCourseController');
app.get('/getCourseMenu',UploadCourseController.getCourseMenu)




//===监听端口===
var server = app.listen(8088,function(){
    console.log('http://localhost:8088')
})