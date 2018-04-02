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
var pageNum = 5;
// limit起始范围
var limit = 0;
// 每次显示分页数
var totalShow = 5;

exports.userList = function (req, res) {
    // console.log(req.query)

    page = req.query.page || 1;

    // limit的值
    limit = (page-1)*pageNum;
    // console.log('limit:'+limit)
    dao.userInfo(limit,pageNum,req.query,function(err,data){
        if(!err){
            data.pageMenu = 'userInfo';
            data.page = 'userList';
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
            data.totalPage = totalPage;
            data.pageNow = page;
            // console.log('Page:'+page)
            // console.log('totalPage:'+totalPage)
            data.start = start;
            data.end = end;
            // console.log(data)
            res.render('userList',data)


        }
    })



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

