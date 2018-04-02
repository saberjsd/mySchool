/**
 * Created by Administrator on 2018/3/26.
 */
var IndexDao = require("../dao/IndexDao");
var dao = new IndexDao();
dao.init();
exports.index=function (req,res) {
    req.session.destroy(function (err) {
        if(!err){
            res.render("index",{});
        }
    })
    dao.newest("course",function (err,data) {
        var data = JSON.stringify(data);
        // res.render("index",{flag:false})
    })
    dao.recommend('course',function (err,data) {
        var data = JSON.stringify(data);

    })
    // res.render("index",{})
};
exports.loginedIndex = function (req,res) {
    // console.log(req.session.username);
    if(req.session.username !=undefined){
        dao.newest("course",function (err,data) {
            var data = JSON.stringify(data);
            res.render("loginedIndex",{})
        })
        dao.recommend('course',function (err,data) {
            var data = JSON.stringify(data);
        })
    }else{
        res.render("index",{})
    }

}

exports.getrecommend = function (req,res) {
    dao.recommend('course',function (err,data) {
        var data = JSON.stringify(data);
        res.send(data)
    })
};

exports.getnewest = function (req,res) {
    dao.newest('course',function (err,data) {
        var data = JSON.stringify(data);
        res.send(data)
    })
}