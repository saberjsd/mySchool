/**
 * Created by Administrator on 2018/3/26.
 */
$(".form-contro").focus(function () {
    $(this).css("boder-bottom-color","black");
})
var app =  new Vue({
    el: '#app',
    data: {
        log:[],
        log1:[],
        log2:[],
        noteData:[]
    },
    mounted:function(){
        this.$nextTick(function () {
            this.$http.get("/getrecommend").then(function (res) {
                this.noteData = res.data.slice(0,6);
                this.log = res.data.slice(0,5);
            })
            this.$http.get("/getnewest").then(function (res) {
                this.log1 = res.data.slice(0,4);
                this.log2 = res.data.slice(4,8);
            })
        })
    },
    methods:{
       //  Infobox:function () {
       //  document.querySelector(".userInfo-box").style.display = 'block';
       //  },
       //  hideInfobox:function () {
       //  document.querySelector(".userInfo-box").style.display = 'none';
       // }
    }
})