function LoginDao() {

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

    this.userInfoName=function (username,user,call) {
        var  userGetSql = 'SELECT * FROM '+user+" WHERE username = "+username;
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('用户名查询',err.message);
                return;
            }else{
                call(err,result);
            }

            // console.log(res.jsonp(result));
        });
    }

    this.userInfoList=function (username,passwd,user,call) {
        var  userGetSql = 'SELECT * FROM '+user+" WHERE username = "+username+" AND passwd="+passwd;
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('用户查信息询',err.message);
                return;
            }else{
                call(err,result);
            }
        });
    }
    this.StoringuserInfo = function (username,passwd,call) {
        var sql = 'INSERT INTO userinfo(username,passwd) VALUES ('+username+','+passwd+')';
        // console.log(sql)
        connection.query(sql,function (err, result) {
            call(err, result);
        });
    }

    this.getpersonalInfo =function (uid,call) {
        var  userGetSql = 'SELECT * FROM course LEFT JOIN collection ON course.id=collection.cid WHERE collection.uid='+uid;
        connection.query(userGetSql,function (err, result) {
            if(err){
                console.log('个人信息查询收藏课表',err.message);
                return;
            }else{
                call(err,result);
            }
        });
    }

    // this.storinguserInfo = function (nickname,position,province,city,sex,autograph,username,passwd,call) {
    //     var sql = 'INSERT INTO userinfo(nickname,position,province,city,sex,autograph) VALUES ("'+nickname+'","'+position+'","'+province+'","'+city+'",'+sex+',"'+autograph+'") ' +
    //         ' WHERE username='+username+' AND passwd='+passwd;
    //     console.log(sql)
    //     connection.query(sql,function (err, result) {
    //         call(err, result);
    //     });
    // }
    this.updatauserInfo=function(nickname,position,province,city,sex,autograph,username,passwd,call) {
        //4,编写sql语句
        var userModSql = 'UPDATE userinfo SET nickname = "'+nickname+'",position ="'+position+'",province="'+province+'",city="'+city+'",sex='+sex+',autograph="'+autograph+'"  WHERE username='+username+' AND passwd='+passwd;
        // console.log(userModSql);
        //5，更新操作
        connection.query(userModSql,function (err, result) {
            if(err){
                console.log('修改数据出错 - ',err.message);
                return;
            }
            call(err,result);
        });
    }



    this.finish=function () {

    }
}

module.exports=LoginDao;
