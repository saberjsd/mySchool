function IndexDao() {

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

    this.recommend=function (user,call) {
        var  userGetSql = 'SELECT * FROM '+user+" WHERE status =1 Order by collection desc";
        /**
         *query，mysql语句执行的方法
         * 1，userAddSql编写的sql语句
         * 2，function (err, result)，回调函数，err当执行错误时，回传一个err值，当执行成功时，传回result
         */
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('热门推荐 - ',err.message);
                return;
            }
            call(err,result);
            // console.log(res.jsonp(result));
        });
    }

    this.newest=function (user,call) {
        var  userGetSql = 'SELECT * FROM '+user+" WHERE status =1 Order by creatTime desc";
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('最新发表 - ',err.message);
                return;
            }
            call(err,result);
        });
    }

    this.finish=function () {

    }
}
module.exports=IndexDao;
