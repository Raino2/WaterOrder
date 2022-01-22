/*
 Navicat Premium Data Transfer

 Source Server         : owos
 Source Server Type    : MySQL
 Source Server Version : 50735
 Source Host           : localhost:3306
 Source Schema         : water_order

 Target Server Type    : MySQL
 Target Server Version : 50735
 File Encoding         : 65001

 Date: 22/01/2022 12:27:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `uid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'uid(主键)',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '地址',
  `userUid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '用户标识',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收件人',
  `phone` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '手机号',
  `isCommon` tinyint(1) NOT NULL COMMENT '是否为常用地址 0为否 1为是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES (1, 'test1', '浙江省杭州市西湖区', 'administrator', '测试1', '13811112222', 1);
INSERT INTO `address` VALUES (2, 'test2', '浙江省杭州市西湖区', 'administrator1', '测试2', '15511112222', 1);
INSERT INTO `address` VALUES (3, 'test3', '浙江省温州市瓯海区茶山街道温州大学', 'administrator', '测试3', '13222223333', 0);
INSERT INTO `address` VALUES (4, 'test4', '北京市朝阳区某不知名胡同巷子', 'administrator', '测试4', '13766668888', 0);
INSERT INTO `address` VALUES (5, '6aa3ff210b154e45bafcf34e76ea170b', '江浙省 州杭市 湖西区 某不知名胡同巷子', '1bb7cb9af99141d098c41c9e48f48931', '瑞瑞瑞', '13867711111', 0);
INSERT INTO `address` VALUES (6, '3ebb17fb64b04b62ac2becd80e2dcd44', '浙江省杭州市测试区测试街道测试小区2幢3单元202', '1bb7cb9af99141d098c41c9e48f48931', '测试君', '13866667777', 0);
INSERT INTO `address` VALUES (7, '7c65870a6a3a4a819f5c2fbd67b7e9ec', '安徽省六安市测试镇哈哈哈街道快乐小区13幢1单元202', '1bb7cb9af99141d098c41c9e48f48931', '憨憨', '13622334455', 0);
INSERT INTO `address` VALUES (8, '4c4c4cb4effd499692c2930925df4ce4', '浙江省绍兴市柯桥区神奇小镇', '1bb7cb9af99141d098c41c9e48f48931', '小蜜蜂', '13811111111', 0);
INSERT INTO `address` VALUES (9, 'bb79de06f8304e008549aeca1a37071e', '浙江省绍兴市柯桥区神奇的小镇在哪里', '1bb7cb9af99141d098c41c9e48f48931', '小蜜蜂二号', '13811112222', 0);
INSERT INTO `address` VALUES (10, '3472425527e842e187ad8993acf1c265', '浙江省绍兴市柯桥区神奇的小镇在哪里', '1bb7cb9af99141d098c41c9e48f48931', '小蜜蜂二号', '13811112222', 1);
INSERT INTO `address` VALUES (11, '7b3bd93f7f4d4e6e94a2713d9332bc13', '懒得打地址了随便输一下', '1bb7cb9af99141d098c41c9e48f48931', '小蜜蜂三号', '11111111111', 0);
INSERT INTO `address` VALUES (12, '2cdf2104df334b1a803c9d06c6a083f7', '懒得打地址了随便输一下', '1bb7cb9af99141d098c41c9e48f48931', '小蜜蜂四号', '12345678912', 0);
INSERT INTO `address` VALUES (13, 'cce68853bc0e43628c28a16211db5196', '懒得打地址了随便输一下', '1bb7cb9af99141d098c41c9e48f48931', '小蜜蜂五号', '12345678912', 0);
INSERT INTO `address` VALUES (14, '75e432979377434cb1ba2e7c829353ae', '北京市紫禁城太和殿一楼', '1bb7cb9af99141d098c41c9e48f48931', 'Rui瑞', '12345678912', 0);
INSERT INTO `address` VALUES (15, '27f80abb781b4c3ea342478556a1592d', '北京市紫禁城太和殿一楼', '6fd04e1c9d3446dcb53e99fb67b4a49e', '测试王', '13867893323', 1);
INSERT INTO `address` VALUES (16, '12a2dcdf539e49a5b866acda92e484c4', '北京市紫禁城太和殿二楼', '6fd04e1c9d3446dcb53e99fb67b4a49e', '测试往后', '13867893324', 0);
INSERT INTO `address` VALUES (17, '2f42b2db0e2f4327b8d8281bb7df144e', '北京市紫禁城太和殿三楼', '6fd04e1c9d3446dcb53e99fb67b4a49e', '测试王子', '13867893326', 0);
INSERT INTO `address` VALUES (18, 'df2cbe3aed6c49ae80b7050fda428c83', '北京市紫禁城太和殿四楼', '6fd04e1c9d3446dcb53e99fb67b4a49e', '测试驸马', '13867823324', 0);
INSERT INTO `address` VALUES (19, '399705d6c80645e1a0a1228a9c5fb4f2', '北京市紫禁城太和殿五楼', '6fd04e1c9d3446dcb53e99fb67b4a49e', '测试公主', '13867893327', 0);
INSERT INTO `address` VALUES (20, 'b18f1e835b8445e491e0e9b6fe2f897c', '北京市紫禁城太和殿六楼', '6fd04e1c9d3446dcb53e99fb67b4a49e', '测试状元', '13867893333', 0);
INSERT INTO `address` VALUES (21, '4221ec3413ff4aaaab2c905ec109e811', '安徽省芜湖市XX镇', 'f47064e00c574d86a82a1e5720116c20', '芜湖大司马', '13862223324', 1);
INSERT INTO `address` VALUES (22, 'e7e2481904e94da99a9f201228ae75e6', '上海市杨浦区政立路485号', 'dcaf9d8bff974dd0b691ed09a0d0edea', '陈睿', '12345678912', 1);
INSERT INTO `address` VALUES (23, 'be7b1cb05a264c0aafde02ba8b04138c', '上海市杨浦区政立路200号', '8fbc92c8444c43a6a700643117a954de', '陈锐', '12345678912', 1);
INSERT INTO `address` VALUES (24, 'be80641b6b724da3b2cb084c6518ef6f', '北京市紫禁城太和殿三楼', 'b01689a773e14ca8bb347edd3e3509bb', '胡铭', '12345678912', 1);
INSERT INTO `address` VALUES (25, 'f67cffd5f75b4248ac86764b6dadd6cf', '浙江省温州市经济开发区XX路XX小区', '81ac5588f51e4478a0b5180b7f1749be', '涂bao', '13811111111', 1);

-- ----------------------------
-- Table structure for dispatch
-- ----------------------------
DROP TABLE IF EXISTS `dispatch`;
CREATE TABLE `dispatch`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '配送单id',
  `uid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '配送单uid [唯一标识]',
  `orderUid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '订单uid',
  `dispatcherUid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '配送员uid',
  `createAt` int(255) NOT NULL COMMENT '配送单创建时间 [时间戳]',
  `endAt` int(255) NULL DEFAULT NULL COMMENT '配送单完结时间 [时间戳]',
  `regionName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地区名称',
  `regionId` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '地区编号',
  `fee` decimal(10, 2) NULL DEFAULT NULL COMMENT '配送费',
  `status` int(1) NOT NULL COMMENT '2-已派发 3-配送中 4-已完结',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dispatch
-- ----------------------------
INSERT INTO `dispatch` VALUES (1, 'eb9db4500c9044819c756382de26d9b9', 'efe8a075be564ca0965cf3965a7d0cd3', '68fdc9ec975242cd86de94dc048af5b1', 1642015185, NULL, '紫禁城', '001', 5.00, 2);
INSERT INTO `dispatch` VALUES (4, '2299fe8a7ea94101b8e5a0c906b61d8b', '213ac8f5dd8d4ee796fd3db18aa989e8', '353ebfbdb78745378c47adb9f6438154', 1642689044, NULL, '浙江省杭州市西湖区', '002', 12.00, 2);
INSERT INTO `dispatch` VALUES (5, 'f1b191cfe4474a42b1d8ca305853fc3f', '7eeed036192c44a190d7756ed8a89b36', '11476893bc6240778d44f94e1406415e', 1642689650, 1642782335, '浙江省温州市瓯海区', '003', 0.00, 3);
INSERT INTO `dispatch` VALUES (6, '33cdb9981056465a95311eb3ada55552', '7badb171d8ef454e9c8f952ec3015bf7', '2c2d076a94f346809452914502a9d5e5', 1642689682, NULL, '浙江省温州市瓯海区茶山街道', '004', 0.00, 1);
INSERT INTO `dispatch` VALUES (7, 'a588cadb9df14666bf6fd17e4d274da8', 'e6e85fbeb7cc41a1aef02dbadfb98ec0', 'c71c9c138a70471580ec703db858962e', 1642689725, 1642782295, '浙江省温州市经开区', '010', 0.00, 3);
INSERT INTO `dispatch` VALUES (8, '32c567b696814ffcb5ef67e1e1ec8ba7', 'd0da23b2514c493e8832e51eb18c6c49', 'ea0ec7cead854b45824391acb70ead76', 1642689811, NULL, '浙江省温州市鹿城区', '005', 0.00, 1);
INSERT INTO `dispatch` VALUES (9, '86e14d97dafb4052918e5baacfa153c1', '24e63e96cd5d431b9c4c5e68293cf57e', '68fdc9ec975242cd86de94dc048af5b1', 1642689826, NULL, '紫禁城', '001', 0.00, 2);
INSERT INTO `dispatch` VALUES (10, 'bd925149f72f4c2394ee06a48e264a7a', 'cafc1b17fa22447db8e5b16c26b322f9', '353ebfbdb78745378c47adb9f6438154', 1642690083, NULL, '浙江省杭州市西湖区', '002', 0.00, 1);
INSERT INTO `dispatch` VALUES (11, '596683bd9f4849928d59e2fdf407a363', '285dcf38ea334ce5a59eab6d7fcc94c5', 'c71c9c138a70471580ec703db858962e', 1642690121, NULL, '浙江省温州市经开区', '010', 0.00, 2);
INSERT INTO `dispatch` VALUES (12, '4c2ccf812bc8430a8b76ebd341800ce5', '132935e1acec4de38b5f12b44ccbc215', '2c2d076a94f346809452914502a9d5e5', 1642690154, NULL, '浙江省温州市瓯海区茶山街道', '004', 0.00, 1);
INSERT INTO `dispatch` VALUES (13, 'fef13d5a6f80470d9689e1034f4225c3', '5040cc6ae4054076993c505248e2b16c', '12f9f3b52f2c4ce99769011283624a5d', 1642690218, NULL, '安徽省六安市', '007', 0.00, 1);
INSERT INTO `dispatch` VALUES (14, '2a3f478d5068463fb796ad76c637b6a2', '214f3e9f7dfb44f7bea798772b45955a', '4611e406b967471cb0fef9e1bc6f7dec', 1642695648, NULL, '英国乔斯达城堡', '013', 0.00, 1);
INSERT INTO `dispatch` VALUES (15, 'a48fdb8d397e49edacfc20c141bee7f4', '084866819a39489ab54913ff86dbcbe9', '11476893bc6240778d44f94e1406415e', 1642696304, NULL, '浙江省温州市瓯海区', '003', 30.00, 1);
INSERT INTO `dispatch` VALUES (16, '3cfac732e46d4908b5efee75fbd141f2', 'd4f38b8865cf499599cee9d98b1d88c3', '2c2d076a94f346809452914502a9d5e5', 1642696360, NULL, '浙江省温州市瓯海区茶山街道', '004', 14.00, 1);
INSERT INTO `dispatch` VALUES (17, '46a3c1ab3cf242eb9d3a6e1f5ffdfbe6', 'd437e2ca713f4d998d06d5dfc0a8e6c2', 'ea0ec7cead854b45824391acb70ead76', 1642772736, NULL, '浙江省温州市鹿城区', '005', 5.00, 1);
INSERT INTO `dispatch` VALUES (18, '2873ef872ff843eb864c5f452414de0a', '097254402cfe4bb5808eda21eaee0fbc', '353ebfbdb78745378c47adb9f6438154', 1642782312, NULL, '浙江省杭州市西湖区', '002', 3.00, 2);
INSERT INTO `dispatch` VALUES (19, '79f39db2d3d346afa663e7cdc4d3bc59', 'ab278389dd8049569066aa6bbd86049d', '12f9f3b52f2c4ce99769011283624a5d', 1642783778, 1642783823, '安徽省六安市', '007', 1.00, 3);
INSERT INTO `dispatch` VALUES (20, '831754833e81482591af71cb769c78c1', 'b68d297353a74b30a03e02860fa7fe48', '4611e406b967471cb0fef9e1bc6f7dec', 1642783843, NULL, '英国乔斯达城堡', '013', 0.00, 1);

-- ----------------------------
-- Table structure for dispatcher
-- ----------------------------
DROP TABLE IF EXISTS `dispatcher`;
CREATE TABLE `dispatcher`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id ',
  `uid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '配送员uid [唯一标识]',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '配送员姓名',
  `age` int(10) NOT NULL COMMENT '年龄',
  `workAge` int(10) NOT NULL COMMENT '工龄',
  `regionId` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '配送负责地区',
  `avatar` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '头像图片地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dispatcher
-- ----------------------------
INSERT INTO `dispatcher` VALUES (1, '68fdc9ec975242cd86de94dc048af5b1', '野良神夜斗', 100, 50, '001', 'images/avatar/OIP.jfif');
INSERT INTO `dispatcher` VALUES (3, '353ebfbdb78745378c47adb9f6438154', '小蜜蜂', 23, 3, '002', 'images/avatar/BOJI.png');
INSERT INTO `dispatcher` VALUES (4, '11476893bc6240778d44f94e1406415e', '张三', 33, 10, '003', NULL);
INSERT INTO `dispatcher` VALUES (5, 'ea0ec7cead854b45824391acb70ead76', '李四', 45, 15, '005', NULL);
INSERT INTO `dispatcher` VALUES (6, '2c2d076a94f346809452914502a9d5e5', '憨憨', 24, 5, '004', 'images/avatar/20211118072731695-400x400.jpeg');
INSERT INTO `dispatcher` VALUES (7, 'c71c9c138a70471580ec703db858962e', '涂某', 33, 10, '010', 'images/avatar/20211220055422507.jpg');
INSERT INTO `dispatcher` VALUES (8, '12f9f3b52f2c4ce99769011283624a5d', '王五', 60, 30, '007', NULL);
INSERT INTO `dispatcher` VALUES (9, '4611e406b967471cb0fef9e1bc6f7dec', '乔纳森·乔斯达', 88, 18, '013', 'images/avatar/R.jfif');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id 主键',
  `uid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '订单uid',
  `createAt` int(255) NOT NULL COMMENT '创建时间',
  `userUid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '用户uid',
  `sumPrice` decimal(10, 2) NOT NULL COMMENT '订单总金额',
  `count` int(11) NOT NULL COMMENT '商品数量',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '地址信息uid',
  `dispatcher` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '配送员uid',
  `dispatcherName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '配送员名称',
  `dispatcherFee` decimal(10, 2) NULL DEFAULT NULL COMMENT '配送费',
  `status` int(255) NOT NULL COMMENT '1未派发 2已派发 3配送中 4已完结',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (5, '4dae29d93a8c42929175f95afd9154d4', 1639401118, '1bb7cb9af99141d098c41c9e48f48931', 89.64, 8, '7c65870a6a3a4a819f5c2fbd67b7e9ec', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (6, 'b68d297353a74b30a03e02860fa7fe48', 1639401163, '1bb7cb9af99141d098c41c9e48f48931', 64.90, 5, '7b3bd93f7f4d4e6e94a2713d9332bc13', '4611e406b967471cb0fef9e1bc6f7dec', '乔纳森·乔斯达', 0.00, 1);
INSERT INTO `order` VALUES (7, '452811c4ebde4f6eb0234c076badf36a', 1639813081, '1bb7cb9af99141d098c41c9e48f48931', 49.99, 1, '7c65870a6a3a4a819f5c2fbd67b7e9ec', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (8, 'dc5a5d1d09524ef3a49124a43617664f', 1639813105, '1bb7cb9af99141d098c41c9e48f48931', 48.88, 1, '7c65870a6a3a4a819f5c2fbd67b7e9ec', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (9, '084866819a39489ab54913ff86dbcbe9', 1639813122, '1bb7cb9af99141d098c41c9e48f48931', 212.34, 8, '3472425527e842e187ad8993acf1c265', '11476893bc6240778d44f94e1406415e', '张三', 30.00, 1);
INSERT INTO `order` VALUES (10, '064cea619b7143baa16cda25868676ef', 1639813225, '1bb7cb9af99141d098c41c9e48f48931', 324.45, 18, '7c65870a6a3a4a819f5c2fbd67b7e9ec', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (11, 'cbceba97d5fe45c991d4216d304d521d', 1640514246, '1bb7cb9af99141d098c41c9e48f48931', 12.00, 1, 'bb79de06f8304e008549aeca1a37071e', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (12, 'e6c5fd319e1248ffa9b3d8d9be1351c4', 1640514256, '1bb7cb9af99141d098c41c9e48f48931', 81.36, 4, '7c65870a6a3a4a819f5c2fbd67b7e9ec', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (13, '9fa6e0ce54b64d8e9a38910d08eaf84a', 1640528131, '1bb7cb9af99141d098c41c9e48f48931', 49.99, 1, '7c65870a6a3a4a819f5c2fbd67b7e9ec', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (14, 'e42e7da9069c47c59d8babd36afec1d0', 1641035426, '1bb7cb9af99141d098c41c9e48f48931', 4.50, 1, '7c65870a6a3a4a819f5c2fbd67b7e9ec', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (15, '7613f103660747f3940db541c9561e0e', 1641035459, '1bb7cb9af99141d098c41c9e48f48931', 187.53, 12, '7c65870a6a3a4a819f5c2fbd67b7e9ec', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (16, '10d43dd14e9241e1a2ef7f54778944c1', 1641035488, '1bb7cb9af99141d098c41c9e48f48931', 13.99, 1, '7c65870a6a3a4a819f5c2fbd67b7e9ec', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (17, '132935e1acec4de38b5f12b44ccbc215', 1641385975, '1bb7cb9af99141d098c41c9e48f48931', 4.50, 1, '7c65870a6a3a4a819f5c2fbd67b7e9ec', '2c2d076a94f346809452914502a9d5e5', '憨憨', 0.00, 1);
INSERT INTO `order` VALUES (18, '61fd13a7e2194892a4ddb93d6d87c746', 1641386018, '1bb7cb9af99141d098c41c9e48f48931', 420.29, 24, '7b3bd93f7f4d4e6e94a2713d9332bc13', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (19, '5eb9d029d64e4d739cc5cbd9e4a10540', 1641386126, '1bb7cb9af99141d098c41c9e48f48931', 118.47, 4, '7c65870a6a3a4a819f5c2fbd67b7e9ec', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (20, '6f3c676343884e90abdd0eee87b2bb8f', 1641471930, '1bb7cb9af99141d098c41c9e48f48931', 41.75, 5, '3ebb17fb64b04b62ac2becd80e2dcd44', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (21, '097254402cfe4bb5808eda21eaee0fbc', 1641472236, '1bb7cb9af99141d098c41c9e48f48931', 178.99, 10, '7c65870a6a3a4a819f5c2fbd67b7e9ec', '353ebfbdb78745378c47adb9f6438154', '小蜜蜂', 3.00, 2);
INSERT INTO `order` VALUES (22, 'ad20378a347d42228d52277469a68684', 1641474971, '1bb7cb9af99141d098c41c9e48f48931', 4.50, 1, '7c65870a6a3a4a819f5c2fbd67b7e9ec', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (23, '1e92c98b22cb46ae886c61ec1d4133d4', 1641482018, '1bb7cb9af99141d098c41c9e48f48931', 13.99, 1, '6aa3ff210b154e45bafcf34e76ea170b', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (24, '5040cc6ae4054076993c505248e2b16c', 1641482039, '1bb7cb9af99141d098c41c9e48f48931', 13.99, 1, '6aa3ff210b154e45bafcf34e76ea170b', '12f9f3b52f2c4ce99769011283624a5d', '王五', 0.00, 1);
INSERT INTO `order` VALUES (25, 'd89f3e1ea6c54c34af5cadfdf7849f6d', 1641482825, '1bb7cb9af99141d098c41c9e48f48931', 13.99, 1, '6aa3ff210b154e45bafcf34e76ea170b', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (30, '2c96424a1587477c80f70efd364d2b17', 1641483562, '1bb7cb9af99141d098c41c9e48f48931', 5.88, 1, '6aa3ff210b154e45bafcf34e76ea170b', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (31, '285dcf38ea334ce5a59eab6d7fcc94c5', 1641483572, '1bb7cb9af99141d098c41c9e48f48931', 48.88, 1, '6aa3ff210b154e45bafcf34e76ea170b', 'c71c9c138a70471580ec703db858962e', '涂某', 0.00, 2);
INSERT INTO `order` VALUES (32, 'd437e2ca713f4d998d06d5dfc0a8e6c2', 1641483954, '1bb7cb9af99141d098c41c9e48f48931', 44.40, 5, '6aa3ff210b154e45bafcf34e76ea170b', 'ea0ec7cead854b45824391acb70ead76', '李四', 5.00, 1);
INSERT INTO `order` VALUES (33, '214f3e9f7dfb44f7bea798772b45955a', 1641572587, '1bb7cb9af99141d098c41c9e48f48931', 238.78, 9, '75e432979377434cb1ba2e7c829353ae', '4611e406b967471cb0fef9e1bc6f7dec', '乔纳森·乔斯达', 0.00, 1);
INSERT INTO `order` VALUES (34, '3aa4507d75224904aa66e1d0245cdf55', 1641613997, '1bb7cb9af99141d098c41c9e48f48931', 90.70, 4, '75e432979377434cb1ba2e7c829353ae', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (35, '8466c3f469cb4679b3f7a2f5214ce2b1', 1641614061, 'b01689a773e14ca8bb347edd3e3509bb', 4.50, 1, 'be80641b6b724da3b2cb084c6518ef6f', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (36, 'd4f38b8865cf499599cee9d98b1d88c3', 1641660560, 'b01689a773e14ca8bb347edd3e3509bb', 91.01, 6, 'be80641b6b724da3b2cb084c6518ef6f', '2c2d076a94f346809452914502a9d5e5', '憨憨', 14.00, 1);
INSERT INTO `order` VALUES (37, '784839181f1a4b4daa0559e35cf1fee0', 1641731327, '6fd04e1c9d3446dcb53e99fb67b4a49e', 221.79, 14, '399705d6c80645e1a0a1228a9c5fb4f2', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (38, 'efe8a075be564ca0965cf3965a7d0cd3', 1641905185, '6fd04e1c9d3446dcb53e99fb67b4a49e', 124.87, 9, 'df2cbe3aed6c49ae80b7050fda428c83', '68fdc9ec975242cd86de94dc048af5b1', '野良神夜斗', 5.00, 2);
INSERT INTO `order` VALUES (39, '0be172ad3d544ece867ffab2efbe14ea', 1641992485, '6fd04e1c9d3446dcb53e99fb67b4a49e', 4.50, 1, '27f80abb781b4c3ea342478556a1592d', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (40, 'cafc1b17fa22447db8e5b16c26b322f9', 1642234354, '6fd04e1c9d3446dcb53e99fb67b4a49e', 13.99, 1, '27f80abb781b4c3ea342478556a1592d', '353ebfbdb78745378c47adb9f6438154', '小蜜蜂', 0.00, 1);
INSERT INTO `order` VALUES (41, '24e63e96cd5d431b9c4c5e68293cf57e', 1642312106, '6fd04e1c9d3446dcb53e99fb67b4a49e', 5.00, 1, '27f80abb781b4c3ea342478556a1592d', '68fdc9ec975242cd86de94dc048af5b1', '野良神夜斗', 0.00, 2);
INSERT INTO `order` VALUES (42, 'd0da23b2514c493e8832e51eb18c6c49', 1642345958, '6fd04e1c9d3446dcb53e99fb67b4a49e', 71.70, 3, '27f80abb781b4c3ea342478556a1592d', 'ea0ec7cead854b45824391acb70ead76', '李四', 0.00, 1);
INSERT INTO `order` VALUES (43, 'e6e85fbeb7cc41a1aef02dbadfb98ec0', 1642424249, '6fd04e1c9d3446dcb53e99fb67b4a49e', 57.38, 4, '27f80abb781b4c3ea342478556a1592d', 'c71c9c138a70471580ec703db858962e', '涂某', 0.00, 3);
INSERT INTO `order` VALUES (44, '7badb171d8ef454e9c8f952ec3015bf7', 1642424256, '6fd04e1c9d3446dcb53e99fb67b4a49e', 8.88, 1, '399705d6c80645e1a0a1228a9c5fb4f2', '2c2d076a94f346809452914502a9d5e5', '憨憨', 0.00, 1);
INSERT INTO `order` VALUES (45, '7eeed036192c44a190d7756ed8a89b36', 1642510027, '6fd04e1c9d3446dcb53e99fb67b4a49e', 13.99, 1, '399705d6c80645e1a0a1228a9c5fb4f2', '11476893bc6240778d44f94e1406415e', '张三', 0.00, 3);
INSERT INTO `order` VALUES (46, '213ac8f5dd8d4ee796fd3db18aa989e8', 1642682108, '6fd04e1c9d3446dcb53e99fb67b4a49e', 13.99, 1, 'b18f1e835b8445e491e0e9b6fe2f897c', '353ebfbdb78745378c47adb9f6438154', '小蜜蜂', 12.00, 2);
INSERT INTO `order` VALUES (47, 'ab82ff1791fc461ba9cae8100cb1b93f', 1642773039, '6fd04e1c9d3446dcb53e99fb67b4a49e', 4.50, 1, '27f80abb781b4c3ea342478556a1592d', NULL, NULL, NULL, 0);
INSERT INTO `order` VALUES (48, 'ab278389dd8049569066aa6bbd86049d', 1642775887, '6fd04e1c9d3446dcb53e99fb67b4a49e', 18.76, 2, '27f80abb781b4c3ea342478556a1592d', '12f9f3b52f2c4ce99769011283624a5d', '王五', 1.00, 3);

-- ----------------------------
-- Table structure for order_detail
-- ----------------------------
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id 主键',
  `orderUid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '关联订单Uid',
  `productUid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '商品Uid',
  `count` int(11) NULL DEFAULT NULL COMMENT '数量',
  `sumPrice` decimal(10, 2) NULL DEFAULT NULL COMMENT '总价',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 216 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_detail
-- ----------------------------
INSERT INTO `order_detail` VALUES (76, '4dae29d93a8c42929175f95afd9154d4', 'bdcec8a905224ce78896500239ab2ff3', 1, 5.00);
INSERT INTO `order_detail` VALUES (77, '4dae29d93a8c42929175f95afd9154d4', 'd67df1ec1bbd4b14820195b82e1fa6d9', 1, 12.00);
INSERT INTO `order_detail` VALUES (78, '4dae29d93a8c42929175f95afd9154d4', 'cbe69dee1bf24d39b1f22afb73740c97', 2, 24.00);
INSERT INTO `order_detail` VALUES (79, '4dae29d93a8c42929175f95afd9154d4', 'e26bc4f201744b578bf448c36657bdc8', 1, 22.00);
INSERT INTO `order_detail` VALUES (80, '4dae29d93a8c42929175f95afd9154d4', 'da932dfd0bc548a5ba8249c154d8e3fe', 3, 26.64);
INSERT INTO `order_detail` VALUES (81, 'b68d297353a74b30a03e02860fa7fe48', 'bdcec8a905224ce78896500239ab2ff3', 3, 15.00);
INSERT INTO `order_detail` VALUES (82, 'b68d297353a74b30a03e02860fa7fe48', 'cbe69dee1bf24d39b1f22afb73740c97', 1, 12.00);
INSERT INTO `order_detail` VALUES (83, 'b68d297353a74b30a03e02860fa7fe48', '40965362233d4b3f967907f5eb742908', 1, 37.90);
INSERT INTO `order_detail` VALUES (87, '452811c4ebde4f6eb0234c076badf36a', '1891ba85bcf04582b79d42dfda536a5a', 1, 49.99);
INSERT INTO `order_detail` VALUES (88, 'dc5a5d1d09524ef3a49124a43617664f', '1b3c829031624d31ae30cd255c484783', 1, 48.88);
INSERT INTO `order_detail` VALUES (89, '084866819a39489ab54913ff86dbcbe9', '1b3c829031624d31ae30cd255c484783', 2, 97.76);
INSERT INTO `order_detail` VALUES (90, '084866819a39489ab54913ff86dbcbe9', 'b59b0f2b01514b61b4c4b78d465ffe73', 1, 8.88);
INSERT INTO `order_detail` VALUES (91, '084866819a39489ab54913ff86dbcbe9', 'f3bb1f2a69eb4989b110b8768b7d3bd6', 1, 12.00);
INSERT INTO `order_detail` VALUES (92, '084866819a39489ab54913ff86dbcbe9', 'bdcec8a905224ce78896500239ab2ff3', 1, 5.00);
INSERT INTO `order_detail` VALUES (93, '084866819a39489ab54913ff86dbcbe9', '40965362233d4b3f967907f5eb742908', 1, 37.90);
INSERT INTO `order_detail` VALUES (94, '084866819a39489ab54913ff86dbcbe9', 'b1fda782c3fb4e4cb03613abd964d97f', 1, 28.80);
INSERT INTO `order_detail` VALUES (95, '084866819a39489ab54913ff86dbcbe9', '3491498096bf47a8b2c3f07f4f6483ba', 1, 22.00);
INSERT INTO `order_detail` VALUES (96, '064cea619b7143baa16cda25868676ef', 'b1fda782c3fb4e4cb03613abd964d97f', 1, 28.80);
INSERT INTO `order_detail` VALUES (97, '064cea619b7143baa16cda25868676ef', '40965362233d4b3f967907f5eb742908', 1, 37.90);
INSERT INTO `order_detail` VALUES (98, '064cea619b7143baa16cda25868676ef', '3491498096bf47a8b2c3f07f4f6483ba', 1, 22.00);
INSERT INTO `order_detail` VALUES (99, '064cea619b7143baa16cda25868676ef', 'bdcec8a905224ce78896500239ab2ff3', 1, 5.00);
INSERT INTO `order_detail` VALUES (100, '064cea619b7143baa16cda25868676ef', 'cbe69dee1bf24d39b1f22afb73740c97', 1, 12.00);
INSERT INTO `order_detail` VALUES (101, '064cea619b7143baa16cda25868676ef', 'd67df1ec1bbd4b14820195b82e1fa6d9', 1, 12.00);
INSERT INTO `order_detail` VALUES (102, '064cea619b7143baa16cda25868676ef', 'e26bc4f201744b578bf448c36657bdc8', 1, 22.00);
INSERT INTO `order_detail` VALUES (103, '064cea619b7143baa16cda25868676ef', 'f3bb1f2a69eb4989b110b8768b7d3bd6', 1, 12.00);
INSERT INTO `order_detail` VALUES (104, '064cea619b7143baa16cda25868676ef', '482cc15ccaf84dbda10a5b6d8ce72788', 1, 14.99);
INSERT INTO `order_detail` VALUES (105, '064cea619b7143baa16cda25868676ef', '7ee6c84a312e4c23bfecf59b919058f3', 1, 8.88);
INSERT INTO `order_detail` VALUES (106, '064cea619b7143baa16cda25868676ef', '408302c2786147769c95550e33e9b0cf', 1, 9.99);
INSERT INTO `order_detail` VALUES (107, '064cea619b7143baa16cda25868676ef', 'b59b0f2b01514b61b4c4b78d465ffe73', 1, 8.88);
INSERT INTO `order_detail` VALUES (108, '064cea619b7143baa16cda25868676ef', 'da932dfd0bc548a5ba8249c154d8e3fe', 1, 8.88);
INSERT INTO `order_detail` VALUES (109, '064cea619b7143baa16cda25868676ef', 'a05d62deee3d40c8b9ff978e9b97c298', 1, 12.88);
INSERT INTO `order_detail` VALUES (110, '064cea619b7143baa16cda25868676ef', 'b85d0512ea73414782a72a25e79fe8c9', 1, 5.88);
INSERT INTO `order_detail` VALUES (111, '064cea619b7143baa16cda25868676ef', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 3.50);
INSERT INTO `order_detail` VALUES (112, '064cea619b7143baa16cda25868676ef', '1891ba85bcf04582b79d42dfda536a5a', 1, 49.99);
INSERT INTO `order_detail` VALUES (113, '064cea619b7143baa16cda25868676ef', '1b3c829031624d31ae30cd255c484783', 1, 48.88);
INSERT INTO `order_detail` VALUES (114, 'cbceba97d5fe45c991d4216d304d521d', 'd67df1ec1bbd4b14820195b82e1fa6d9', 1, 12.00);
INSERT INTO `order_detail` VALUES (115, 'e6c5fd319e1248ffa9b3d8d9be1351c4', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (116, 'e6c5fd319e1248ffa9b3d8d9be1351c4', '1b3c829031624d31ae30cd255c484783', 1, 48.88);
INSERT INTO `order_detail` VALUES (117, 'e6c5fd319e1248ffa9b3d8d9be1351c4', '706c60e186774f46b09a57c24b9910ce', 2, 27.98);
INSERT INTO `order_detail` VALUES (118, '9fa6e0ce54b64d8e9a38910d08eaf84a', '1891ba85bcf04582b79d42dfda536a5a', 1, 49.99);
INSERT INTO `order_detail` VALUES (119, 'e42e7da9069c47c59d8babd36afec1d0', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (120, '7613f103660747f3940db541c9561e0e', '1891ba85bcf04582b79d42dfda536a5a', 1, 49.99);
INSERT INTO `order_detail` VALUES (121, '7613f103660747f3940db541c9561e0e', 'b85d0512ea73414782a72a25e79fe8c9', 1, 5.88);
INSERT INTO `order_detail` VALUES (122, '7613f103660747f3940db541c9561e0e', '706c60e186774f46b09a57c24b9910ce', 1, 13.99);
INSERT INTO `order_detail` VALUES (123, '7613f103660747f3940db541c9561e0e', '482cc15ccaf84dbda10a5b6d8ce72788', 1, 14.99);
INSERT INTO `order_detail` VALUES (124, '7613f103660747f3940db541c9561e0e', 'b59b0f2b01514b61b4c4b78d465ffe73', 1, 8.88);
INSERT INTO `order_detail` VALUES (125, '7613f103660747f3940db541c9561e0e', 'd67df1ec1bbd4b14820195b82e1fa6d9', 2, 24.00);
INSERT INTO `order_detail` VALUES (126, '7613f103660747f3940db541c9561e0e', 'cbe69dee1bf24d39b1f22afb73740c97', 3, 36.00);
INSERT INTO `order_detail` VALUES (127, '7613f103660747f3940db541c9561e0e', 'bdcec8a905224ce78896500239ab2ff3', 1, 5.00);
INSERT INTO `order_detail` VALUES (128, '7613f103660747f3940db541c9561e0e', 'b1fda782c3fb4e4cb03613abd964d97f', 1, 28.80);
INSERT INTO `order_detail` VALUES (129, '10d43dd14e9241e1a2ef7f54778944c1', '706c60e186774f46b09a57c24b9910ce', 1, 13.99);
INSERT INTO `order_detail` VALUES (130, '132935e1acec4de38b5f12b44ccbc215', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (131, '61fd13a7e2194892a4ddb93d6d87c746', '1b3c829031624d31ae30cd255c484783', 1, 48.88);
INSERT INTO `order_detail` VALUES (132, '61fd13a7e2194892a4ddb93d6d87c746', '1891ba85bcf04582b79d42dfda536a5a', 1, 49.99);
INSERT INTO `order_detail` VALUES (133, '61fd13a7e2194892a4ddb93d6d87c746', '408302c2786147769c95550e33e9b0cf', 1, 9.99);
INSERT INTO `order_detail` VALUES (134, '61fd13a7e2194892a4ddb93d6d87c746', 'b59b0f2b01514b61b4c4b78d465ffe73', 3, 26.64);
INSERT INTO `order_detail` VALUES (135, '61fd13a7e2194892a4ddb93d6d87c746', '482cc15ccaf84dbda10a5b6d8ce72788', 2, 29.98);
INSERT INTO `order_detail` VALUES (136, '61fd13a7e2194892a4ddb93d6d87c746', 'f3bb1f2a69eb4989b110b8768b7d3bd6', 1, 12.00);
INSERT INTO `order_detail` VALUES (137, '61fd13a7e2194892a4ddb93d6d87c746', '3491498096bf47a8b2c3f07f4f6483ba', 2, 44.00);
INSERT INTO `order_detail` VALUES (138, '61fd13a7e2194892a4ddb93d6d87c746', 'bdcec8a905224ce78896500239ab2ff3', 3, 15.00);
INSERT INTO `order_detail` VALUES (139, '61fd13a7e2194892a4ddb93d6d87c746', 'b1fda782c3fb4e4cb03613abd964d97f', 4, 115.20);
INSERT INTO `order_detail` VALUES (140, '61fd13a7e2194892a4ddb93d6d87c746', 'da932dfd0bc548a5ba8249c154d8e3fe', 3, 26.64);
INSERT INTO `order_detail` VALUES (141, '61fd13a7e2194892a4ddb93d6d87c746', '706c60e186774f46b09a57c24b9910ce', 3, 41.97);
INSERT INTO `order_detail` VALUES (142, '5eb9d029d64e4d739cc5cbd9e4a10540', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (143, '5eb9d029d64e4d739cc5cbd9e4a10540', '1891ba85bcf04582b79d42dfda536a5a', 2, 99.98);
INSERT INTO `order_detail` VALUES (144, '5eb9d029d64e4d739cc5cbd9e4a10540', '706c60e186774f46b09a57c24b9910ce', 1, 13.99);
INSERT INTO `order_detail` VALUES (145, '6f3c676343884e90abdd0eee87b2bb8f', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 2, 9.00);
INSERT INTO `order_detail` VALUES (146, '6f3c676343884e90abdd0eee87b2bb8f', 'da932dfd0bc548a5ba8249c154d8e3fe', 1, 8.88);
INSERT INTO `order_detail` VALUES (147, '6f3c676343884e90abdd0eee87b2bb8f', '7ee6c84a312e4c23bfecf59b919058f3', 1, 8.88);
INSERT INTO `order_detail` VALUES (148, '6f3c676343884e90abdd0eee87b2bb8f', '482cc15ccaf84dbda10a5b6d8ce72788', 1, 14.99);
INSERT INTO `order_detail` VALUES (149, '097254402cfe4bb5808eda21eaee0fbc', '706c60e186774f46b09a57c24b9910ce', 1, 13.99);
INSERT INTO `order_detail` VALUES (150, '097254402cfe4bb5808eda21eaee0fbc', '1b3c829031624d31ae30cd255c484783', 1, 48.88);
INSERT INTO `order_detail` VALUES (151, '097254402cfe4bb5808eda21eaee0fbc', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (152, '097254402cfe4bb5808eda21eaee0fbc', 'b85d0512ea73414782a72a25e79fe8c9', 1, 5.88);
INSERT INTO `order_detail` VALUES (153, '097254402cfe4bb5808eda21eaee0fbc', '1891ba85bcf04582b79d42dfda536a5a', 1, 49.99);
INSERT INTO `order_detail` VALUES (154, '097254402cfe4bb5808eda21eaee0fbc', 'a05d62deee3d40c8b9ff978e9b97c298', 1, 12.88);
INSERT INTO `order_detail` VALUES (155, '097254402cfe4bb5808eda21eaee0fbc', '408302c2786147769c95550e33e9b0cf', 1, 9.99);
INSERT INTO `order_detail` VALUES (156, '097254402cfe4bb5808eda21eaee0fbc', '7ee6c84a312e4c23bfecf59b919058f3', 1, 8.88);
INSERT INTO `order_detail` VALUES (157, '097254402cfe4bb5808eda21eaee0fbc', 'd67df1ec1bbd4b14820195b82e1fa6d9', 2, 24.00);
INSERT INTO `order_detail` VALUES (158, 'ad20378a347d42228d52277469a68684', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (159, '1e92c98b22cb46ae886c61ec1d4133d4', '706c60e186774f46b09a57c24b9910ce', 1, 13.99);
INSERT INTO `order_detail` VALUES (160, '5040cc6ae4054076993c505248e2b16c', '706c60e186774f46b09a57c24b9910ce', 1, 13.99);
INSERT INTO `order_detail` VALUES (161, 'd89f3e1ea6c54c34af5cadfdf7849f6d', '706c60e186774f46b09a57c24b9910ce', 1, 13.99);
INSERT INTO `order_detail` VALUES (166, '2c96424a1587477c80f70efd364d2b17', 'b85d0512ea73414782a72a25e79fe8c9', 1, 5.88);
INSERT INTO `order_detail` VALUES (167, '285dcf38ea334ce5a59eab6d7fcc94c5', '1b3c829031624d31ae30cd255c484783', 1, 48.88);
INSERT INTO `order_detail` VALUES (168, 'd437e2ca713f4d998d06d5dfc0a8e6c2', 'b59b0f2b01514b61b4c4b78d465ffe73', 5, 44.40);
INSERT INTO `order_detail` VALUES (169, '214f3e9f7dfb44f7bea798772b45955a', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (170, '214f3e9f7dfb44f7bea798772b45955a', '1b3c829031624d31ae30cd255c484783', 4, 195.52);
INSERT INTO `order_detail` VALUES (171, '214f3e9f7dfb44f7bea798772b45955a', 'b85d0512ea73414782a72a25e79fe8c9', 1, 5.88);
INSERT INTO `order_detail` VALUES (172, '214f3e9f7dfb44f7bea798772b45955a', '7ee6c84a312e4c23bfecf59b919058f3', 1, 8.88);
INSERT INTO `order_detail` VALUES (173, '214f3e9f7dfb44f7bea798772b45955a', 'f3bb1f2a69eb4989b110b8768b7d3bd6', 2, 24.00);
INSERT INTO `order_detail` VALUES (174, '3aa4507d75224904aa66e1d0245cdf55', 'b1fda782c3fb4e4cb03613abd964d97f', 1, 28.80);
INSERT INTO `order_detail` VALUES (175, '3aa4507d75224904aa66e1d0245cdf55', '40965362233d4b3f967907f5eb742908', 1, 37.90);
INSERT INTO `order_detail` VALUES (176, '3aa4507d75224904aa66e1d0245cdf55', 'cbe69dee1bf24d39b1f22afb73740c97', 2, 24.00);
INSERT INTO `order_detail` VALUES (178, '8466c3f469cb4679b3f7a2f5214ce2b1', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (179, 'd4f38b8865cf499599cee9d98b1d88c3', '1891ba85bcf04582b79d42dfda536a5a', 1, 49.99);
INSERT INTO `order_detail` VALUES (180, 'd4f38b8865cf499599cee9d98b1d88c3', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (181, 'd4f38b8865cf499599cee9d98b1d88c3', 'b85d0512ea73414782a72a25e79fe8c9', 1, 5.88);
INSERT INTO `order_detail` VALUES (182, 'd4f38b8865cf499599cee9d98b1d88c3', 'a05d62deee3d40c8b9ff978e9b97c298', 1, 12.88);
INSERT INTO `order_detail` VALUES (183, 'd4f38b8865cf499599cee9d98b1d88c3', '7ee6c84a312e4c23bfecf59b919058f3', 1, 8.88);
INSERT INTO `order_detail` VALUES (184, 'd4f38b8865cf499599cee9d98b1d88c3', 'b59b0f2b01514b61b4c4b78d465ffe73', 1, 8.88);
INSERT INTO `order_detail` VALUES (185, '784839181f1a4b4daa0559e35cf1fee0', '706c60e186774f46b09a57c24b9910ce', 1, 13.99);
INSERT INTO `order_detail` VALUES (186, '784839181f1a4b4daa0559e35cf1fee0', 'b59b0f2b01514b61b4c4b78d465ffe73', 1, 8.88);
INSERT INTO `order_detail` VALUES (187, '784839181f1a4b4daa0559e35cf1fee0', 'e26bc4f201744b578bf448c36657bdc8', 1, 22.00);
INSERT INTO `order_detail` VALUES (188, '784839181f1a4b4daa0559e35cf1fee0', 'bdcec8a905224ce78896500239ab2ff3', 1, 5.00);
INSERT INTO `order_detail` VALUES (189, '784839181f1a4b4daa0559e35cf1fee0', 'b1fda782c3fb4e4cb03613abd964d97f', 1, 28.80);
INSERT INTO `order_detail` VALUES (190, '784839181f1a4b4daa0559e35cf1fee0', 'cbe69dee1bf24d39b1f22afb73740c97', 1, 12.00);
INSERT INTO `order_detail` VALUES (191, '784839181f1a4b4daa0559e35cf1fee0', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 3, 13.50);
INSERT INTO `order_detail` VALUES (192, '784839181f1a4b4daa0559e35cf1fee0', '1891ba85bcf04582b79d42dfda536a5a', 2, 99.98);
INSERT INTO `order_detail` VALUES (193, '784839181f1a4b4daa0559e35cf1fee0', 'b85d0512ea73414782a72a25e79fe8c9', 3, 17.64);
INSERT INTO `order_detail` VALUES (194, 'efe8a075be564ca0965cf3965a7d0cd3', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (195, 'efe8a075be564ca0965cf3965a7d0cd3', '706c60e186774f46b09a57c24b9910ce', 1, 13.99);
INSERT INTO `order_detail` VALUES (196, 'efe8a075be564ca0965cf3965a7d0cd3', '1891ba85bcf04582b79d42dfda536a5a', 1, 49.99);
INSERT INTO `order_detail` VALUES (197, 'efe8a075be564ca0965cf3965a7d0cd3', 'b85d0512ea73414782a72a25e79fe8c9', 1, 5.88);
INSERT INTO `order_detail` VALUES (198, 'efe8a075be564ca0965cf3965a7d0cd3', '7ee6c84a312e4c23bfecf59b919058f3', 3, 26.64);
INSERT INTO `order_detail` VALUES (199, 'efe8a075be564ca0965cf3965a7d0cd3', '482cc15ccaf84dbda10a5b6d8ce72788', 1, 14.99);
INSERT INTO `order_detail` VALUES (200, 'efe8a075be564ca0965cf3965a7d0cd3', 'b59b0f2b01514b61b4c4b78d465ffe73', 1, 8.88);
INSERT INTO `order_detail` VALUES (201, '0be172ad3d544ece867ffab2efbe14ea', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (202, 'cafc1b17fa22447db8e5b16c26b322f9', '706c60e186774f46b09a57c24b9910ce', 1, 13.99);
INSERT INTO `order_detail` VALUES (203, '24e63e96cd5d431b9c4c5e68293cf57e', 'bdcec8a905224ce78896500239ab2ff3', 1, 5.00);
INSERT INTO `order_detail` VALUES (204, 'd0da23b2514c493e8832e51eb18c6c49', 'bdcec8a905224ce78896500239ab2ff3', 1, 5.00);
INSERT INTO `order_detail` VALUES (205, 'd0da23b2514c493e8832e51eb18c6c49', 'b1fda782c3fb4e4cb03613abd964d97f', 1, 28.80);
INSERT INTO `order_detail` VALUES (206, 'd0da23b2514c493e8832e51eb18c6c49', '40965362233d4b3f967907f5eb742908', 1, 37.90);
INSERT INTO `order_detail` VALUES (207, 'e6e85fbeb7cc41a1aef02dbadfb98ec0', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (208, 'e6e85fbeb7cc41a1aef02dbadfb98ec0', 'e26bc4f201744b578bf448c36657bdc8', 2, 44.00);
INSERT INTO `order_detail` VALUES (209, 'e6e85fbeb7cc41a1aef02dbadfb98ec0', 'b59b0f2b01514b61b4c4b78d465ffe73', 1, 8.88);
INSERT INTO `order_detail` VALUES (210, '7badb171d8ef454e9c8f952ec3015bf7', 'b59b0f2b01514b61b4c4b78d465ffe73', 1, 8.88);
INSERT INTO `order_detail` VALUES (211, '7eeed036192c44a190d7756ed8a89b36', '706c60e186774f46b09a57c24b9910ce', 1, 13.99);
INSERT INTO `order_detail` VALUES (212, '213ac8f5dd8d4ee796fd3db18aa989e8', '706c60e186774f46b09a57c24b9910ce', 1, 13.99);
INSERT INTO `order_detail` VALUES (213, 'ab82ff1791fc461ba9cae8100cb1b93f', 'fd6d6e8db6ff47bc97515f833d2ee7b9', 1, 4.50);
INSERT INTO `order_detail` VALUES (214, 'ab278389dd8049569066aa6bbd86049d', 'b85d0512ea73414782a72a25e79fe8c9', 1, 5.88);
INSERT INTO `order_detail` VALUES (215, 'ab278389dd8049569066aa6bbd86049d', 'a05d62deee3d40c8b9ff978e9b97c298', 1, 12.88);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id(排序)',
  `uid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'uid',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `isDisabled` tinyint(4) NOT NULL COMMENT '是否禁止 1禁止 0非禁止\r\n  用于控制是否上架',
  `price` decimal(10, 2) NOT NULL COMMENT '价格',
  `isMPS` tinyint(4) NOT NULL COMMENT '是否免配送',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片链接',
  `inventory` int(10) NOT NULL COMMENT '库存',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品介绍',
  `like` int(255) NULL DEFAULT NULL COMMENT '喜欢数',
  `rate` decimal(5, 1) NULL DEFAULT NULL COMMENT '评分',
  `rateCount` decimal(10, 0) NULL DEFAULT NULL COMMENT '评分人数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 76 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, '3491498096bf47a8b2c3f07f4f6483ba', '雀巢优活双桶装爆款', 0, 22.00, 1, 'images/products/pro1.jpg', 100, '双十一特价，两桶只需22元，超级爆款产品，预购从速！', 52, 4.5, 45);
INSERT INTO `product` VALUES (2, '40965362233d4b3f967907f5eb742908', '私人定制饮水机专用饮用水促销', 0, 37.90, 1, 'images/products/5Ldiscount.jpg', 54, '免运费，无接触配送，疫情在家的不二之选', 44, 4.0, 63);
INSERT INTO `product` VALUES (3, '62daab3a5a2841f4b16c8feb8c1f8c2b', '奥古特百年经典一世传奇啤酒', 1, 99.00, 1, 'images/products/aogute.png', 45, '奥古特1903啤酒，小麦香气四溢，酒精度数适宜，高端大气上档次，送人自饮皆可', 88, 5.0, 19);
INSERT INTO `product` VALUES (4, 'adef503c571f49ccad9f3d3bfcce1c81', '山楂鲜果两件8折两箱装', 1, 88.00, 0, 'images/products/1.6Ltow8.png', 50, '每箱1.25L*6瓶，山楂复核果蔬汁饮料', 28, 4.5, 15);
INSERT INTO `product` VALUES (5, 'b1fda782c3fb4e4cb03613abd964d97f', '24瓶箱装雀巢优活饮用水', 0, 28.80, 0, 'images/products/5501.jpg', 20, '学生寝室、公司、家庭用水，优质选择', 66, 2.5, 23);
INSERT INTO `product` VALUES (6, 'bdcec8a905224ce78896500239ab2ff3', '卡通包装小瓶雀巢优活饮用水', 0, 5.00, 1, 'images/products/cartoon.jpg', 197, '可爱的卡通动物包装，让小朋友们也能爱上喝水', 99, 5.0, 56);
INSERT INTO `product` VALUES (7, 'cbe69dee1bf24d39b1f22afb73740c97', '深层水源口感清冽雀巢优活一桶装', 0, 12.00, 1, 'images/products/5GLbao.jpg', 63, '爆款水产品，百年老字号', 88, 5.0, 186);
INSERT INTO `product` VALUES (8, 'd67df1ec1bbd4b14820195b82e1fa6d9', '5升装桶装雀巢优活家庭饮用水', 0, 12.00, 1, 'images/products/5Gwater.jpg', 180, '基础款，免配送，面对面送货上门', 50, 3.5, 100);
INSERT INTO `product` VALUES (9, 'e26bc4f201744b578bf448c36657bdc8', '1.5L雀巢优活限量15份', 0, 22.00, 1, 'images/products/1.5L.jpg', 83, '双十一优享，每天限量15份，先到先得，手慢者无', 33, 4.0, 20);
INSERT INTO `product` VALUES (10, '846b7b3ff7b843479d2a7072be8a3c9d', '大山源姜饮', 1, 60.00, 0, 'images/products/ginger500.jpg', 120, '南凉茶，北姜饮，鲜榨生姜汁做成的饮品，好喝到不能呼吸', 66, 2.0, 50);
INSERT INTO `product` VALUES (11, 'ccd27019dfee451f8d26628597d1243a', '优活家山楂鲜果饮品2件8折', 1, 58.00, 0, 'images/products/hawthorn_2.png', 50, '反正好喝就对了，爱买买不买拉倒', 10, 4.0, 30);
INSERT INTO `product` VALUES (12, 'f3bb1f2a69eb4989b110b8768b7d3bd6', '5升水超划算家庭饮水机水桶', 0, 12.00, 1, 'images/products/water5G.jpg', 8, '日常装，支持送货上门，免配送费', 200, 5.0, 100);
INSERT INTO `product` VALUES (13, '70528637e3be4bacadd2f89485771fa2', '20天锁鲜生姜味青岛啤酒', 1, 15.83, 1, 'images/products/sheng2.jpg', 500, '20天锁鲜，到达您口中一定是最好的口感', 10, 4.5, 20);
INSERT INTO `product` VALUES (14, 'b40a4d8bff0c4501874e196b60b1c780', '新包装优活臻鲜果山楂饮品', 1, 8.88, 1, 'images/products/purelife35015.png', 203, '新老产品交换，交替发货，加量不加价', 50, 3.5, 100);
INSERT INTO `product` VALUES (15, '482cc15ccaf84dbda10a5b6d8ce72788', '企业用户专享套餐券', 0, 14.99, 0, 'images/products/taocan1.jpg', 87, '仅限企业用户下单', 0, 0.0, 0);
INSERT INTO `product` VALUES (16, 'b59b0f2b01514b61b4c4b78d465ffe73', '一次性天然水', 0, 8.88, 1, 'images/products/water1.jpg', 10, '基础款，免配送', 0, 0.0, 0);
INSERT INTO `product` VALUES (17, '408302c2786147769c95550e33e9b0cf', '新世纪纯净水', 0, 9.99, 1, 'images/products/water2.jpg', 10, '基础款，免配送', 1, 3.5, 1);
INSERT INTO `product` VALUES (18, '7ee6c84a312e4c23bfecf59b919058f3', '新世纪天然水', 0, 8.88, 1, 'images/products/water3.jpg', 5, '基础款，免配送', 1, 4.5, 1);
INSERT INTO `product` VALUES (19, 'da932dfd0bc548a5ba8249c154d8e3fe', '新世纪矿泉水', 0, 8.88, 0, 'images/products/water4.jpg', 10, '基础款，免配送', 1, 3.5, 1);
INSERT INTO `product` VALUES (20, 'a05d62deee3d40c8b9ff978e9b97c298', '新世纪天然矿泉水小桶装', 0, 12.88, 1, 'images/products/water5.jpg', 8, '基础小桶款，免配送', 10, 3.5, 50);
INSERT INTO `product` VALUES (21, 'b85d0512ea73414782a72a25e79fe8c9', '天然矿泉水（瓶装）', 0, 5.88, 1, 'images/products/water6.jpg', 7, '基础款，免配送', 15, 4.0, 45);
INSERT INTO `product` VALUES (22, '1b3c829031624d31ae30cd255c484783', '雪山池天然水5L桶装水一箱', 0, 48.88, 1, 'images/products/water7.jpg', 145, '箱装水，基础款，免配送', 150, 4.5, 96);
INSERT INTO `product` VALUES (23, '1891ba85bcf04582b79d42dfda536a5a', '500ML瓶装水雪山池', 0, 49.99, 1, 'images/products/water8.jpg', 146, '基础款，免配送', 120, 4.0, 88);
INSERT INTO `product` VALUES (24, 'fd6d6e8db6ff47bc97515f833d2ee7b9', '雪山池特色天然泉水袋装水一袋', 0, 4.50, 1, 'images/products/water9.jpg', 110, '基础款，免配送', 120, 4.0, 66);
INSERT INTO `product` VALUES (75, '706c60e186774f46b09a57c24b9910ce', '新年缤纷版17L家庭饮用水', 0, 13.99, 0, 'images/products/17L.png', 111, '缤纷款，欲购从速', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for region
-- ----------------------------
DROP TABLE IF EXISTS `region`;
CREATE TABLE `region`  (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `uid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'uid [唯一标识]',
  `regionId` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '地区编号',
  `regionName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '地区名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of region
-- ----------------------------
INSERT INTO `region` VALUES (1, '1740090b4cd643c88228782e7d5ad8e9', '001', '紫禁城');
INSERT INTO `region` VALUES (2, '152c25a5a9e34b358eba22b396648916', '002', '浙江省杭州市西湖区');
INSERT INTO `region` VALUES (3, '7b2df3c63a51474baaa03ec860a0aa16', '003', '浙江省温州市瓯海区');
INSERT INTO `region` VALUES (4, 'eb575ee2be3f446e82963b5123d47778', '004', '浙江省温州市瓯海区茶山街道');
INSERT INTO `region` VALUES (5, 'fd13f25208c041668d6a18659d492d31', '005', '浙江省温州市鹿城区');
INSERT INTO `region` VALUES (9, '3b5c0a6ae8ec43e491aebe73b0b176c4', '007', '安徽省六安市');
INSERT INTO `region` VALUES (10, 'b06d18df6bdb4d25a33400fcec507d9f', '008', '浙江省温州市龙湾区');
INSERT INTO `region` VALUES (11, '39a349dda56641be8ab307488c75807b', '009', '浙江省温州市瑞安区');
INSERT INTO `region` VALUES (12, 'd0b534b457a04187a255bb53c806282c', '010', '浙江省温州市经开区');
INSERT INTO `region` VALUES (13, 'f0193d0bf85649fd9a79af3046a4db37', '011', '浙江省杭州市上城区');
INSERT INTO `region` VALUES (14, '4dad366f24d1459e9ef604d051271196', '012', '浙江省杭州市下城区');
INSERT INTO `region` VALUES (15, '889eb311649145a5a7f5b9fb880019d5', '013', '英国乔斯达城堡');
INSERT INTO `region` VALUES (16, '5efc636f83f348cc91f1917090833d83', '113', '浙江省杭州市下沙区');
INSERT INTO `region` VALUES (17, 'd941529248db4841873cca5959cb93f6', '256', '安徽省合肥市庐山区');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'uuid',
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `userPass` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `userRealName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '真实姓名',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址（常用地址）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '1bb7cb9af99141d098c41c9e48f48931', 'raino', 'raino123', '小V', '13867893323', '962688180@qq.com', '浙江省绍兴市柯桥区神奇的小镇在哪里');
INSERT INTO `user` VALUES (2, '81ac5588f51e4478a0b5180b7f1749be', 'tcb123', 'tcb123', '涂成博', '18066392880', '1048593583@qq.com', '浙江省温州市经济开发区XX路XX小区');
INSERT INTO `user` VALUES (3, '8fbc92c8444c43a6a700643117a954de', 'aaaaaaaaaaa', 'aaaaaaaaaaa', '啊啊啊啊', '13867793323', '962688180@qq.com', '上海市杨浦区政立路200号');
INSERT INTO `user` VALUES (5, 'administrator', 'admin', '123456', '瑞瑞', '13879791234', '962688180@qq.com', '浙江省杭州市西湖区');
INSERT INTO `user` VALUES (6, 'administrator1', 'admin1', '123456', '憨憨', '18072190862', '1094680136@qq.com', '浙江省杭州市西湖区');
INSERT INTO `user` VALUES (7, 'b01689a773e14ca8bb347edd3e3509bb', 'MockingBHM', 'Huming99121', '胡明', '13372510188', '773556327@qq.com', '北京市紫禁城太和殿三楼');
INSERT INTO `user` VALUES (8, 'dcaf9d8bff974dd0b691ed09a0d0edea', 'test', '123456', '测试君', '11111111111', 'test@qq.com', '上海市杨浦区政立路485号');
INSERT INTO `user` VALUES (9, 'f47064e00c574d86a82a1e5720116c20', 'Best_Raine', 'raino123', 'Best瑞瑞', '13864523213', '968122280@qq.com', '安徽省芜湖市XX镇');
INSERT INTO `user` VALUES (10, '6fd04e1c9d3446dcb53e99fb67b4a49e', 'King-Of-Test', 'raino123', '测试王', '13827793323', '2280@qq.com', '北京市紫禁城太和殿一楼');
INSERT INTO `user` VALUES (11, '60d5c45ba4d74e608b28a3687175114e', 'xxxx', 'xxxxxx', 'xx怪', '12345678912', '376458575@qq.com', NULL);

-- ----------------------------
-- Table structure for user_detail
-- ----------------------------
DROP TABLE IF EXISTS `user_detail`;
CREATE TABLE `user_detail`  (
  `uid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'uid用户唯一标识 （主键）',
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `isAdmin` tinyint(1) NOT NULL COMMENT '是否为管理员',
  `orderCount` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '下单数',
  `addressCount` int(255) NULL DEFAULT NULL COMMENT '地址数',
  `commentCount` int(255) NULL DEFAULT NULL COMMENT '评论数',
  `rate` float NULL DEFAULT NULL COMMENT '评分',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_detail
-- ----------------------------
INSERT INTO `user_detail` VALUES ('1bb7cb9af99141d098c41c9e48f48931', 'raino', 1, 29, 10, NULL, 5);
INSERT INTO `user_detail` VALUES ('60d5c45ba4d74e608b28a3687175114e', 'xxxx', 0, NULL, NULL, NULL, 4.5);
INSERT INTO `user_detail` VALUES ('6fd04e1c9d3446dcb53e99fb67b4a49e', 'King-Of-Test', 0, 12, 6, NULL, 4.5);
INSERT INTO `user_detail` VALUES ('81ac5588f51e4478a0b5180b7f1749be', 'tcb123', 0, 0, 1, 0, 3);
INSERT INTO `user_detail` VALUES ('8fbc92c8444c43a6a700643117a954de', 'aaaaaaaaaaa', 0, NULL, 1, NULL, 0.5);
INSERT INTO `user_detail` VALUES ('administrator', 'admin', 1, NULL, 3, NULL, 4.5);
INSERT INTO `user_detail` VALUES ('administrator1', 'admin1', 1, NULL, 1, NULL, 0.5);
INSERT INTO `user_detail` VALUES ('b01689a773e14ca8bb347edd3e3509bb', 'MockingBHM', 1, 2, 1, NULL, 5);
INSERT INTO `user_detail` VALUES ('dcaf9d8bff974dd0b691ed09a0d0edea', 'test', 0, NULL, 1, NULL, 5);
INSERT INTO `user_detail` VALUES ('f47064e00c574d86a82a1e5720116c20', 'Best_Raine', 0, NULL, 1, NULL, 0);

SET FOREIGN_KEY_CHECKS = 1;
