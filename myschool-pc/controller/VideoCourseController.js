var VedioCourseDao = require("../dao/VedioCourseDao");
var dao = new VedioCourseDao();
dao.init();
exports.videoCourse = function (req,res) {
    dao.vedioCourse("course",function (err,data) {
        var data = JSON.stringify(data);
        res.render("videoCourse",{})
    })
};
exports.loginedVideoCourse = function (req,res) {
    dao.vedioCourse("course",function (err,data) {
        var data = JSON.stringify(data);
        res.render("loginedVideoCourse",{})
    })
}
exports.getVideoCourse = function (req,res) {
    dao.vedioCourse("course",function (err,data) {
        var data = JSON.stringify(data);
        res.send(data);
    })
}
exports.getVideoCourseList = function (req,res) {
    var id = req.query.id;
    dao.vedioCourseList("course",id,function (err,data) {
        var data = JSON.stringify(data);
        res.send(data);
    })
}

