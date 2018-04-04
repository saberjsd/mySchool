var UserDao = require('../dao/UserDao');
// 数据初始化，连接数据库
var dao = new UserDao();
dao.init();

//用户列表

// 总的分页
var totalPage =0;
// 当前页面
var page = 1;
// 每页显示数目
var pageNum = 2;
var limit = (page-1)*pageNum;
// 每次显示分页数
var totalShow = 5;

exports.userList = function (req, res) {
    console.log(req.query)
    var result = {
        pageMenu:'userInfo',
        page:'userList',
    };
    var nameKey = req.query.nameKey;
    var roleKey = req.query.roleKey;
    var statusKey = req.query.statusKey;

    page = req.query.page || page;
    // 上一页,下一页
    if(req.query.a){
        req.query.a =='next'?page++:page--;
        if(page<1) page =1;
        if(page>totalPage) page=totalPage;
    }
    // limit的值
    limit = (page-1)*pageNum;

    if(nameKey){
        // console.log(nameKey)
        dao.searchName(limit,pageNum,nameKey,function (err,data) {
            if(!err){
                result.userList = data.userList;
                result.nameKey = nameKey;
                // 分页总页数
                totalPage = Math.ceil(data.totalNum/pageNum)

                // 起始页码
                var start = page-(totalShow-1)/2;
                if(start < 1){
                    start = 1;
                }
                // 结束页码
                var end = start+totalShow-1;
                if(end > totalPage){
                    end	= totalPage;
                    start	= end - totalShow+1;
                    if(start < 1){
                        start = 1;
                    }
                }
                result.totalPage = totalPage;
                result.pageNow = page;

                result.start = start;
                result.end = end;
                // console.log(result)
                res.render('userList',result)
            }
        })
    }
    else if(roleKey){
        // roleKey=='教师'?roleKey=1:roleKey=0
        // console.log(roleKey)
        dao.searchRole(limit,pageNum,roleKey,function (err,data) {
            if(!err){
                result.userList = data;
                result.nameKey = "?";
                result.roleKey = roleKey;
                // 分页总页数
                totalPage = Math.ceil(data.totalNum/pageNum)

                // 起始页码
                var start = page-(totalShow-1)/2;
                if(start < 1){
                    start = 1;
                }
                // 结束页码
                var end = start+totalShow-1;
                if(end > totalPage){
                    end	= totalPage;
                    start	= end - totalShow+1;
                    if(start < 1){
                        start = 1;
                    }
                }
                result.totalPage = totalPage;
                result.pageNow = page;

                result.start = start;
                result.end = end;
                // console.log(result)
                res.render('userList',result)
            }
        })
    }
    else if(statusKey){
        // statusKey=='正常'?statusKey=1:statusKey=0;
        console.log(statusKey)
        dao.searchStatus(limit,pageNum,statusKey,function (err,data) {
            if(!err){
                result.userList = data;
                result.nameKey = "?";
                result.statusKey = statusKey;
                // 分页总页数
                totalPage = Math.ceil(data.totalNum/pageNum)

                // 起始页码
                var start = page-(totalShow-1)/2;
                if(start < 1){
                    start = 1;
                }
                // 结束页码
                var end = start+totalShow-1;
                if(end > totalPage){
                    end	= totalPage;
                    start	= end - totalShow+1;
                    if(start < 1){
                        start = 1;
                    }
                }
                result.totalPage = totalPage;
                result.pageNow = page;

                result.start = start;
                result.end = end;
                // console.log(result)
                res.render('userList',result)
            }
        })
    }
    else{
        dao.userList(limit,pageNum,function (err,data) {
            if(!err){
                result.userList = data.userList;
                result.nameKey = "?";
                // 分页总页数
                totalPage = Math.ceil(data.totalNum/pageNum)

                // 起始页码
                var start = page-(totalShow-1)/2;
                if(start < 1){
                    start = 1;
                }
                // 结束页码
                var end = start+totalShow-1;
                if(end > totalPage){
                    end	= totalPage;
                    start	= end - totalShow+1;
                    if(start < 1){
                        start = 1;
                    }
                }
                result.totalPage = totalPage;
                result.pageNow = page;

                result.start = start;
                result.end = end;
                // console.log(result)
                res.render('userList',result)
            }
        })
    }


};
// 重置密码
exports.resetPwd = function (req, res) {

    dao.resetPwd(req.query.uid,function (err,data) {
        if(!err){
            res.send({"res":"reset_ok"})
        }else {
            res.send({"res":"reset_fail"})
        }
    })

};
// 修改状态
exports.setUserInfo = function (req, res) {
    // console.log(req.body)
    dao.setUserInfo(req.body,function (err,data) {
        res.redirect('/userList')
    })

};

exports.delUser = function (req, res) {
    dao.delUser(req.query.uid,function (err,data) {
        if(!err){
            res.send({"res":"del_ok"})
        }else {
            res.send({"res":"del_fail"})
        }
    })

};

