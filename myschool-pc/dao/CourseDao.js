function CourseDao() {

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

    this.cateMenuAll=function (user,call) {
        var  userGetSql = 'SELECT * FROM '+user+" WHERE level=1 AND status =1";
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('查询所有一级目录- ',err.message);
                return;
            }
            call(err,result);
            // console.log(res.jsonp(result));
        });
    }

    this.cateMenu=function (id,user,call) {
        var  userGetSql = 'SELECT * FROM '+user+" WHERE level=1 AND status =1 AND cid="+id;
        console.log(userGetSql)
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('查询一级目录 - ',err.message);
                return;
            }
            call(err,result);
            // console.log(res.jsonp(result));
        });
    }

    this.cateListAll=function (user,call) {
        var  userGetSql = 'SELECT * FROM '+user+" WHERE level =2 AND status =1";
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('查询所有二级目录列表 - ',err.message);
                return;
            }
            call(err,result);
            // console.log(res.jsonp(result));
        });
    }

    this.cateList=function (user,id,call) {
        // console.log(arguments);
        var  userGetSql = 'SELECT * FROM '+user+" WHERE level =2 AND status=1 AND pid = "+id;
        // console.log(userGetSql);
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('查询二级目录列表 - ',err.message);
                return;
            }
            call(err,result);
            // console.log(res.jsonp(result));
        });
    }

    this.cateMovieAll=function (user,call) {
        // console.log(arguments);
        var  userGetSql = 'SELECT * FROM '+user;
        // console.log(userGetSql);
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('查询所有电影列表 ',err.message);
                return;
            }
            call(err,result);
            // console.log(res.jsonp(result));
        });
    }

    this.cateMovieList=function (user,id,call) {
        // console.log(arguments);
        var  userGetSql = 'SELECT * FROM '+user+" WHERE  firstID="+id;
        // console.log(userGetSql);
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('有条件查询电影列表 - ',err.message);
                return;
            }
            call(err,result);
            // console.log(res.jsonp(result));
        });
    }



    this.finish=function () {

    }
}

module.exports=CourseDao;
