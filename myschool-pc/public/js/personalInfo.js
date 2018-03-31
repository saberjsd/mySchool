var dat1 = [
    {
        sc:"/images/课程.png",
        title:"课程"
    },
    {
        sc:"/images/个人.png",
        title:"设置"
    },
    {
        sc:"/images/申请权限.png",
        title:"申请"
    }
];
var dat2=[
    {
        sc:"/images/课程.png",
        title:"课程"
    },
    {
        sc:"/images/个人.png",
        title:"设置"
    },
    {
        sc:"/images/申请权限.png",
        title:"上传"
    }
];
var app = new Vue({
    el:"#app",
    data:{
        isActive:false,
        menu1:dat1,
        menu2:dat2,
        collectionCourse:[],
        personalInfo:[],
        isChecked:"",
        isTeacher:true,
        isApply:true,
        occupation:'',
        flag:true
    },
    mounted:function () {
        this.$nextTick(function () {
            this.$http.get("/getuserInfo").then(function (res) {
                this.personalInfo = res.data;
                console.log( this.personalInfo[0].role)
                this.occupation =this.personalInfo[0].position;
                switch( this.occupation){
                    case 'undefined':
                        this.occupation="请选择职业";
                        break;
                    case '1':
                        this.occupation="学生";
                        break;
                    case '2':
                        this.occupation="Web前端工程师";
                        break;
                    case '3':
                        this.occupation="PHP开发工程师";
                        break;
                    case '4':
                        this.occupation="JAVA开发工程师";
                        break;
                    case '5':
                        this.occupation="移动开发工程师";
                        break;
                    case '6':
                        this.occupation="Linux系统工程师";
                        break;
                    case '7':
                        this.occupation="数据库工程师";
                        break;
                    case '8':
                        this.occupation="UI设计师";
                        break;
                    case '9':
                        this.occupation="全栈工程师";
                        break;
                }
                if(res.data[0].sex == 0){
                    this.isChecked = true;
                }else if(res.data[0].sex == 1){
                    this.isChecked = false;
                }else if(this.personalInfo[0].role == '1'){
                    window.location.href='/personalInfo';
                }else if(this.personalInfo[0].role == '0'){

                }

            })
        });
        this.$nextTick(function () {
            this.$http.get("/getusercollection").then(function (res) {
                this.collectionCourse = res.data;
            })
        })
    },
    methods:{
        sendphoto:function () {

            $(".user-head-img p").css('display',"block");
        },
        delectphoto:function () {
            $(".user-head-img p").css('display',"none");
        },
        changhead:function () {
//               this.flag = true;
            if(this.flag){
                $(".user-head-info").css("height",'200px');
                $(".user-head-title p").css('display','block');
                this.flag=false;
            }else{
                $(".user-head-info").css("height",'150px');
                $(".user-head-title p").css('display','none');
                this.flag=true;
            }

        },
        choiceMenu:function(item,index) {
            this.menu1[1].sc ="/images/个人.png";
            this.menu1[0].sc ="/images/课程.png";
            this.menu1[2].sc ="/images/申请权限.png";
            $(".user-class").css("display","none");
            $(".user-setting").css("display","none");
            $(".applyinfo ").css("display","none");
            $(".user-apply").css("display","none");
            $("#lists li").attr("class","");
            $("#lists li:eq("+index+")").attr("class","active");
            if(index == 1){
                $(".user-setting").css("display","block");
                console.log(this.menu1[1]);
                this.menu1[1].sc ="/images/个人1.png";
            }else if(index == 2){
                $(".user-apply").css("display","block");
                this.menu1[2].sc ="/images/申请权限1.png";
            }else{
                $(".user-class").css("display","block");
                this.menu1[0].sc ="/images/课程1.png";
            }
        },
        choiceMenu2:function(item,index) {
            this.menu2[1].sc ="/images/个人.png";
            this.menu2[0].sc ="/images/课程.png";
            this.menu2[2].sc ="/images/申请权限.png";
            $(".user-class").css("display","none");
            $(".user-setting").css("display","none");
            $(".applyinfo ").css("display","none");
            $(".user-apply").css("display","none");
            $("#lists li").attr("class","");
            $("#lists li:eq("+index+")").attr("class","active");
            if(index == 1){
                $(".user-setting").css("display","block");
                console.log(this.menu2[1]);
                this.menu2[1].sc ="/images/个人1.png";
            }else if(index == 2){
                $(".user-apply").css("display","block");
                this.menu2[2].sc ="/images/申请权限1.png";
            }else{
                $(".user-class").css("display","block");
                this.menu2[0].sc ="/images/课程1.png";
            }
        },
        inspect:function () {
            console.log(11111);
            this.$http.get("/inspectApplyInfo").then(function (res) {
                console.log(res.data);
                if(res.data == 'apply-success'){
                    this.isApply = false;
                    $(".user-apply").css("display","none");
                    $(".applyinfo ").css("display","block");
//                          window.location.href='/personalInfo';
//                          this.isTeacher=false;
                }else if(res.data == 'Application'){
                    this.isApply = false;
                    $(".user-apply").css("display","none");
                    $(".applyinfo ").css("display","block");
                    $(".applyinfo .cont").html("正在审核，请耐心等待。。。");
                }else if(res.data == 'please'){

                }
            })
        }
    }
})

var Gid  = document.getElementById ;
var showArea = function(){
    Gid('show').innerHTML = "<h3>省" + Gid('s_province').value + " - 市" +
        Gid('s_city').value + " - 县/区" +
        Gid('s_county').value + "</h3>"
}
Gid('s_county').setAttribute('onchange','showArea()');

