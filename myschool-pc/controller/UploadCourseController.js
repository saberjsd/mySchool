var UploadCourseDao = require('../dao/UploadCourseDao');
// 数据初始化，连接数据库
var dao = new UploadCourseDao();
dao.init();

//添加课程
exports.getCourseMenu = function (req, res) {
    dao.getCourseMenu(function (err1,data) {
        if(!err1){
            var result = JSON.stringify(data);
            res.send(result)
        }
    })

};