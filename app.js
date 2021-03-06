// app.js
App({
  onLaunch() {
  globalData: {
    userInfo: null
  }
  //判断本地有没有openid，如果没有就登录
  let openid = wx.getStorageSync('openid')
  if(!openid){
    // console.info("本地没有openid，微信登陆")
    //微信登陆获取js_code
    wx.login({
      success(res){
        //调用应用服务器登陆，获取openid
        let js_code=res.code
        getApp().post(
          '/miniProgram/login',
          {js_code:js_code},
          function(res){
            //保存openid到本地
            wx.setStorageSync('openid', res.data.openid);
          })
      }
    })
  }else{
    // console.log("本地已存在openid = "+openid)
  }
},
//公共POST方法
post(url,data,success){
  wx.request({
    // url:"http://10.187.0.226:5010/test-wechat-pay"+url,
    url:"https://java8.icu:5010/test-wechat-pay"+url,
    method:'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data:data,
    success:success
  })
}
})
