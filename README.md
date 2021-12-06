# :droplet:网上订水系统 🌊 - 毕业设计

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

 为了方便，现在的后端请求结果分为`200`和`401`两种，这样前端可以直接catch，其实可以都返回200，通过success字段来判断是否请求成功，这样请求更安全也更规范
