const app = getApp()

Page({
  data: {

  },
  onLoad(query){
    const scene = decodeURIComponent(query.scene)
    console.log(scene)
    wx.showToast({
      title: scene,
      icon: 'none',
      duration:2000
    }) 
  },

  onShow() {
    // wx.request({
    //   url: 'http://10.187.6.175:5010/wechatPay/createOrder?openid=ooJ4W5bJCy6ZtXIsyXbKdxXwoHwI',
    //   success(res){
    //     var data = res.data;
    //     wx.requestPayment({
    //       timeStamp: data.timeStamp,
    //       nonceStr: data.nonceStr,
    //       package: data.package,
    //       signType: data.signType,
    //       paySign: data.paySign,
    //       success(res){},
    //       fail(res){}
    //   })
    //   }
    // })


  },

  scan() {
    wx.scanCode({
      success (res) {
        wx.showToast({
          title: res.rawData,
          icon: 'none',
          duration:2000
        }) 
      }
    })
  }

})
