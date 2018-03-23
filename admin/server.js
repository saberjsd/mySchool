//引入express模块
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var UserDao = require('./dao/UserDao');
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
    cookie: {maxAge: 1000*60*60*24 },    //设置maxAge单位是ms，设置时间后session和相应的cookie失效过期
}));

// 验证是否登录
app.get('*', function(req, res, next) {
    if(!req.session.username){
        res.render('login',{res:''})
        return;
    }
    next();
});

// 数据初始化，连接数据库
var dao = new UserDao();
dao.init();


app.get('/login.html',function (req,res) {
    // 消除当前session
    req.session.destroy(function(err){
        if(!err){
            res.render('login',{res:''});
        }
    })

});
// 处理登录验证
app.post('/tologin',urlencodedParser, function (req, res) {
    var username = req.body.username;
    var passwd   = req.body.passwd;
        // if(username)
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

})
// 主页
app.get('/',function (req,res) {
    res.render('index',{pageMenu:'index',page:''});
});
app.get('/index.html',function (req,res) {
    res.render('index',{pageMenu:'index',page:''});
});

// 栏目信息
app.get('/cateList',function (req, res) {
    var result = {
        pageMenu:'cate',
        page:'cateList'
    };
    dao.getCate(true,function (err1,data1) {
        if(!err1){
            result.cateMenu = data1
            dao.getCate(false,function(err2,data2){
                if(!err2){
                    result.cateList = data2
                    res.render('cateList',result)
                }
            })

        }
    })

})
//修改栏目
app.get('/updateCate',function(req,res){
    var cid = req.query.cid
    var cname = req.query.catename
    dao.updateCate(cid,cname,function(err,data){
        if(!err){
            res.send({"res":"update_ok"})
        }else {
            res.send({"res":"update_fail"})
        }
    })
})
//删除栏目
app.get('/delCate',function(req,res){
    var cid = req.query.cid
    dao.delCate(cid,function(err,data){
        if(!err){
            res.send({"res":"del_ok"})
        }else {
            res.send({"res":"del_fail"})
        }
    })
})
//添加栏目
app.get('/cateAdd',function(req,res){
    res.render('cateAdd',{pageMenu:'cate',page:'cateAdd'})
})



var server = app.listen(8080,function(){
    console.log('http://localhost:8080')
})