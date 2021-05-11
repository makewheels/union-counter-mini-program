const app = getApp()

Page({
  data: {
     
  },
  onShow(){
    wx.login({
      success (res) {
        if (res.code) {
          //openid ooJ4W5bJCy6ZtXIsyXbKdxXwoHwI
          console.log(res.code)
          //发起网络请求
          // wx.request({
            // url: 'https://test.com/onLogin',
            // data: {
              // code: res.code
            // }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    wx.request({
      url: 'http://10.187.6.175:5010/wechatPay/createOrder?openid=ooJ4W5bJCy6ZtXIsyXbKdxXwoHwI',
      success(res){
        var data = res.data;
        wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.paySign,
          success(res){},
          fail(res){}
      })
      }
    })

    
  }

  
})
