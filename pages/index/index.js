//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    //新增weather变量
    weather: {}
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    this.getLocation()
  },
  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.request({
          url: 'https://api.thinkpage.cn/v3/weather/now.json?key=xxxxxxxxxx&location='+latitude+':'+longitude,
          success: function(res){
            console.log(res.data.results[0])
            that.setData({
              weather:res.data.results[0]
            })
          }
        })
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    //因为对象中的方法this默认指向undefined，所以我们需要手动指定this，这段代码还可以写成：
    /**
     * app.getUserInfo(function(userInfo){
     *    //更新数据
     *    this.setData({
     *      userInfo:userInfo
     *    })
     * }.bind(this))
     * 或者用es6:
     * app.getUserInfo((userInfo) => {
     *    this.setData({
     *      userInfo:userInfo
     *    })
     * })
     */
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
