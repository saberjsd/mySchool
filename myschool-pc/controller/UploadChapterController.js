var UploadChapterDao = require('../dao/UploadChapterDao');
var formidable = require('formidable');
var path = require("path");
var sd = require("silly-datetime");
var util = require("util");
var fs = require("fs");

// 数据初始化，连接数据库
var dao = new UploadChapterDao();
dao.init();


//添加章节
// exports.addTextChapter = function (req, res) {
//     console.log(req.body)
//     dao.addTextChapter(req.body,function (err,data) {
//         if(!err){
//             res.redirect('/TeacherInfo')
//         }
//     })
//
// };
exports.addChapter = function (req, res) {

    var form = new formidable.IncomingForm();

    form.encoding='utf-8';
    form.uploadDir = './public/upload/temp';    //上传目录
    form.keepExtensions = true;             //是否保留后缀格式
    form.maxFieldsSize = 1000*1024*1024;       //文件大小,默认的字节数为2MB
    form.maxFields = 1000; //限制了解析请求字段的的数量。默认为1000个

    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function(err, fields, file) {
        //如果上传了文件
        if(JSON.stringify(file) != "{}"){
            //使用第三方模块silly-datetime
            var t = sd.format(new Date(),'YYYYMMDDHHmmss');
            //生成随机数
            var ran = parseInt(Math.random() * 8999 +10000);
            //拿到扩展名
            var extname = path.extname(file.content.name);
            //旧的路径
            var oldpath = file.content.path;
            //新的路径
            var newpath = 'public/upload/video/'+t+ran+extname;
            //改名
            // console.log(file)
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    console.log('改名失败:'+err);
                }else{
                    // console.log('改名成功')
                }

            })
            fields.content = '/upload/video/'+t+ran+extname;
        }else{
            // fields.content = '/upload/video/'+t+ran+extname;
        }

        fields.uid = req.session.uid;
        fields.creatTime = new Date().toLocaleString();

        console.log(fields)
        dao.addChapter(fields,function (err,data) {
            if(!err){
                res.redirect('/TeacherInfo#courseList')
            }
        })
    });


};