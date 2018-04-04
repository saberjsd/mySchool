-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.53-log - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.5.0.5220
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 myschool 的数据库结构
DROP DATABASE IF EXISTS `myschool`;
CREATE DATABASE IF NOT EXISTS `myschool` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `myschool`;

-- 导出  表 myschool.administrators 结构
DROP TABLE IF EXISTS `administrators`;
CREATE TABLE IF NOT EXISTS `administrators` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(20) NOT NULL,
  `passwd` char(32) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='后台管理员信息';

-- 正在导出表  myschool.administrators 的数据：~1 rows (大约)
DELETE FROM `administrators`;
/*!40000 ALTER TABLE `administrators` DISABLE KEYS */;
INSERT INTO `administrators` (`aid`, `username`, `passwd`) VALUES
	(1, 'jsd', '202cb962ac59075b964b07152d234b70');
/*!40000 ALTER TABLE `administrators` ENABLE KEYS */;

-- 导出  表 myschool.application 结构
DROP TABLE IF EXISTS `application`;
CREATE TABLE IF NOT EXISTS `application` (
  `uid` int(11) NOT NULL COMMENT '用户表中的ID',
  `realName` char(20) DEFAULT NULL COMMENT '真实姓名',
  `tel` char(11) DEFAULT NULL,
  `reason` text COMMENT '申请原因',
  `status` tinyint(1) DEFAULT '0' COMMENT '0是已处理,1是待处理',
  `username` char(50) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='教师申请表';

-- 正在导出表  myschool.application 的数据：~2 rows (大约)
DELETE FROM `application`;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` (`uid`, `realName`, `tel`, `reason`, `status`, `username`) VALUES
	(1, '袁攀', '17342534545', '我想当老师', 0, '17358624784'),
	(2, '蒋绍东', '18328815322', '加入慕课网,成为优秀的讲师', 1, '18328815322'),
	(3, '孔晓慧', '15025540470', '我想成为一名老师，请成全我；', 1, '15025540470');
/*!40000 ALTER TABLE `application` ENABLE KEYS */;

-- 导出  表 myschool.cate 结构
DROP TABLE IF EXISTS `cate`;
CREATE TABLE IF NOT EXISTS `cate` (
  `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '栏目ID',
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT 'parent ID',
  `catename` char(20) NOT NULL COMMENT '栏目名',
  `level` tinyint(1) NOT NULL DEFAULT '1' COMMENT '栏目级别，1级前后端，2级具体语言',
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COMMENT='分类管理';

-- 正在导出表  myschool.cate 的数据：~27 rows (大约)
DELETE FROM `cate`;
/*!40000 ALTER TABLE `cate` DISABLE KEYS */;
INSERT INTO `cate` (`cid`, `pid`, `catename`, `level`, `status`) VALUES
	(1, 0, '前端开发', 1, 1),
	(2, 0, '后台开发', 1, 1),
	(3, 0, '移动开发', 1, 1),
	(4, 0, '数据库', 1, 1),
	(5, 0, '1515', 1, 0),
	(6, 0, '123', 1, 0),
	(7, 0, '456', 1, 0),
	(11, 1, 'HTML/CSS', 2, 1),
	(12, 1, 'JavaScript', 2, 1),
	(13, 1, 'Html5', 2, 1),
	(14, 1, 'CSS3', 2, 1),
	(15, 1, 'jQuery', 2, 1),
	(18, 1, '哈哈', 2, 0),
	(21, 2, 'PHP', 2, 1),
	(22, 2, 'Java', 2, 1),
	(23, 2, 'SpringBoot', 2, 1),
	(24, 2, 'Python', 2, 1),
	(25, 2, 'C#', 2, 1),
	(31, 3, 'Android', 2, 1),
	(32, 3, 'iOS', 2, 1),
	(33, 3, 'Unity 3D', 2, 1),
	(34, 3, 'Cocos2d-x', 2, 1),
	(41, 4, 'MySQL', 2, 1),
	(42, 4, 'MongoDB', 2, 1),
	(43, 4, 'Oracle', 2, 1),
	(44, 4, 'SQL Server', 2, 1),
	(51, 0, '你好', 1, 0);
/*!40000 ALTER TABLE `cate` ENABLE KEYS */;

-- 导出  表 myschool.collection 结构
DROP TABLE IF EXISTS `collection`;
CREATE TABLE IF NOT EXISTS `collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户id',
  `cid` int(11) NOT NULL COMMENT '课程ID',
  `creatTime` datetime NOT NULL COMMENT '收藏时间',
  `did` int(11) DEFAULT '0' COMMENT '课程章节ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='用户收藏课程表';

-- 正在导出表  myschool.collection 的数据：~4 rows (大约)
DELETE FROM `collection`;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` (`id`, `uid`, `cid`, `creatTime`, `did`) VALUES
	(1, 1, 1, '2018-04-04 09:16:00', 1),
	(2, 2, 6, '2018-04-03 20:21:00', 2),
	(3, 2, 8, '2018-04-03 20:29:35', 1),
	(4, 2, 9, '2018-04-03 20:32:20', 1);
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;

-- 导出  表 myschool.comment 结构
DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `uid` int(11) NOT NULL COMMENT '用户的ID',
  `cid` int(11) NOT NULL COMMENT '课程的ID',
  `content` text NOT NULL COMMENT '评论内容',
  `creatTime` datetime NOT NULL COMMENT '评论时间',
  `status` tinyint(1) DEFAULT '1',
  `zan` int(11) DEFAULT '0' COMMENT '赞的次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户评论表';

-- 正在导出表  myschool.comment 的数据：~0 rows (大约)
DELETE FROM `comment`;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` (`id`, `uid`, `cid`, `content`, `creatTime`, `status`, `zan`) VALUES
	(1, 1, 1, '为二位企鹅', '2018-04-04 09:09:16', 1, 2);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;

-- 导出  表 myschool.course 结构
DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL DEFAULT '0' COMMENT '0是管理员，其他的老师的ID',
  `firstID` int(11) NOT NULL COMMENT '所属一级栏目',
  `secondID` int(11) NOT NULL COMMENT '所属二级栏目',
  `title` char(50) NOT NULL COMMENT '所展示的标题',
  `description` text COMMENT '课程的描述',
  `logo` text COMMENT '课程封面',
  `isVideo` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1是视频，0是文章',
  `collection` int(11) NOT NULL DEFAULT '0' COMMENT '收藏次数',
  `comment` int(11) NOT NULL DEFAULT '0' COMMENT '评论次数',
  `creatTime` datetime NOT NULL COMMENT '课程创建时间',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='课程信息表';

-- 正在导出表  myschool.course 的数据：~9 rows (大约)
DELETE FROM `course`;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` (`id`, `uid`, `firstID`, `secondID`, `title`, `description`, `logo`, `isVideo`, `collection`, `comment`, `creatTime`, `status`) VALUES
	(1, 1, 1, 11, '移动web开发', '简介：移动web开发适配的方案有许多，然而最好的方案一定要掌握。本课程主要讲解移动web开发中常见的适配方法，着重讲解使用rem方案的原理和使用方法，来进行移动web开发的适配工作，借助于实战页面让学者更加清晰的掌握实战工作中如何应用rem适配技术。', '/upload/courseLogo/2018040318555712720.jpg', 1, 0, 0, '2018-04-03 18:55:57', 1),
	(2, 1, 1, 11, 'Css定位', '简介：本课程，将带领大家了解一下定位的知识，教大家如何通过定位来进行布局。', '/upload/courseLogo/2018040319021013141.jpg', 1, 0, 0, '2018-04-03 19:02:10', 1),
	(3, 1, 1, 11, '基于websocket的火拼俄罗斯(单机版)', '简介：本课程是火拼俄罗斯方块系列的第二个课程，主要是带领大家完成单机版的俄罗斯方块，包括页面的搭建、渲染、代码结构的调整、各种形式的转换、细节的丰富、以及干扰功能的实现。', '/upload/courseLogo/2018040319393213590.jpg', 1, 0, 0, '2018-04-03 19:39:32', 1),
	(4, 1, 1, 11, '前端性能优化', '简介：性能优化成神之路的必看之课，是前端性能优化基础简介的后续篇章，作为一门前端性能优化的进阶课程，本课程介绍了常用的性能优化方法，以及老师自己在工作中摸索出来的，并且在大厂使用的课程。', '/upload/courseLogo/2018040319463417525.jpg', 1, 0, 0, '2018-04-03 19:46:34', 1),
	(5, 1, 1, 12, 'ES6快速入门', '简介：ES6增加了很多新的语法，很多同学学习起来感觉很别扭，有时候也不理解新增加的语法有什么用，对ES6的学习也没有兴趣进而动力不足、学习效率不高。本课程通过ES3、ES5、ES6的对比去实现同一个问题，学员可以非常容易的理解和掌握ES6的强大并产生学习的兴趣。', '/upload/courseLogo/2018040320063317644.jpg', 1, 0, 0, '2018-04-03 20:06:33', 1),
	(6, 2, 2, 21, 'PHP入门', '本教程带领大家轻松学习PHP基础知识，了解PHP中的变量、变量的类型、常量等概念，认识PHP中的运算符，通过本教程学习能够掌握PHP中顺序结构、条件结构、循环结构三种语言结构语句。', '/upload/courseLogo/2018040320173017274.jpg', 0, 0, 0, '2018-04-03 20:17:30', 1),
	(7, 2, 1, 11, 'HTML入门', '本课程精选第11届阿里D2前端大会论坛分享内容，引领最前沿技术', '/upload/courseLogo/2018040320232811334.jpg', 0, 0, 0, '2018-04-03 20:23:28', 1),
	(8, 2, 3, 32, 'ios入门', '本课程是iOS基础之搞定多线程，主要针对多线程的基础知识。目前开发过程中多线程是必不可少的，占据着重要的地位。如果想提高程序的执行效率，就必须掌握多线程。本门课程将重点介绍多线程的四种实现技术方案，分别是pThread，NSThread，GCD和NSOperation。', '/upload/courseLogo/2018040320263212239.jpg', 0, 0, 0, '2018-04-03 20:26:32', 1),
	(9, 2, 4, 41, '数据库入门', '简介：本课程讲解Python如何开发MySQL数据库程序。首先介绍Python开发数据库程序的通用接口规范，然后搭建Python开发数据库程序的开发环境，接着了解了通用接口规范中的connection、cursor两大对象之后，介绍如何增删改查数据库，最后以实例代码演示数据库程序的开发流程。', '/upload/courseLogo/2018040320310014916.jpg', 0, 0, 0, '2018-04-03 20:31:00', 1);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;

-- 导出  表 myschool.courseitem 结构
DROP TABLE IF EXISTS `courseitem`;
CREATE TABLE IF NOT EXISTS `courseitem` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '课程的详情数据 ID',
  `pid` int(11) NOT NULL COMMENT '详情所属课程id',
  `title` char(50) NOT NULL COMMENT '详情章节名字',
  `content` text NOT NULL COMMENT '内容，视频就是地址，文档就是文本',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `order` int(11) DEFAULT NULL COMMENT '章节顺序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8 COMMENT='课程章节';

-- 正在导出表  myschool.courseitem 的数据：~53 rows (大约)
DELETE FROM `courseitem`;
/*!40000 ALTER TABLE `courseitem` DISABLE KEYS */;
INSERT INTO `courseitem` (`id`, `pid`, `title`, `content`, `status`, `order`) VALUES
	(13, 1, '课程介绍', '/upload/video/2018040319312318386.mp4', 1, 1),
	(14, 1, '移动web开发-1综述', '/upload/video/2018040319314010757.mp4', 1, 2),
	(15, 1, '移动web开发-2常见适配方法', '/upload/video/2018040319315810184.mp4', 1, 3),
	(16, 1, '移动web开发-3MediaQuery', '/upload/video/2018040319330417393.mp4', 1, 4),
	(17, 1, 'rem原理与简介', '/upload/video/2018040319332113906.mp4', 1, 5),
	(18, 1, 'rem页面适配实战', '/upload/video/2018040319334117031.mp4', 1, 6),
	(19, 1, '课程总结', '/upload/video/2018040319335815941.mp4', 1, 7),
	(20, 2, '课程简介', '/upload/video/2018040319342716670.mp4', 1, 1),
	(21, 2, '文档流', '/upload/video/2018040319344212657.mp4', 1, 2),
	(22, 2, 'position-relative', '/upload/video/2018040319345717993.mp4', 1, 3),
	(23, 2, 'position-absolute', '/upload/video/2018040319351417586.mp4', 1, 4),
	(24, 2, 'position-fiexed', '/upload/video/2018040319352917762.mp4', 1, 5),
	(25, 2, 'position-inherit', '/upload/video/2018040319370115579.mp4', 1, 6),
	(26, 2, 'z-index', '/upload/video/2018040319371610521.mp4', 1, 7),
	(27, 2, '定位和边距的区别', '/upload/video/2018040319373312655.mp4', 1, 8),
	(28, 2, '侧边栏导航跟随案例', '/upload/video/2018040319374910228.mp4', 1, 9),
	(29, 3, '课程简介及游戏原理介绍', '/upload/video/2018040319395412552.mp4', 1, 1),
	(30, 3, '界面搭建', '/upload/video/2018040319401210135.mp4', 1, 2),
	(31, 3, '解密那渲染逻辑', '/upload/video/2018040319403513159.mp4', 1, 3),
	(32, 3, '代码结构调整', '/upload/video/2018040319405316062.mp4', 1, 4),
	(33, 3, '键盘控制方块下移', '/upload/video/2018040319413314440.mp4', 1, 5),
	(34, 3, '实现七种方块', '/upload/video/2018040319415711060.mp4', 1, 6),
	(35, 3, '方块固定、消行、游戏结束判定', '/upload/video/2018040319431313281.mp4', 1, 7),
	(36, 3, '增加干扰功能', '/upload/video/2018040319434711697.mp4', 1, 8),
	(37, 3, '对方操作示意', '/upload/video/2018040319441015494.mp4', 1, 9),
	(38, 3, '总结', '/upload/video/2018040319443216670.mp4', 1, 10),
	(39, 4, '环境搭建', '/upload/video/2018040319470115770.mp4', 1, 1),
	(40, 4, '介绍nodejs、npm', '/upload/video/2018040319473413381.mp4', 1, 2),
	(41, 4, '项目安装', '/upload/video/2018040319475414745.mp4', 1, 3),
	(42, 4, '解决问题+结语', '/upload/video/2018040319482511021.mp4', 1, 4),
	(43, 4, '图片与css', '/upload/video/2018040319484416687.mp4', 1, 5),
	(44, 4, '图片分类', '/upload/video/2018040319490514232.mp4', 1, 6),
	(45, 4, '图片的加载方式', '/upload/video/2018040319492517902.mp4', 1, 7),
	(46, 4, 'CSSSprites', '/upload/video/2018040319502310065.mp4', 1, 8),
	(47, 4, '视频播放器简介', '/upload/video/2018040319563011078.mp4', 1, 9),
	(48, 4, 'js前置', '/upload/video/2018040319571212173.mp4', 1, 10),
	(49, 4, '资源提前', '/upload/video/2018040319573318980.mp4', 1, 11),
	(50, 4, '简介技术选型', '/upload/video/2018040319581116862.mp4', 1, 12),
	(51, 4, 'sessionStorage', '/upload/video/2018040319585516413.mp4', 1, 13),
	(52, 4, 'cookie', '/upload/video/2018040319592012523.mp4', 1, 14),
	(53, 4, 'localStorage', '/upload/video/2018040319594910277.mp4', 1, 15),
	(54, 4, 'SDK功能简介', '/upload/video/2018040320002014449.mp4', 1, 16),
	(55, 4, '网络功能拆解', '/upload/video/2018040320004813551.mp4', 1, 17),
	(56, 4, '网络请求', '/upload/video/2018040320011110461.mp4', 1, 18),
	(57, 4, '本地存储模块', '/upload/video/2018040320014614883.mp4', 1, 19),
	(58, 4, 'Ie开头', '/upload/video/2018040320021512469.mp4', 1, 20),
	(59, 6, 'PHP可以做什么？', '<p align="left">为什么要学习PHP？“我可以用JavaScript来实现程序编写。”但JavaScript的能力是有限的，JavaScript通常运行在浏览器（客户端），它可以制作网页上面的特效：鼠标滑过背景改变颜色，还有网页上常见的鼠标滑过弹出菜单。但如果要让JavaScript实现显示“访问网站的总人数”，它就无能为力了，因为它只能获得客户端的信息，而“访问网站的总人数”是存储在服务器端的。所以就需要另外一种可以在服务器端运行的编程语言，PHP语言就是其中的一种，因为它可以运行在Web服务器端。</p><p align="left">在学习PHP之前让我们来认识一下PHP及其功能。</p><p><span style="color: rgb(194, 79, 74);">1、运行在服务器端：</span>学会了PHP，就可以指挥服务器给你干活，甚至是搞破坏^_^（千万不能真这么做咯），WEB网站的大部分数据都是存储在服务器端的，PHP就是用来处理这些存储在服务器的数据的（功能强大吧）。</p><p><span style="color: rgb(194, 79, 74);">2、跨平台</span>：服务器可以是多种平台的服务器，比如Linux、Windows、Unix，你都可以指挥（不用怕只能指挥一种服务器啦吧）。</p><p><span style="color: rgb(194, 79, 74);">3、脚本语言：</span>它是通过编写脚本，也就是一行行的计算机指令（也可以理解为特定的英文单词），来指挥服务器来工作的，因此，在编写PHP的过程其实就是与老外（服务器成老外啦）交流的过程，交流的语言就是PHP。<span style="background-color: rgb(241, 241, 241); color: inherit; font-family: Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; font-size: inherit; white-space: pre-wrap;">&lt;!DOCTYPE html&gt;</span></p><pre><code>&lt;html&gt;\r\n    &lt;head&gt;\r\n     &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"&gt;\r\n        &lt;title&gt;欢迎学习php!&lt;/title&gt;\r\n    &lt;/head&gt;\r\n	&lt;body&gt;\r\n       &lt;p&gt;\r\n       &lt;?php \r\n       \r\n       \r\n       \r\n       \r\n       ?&gt;&lt;/p&gt;\r\n       \r\n	&lt;/body&gt;\r\n&lt;/html&gt;</code></pre><p><br></p>', 1, 1),
	(60, 6, '认识PHP代码标识', '<h3>认识PHP代码标识：</h3><p>想在页面中编写PHP代码非常容易，如下面代码：&nbsp;</p><pre><code><span style="background-color: rgb(245, 245, 245);">&lt;?php</span></code><code><span style="color: inherit; font-size: inherit;">echo "想学习php吗？来Myschool网吧";</span></code><code>?&gt;</code></pre><p>就像你可以编写JavaScript脚本语言需要写在<code>&lt;script&gt;</code><code>&lt;/script &gt;</code>标签之间一样，你可以在页面中编写PHP代码写在<code>&lt;?php</code><code>?&gt;</code>标签之间，但注意后面的<code>?&gt;</code>是可以省略的。&nbsp;&nbsp;<br></p><p>你也可能把代码写在一行上噢！如下面的代码：</p><p>&nbsp;&nbsp;<span style="background-color: rgb(241, 241, 241); color: inherit; font-family: Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace; font-size: inherit; white-space: pre-wrap;">&lt;?php echo "想学习php吗？来Myschool网吧"; ?&gt;</span><br></p><p><br></p><p>&nbsp;<br></p>', 1, 2),
	(61, 7, 'HTML入门', '<h2>编辑 HTML</h2><p>在本教程中，我们使用纯文本编辑器来编辑 HTML。我们认为这是学习 HTML 的最佳方式。</p><p>然而，专业的 web 开发者常常对 Dreamweaver 或 FrontPage 这样的 HTML 编辑器情有独钟，而不是编写纯文本。</p><p><br></p><h2>.htm 还是 .html 文件后缀？</h2><p>当您保存 HTML 文件时，既可以使用 .htm 也可以使用 .html 文件后缀。我们在实例中使用 .htm。这只是长久以来形成的习惯而已，因为过去的很多软件只允许三个字母的文件后缀。</p><p>不过对于新的软件，使用 .html 完全没有问题。</p><pre><code><span style="background-color: rgb(245, 245, 245);">&lt;html&gt;</span></code><code>&lt;body&gt;\r\n&lt;h1&gt;我的第一个标题&lt;/h1&gt;\r\n&lt;p&gt;我的第一个段落。&lt;/p&gt;\r\n&lt;/body&gt;\r\n&lt;/html&gt;</code></pre><p><br></p>', 1, 1),
	(62, 8, 'ios入门', '<h2 id="2-ios开发入门">1. iOS开发入门</h2><h4 id="1-斯坦福白胡子老头ios8视频">(1) 斯坦福白胡子老头iOS8视频</h4><p><a href="http://open.163.com/special/opencourse/ios8.html" target="_blank">斯坦福大学公开课：iOS 8开发</a></p><p>这个公开课每个iOS版本都有，基本是用一个demo来讲解iOS开发，每个版本的demo都不一样，iOS7是用Objective-C的，我也是看完了才知道，但看iOS8的课程也是能同步用Objective-C完成demo的，两边的方法名称完全一样，只有语法的不同。</p><p>贴一下里面关于MVC模式的讲解</p><p><strong>MVC模式</strong></p><ol><li>Model与View不能通信：Model与UI完全独立，UI组件都是generic的，需要Controller为其翻译并格式化Model的信息用于显示。</li><li>Controller-&gt;View：View里的UI组件以outlet形式存在于Controller中。</li><li>View-&gt;Controller：Controller自己注册target，告诉View当有指定的action（如按钮点击）发生时，发送这个action给我这个target。View通过delegate将should、will、did等动作的响应交给Controller处理。View不拥有其显示的数据，它是通过data source（也算一种特殊的delegate）从Controller那里拿数据，而数据来自Model。</li><li>Model-&gt;Controller：Model将自己的属性变化通过广播发送给感兴趣的订阅者（一般是Controller），Notification &amp; KVO，然后Controller去Model中取新的数据。</li></ol><p><img src="file:///C:/Users/luciozhang/AppData/Local/YNote/data/weixinobU7VjoJYftPDEXuOEPwfBzEeNlY/8b38ebad99414a8abefb415f2557c0aa/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-10-04%20%E4%B8%8B%E5%8D%8812.32.18.png" alt="mvc" title=""></p><h4 id="2-疯狂ios讲义">(2) 《疯狂iOS讲义》</h4><p>看随书的源码可以快速了解各种控件的使用，以及图形、动画相关知识。</p><h2 id="3-阅读与思考"><a name="t2"></a>2. 阅读与思考</h2><h4><strong>Part 1 - 代码规范</strong></h4><h2 id="part-1-代码规范"><a name="t3"></a></h2><h3 id="1-代码风格"><a name="t4"></a>(1) 代码风格</h3><h5 id="round-1-raywenderlichcom官方代码风格指南">Round 1 - Raywenderlich.com官方代码风格指南 :]</h5><p><a href="https://github.com/raywenderlich/objective-c-style-guide" target="_blank">The official raywenderlich.com Objective-C style guide.</a></p><p>中文翻译：<a href="http://blog.it985.com/10771.html" target="_blank">http://blog.it985.com/10771.html</a></p><p>需要多注意里面一些细节的东西：</p><ol><li>copy和strong的选择：把一个对象赋值给一个属性变量，当这个对象变化了，如果希望属性变量变化就使用strong属性，如果希望属性变量不跟着变化，就是用copy属性。</li><li>推荐使用代码提示中宏定义的<code>NS_ENUM()</code>枚举模块来创建，它可以提供更严谨的类型检测和代码补完功能。</li><li>私有变更应该在类的私有类别中，不需要加<code>private</code>等词语来进行修饰。</li><li>私有类别可以在命名为<code>&lt;headerfile&gt;+Private.h</code>的文件里提供。</li><li><code>init</code>方法中返回值使用<code>instancetype</code>取代<code>id</code>作为返回。<a href="http://blog.it985.com/10771.html" target="_blank">[原因]</a></li><li>单例必须线程安全。</li><li>:]</li></ol><p><br></p>', 1, 1),
	(63, 9, '什么是数据库？', '<h2>什么是数据库？</h2><p>数据库（Database）是按照数据结构来组织、存储和管理数据的仓库，</p><p>每个数据库都有一个或多个不同的API用于创建，访问，管理，搜索和复制所保存的数据。</p><p>我们也可以将数据存储在文件中，但是在文件中读写数据速度相对较慢。</p><p>所以，现在我们使用关系型数据库管理系统（RDBMS）来存储和管理的大数据量。所谓的关系型数据库，是建立在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据。</p><p>RDBMS即关系数据库管理系统(Relational Database Management System)的特点：</p><ul><li>1.数据以表格的形式出现</li><li>2.每行为各种记录名称</li><li>3.每列为记录名称所对应的数据域</li><li>4.许多的行和列组成一张表单</li><li>5.若干的表单组成database<h2>Mysql数据库</h2><p>MySQL是一个关系型数据库管理系统，由瑞典MySQL AB公司开发，目前属于Oracle公司。MySQL是一种关联数据库管理系统，关联数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。</p><ul><li>Mysql是开源的，所以你不需要支付额外的费用。</li><li>Mysql支持大型的数据库。可以处理拥有上千万条记录的大型数据库。</li><li>MySQL使用标准的SQL数据语言形式。</li><li>Mysql可以允许于多个系统上，并且支持多种语言。这些编程语言包括C、C++、Python、Java、Perl、PHP、Eiffel、Ruby和Tcl等。</li><li>Mysql对PHP有很好的支持，PHP是目前最流行的Web开发语言。</li><li>MySQL支持大型数据库，支持5000万条记录的数据仓库，32位系统表文件最大可支持4GB，64位系统支持最大的表文件为8TB。</li><li>Mysql是可以定制的，采用了GPL协议，你可以修改源码来开发自己的Mysql系统。</li></ul></li></ul>', 1, 1),
	(64, 5, '课程介绍', '/upload/video/2018040408551710357.mp4', 1, 1),
	(65, 5, '环境搭建', '/upload/video/2018040408553813173.mp4', 1, 2),
	(66, 5, '常量', '/upload/video/2018040408555814744.mp4', 1, 3);
/*!40000 ALTER TABLE `courseitem` ENABLE KEYS */;

-- 导出  表 myschool.userinfo 结构
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE IF NOT EXISTS `userinfo` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(20) NOT NULL,
  `nickname` char(20) NOT NULL DEFAULT 'mySchool',
  `passwd` char(32) NOT NULL,
  `sex` tinyint(1) DEFAULT NULL COMMENT '男是0，女是1',
  `province` char(20) DEFAULT NULL,
  `city` char(20) DEFAULT NULL,
  `autograph` text COMMENT '个性签名',
  `photo` text COMMENT '照片',
  `lastLearn` int(11) DEFAULT NULL COMMENT '最后学习的课程ID',
  `role` tinyint(1) NOT NULL DEFAULT '0' COMMENT '角色，默认0是学生，1是教师',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1是正常,0是冻结',
  `position` char(50) DEFAULT NULL COMMENT '职位',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- 正在导出表  myschool.userinfo 的数据：~2 rows (大约)
DELETE FROM `userinfo`;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` (`uid`, `username`, `nickname`, `passwd`, `sex`, `province`, `city`, `autograph`, `photo`, `lastLearn`, `role`, `status`, `position`) VALUES
	(1, '17358624784', 'mySchool', 'e10adc3949ba59abbe56e057f20f883e', 0, '四川省', '成都市', '后台开发', 'images\\head.jpg', NULL, 0, 1, NULL),
	(2, '18328815322', 'jsd', 'e10adc3949ba59abbe56e057f20f883e', 0, '四川省', '达州市', '前端工程师，现就职于富途网络，负责前端方向技术演进、架构、工程化、组件化等事宜。 非常重视前端基础，相信基础是一切技术体系的基石。对web前端领域的技术和方向比较关注，喜欢研究前沿技术。', NULL, NULL, 1, 1, '前端开发工程师'),
	(3, '15025540470', 'hsaha', 'e10adc3949ba59abbe56e057f20f883e', 1, '重庆市', '永川区', '数据库是我的强项', NULL, NULL, 0, 0, NULL),
	(4, '18328810002', 'John', 'e10adc3949ba59abbe56e057f20f883e', 0, '四川省', '简阳市', '后台开发', NULL, NULL, 0, 1, NULL),
	(5, '18328810003', 'Tom', 'e10adc3949ba59abbe56e057f20f883e', 0, '四川省', '广元市', '后台开发', NULL, NULL, 0, 1, NULL),
	(6, '18328810004', '风云', 'e10adc3949ba59abbe56e057f20f883e', 1, '云南省', '贵州市', '后台开发', NULL, NULL, 0, 1, NULL),
	(7, '18328810005', '学不会', 'e10adc3949ba59abbe56e057f20f883e', 1, '江苏省', '南京市', '后台开发', NULL, NULL, 0, 1, NULL),
	(8, '18328810006', '还好', 'e10adc3949ba59abbe56e057f20f883e', 1, '四川省', '达州市', '后台开发', NULL, NULL, 0, 1, NULL),
	(11, '18328810006', '还好', 'e10adc3949ba59abbe56e057f20f883e', 1, '四川省', '达州市', '后台开发', NULL, NULL, 0, 1, NULL),
	(12, '18328810004', '风云', 'e10adc3949ba59abbe56e057f20f883e', 1, '云南省', '贵州市', '后台开发', NULL, NULL, 0, 1, NULL);
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
