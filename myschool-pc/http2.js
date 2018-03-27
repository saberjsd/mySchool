var express = require('express');
var app = express();
var UserDao = require('./UserDao');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(express.static('public'));
app.set('views engine','ejs');
app.set('views',__dirname+'/views');
app.get('/',function (req,res) {
    var dao = new UserDao();
    dao.init();
    dao.query(0, 'courseitem', function (err, data1) {
        dao.query(0, 'course', function (err, data2) {
            dao.query(0, 'userinfo', function (err, data3) {
                dao.queryCommentUser(function (data4) {
                    dao.cateMovieAll(1,'id','course', function (err,data5) {
                        dao.cateMovieAll(1,'uid','userinfo',function (err,data6) {
                            res.render('catalog', {
                                queryCommentUser: data4,
                                courseitem: data1,
                                course: data2,
                                userinfo: data3,
                                course1: data5,
                                userinfoSingle: data6
                            })
                        })
                    })
                })
            })
        })
    });
});
app.get('/video22',function (req,res) {
    var id = req.query.id;
    var dao = new UserDao();
    dao.init();
    dao.queryCommentUser(function (data1) {
        dao.cateMovieAll(id,'id','courseitem',function (err,data2) {
            var isVideo =data2[0].isVideo;
            console.log(isVideo)
            if(isVideo==1){
                res.render('videoView',{
                    queryCommentUser:data1,
                    cateMovieAll:data2
                })
            }else {
                res.render('text',{
                    queryCommentUser:data1,
                    cateMovieAll:data2
                })
            }
        })
    })
});
var server = app.listen(8888, function () {
    console.log("服务器已开启，端口：8888");
})