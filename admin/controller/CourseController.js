var CourseDao = require('../dao/CourseDao');
// 数据初始化，连接数据库
var dao = new CourseDao();
dao.init();

//课程管理
exports.courseList = function (req, res) {
    // var result = {
    //     pageMenu:'course',
    //     page:'courseList'
    // };
    dao.getCourse(function (err,data) {
        if(!err){
            data.pageMenu = 'course';
            data.page = 'courseList';
            console.log(data)
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
