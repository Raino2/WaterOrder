const login = {
  userLogin: (res, req) => {
    const userName = res.body.userName;
    const userPass = res.body.userPass;
    console.log('接收到用户登录请求了！');
    console.log('userName:', userName);
    console.log('userPass:', userPass);
    req.send({message:'通信成功！'})
  },

  logUser: (res, req) => {},
};

module.exports = login;
