const app = getApp()

Page({
  data: {

  },
  onLoad(query) {
    const queryScene = decodeURIComponent(query.scene)
    if (queryScene!="undefined") {
      wx.showToast({
        title: queryScene,
      })
    }
  },

  onShow() {
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
    let that=this
    let options=wx.getLaunchOptionsSync()
    //获取小程序码传入的场景参数
    const queryScene = decodeURIComponent(options.query.scene)
    //发请求，搞定路由
    getApp().post(
      "/miniProgram/router",
      {queryScene:queryScene},
      function(res){
        let data=res.data
        //路由：判断版本号
        if(data.version==1){  
          //判断cmd
          if(data.cmd=="pay"){
            that.createOrder(queryScene)
          }
        }
      }
    )
  },
  //申请支付
  createOrder(queryScene){
    let that=this
    let openid = wx.getStorageSync('openid')
    getApp().post(
      '/miniProgram/requestPay',
      {openid:openid,queryScene:queryScene},
      function(res){
        that.doPay(res.data,queryScene)
      }
    )
  },
  //支付
  doPay(data,queryScene){
    let that=this
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success(res){
        that.onPaySuccess(res,queryScene,data.orderId)
      },
      fail(res){
        //当支付失败时
        console.log(res)
      }
    })
  },
  //当支付成功时
  onPaySuccess(res,queryScene,orderId){
    let openid = wx.getStorageSync('openid')
    getApp().post(
      '/miniProgram/onPaySuccess',
      {openid:openid,queryScene:queryScene,orderId:orderId},
      function(res){
        console.log(res.data)
      }
    )
  }

})
