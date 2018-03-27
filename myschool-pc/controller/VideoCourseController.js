var VedioCourseDao = require("../dao/VedioCourseDao");
var dao = new VedioCourseDao();
dao.init();
exports.videoCourse = function (req,res) {
    dao.vedioCourse("course",function (err,data) {
        var data = JSON.stringify(data);
        res.render("videoCourse",{})
    })
}
exports.getVideoCourse = function (req,res) {
    dao.vedioCourse("course",function (err,data) {
        var data = JSON.stringify(data);
        res.send(data);
    })
}
