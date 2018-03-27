var app = new Vue({
    el:"#app",
    data:{
        cateMenu:[],
        cateList:[],
        cateMovie:[],
        id:""
    },
    mounted:function () {
        this.$nextTick(function () {
            this.$http.get("/getCateMenu").then(function (res) {
                this.cateMenu = res.data;
            })
        })
        this.$nextTick(function () {
            this.$http.get("/getCateList").then(function (res) {
                this.cateList = res.data;
            })
        })
        this.$nextTick(function () {
            this.$http.get("/getCateMovie").then(function (res) {
                this.cateMovie = res.data;

            })
        })
    },
    methods:{
        cate1(item,index){
            $(".guide-direction ul li").attr("class","");
            $(".guide-direction ul li a").css("color","black");
            $(".guide-direction ul li").css("color","black");
            var n = index+1;
            $(".guide-direction ul li:eq("+n+")").attr("class","action");
            $(".guide-direction ul li:eq("+n+")").css("color","white");
            this.classid = item.cid;
            var that = this;
            var url = "/getCateList?id="+item.cid;
            that.$http.get(url).then(function (res) {
                this.cateList = res.data;
            });
            var url1 = "/getCateMovie?id="+item.cid;
            that.$http.get(url1).then(function (res) {
                console.log(res.data);
                this.cateMovie = res.data;
            })
        },
        cate2(item,index){
               $(".guide-direction ul li").attr("class","");
               $(".guide-direction ul li a").css("color","black");
            $(".guide-classify ul li").attr("class","");
            $(".guide-classify ul li a").css("color","black");
            $(".guide-classify ul li").css("color","black");
            var that = this;
            var n = index+1;
            var li = document.querySelectorAll(".guide-direction ul li")
            for(var i=0;i<li.length;i++){
                if(that.id == li[i].getAttribute("id")){
                    $(".guide-direction ul li:eq("+(i)+")").attr("class","action");
                }
            }
            $(".guide-classify ul li:eq("+n+")").attr("class","action");
            $(".guide-classify ul li:eq("+n+")").css("color","white");
            var url = "/getcateMenu?id="+item.pid;
            that.$http.get(url).then(function (res) {
                console.log(res.data[0].cid);
                that.id= res.data[0].cid;
            })

        }
    }
})
