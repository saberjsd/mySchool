function LoginDao() {

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

    this.userInfoName=function (username,user,call) {
        var  userGetSql = 'SELECT * FROM '+user+" WHERE username = "+username;
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('用户名查询',err.message);
                return;
            }else{
                call(err,result);
            }

            // console.log(res.jsonp(result));
        });
    }
    this.finish=function () {

    }
}

module.exports=LoginDao;
