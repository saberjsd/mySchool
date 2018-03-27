function VideoTextDao() {
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

    this.queryCommentUser = function (call) {
        var userGetSql = 'SELECT * FROM comment left join userinfo on comment.uid = userinfo.uid WHERE status =1';
        connection.query(userGetSql,function (err,result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
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
}
module.exports = VideoTextDao;