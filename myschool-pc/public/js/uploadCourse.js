
var v = new Vue({
    el:'#app',
    data:{
        firstID:0,
        secondID:0,
        cate:null
    },
    methods:{

    },
    mounted:function(){
        this.$http.get("/getCourseMenu").then(function (res) {
            console.log(res.data)
            this.cate = res.data;
        })

    }
});