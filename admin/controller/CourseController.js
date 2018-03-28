var CourseDao = require('../dao/CourseDao');
// 数据初始化，连接数据库
var dao = new CourseDao();
dao.init();

//课程管理

var totalPage =0;
// 当前页面
var page = 1;
// 每页显示数目
var pageNum = 2;
var limit = (page-1)*pageNum;
// 每次显示分页数
var totalShow = 5;



exports.courseList = function (req, res) {
    page = req.query.page || page;
    // 上一页,下一页
    if(req.query.a){
        req.query.a =='next'?page++:page--;
        if(page<1) page =1;
        if(page>totalPage) page=totalPage;
    }



    // limit的值
    limit = (page-1)*pageNum;
    dao.getCourse(limit,pageNum,function (err,data) {
        if(!err){
            //侧边栏数据
            data.pageMenu = 'course';
            data.page = 'courseList';
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

            // console.log(start+','+end)

            // console.log(totalPage)
            data.totalPage = totalPage;
            data.pageNow = page;

            data.start = start;
            data.end = end;
            // 将栏目信息写入对象
            var obj = {}
            data.cateMenu.forEach(function(item){
                obj[item.cid] = item.catename
            })
            data.cateName = obj;
            // console.log(data)
            res.render('courseList',data)
        }
    })

};
//要修改的课程展示
exports.courseItem = function (req, res) {
    var $cid = req.query.cid;
    dao.getCourseItem($cid,function (err1,data1) {
        if(!err1){
            // console.log(data1)
            var result = JSON.stringify(data1);
            res.send(result)
        }
    })

};
// 修改课程
exports.updateCourse = function (req, res) {
    dao.updateCourse(req.body,function (err1,data1) {
        if(!err1){
            // console.log(data1)
            // var result = JSON.stringify(data1)
            // res.send(result)
            res.redirect('/courseList')
        }
    })

};

//添加课程
exports.getCourseMenu = function (req, res) {
    dao.getCourseMenu(function (err1,data) {
        if(!err1){
            var result = JSON.stringify(data);
            res.send(result)
        }
    })

};
exports.addCourse = function (req, res) {
    req.body.creatTime = new Date().toLocaleString();
    dao.addCourse(req.body,function (err1,data1) {
        if(!err1){
            res.redirect('/courseList')
        }
    })

};
// 删除课程
exports.delCourse = function (req, res) {
    if(req.query.id){
        dao.delCourse(req.query.id,function (err,data) {
            if(!err){
                res.send({"res":"del_ok"})
            }else {
                res.send({"res":"del_fail"})
            }
        })
    }
};

// 课程详情
var detailID = 1;
exports.courseDetail = function (req, res) {
    detailID = req.query.id || detailID;
    dao.courseDetail(detailID,function (err,data) {
        if(!err){
            // console.log(data)
            res.render('courseDetail',{
                pageMenu:'course',
                page:'courseDetail',
                course:data
            })
        }
    })

};
// 获取章节
exports.getChapter = function (req, res) {
    dao.getChapter(req.query.id,function (err,data) {
        if(!err){
            data = JSON.stringify(data);
            // console.log(data)
            res.send(data);
        }
    })

};
// 修改章节
exports.updateChapter = function (req, res) {
    dao.updateChapter(req.body,function (err1,data1) {
        if(!err1){

            res.redirect('/courseDetail')
        }
    })

};
// 添加章节
exports.addChapter = function (req, res) {
    // 课程ID
    req.body.pid = detailID;
    dao.addChapter(req.body,function (err1,data1) {
        if(!err1){

            res.redirect('/courseDetail')
        }
    })

};
// 删除章节
exports.delChapter = function (req, res) {
    if(req.query.id){
        dao.delChapter(req.query.id,function (err,data) {
            if(!err){
                res.send({"res":"del_ok"})
            }else {
                res.send({"res":"del_fail"})
            }
        })
    }
};
