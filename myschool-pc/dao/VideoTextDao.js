function VdoTextDao() {
    var connection;
    this.init = function () {
        var mysql = require('mysql');
        connection = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'myschool',
            port:'3306'
        });
        connection.connect();
    };
    //查询评论表关联用户表
    this.queryCommentUser = function (cid,call) {
        var userGetSql = 'SELECT * FROM comment left join userinfo on comment.uid = userinfo.uid WHERE status =1 AND comment.cid = '+cid;
        connection.query(userGetSql,function (err,result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            call(result);
        })
    }
    //查询单挑数据
    this.cateMovieAll=function (value,field,user,call) {
        // console.log(arguments);
        var  userGetSql = 'SELECT * FROM '+user+" WHERE `"+field+"` = "+value;
        //console.log(userGetSql);
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            call(err,result);
            // console.log(res.jsonp(result));
        });
    }
    //查询某用户最后一次学习的章节
    this.queryCollection = function (uid,cid,call) {
        var userGetSql = 'SELECT * FROM collection WHERE uid = '+uid+' AND cid = '+cid;
        //console.log(userGetSql)
        connection.query(userGetSql,function (err,result) {

            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            call(err,result);
        })
    };

    //根据课程id查课程章节
    this.selectCourseCourseitem = function (cid,order,call) {
        var userGetSql = 'SELECT * FROM courseitem WHERE pid = '+cid+' AND `order` = '+order;
        //console.log(userGetSql)
        connection.query(userGetSql,function (err,result) {

            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            call(err,result);
        })
    };

    //插入第一次学习的章节
    this.queryInsertCollection = function (uid,cid,did,call) {
        var time = new Date().toLocaleString();
        var userGetSql = 'INSERT INTO collection(uid,cid,creatTime,did) VALUES ('+uid+', '+cid+', "'+time+'" , '+did+')';
        connection.query(userGetSql,function (err,result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            call(err,result);
        })
    };
    //修改最后一次点击的课程
    this.UpdateCollection = function (uid,cid,did,call) {
        var time = new Date().toLocaleString();
        var userGetSql = 'UPDATE collection SET `did` = '+did+', `creatTime` = "'+time+'" WHERE uid = '+uid+' AND cid ='+cid;
        //console.log(userGetSql);
        connection.query(userGetSql,function (err,result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            call(err,result);
        })
    };
}
module.exports = VdoTextDao;