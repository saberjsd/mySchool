function UserDao() {

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
    //处理登录
    this.login=function (username,call) {
        var  sql = 'SELECT * FROM administrators WHERE username = "'+username+'"';
        // console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }
    //获取栏目
    this.getCate = function(isMenu,call){
        var sql ;
        if(isMenu){
            sql = 'SELECT * FROM cate WHERE level = 1 AND status = 1';
        }else{
            sql = 'SELECT * FROM cate WHERE level = 2 AND status = 1';
        }
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }
    // 修改栏目
    this.updateCate = function(cid,cname,call){
        var sql = 'UPDATE cate SET catename ="'+cname+'" WHERE cid='+cid
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }
    //删除栏目
    this.delCate = function(cid,call){
        var sql = 'UPDATE cate SET status =0 WHERE cid='+cid;
        console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }
    // /*通过name获得用户*/
    // this.queryByName=function (name,call) {
    //     var sql = "select * from users where name = '"+name+"'";
    //     /**
    //      *query，mysql语句执行的方法
    //      * 1，userAddSql编写的sql语句
    //      * 2，function (err, result)，回调函数，err当执行错误时，回传一个err值，当执行成功时，传回result
    //      */
    //
    //     console.log(sql);
    //     connection.query(sql,function (err, result) {
    //         if(!err){
    //             call(result);
    //         }else{
    //             console.log('[INSERT ERROR] - ',err.message);
    //             return;
    //         }
    //     });
    // }
    
    // this.insert= function (name,email,passwd,call) {
    //
    //
    //     //3,编写sql语句
    //     var  userAddSql = 'INSERT INTO users(name,email,passwd) VALUES(?,?,?)';
    //     var  userAddSql_Params = [name,email,passwd];
    //     //4,进行插入操作
    //     /**
    //      *query，mysql语句执行的方法
    //      * 1，userAddSql编写的sql语句
    //      * 2，userAddSql_Params，sql语句中的值
    //      * 3，function (err, result)，回调函数，err当执行错误时，回传一个err值，当执行成功时，传回result
    //      */
    //     connection.query(userAddSql,userAddSql_Params,function (err, result) {
    //         if(!err){
    //             console.log(result);
    //             call();
    //         }else{
    //             console.log(err);
    //         }
    //     });
    //   //5,连接结束

    this.end=function () {
        connection.end();
    }


}

module.exports=UserDao;