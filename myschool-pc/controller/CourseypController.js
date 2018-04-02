var Courseyp = require('../dao/CourseypDao');
var dao = new Courseyp();
dao.init();
exports.courseyp = function (req,res) {
   var cid = req.query.id;
   req.session.cid = cid;
    console.log(req.session.cid);
    dao.query(cid,'pid', 'courseitem', function (err, data1) {
        dao.queryCommentUser(function (data4) {
            dao.cateMovieAll(cid,'id','course', function (err,data5) {
                dao.cateMovieAll(cid,'uid','userinfo',function (err,data6) {
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
