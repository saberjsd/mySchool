var app = new Vue({
    el:"#app",
    data:{
        navData:['Web前端功臣狮','后端功臣狮','移动端功臣狮'],
        vedioCourse:[]
    },
    mounted:function () {
        this.$nextTick(function () {
            this.$http.get("/getVideoCourse").then(function (res) {
                console.log(res.data);
                this.vedioCourse = res.data;
            })
        })
    },
    methods:{
        changeNav(index){
            $(".top-nav ul li").attr("class","");
            $(".top-nav ul li a").css("color","white");
            $(".top-nav ul li").css("color","white");
            console.log(index);
            var n = index+1;
            $(".top-nav ul li:eq("+n+")").attr("class","active");
            $(".top-nav ul li:eq("+n+")").css("color","black");
            $(".top-nav ul li:eq("+n+")").unbind('mouseenter').unbind('mouseleave');
        }
    }
})
