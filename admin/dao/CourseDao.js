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

    //课程列表信息
    this.getCourse = function(call){
        var result = {};
        var sql1 = "SELECT * FROM cate WHERE status = 1"
        connection.query(sql1,function (err, data) {
            result.cateMenu = data;
        });
        sql1 = 'SELECT * FROM course WHERE status = 1 LIMIT 10';
        connection.query(sql1,function (err, data) {
            result.courseList = data;
            call(err, result);
        });
    }
    this.getCourseItem = function (cid,call) {
        // var sql = "SELECT i.id,i.title,i.description,c.catename FROM course AS i " +
        //     "LEFT JOIN cate AS c " +
        //     "ON i.secondID = c.cid WHERE i.id="+cid;
        var result = {};
        var sql1 = "SELECT * FROM cate WHERE level = 1 AND status = 1"
        connection.query(sql1,function (err, data) {
            result.cateMenu = data
        });
        sql1 = "SELECT * FROM cate WHERE level = 2 AND status = 1"
        connection.query(sql1,function (err, data) {
            result.cateList = data
        });
        sql1 = "SELECT id,firstID,secondID,title,description FROM course WHERE status = 1 AND id ="+cid;
        connection.query(sql1,function (err, data) {
            result.courseItem = data
            call(err,result)
        });
    };

    this.updateCourse = function(bd,call){
        var sql = "UPDATE course SET firstID="+bd.firstID
            +",secondID="+bd.secondID
            +",title='"+bd.title
            +"',description='"+bd.description
            +"' WHERE id="+bd.id;
        console.log(sql)
        connection.query(sql,function (err, data) {
            call(err,data)
        });
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

    //删除课程
    this.delCourse = function(id,call){
        var sql = 'UPDATE course SET status =0 WHERE id='+id;
        // console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }

    //课程详情
    this.courseDetail = function(id,call){
        var result={};
        var sql = 'SELECT * FROM courseitem WHERE status=1 AND pid='+id+' ORDER BY `order`';
        // console.log(sql)
        connection.query(sql,function (err, data) {
            result.detail = data;
        });
        sql = 'SELECT title FROM course WHERE id='+id;
        connection.query(sql,function (err, data) {
            result.title = data;
            call(err, result)
        });
    }
    // 获取课程章节
    this.getChapter = function(id,call){
        var sql = 'SELECT id,title,`order`,content FROM courseitem WHERE status=1 AND id='
            +id;
        // console.log(sql)
        connection.query(sql,function (err, data) {
            call(err, data)
        });

    }
    // 保存修改
    this.updateChapter = function(bd,call){
        var sql = "UPDATE courseitem SET title='"+bd.title
            +"',content='"+bd.content
            +"',`order`="+bd.order
            +" WHERE id="+bd.id;
        // console.log(sql)
        connection.query(sql,function (err, data) {
            call(err,data)
        });
    }
    //添加章节
    this.addChapter = function(bd,call){
        var sql = "INSERT INTO courseitem (pid,`order`,title,content) VALUES ("
            +bd.pid+","+bd.order+",'"+bd.title+"','"+bd.content+"')";
        // console.log(sql)
        connection.query(sql,function (err, data) {
            call(err,data)
        });
    };

    //删除
    this.delChapter = function(id,call){
        var sql = 'UPDATE courseitem SET status =0 WHERE id='+id;
        // console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }


    this.end=function () {
        connection.end();
    }

}

module.exports=CourseDao;