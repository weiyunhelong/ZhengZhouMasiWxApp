// changzhenglu/pages/home/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMask: false,
    showMaskAni: false,
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
  showMaskOpt() { //浮窗显示信息
    var that = this;
    that.setData({
      showMask: true,
      showMaskAni: true,
    })
  },
  hideMaskOpt() { //关闭浮窗
    var that = this;
    that.setData({
      showMaskAni: false,
    })
    setTimeout(() => {
      that.setData({
        showMask: false,
      })
    }, 1000);
  },
  nomove() {
    return false
  },
  goMapOpt() { //点击进入长征
    wx.navigateTo({
      url: '../map/index',
    })
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