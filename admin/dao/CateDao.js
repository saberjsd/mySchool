function CateDao(){
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

    //获取栏目
    this.getCate = function(isMenu,call){
        var sql ;
        if(isMenu){  //是一级菜单
            sql = 'SELECT * FROM cate WHERE level = 1 AND status = 1';
        }else{  //二级菜单
            sql = 'SELECT * FROM cate WHERE level = 2 AND status = 1';
        }
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }
    // 修改栏目
    this.updateCate = function(cid,cname,call){
        var sql = 'UPDATE cate SET catename ="'+cname+'" WHERE cid='+cid
        console.log(sql)

        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }
    //删除栏目
    this.delCate = function(cid,call){
        var sql = 'UPDATE cate SET status =0 WHERE cid='+cid;
        // console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }
    //增加栏目
    this.addCate = function (cid,pid,level,cname,call) {
        var sql = 'INSERT INTO cate(cid,pid,level,catename) VALUES ('+cid+','+pid+','+level+',"'+cname+'")'
        console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }

    this.end=function () {
        connection.end();
    }

}

module.exports=CateDao;