function FormDao() {
    var connection;
    this.init = function () {
        var mysql = require('mysql');
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'myschool',
            port: '3306'
        });
        connection.connect();
    };
    //插入评论
    this.InsertCollection = function (uid, cid, content, call) {
        var time = new Date().toLocaleString();
        var userGetSql = 'INSERT INTO comment(uid,cid,content,creatTime) VALUES (' + uid + ', ' + cid + ', "'+content+'" ,"'+ time + '" )';
        //console.log(userGetSql);
        connection.query(userGetSql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(err, result);
        })
    };
    //修改赞
    this.UpdateCollection = function (id,zid,call) {
        var time = new Date().toLocaleString();
        var userGetSql = 'UPDATE comment SET `zan` = '+zid+' WHERE id ='+id;
        connection.query(userGetSql,function (err,result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            call(err,result);
        })
    };
}
module.exports = FormDao;