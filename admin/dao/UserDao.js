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
    this.userList=function (start,end,call) {
        var result = {};
        //查询总记录数
        var sql = "SELECT COUNT(uid) AS totalNum FROM userinfo WHERE status = 1"
        connection.query(sql,function (err, data) {
            result.totalNum = data[0].totalNum;
        });
        sql = 'SELECT uid,username,sex,province,city,role,status FROM userinfo LIMIT '+start+','+end;
        // console.log(sql)
        connection.query(sql,function (err, data) {
            result.userList = data
            call(err, result);
        });
    }

    this.userInfo = function (start,end,where,call) {
        var result = {};

        var sql = "SELECT COUNT(uid) AS totalNum FROM userinfo WHERE 1 ";
        var sql1= "SELECT uid,username,sex,province,city,role,status FROM userinfo WHERE 1 "

        //判断是否输入了 用户名 关键字
        if(where.nameKey && where.nameKey.trim()!=''){
            sql += " AND username LIKE '%" +where.nameKey+"%'";
            sql1 += " AND username LIKE '%" +where.nameKey+"%'";
            result.nameKey = where.nameKey; //返回关键字
        }else{
            result.nameKey =''
        }
        //判断是否输入了 角色 关键字
        if(where.roleKey && where.roleKey.trim()!=''){
            sql += " AND role = "+ where.roleKey;
            sql1 += " AND role = "+ where.roleKey;
            result.roleKey = where.roleKey;
        }else{
            result.roleKey =''
        }
        //判断是否输入了 状态 关键字
        if(where.statusKey && where.statusKey.trim()!=''){
            sql += " AND status = "+ where.statusKey;
            sql1 += " AND status = "+ where.statusKey;
            result.statusKey = where.statusKey;
        }else{
            result.statusKey =''
        }

        //查询总记录数
        connection.query(sql,function (err, data) {
            result.totalNum = data[0].totalNum;
        });

        sql1 +=  " LIMIT "+start+","+end;
        connection.query(sql1,function (err, data) {
            result.userList = data
            call(err, result);
        });

        // console.log(sql)
        // console.log(sql1)
    }


    this.searchName=function (start,end,nameKey,call) {
        var result = {};
        //查询总记录数
        var sql = "SELECT COUNT(uid) AS totalNum FROM userinfo WHERE status = 1 AND username LIKE '%"
            +nameKey+"%'"
        // console.log(sql)
        connection.query(sql,function (err, data) {
            result.totalNum = data[0].totalNum;
        });
        sql = 'SELECT uid,username,sex,province,city,role,status FROM userinfo WHERE username LIKE "%'
            +nameKey+'%" LIMIT '+start+','+end;
        // console.log(sql)
        connection.query(sql,function (err, data) {
            result.userList = data
            // console.log(result)
            call(err, result);
        });
    }
    this.searchRole=function (start,end,roleKey,call) {
        var result = {};
        //查询总记录数
        var sql = "SELECT COUNT(uid) AS totalNum FROM userinfo WHERE status = 1"
        connection.query(sql,function (err, data) {
            result.totalNum = data[0].totalNum;
        });
        sql = 'SELECT uid,username,sex,province,city,role,status FROM userinfo WHERE role ='
            +roleKey+' LIMIT '+start+','+end;
        // console.log(sql)
        connection.query(sql,function (err, data) {
            result.userList = data
            call(err, result);
        });
    }
    this.searchStatus=function (start,end,statusKey,call) {
        var result = {};
        //查询总记录数
        var sql = "SELECT COUNT(uid) AS totalNum FROM userinfo WHERE status = 1"
        connection.query(sql,function (err, data) {
            result.totalNum = data[0].totalNum;
        });
        sql = 'SELECT uid,username,sex,province,city,role,status FROM userinfo WHERE status ='
            +statusKey+' LIMIT '+start+','+end;
        // console.log(sql)
        connection.query(sql,function (err, data) {
            result.userList = data
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
        connection.query(sql,function (err, data) {
            call(err, data);
        });
    }

    // 处理申请
    this.userApply=function (call) {
        //查询申请表
        var sql = 'SELECT * FROM application WHERE status=0';
        // console.log(sql)
        connection.query(sql,function (err, data) {
            call(err, data);
        });
    }

    this.getApply=function (uid,call) {
        //查询单个
        var sql = 'SELECT * FROM application WHERE status=0 AND uid='+uid;
        // console.log(sql)
        connection.query(sql,function (err, data) {
            call(err, data);
        });
    }

    //同意
    this.setApply=function (uid,call) {
        //处理
        var sql1 = "UPDATE userinfo SET role=1 WHERE uid="+uid;
        connection.query(sql1,function (err, data) {

        });
        var sql2 = "UPDATE application SET status=1 WHERE uid="+uid;
        console.log(sql2)
        connection.query(sql2,function (err1, data1) {
            //查询申请表
            var sql = 'SELECT * FROM application WHERE status=0';
            // console.log(sql)
            connection.query(sql,function (err, data) {
                call(err, data);
            });
        });

    }

    this.applyCount=function (call) {
        //查询申请表
        var sql = 'SELECT count(uid) AS applyCount FROM application WHERE status=0';
        // console.log(sql)
        connection.query(sql,function (err, data) {
            call(err, data);
        });
    }



    this.end=function () {
        connection.end();
    }


}

module.exports=UserDao;