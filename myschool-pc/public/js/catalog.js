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