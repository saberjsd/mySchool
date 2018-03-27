var CateDao = require('../dao/CateDao');
// 数据初始化，连接数据库
var dao = new CateDao();
dao.init();
// 查询栏目信息
exports.cateList = function (req, res) {
    var result = {
        pageMenu:'cate',
        page:'cateList'
    };
    dao.getCate(true,function (err1,data1) {
        if(!err1){
            result.cateMenu = data1
            dao.getCate(false,function(err2,data2){
                if(!err2){
                    result.cateList = data2
                    res.render('cateList',result)
                }
            })

        }
    })

};
//修改栏目
exports.updateCate = function(req,res){
    var cid = req.query.cid
    var cname = req.query.catename
    dao.updateCate(cid,cname,function(err,data){
        if(!err){
            res.send({"res":"update_ok"})
        }else {
            res.send({"res":"update_fail"})
        }
    })
};
//删除栏目
exports.delCate=function(req,res){
    var cid = req.query.cid;
    dao.delCate(cid,function(err,data){
        if(!err){
            res.send({"res":"del_ok"})
        }else {
            res.send({"res":"del_fail"})
        }
    })
};
//添加栏目
var cateMenu1 = null;
exports.cateAddGET=function(req,res){
    dao.getCate(true,function (err1,data1) {
        if(!err1){
            cateMenu1 = data1;
            res.render('cateAdd',{
                pageMenu:'cate',
                page:'cateAdd',
                cateMenu:data1,
                error:''
            })
        }
    })

}
// 添加栏目信息
exports.cateAddPOST=function(req,res){
    if(req.body.cname){
        var cid     = req.body.cid || null;
        var cname   = req.body.cname;
        var pid     = req.body.pid || 0;
        var level   = req.body.level || 1;
        dao.addCate(cid,pid,level,cname,function(err,data){
            if(!err){
                res.redirect('/cateList')
            }else{
                res.redirect('/cateAdd')
                // res.render('cateAdd',{
                //     pageMenu:'cate',
                //     page:'cateAdd',
                //     cateMenu:cateMenu1,
                //     error:'添加失败!'
                // })
            }
        })
    }
}