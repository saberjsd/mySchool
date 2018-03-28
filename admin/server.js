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

app.get('/login.html',function (req,res) {
    // 消除当前session
    req.session.destroy(function(err){
        if(!err){
            res.render('login',{res:''});
        }
    })

});

// 验证是否登录
app.get('*', function(req, res, next) {
    if(!req.session.username){
        res.render('login',{res:''})
        return;
    }
    next();
});




// 处理登录验证
var LoginController = require('./controller/LoginController.js');
app.post('/loginCheck',urlencodedParser,LoginController.loginCheck );

// 主页
app.get('/',function (req,res) {
    res.render('index',{pageMenu:'index',page:''});
});
app.get('/index.html',function (req,res) {
    res.render('index',{pageMenu:'index',page:''});
});


//=============栏目管理=============
// 查询栏目信息
var CateController = require('./controller/CateController');
app.get('/cateList',CateController.cateList)
//修改栏目
app.get('/updateCate',CateController.updateCate)
//删除栏目
app.get('/delCate',CateController.delCate)
//添加栏目
// var cateMenu1 = null;
app.get('/cateAdd',CateController.cateAddGET)
// 添加栏目信息
app.post('/cateAdd',urlencodedParser,CateController.cateAddPOST)


//=========课程管理========
var CourseController = require('./controller/CourseController');
app.get('/courseList',CourseController.courseList)
//要修改的课程展示
app.get('/courseItem',CourseController.courseItem)
app.post('/updateCourse',urlencodedParser,CourseController.updateCourse)
//课程添加
// 获取栏目
app.get('/getCourseMenu',CourseController.getCourseMenu)
app.post('/addCourse',urlencodedParser,CourseController.addCourse)
// 删除课程
app.get('/delCourse',CourseController.delCourse)
// 课程详情
app.get('/courseDetail',CourseController.courseDetail)
//获取章节详情
app.get('/getChapter',CourseController.getChapter)
app.post('/updateChapter',urlencodedParser,CourseController.updateChapter)
app.post('/addChapter',urlencodedParser,CourseController.addChapter)
//删除
app.get('/delChapter',CourseController.delChapter)



//==============用户管理===========
var UserController = require('./controller/UserController');
// 展示列表
app.get('/userList',UserController.userList);
// 重置密码
app.get('/resetPwd',UserController.resetPwd);
// 修改状态
app.post('/setUserInfo',urlencodedParser,UserController.setUserInfo);
//删除
app.get('/delUser',UserController.delUser)

//===监听端口===
var server = app.listen(8080,function(){
    console.log('http://localhost:8080')
})