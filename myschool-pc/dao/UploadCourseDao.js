function CourseDao(){
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

    //获取栏目列表
    this.getCourseMenu = function(call){
        var result = {};
        var sql = "SELECT * FROM cate WHERE level = 1 AND status = 1"
        connection.query(sql,function (err, data) {
            result.cateMenu = data
        });
        sql = "SELECT * FROM cate WHERE level = 2 AND status = 1"
        connection.query(sql,function (err, data) {
            result.cateList = data
            call(err,result)
        });
    }
    // 添加课程
    this.addCourse = function(bd,call){
        var sql = "INSERT INTO course (firstID,secondID,title,description,creatTime) VALUES ("
            +bd.firstID+","+bd.secondID+",'"+bd.title+"','"+bd.description+"','"+bd.creatTime+"')";
        // console.log(sql)
        connection.query(sql,function (err, data) {
            call(err,data)
        });
    }



    this.end=function () {
        connection.end();
    }

}

module.exports=CourseDao;