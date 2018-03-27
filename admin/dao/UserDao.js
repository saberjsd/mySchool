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
    //用户列表
    this.userList=function (call) {
        var  sql = 'SELECT uid,username,sex,province,city,role,status FROM userinfo';
        // console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }
    this.searchName=function (nameKey,call) {
        var  sql = 'SELECT uid,username,sex,province,city,role,status FROM userinfo WHERE username LIKE "%'
            +nameKey+'%"';
        // console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }
    this.searchRole=function (roleKey,call) {
        var sql = 'SELECT uid,username,sex,province,city,role,status FROM userinfo WHERE role =' +roleKey;
        // console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }
    this.searchStatus=function (statusKey,call) {
        var sql = 'SELECT uid,username,sex,province,city,role,status FROM userinfo WHERE status =' +statusKey;
        // console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }



    //重置密码
    this.resetPwd = function(uid,call){
        var sql = "UPDATE userinfo SET passwd='e10adc3949ba59abbe56e057f20f883e' WHERE uid="+uid;
        console.log(sql)
        connection.query(sql,function (err, data) {
            call(err,data)
        });
    }
    // 修改状态
    this.setUserInfo = function(bd,call){
        var sql = "UPDATE userinfo SET role="+bd.role+",status="+bd.status+" WHERE uid="+bd.uid;
        console.log(sql)
        connection.query(sql,function (err, data) {
            call(err,data)
        });
    }

    //删除
    this.delUser = function(uid,call){
        var sql = 'DELETE FROM userinfo WHERE uid='+uid;
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