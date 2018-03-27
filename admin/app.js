//引入express模块
var express = require('express');
var UserDao = require('./dao/LoginDao');
//获得express对象
var app = express();
//获得body-parser模块
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//指定模板引擎
app.set("views engine", 'ejs');
//指定模板位置
app.set('views', __dirname + '/views');
//静态文件
app.use(express.static('public'));

app.get('/home', function (req, res) {
    //1,创建对象
    var dao = new UserDao();
   //2，数据初始化，连接数据库
    dao.init();
    //3,查询语句
    dao.query(0,'users',function (err, data) {

        var infor = {
            introduce:'你的用户密码不正确',
            order:{price:'100'},
            name: '门户页面',
            users:data
        };
        res.render('home',infor);
    })

})

app.get('/index',function (req,res) {
    res.render('index',{});
});
app.get('/login',function (req,res) {
    res.render('login',{});
});

app.post('/register',urlencodedParser,function (req,res) {
    //1,从body里面获得提交的数据
    var  email= req.body.email;
    var  name= req.body.name;
    var  passwd= req.body.passwd;

    //1,查询
    //1,创建对象
    var dao = new UserDao();
    //2，数据初始化，连接数据库
    dao.init();
    //3,查询语句
    dao.queryByName(name,function (data) {
        console.log(data);

        if(data.length==0){
            console.log("执行插入");
            //执行插入
            dao.insert(name,email,passwd,function () {
                res.render('index',{});
            });

        }else{
            //回到注册页面，进行提示
        }

    })


    console.log(email+":"+name+":"+passwd);

    //res.render('login',{});
});

app.post('/loginCheck',urlencodedParser,function (req,res) {

    var name = req.body.name;
    var passwd = req.body.passwd;

   //1,创建对象
    var dao = new UserDao();
    //2，数据初始化，连接数据库
    dao.init();
    //3,查询语句
    dao.queryByName(name,function (data) {
     console.log(data);
    });

});


var server = app.listen(8088)