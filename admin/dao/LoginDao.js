function UserDao() {
// 数据初始化，连接数据库
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
    //处理登录
    this.login=function (username,call) {
        var  sql = 'SELECT * FROM administrators WHERE username = "'+username+'"';
        // console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }



    this.end=function () {
        connection.end();
    }


}

module.exports=UserDao;