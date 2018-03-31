var CourseDao = require("../dao/CourseDao");
var dao = new CourseDao();
dao.init();
exports.course = function (req,res) {
    dao.cateMenuAll("cate",function (err,data) {
        var data = JSON.stringify(data);
    })
    dao.cateListAll("cate",function (err,data) {
        var data = JSON.stringify(data);
        res.render("course",{})
    })
}
exports.loginedCourse = function (req,res) {
    if(req.session.username!=undefined && req.session.passwd!=undefined){
        dao.cateMenuAll("cate",function (err,data) {
            var data = JSON.stringify(data);
        })
        dao.cateListAll("cate",function (err,data) {
            var data = JSON.stringify(data);
            res.render("loginedCourse",{})
        })
    }else{
        res.render("course",{})
    }

}
exports.getCateMenu = function (req,res) {
    var id = req.query.id;
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
}
exports.getCateList = function (req,res) {
    var id = req.query.id;
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
}

exports.getCateMovie = function (req,res) {
    var id = req.query.id;
    console.log(id);
    if(id == undefined){
        dao.cateMovieAll("course",function (err,data) {
            // console.log(data)
            var data = JSON.stringify(data);
            res.send(data);
        })
    }else{
        dao.cateMovieList("course",id,function (err,data) {
            var data = JSON.stringify(data);
            console.log(data);
            res.send(data);
        })

    }

}