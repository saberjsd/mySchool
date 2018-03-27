Vue.component("headerlogin-component",{
    template:'<div class="topBar">\
        <div class="row">\
            <div class="col-md-3 logo">MySchool <small>.com</small></div>\
        <div class="col-md-3">\
        <ul class="nav nav-pills topBar-nav">\
        <li ><a href="#">所有课程</a></li>\
        <li><a href="#">视频课程</a></li>\
        <li><a href="#">文档课程</a></li>\
        </ul>\
        </div>\
        <div class="col-md-3">\
        <input type="text" placeholder="搜索"  class="topBar-search"/>\
        </div>\
        <div class="col-md-3">\
        <div class="row topBar-login">\
        <div class="col-md-4">下载APP</div>\
         <div class="coi-md-2">\
    <img src="./images/tt.png" alt="" class="attention">\
    </div>\
       <div class="col-md-2">\
    <img src="./images/1.jpg" alt="" class="logoico">\
    </div>\
          <div class="col-md-4"></div>\
        </div>\
        </div>\
        </div>\
        </div>'
});
 new Vue({
    el: '#app',
    data: {
        log:[
            {
                h4:"Java企业级电商项目架构演进之路  Tomcat集群与Redis分布式",
                span1:"实战",
                span2:"高级",
                src:"https://img3.sycdn.imooc.com/szimg/5a308c9400011c1305400300.jpg",
                nums:"456"
            },
            {
                h4:"Java企业级电商项目架构演进之路  Tomcat集群与Redis分布式",
                span1:"实战",
                span2:"高级",
                src:"https://img3.sycdn.imooc.com/szimg/5a308c9400011c1305400300.jpg",
                nums:"456",
                descript:'这是一个学习视频'
            },
            {
                h4:"Java企业级电商项目架构演进之路  Tomcat集群与Redis分布式",
                span1:"实战",
                span2:"高级",
                src:"https://img3.sycdn.imooc.com/szimg/5a308c9400011c1305400300.jpg",
                nums:"456",
                descript:'这是一个学习视频'
            },
            {
                h4:"Java企业级电商项目架构演进之路  Tomcat集群与Redis分布式",
                span1:"实战",
                span2:"高级",
                src:"https://img3.sycdn.imooc.com/szimg/5a308c9400011c1305400300.jpg",
                nums:"456",
                descript:'这是一个学习视频'
            },
            {
                h4:"Java企业级电商项目架构演进之路  Tomcat集群与Redis分布式",
                span1:"实战",
                span2:"高级",
                src:"https://img3.sycdn.imooc.com/szimg/5a308c9400011c1305400300.jpg",
                nums:"456",
                descript:'这是一个学习视频'
            }
        ]
    }
})
