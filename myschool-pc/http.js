var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var md5 = require('md5');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

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

var LoginController = require('./controller/LoginController');
app.get("/list",LoginController.list);//登录页面数据处理开始。。。。。
app.get("/checkName",LoginController.checkName);//检查用户名是否存在
app.get("/getuserInfo",LoginController.getuserInfo);//获取用户信息开始。。。。。
app.get("/getusercollection",LoginController.getusercollection);
app.get("/StoringUserinfo",LoginController.StoringUserinfo);//注册用户信息开始。。。。。
app.get('/personalInfo',LoginController.personalInfo);//判断跳转学生或者老师的界面开始。。。。
app.post('/personalInfo',urlencodedParser,LoginController.personalInfos);//完善用户信息开始。。。。。
app.post('/TeacherInfo',urlencodedParser,LoginController.TeacherInfo);//教师修改信息开始。。。


var ApplyController = require('./controller/ApplyController');
app.post('/applyInfo',urlencodedParser,ApplyController.applyInfo);//学生申请教师开始。。。。。
app.get('/inspectApplyInfo',ApplyController.inspectApplyInfo);//检查学生申请的次数，限制一次。。。。。。



//主页开始。。。。。。
var indexController = require('./controller/IndexController');
app.get('/',indexController.index);
app.get('/loginedIndex',indexController.loginedIndex)
app.get("/getrecommend",indexController.getrecommend);
app.get("/getnewest",indexController.getnewest);
//主页结束。。。。。。


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
app.get('/loginedVideoCourse',vedioCourseController.loginedVideoCourse);
app.get("/getVideoCourse",vedioCourseController.getVideoCourse);
app.get("/getVideoCourseA",vedioCourseController.getVideoCourseList);
//所有视频课程页面结束。。。。。
//个人用户页面开始。。。。
app.get('/personalInfo',function (req,res) {
    res.render('personalInfo',{})
})
app.get('/TeacherInfo',function (req,res) {
    res.render('TeacherInfo',{})
})
//个人用户页面结束。。。。


var UploadCourseController = require('./controller/UploadCourseController');
// 获取栏目列表
app.get('/getCourseMenu',UploadCourseController.getCourseMenu)
//上传课程处理
app.post('/addCourse',urlencodedParser,UploadCourseController.addCourse)
app.post('/getMyCourse',urlencodedParser,UploadCourseController.getMyCourse)

//上传课程章节
var UploadChapterController = require('./controller/UploadChapterController');

app.post('/addChapter',UploadChapterController.addChapter)


var server = app.listen(8088, function() {
    console.log("请在浏览器访问：http://localhost:8088/");
});