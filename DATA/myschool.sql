-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.53-log - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.5.0.5196
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
  `status` tinyint(1) DEFAULT '1' COMMENT '0是已处理,1是待处理',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='教师申请表';

-- 正在导出表  myschool.application 的数据：~1 rows (大约)
DELETE FROM `application`;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` (`uid`, `realName`, `tel`, `reason`, `status`) VALUES
	(1, '蒋绍东', '18328815322', '加入慕课网,成为优秀的讲师', 1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户收藏课程表';

-- 正在导出表  myschool.collection 的数据：~0 rows (大约)
DELETE FROM `collection`;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='课程信息表';

-- 正在导出表  myschool.course 的数据：~0 rows (大约)
DELETE FROM `course`;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='课程章节';

-- 正在导出表  myschool.courseitem 的数据：~0 rows (大约)
DELETE FROM `courseitem`;
/*!40000 ALTER TABLE `courseitem` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- 正在导出表  myschool.userinfo 的数据：~0 rows (大约)
DELETE FROM `userinfo`;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
