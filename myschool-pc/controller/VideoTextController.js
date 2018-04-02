var VideoText = require('../dao/VideoTextDao');
var dao = new VideoText();
dao.init();
exports.video22 = function (req,res) {
    var id = req.query.id;
    //console.log(id);
    var sionid = req.session.uid;
    //console.log(sionid);
    var cid = req.session.cid;
    //console.log(cid);
    if(sionid==null){
        res.render('courseitem',{data:"1"})
    }else {
        dao.queryCollection(sionid,cid,function (err,data) {
            if(data.length==0){
                dao.queryInsertCollection(sionid,cid,id,function (err,data4) {})
            }else{
                dao.UpdateCollection(sionid,cid,id,function (err,data5) {})
            }
            dao.queryCommentUser(cid,function (data1) {
                dao.selectCourseCourseitem(cid,id,function (err,data2) {
                    var cdd = data2[0].pid;
                    //console.log(cdd);
                    dao.cateMovieAll(cdd,'id','course', function (err,data3) {
                        var isVideo =data3[0].isVideo;
                        if(isVideo==1){
                            res.render('videoView',{
                                queryCommentUser:data1,
                                cateMovieAll:data2,
                                uid:sionid,
                                cid: cdd,
                                tid: id
                            })
                        }else {
                            res.render('text',{
                                queryCommentUser:data1,
                                cateMovieAll:data2,
                                uid:sionid,
                                cid: cdd,
                                tid: id
                            })
                        }
                    })

                })
            })
        });

    }

};
exports.videotext = function (req,res) {
    var cid = req.session.cid;
    var sionid = req.session.uid;
    if(sionid==null){
        res.render('courseitem',{data:"1"})
    }else {
        dao.queryCollection(sionid,cid,function (err,data) {
            //console.log(data.length)
            if(data.length==0){
                dao.queryCommentUser(cid,function (data1) {
                    dao.selectCourseCourseitem(cid,1,function (err,data2) {
                        dao.cateMovieAll(cid,'id','course', function (err,data3) {
                            dao.queryInsertCollection(sionid,cid,1,function (err,data4) {
                                var isVideo =data3[0].isVideo;
                                if(isVideo==1){
                                    res.render('videoView',{
                                        queryCommentUser:data1,
                                        cateMovieAll:data2,
                                        uid:sionid,
                                        cid:cid,
                                        tid: 1
                                    })
                                }else {
                                    res.render('text',{
                                        queryCommentUser:data1,
                                        cateMovieAll:data2,
                                        uid:sionid,
                                        cid:cid,
                                        tid: 1
                                    })
                                }
                            })

                        })
                    })
                })
            }else{
                dao.queryCommentUser(cid,function (data1) {
                    var did = data[0].did;
                    dao.selectCourseCourseitem(cid,did,function (err,data2) {
                        dao.cateMovieAll(cid,'id','course', function (err,data3) {
                                    var isVideo =data3[0].isVideo;
                                    if(isVideo==1){
                                        res.render('videoView',{
                                            queryCommentUser:data1,
                                            cateMovieAll:data2,
                                            uid:sionid,
                                            cid:cid,
                                            tid: did
                                        })
                                    }else {
                                        res.render('text',{
                                            queryCommentUser:data1,
                                            cateMovieAll:data2,
                                            uid:sionid,
                                            cid:cid,
                                            tid: did
                                        })
                                    }
                        })
                    })
                })
            }
        })
    }



};
