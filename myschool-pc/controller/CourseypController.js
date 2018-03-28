var Courseyp = require('../dao/CourseypDao');
var dao = new Courseyp();
dao.init();
exports.course = function (req,res) {
    dao.query(0, 'courseitem', function (err, data1) {
        dao.queryCommentUser(function (data4) {
            dao.cateMovieAll(1,'id','course', function (err,data5) {
                dao.cateMovieAll(1,'uid','userinfo',function (err,data6) {
                    res.render('catalog', {
                        queryCommentUser: data4,
                        courseitem: data1,
                        course1: data5,
                        userinfoSingle: data6
                    })
                })
            })
        })
    });
}