var ApplyDao = require("../dao/ApplyDao");
var dao = new ApplyDao();
dao.init();
exports.applyInfo = function (req,res) {
    var uid = req.session.uid;
    var reason = req.body.reason;
    var realName =  req.body.realName;
    var tel    = req.body.tel;
    dao.StoringapplyInfo(uid,reason,realName,tel,function(err,data) {
        if(!err){
            res.render('personalInfo',{})
        }
    })
}
exports.inspectApplyInfo = function (req,res) {
    var uid = req.session.uid;
    console.log(uid);
    dao.getapplyInfo(uid,function(err,data){
        if(data[0].status == 0){
            res.send('Application');
        }else if(data[0].status == 1){
            res.send('apply-success');
            dao.updataapplyInfo(uid,function(err,data) {
            })
        }else if(data[0] == undefined){
            res.send('please');
        }


    })
}
