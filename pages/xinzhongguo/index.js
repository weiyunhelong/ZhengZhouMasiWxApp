// pages/jiyin/detail.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          navigationBarHeight: res.statusBarHeight
        })
      },
    })
  },
  goBackOpt(){
    wx.navigateBack({
      delta: 1,
    })
  },
  goWebOpt(e){
    var urls=[
      "https://720.vrkejiao.com/10064",
      "https://720.vrkejiao.com/zgydjng",
      "https://720.vrkejiao.com/10073",
      "https://720.vrkejiao.com/10023",
      "https://720.vrkejiao.com/10075",
      "https://720.vrkejiao.com/10074",
      "https://720.vrkejiao.com/swgbjng",
      "https://720.vrkejiao.com/jgsgmjng",
      "https://720.vrkejiao.com/10070",
      "https://720.vrkejiao.com/10028",
      "https://720.vrkejiao.com/10078",
      "https://720.vrkejiao.com/10065",
      "https://720.vrkejiao.com/10077",
      "https://720.vrkejiao.com/10076",
      "https://720.vrkejiao.com/10079",
      "",
      "https://720.vrkejiao.com/hjczlsjng",
      "https://720.vrkejiao.com/10015",
      "https://720.vrkejiao.com/fhsjzjng",
      "https://720.vrkejiao.com/yjljzjng",
      "https://720.vrkejiao.com/10066",
      "",
      "https://720.vrkejiao.com/10067",
    ];
    var index=e.currentTarget.dataset.index;
    var url=urls[index];
    if(url!=""){
      wx.navigateTo({
        url: '../webview/index?url='+url
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})