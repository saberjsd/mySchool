function ApplyDao() {

    /**
     * 数据库连接
     */
    var connection;
    this.init=function () {
        //1，调用MySQL模块
        var mysql  = require('mysql');

        //2，创建一个connection
        connection = mysql.createConnection({
            host     : 'localhost',       //主机 ip
            user     : 'root',            //MySQL认证用户名
            password : 'root',                //MySQL认证用户密码
            port: '3306',                 //端口号
            database:'myschool'          //数据库里面的数据
        });
        //3,连接
        connection.connect();
    }

    this.StoringapplyInfo = function (uid,reason,realName,tel,call) {
        var sql = 'INSERT INTO application(uid,reason,realName,tel) VALUES ('+uid+',"'+reason+'","'+realName+'","'+tel+'")';
        console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }

    this.getapplyInfo =function (uid,call) {
        var  userGetSql = 'SELECT * FROM application WHERE uid='+uid;
        console.log(userGetSql);
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('查询申请的状态',err.message);
                return;
            }else{
                call(err,result);
            }
        });
    }
    this.updataapplyInfo=function(uid,call) {
        //4,编写sql语句
        var userModSql = 'UPDATE userinfo SET role =1 WHERE uid='+uid;
        console.log(userModSql);
        //5，更新操作
        connection.query(userModSql,function (err, result) {
            if(err){
                console.log('修改数据出错 - ',err.message);
                return;
            }
            call(err,result);
        });
    }



    this.finish=function () {

    }
}

module.exports=ApplyDao;

