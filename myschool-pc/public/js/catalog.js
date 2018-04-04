var btn = document.getElementsByClassName('btn');
var list_box = document.getElementsByClassName('list_box');
for(var i=0;i<btn.length;i++){
    (
        function(index){
            btn[index].onclick = function(){
                for(var j=0;j<list_box.length;j++){
                    if(index==j){
                        list_box[j].style.display='block'
                        btn[j].style.color='red'
                    }else{
                        list_box[j].style.display='none'
                        btn[j].style.color='black'
                    }
                }
            }
        }
    )(i)
}
$('.list_box').on('click','.fabulous',function () {
    var that=this;
    var id = $(that).children(":first").html();
    //console.log(id);
    var zan = $(that).children().last().html()-1+2;
    console.log(zan)
    $.ajax({
        url:'/zan',
        type:'GET',
        data:{comid:id,zid:zan}
    }).done(function (data) {
        console.log(data);
        $(that).children().last().html(zan);
        $(that).children().last().prev().attr('src','images/zan2.png')
        })
})