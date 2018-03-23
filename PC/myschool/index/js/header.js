Vue.component("header-component",{
    template:'<div class="topBar">\
        <div class="row">\
            <div class="col-md-3 col-sm-4 logo">MySchool <small>.com</small></div>\
        <div class="col-md-3 col-sm-5">\
        <ul class="nav nav-pills topBar-nav">\
        <li ><a href="#">所有课程</a></li>\
        <li><a href="#">视频课程</a></li>\
        <li><a href="#">文档课程</a></li>\
        </ul>\
        </div>\
        <div class="col-md-3  hidden-sm">\
        <input type="text" placeholder="搜索"  class="topBar-search"/>\
        </div>\
        <div class="col-md-3 col-sm-3">\
        <div class="row topBar-login">\
        <div class="col-md-4 hidden-sm" >下载APP</div>\
        <div class="col-md-3 col-sm-4">登录</div>\
        <div class="col-md-1 col-sm-1">/</div>\
        <div class="col-md-3 col-sm-4">注册</div>\
        <div class="col-md-1 col-sm-3"></div>\
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
                h4:"Java企业级电商项目架构演进之路",
                span1:"实战",
                span2:"高级",
                sc:"./images/icon4.png",
                nums:"456",
                descript:'这是一个学习视频'
            },
            {
                h4:"Java企业级电商项目架构演进之路  Tomcat集群与Redis分布式",
                span1:"实战",
                span2:"高级",
                sc:"./images/icon4.png",
                nums:"456",
                descript:'这是一个学习视频'
            },
            {
                h4:"Java企业级电商项目架构演进之路 ",
                span1:"实战",
                span2:"高级",
                sc:"../images/icon4.png",
                nums:"456",
                descript:'这是一个学习视频'
            },
            {
                h4:"Java企业级电商项目架构演进之路  Tomcat集群与Redis分布式",
                span1:"实战",
                span2:"高级",
                sc:"./images/icon4.png",
                nums:"456",
                descript:'这是一个学习视频'
            },
            {
                h4:"Java企业级电商项目架构演进之路 ",
                span1:"实战",
                span2:"高级",
                sc:"./images/icon4.png",
                nums:"456",
                descript:'这是一个学习视频'
            }
        ],
        log1:[
            {
                h4:"Java企业级电商项目架构演进之路 ",
                span1:"实战",
                span2:"高级",
                sc:"./images/icon4.png",
                nums:"456",
                descript:'这是一个学习视频'
            },
            {
                h4:"Java企业级电商项目架构演进之路 ",
                span1:"实战",
                span2:"高级",
                sc:"./images/icon4.png",
                nums:"456",
                descript:'这是一个学习视频'
            },
            {
                h4:"Java企业级电商项目架构演进之路 ",
                span1:"实战",
                span2:"高级",
                sc:"./images/icon4.png",
                nums:"456",
                descript:'这是一个学习视频'
            },
            {
                h4:"Java企业级电商项目架构演进之路 ",
                span1:"实战",
                span2:"高级",
                sc:"./images/icon4.png",
                nums:"456",
                descript:'这是一个学习视频'
            }
        ]
    }
})
