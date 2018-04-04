var Form = require('../dao/FormDao');
var dao = new Form();
dao.init();
exports.zan = function (req,res) {
    var id = req.query.comid;
    var zid = req.query.zid;
    dao.UpdateCollection(id,zid,function (err,data) {
        data=JSON.stringify(data)
        res.send(data)
    })
}