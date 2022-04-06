# :droplet:网上订水系统 🌊

### 项目所用技术栈:blue_heart::green_heart::purple_heart::yellow_heart::heartpulse:

- React
- Antd
- Sass
- CSS Modules
- Webpack
- Node.JS
- TypeScript
- Express.Js
- Mobx
- npm
- yarn
- mysql

---

### Port:thought_balloon:

#### 前端项目端口：8848

#### 后端项目端口：8888

---

### 启动项目

#### :cherry_blossom:后端启动

```bash
cd server/water-order-backend #定位项目
npm install #安装依赖
npm start #启动
```

#### :seedling:前端启动

```bash
yarn #安装依赖
yarn start #启动
```

`备注：其他脚本请自行阅读package.json 中的 script`

`sql文件位于项目目录public文件下`

数据库配置信息可以修改后端项目目录下 utils 下的 sql.js

![image-20220123005746314](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123005746314.png)

---

### 页面设计

- 主颜色:rgb(228,27,34)
- 版型:1200px

---

### :ghost:项目可以改善的点:ghost:

##### 1.加入 Token 后配合后端实现完整的登录系统 :key:

目前是使用 localStorage 进行缓存，然后在每次进入网页的时候向后端发送一个请求，从而实现登录，但是这样并不安全和合理，可以加入 Token 机制完善登录

##### 2.购物车系统通过后端数据库来实现:lollipop:

目前的购物车系统生命周期会在网页关闭后结束，所以当用户刷新页面以及关闭页面的时候，购物车会清空，这一点也可以改善

##### 3.后端的请求可以更加规范:computer:

为了方便，现在的后端请求结果分为`200`和`401`两种，这样前端可以直接 catch，其实可以都返回 200，通过 success 字段来判断是否请求成功，这样请求更安全也更规范

#### 其他等等...

---

### 系统截图欣赏

#### 1.介绍页

![image-20220123005903330](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123005903330.png)

#### 2.首页

![image-20220123005935176](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123005935176.png)

![image-20220123005948528](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123005948528.png)

#### 3.商城页 & 购物车

![image-20220123010016895](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123010016895.png)

![image-20220123010144459](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123010144459.png)

#### 4.结算页

![image-20220123010211706](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123010211706.png)

![image-20220123010224425](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123010224425.png)

#### 5.后台 - 用户

![image-20220123010311258](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123010311258.png)

![image-20220123010335969](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123010335969.png)

![image-20220123010346527](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123010346527.png)

#### 6.后台 - 产品

![image-20220123010416086](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123010416086.png)

#### 7.后台 - 订单

![image-20220123010436704](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123010436704.png)

![image-20220123010457868](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123010457868.png)

![image-20220123010518544](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123010518544.png)

#### 8.后台 - 配送

![image-20220123010547079](https://github.com/Raino2/WaterOrder/blob/master/src/assets/images/image-20220123010547079.png)

---

- clone或fork代码查看更多功能
- 欢迎提issue
- 联系作者：962688180@qq.com
- 作者：星瑞Raino

