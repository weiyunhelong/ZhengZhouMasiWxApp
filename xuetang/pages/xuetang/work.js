// xuetang/pages/xuetang/work.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chktab: 0,
    showMask: false,
    showMaskAni: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapTab(e) { //切换tab
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.tab
    })
  },
  showCommentOpt(e) { //显示评论浮窗
    var that = this;
    that.setData({
      showMask: true,
      showMaskAni: true,
    })
  },
  closeMask() {//关闭评论浮窗
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