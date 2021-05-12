const app = getApp()

Page({
  data: {

  },
  onLoad(query) {
    const scene = decodeURIComponent(query.scene)
    if (scene!="undefined") {
      wx.showModal({
        content: scene,
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
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


    
    let options=wx.getLaunchOptionsSync()
    let scene=options.scene
    //判断是扫码进来的
    if(scene==1011||scene==1013||scene==1047||scene==1049){
      this.onScanIn()
    }else if(scene==1037){
      //如果是从别的小程序打开的
    }

  },

  scan() {
    wx.scanCode({
      success(res) {
        wx.showToast({
          title: res.rawData,
          icon: 'none',
          duration: 2000
        })
        console.log(res.rawData)
      }
    })
  },
  //扫码进来的
  onScanIn(){
      let options=wx.getLaunchOptionsSync()
      //获取小程序码传入的场景参数
      const scene = decodeURIComponent(options.query.scene)
      
  }

})
