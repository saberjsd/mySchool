function CourseypDao() {
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
    }
    this.query = function (id,field,user,call) {
        var userGetSql = 'SELECT * FROM '+user+" WHERE status =1 AND "+field+" = "+id;
        connection.query(userGetSql,function (err,result) {
            if(err){
                console.log('勘测啊'+err.message);
                return;
            }
            call(err,result);
        })
    }

    this.queryCommentUser = function (call) {
        var userGetSql = 'SELECT * FROM comment left join userinfo on comment.uid = userinfo.uid WHERE comment.status =1';
        console.log(userGetSql);
        connection.query(userGetSql,function (err,result) {
            if(err){
                console.log('评论'+err.message);
                return;
            }
            call(result);
        })
    }
    this.cateMovieAll=function (value,field,user,call) {
        // console.log(arguments);
        var  userGetSql = 'SELECT * FROM '+user+" WHERE "+field+"="+value;
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
    //点击章节插入数据
    this.queryInsertCollection = function (uid,cid,call) {
        var time = new Date().toLocaleString();
        var userGetSql = 'INSERT INTO collection(uid,cid,creatTime) VALUES ('+uid+', '+cid+', "'+time+'")';
        connection.query(userGetSql,function (err,result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            call(err,result);
        })
    }
}
module.exports = CourseypDao;