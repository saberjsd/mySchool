var Form = require('../dao/FormDao');
var dao = new Form();
dao.init();
exports.form = function (req,res) {
    console.log(req.body);
    var formata = req.body;
    if(formata.content.trim()==null){
        alert('啥都没写你就想提交，可笑')
    }else {
        dao.InsertCollection(formata.uid,formata.cid,formata.content,function (err,data1) {
            var tid = formata.tid;
            res.redirect('/video22?id='+tid)
        })
    }

};