var UploadChapterDao = require('../dao/UploadChapterDao');

// 数据初始化，连接数据库
var dao = new UploadChapterDao();
dao.init();


//添加章节
exports.addTextChapter = function (req, res) {
    req.body.pid = 3;
    // console.log(req.body)
    dao.addTextChapter(req.body,function (err,data) {
        if(!err){
            res.redirect('/addTextChapter')
        }
    })


};