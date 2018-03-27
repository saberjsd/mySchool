var express = require("express");
var IndexDao = require("./dao/IndexDao");
var CourseDao = require("./dao/CourseDao");
var VedioCourseDao = require("./dao/VedioCourseDao");
var app = express();
app.use(express.static('public'));
//指定模板引擎
app.set("views engine", 'ejs');
//指定模板位置
app.set('views', __dirname + '/views');
//利用模板文件home.ejs渲染为html

//主页开始。。。。。。
app.get("/", function(req, res) {
    var dao = new IndexDao();
    dao.init();
    dao.newest("course",function (err,data) {
        var data = JSON.stringify(data);
        // res.render("index",{flag:false})
    })
    dao.recommend('course',function (err,data) {
         var data = JSON.stringify(data);
        res.render("index",{flag:false})
    })
});
app.get("/getrecommend",function (req,res) {
    var dao = new IndexDao();
    dao.init();
    dao.recommend('course',function (err,data) {
        var data = JSON.stringify(data);
        res.send(data)
    })
})
app.get("/getnewest",function (req,res) {
    var dao = new IndexDao();
    dao.init();
    dao.newest('course',function (err,data) {
        var data = JSON.stringify(data);
        res.send(data)
    })
})
//主页结束。。。。。。


//所有课程页面开始。。。。。
app.get("/course", function(req, res) {
    var dao = new CourseDao();
    dao.init();
    dao.cateMenuAll("cate",function (err,data) {
        var data = JSON.stringify(data);
    })
    dao.cateListAll("cate",function (err,data) {
        var data = JSON.stringify(data);
        res.render("course",{})
    })
});
app.get("/getCateMenu",function(req,res){
    console.log(req.query.id);
    var id = req.query.id;
    var dao = new CourseDao();
    dao.init();
    if(id == undefined){
        dao.cateMenuAll("cate",function (err,data) {
            // console.log(data)
            var data = JSON.stringify(data);
            res.send(data);
        })
    }else{
        dao.cateMenu(id,"cate",function (err,data) {
            var data = JSON.stringify(data);
            res.send(data);
        })
    }

})
app.get("/getCateList",function(req,res){
    // console.log(req.query.id);
    var id = req.query.id;
    var dao = new CourseDao();
    dao.init();
    if(id == undefined){
        dao.cateListAll("cate",function (err,data) {
            var data = JSON.stringify(data);
            res.send(data);
        })
    }else{
        dao.cateList("cate",id,function (err,data) {
            var data = JSON.stringify(data);
            res.send(data);
        })
    }

})
app.get("/getCateMovie",function(req,res){
    var dao = new CourseDao();
    dao.init();
    dao.cateMovieAll("course",function (err,data) {
        // console.log(data)
        var data = JSON.stringify(data);
        res.send(data);
    })
})
//所有课程页面结束。。。。。

//视频课程页面开始。。。。
app.get("/videoCourse", function(req, res) {
    var dao = new VedioCourseDao();
    dao.init();
    dao.vedioCourse("course",function (err,data) {
        var data = JSON.stringify(data);
        res.render("videoCourse",{})
    })
});

app.get("/getVideoCourse",function (req,res) {
    var dao = new VedioCourseDao();
    dao.init();
    dao.vedioCourse("course",function (err,data) {
        var data = JSON.stringify(data);
        res.send(data);
    })

})


//所有视频课程页面结束。。。。。






app.get("/list",function (req,res) {
    console.log(req.query.id)

})

var server = app.listen(8088, function() {
    console.log("请在浏览器访问：http://localhost:8088/");
});