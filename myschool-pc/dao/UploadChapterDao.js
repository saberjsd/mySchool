function UploadChapterDao(){
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

    // 添加课程
    this.addChapter = function(bd,call){
        //处理文档中的单引号和双引号
        var escapeText = bd.content.replace(/\'/g,"\\'");
        escapeText = escapeText.replace(/\"/g,'\\"');

        var sql = "INSERT INTO courseitem (pid,title,content,`order`) VALUES ("
        +bd.pid+",'" +bd.title+"','"+escapeText+"',"+bd.order+")";
        // console.log(sql)
        connection.query(sql,function (err, data) {
            call(err,data)
        });
    }



    this.end=function () {
        connection.end();
    }

}

module.exports=UploadChapterDao;