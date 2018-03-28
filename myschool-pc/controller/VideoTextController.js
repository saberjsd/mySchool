var VideoText = require('../dao/VideoTextDao');
var dao = new VideoText();
dao.init();
exports.video22 = function (req,res) {
    var id = req.query.id;
    dao.queryCommentUser(function (data1) {
        dao.cateMovieAll(id,'id','courseitem',function (err,data2) {
            var isVideo =data2[0].isVideo;
            var sionname = req.session.name;
            if(isVideo==1){
                res.render('videoView',{
                    queryCommentUser:data1,
                    cateMovieAll:data2
                })
            }else {
                res.render('text',{
                    queryCommentUser:data1,
                    cateMovieAll:data2
                })
            }
        })
    })
}