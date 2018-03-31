var UploadCourseDao = require('../dao/UploadCourseDao');
var formidable = require('formidable');
var path = require("path");
var sd = require("silly-datetime");
var util = require("util");
var fs = require("fs");
// 数据初始化，连接数据库
var dao = new UploadCourseDao();
dao.init();

exports.getCourseMenu = function (req, res) {
    dao.getCourseMenu(function (err1,data) {
        if(!err1){
            var result = JSON.stringify(data);
            res.send(result)
        }
    })

};
//添加课程
exports.addCourse = function (req, res) {

    var form = new formidable.IncomingForm();

    form.encoding='utf-8';
    form.uploadDir = './public/upload/temp';    //上传目录
    form.keepExtensions = true;             //是否保留后缀格式
    form.maxFieldsSize = 5*1024*1024;       //文件大小,默认的字节数为2MB
    form.maxFields = 1000; //限制了解析请求字段的的数量。默认为1000个

    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function(err, fields, file) {
        //使用第三方模块silly-datetime
        var t = sd.format(new Date(),'YYYYMMDDHHmmss');
        //生成随机数
        var ran = parseInt(Math.random() * 8999 +10000);
        //拿到扩展名
        var extname = path.extname(file.logo.name);
        //旧的路径
        var oldpath = file.logo.path;
        //新的路径
        var newpath = 'public/upload/courseLogo/'+t+ran+extname;
        //改名
        // console.log(file)
        fs.rename(oldpath,newpath,function(err){
            if(err){
                console.log('改名失败:'+err);
            }else{
                console.log('改名成功')
            }

        })
        fields.uid = 1;
        fields.src = '/upload/courseLogo/'+t+ran+extname;
        fields.creatTime = new Date().toLocaleString();

        // console.log(fields)
        dao.addCourse(fields,function (err,data) {
            if(!err){
                res.redirect('/addCourse')
            }
        })
    });



};