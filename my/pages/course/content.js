// my/pages/course/content.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chktab: 1, //1:稿件管理 2:申诉管理 3:草稿箱
    chksubtab: 0,
    mark: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapTab(e) { //切换tab
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.type,
      chksubtab: 0
    })
  },
  tapsubTab(e) { //切换tab
    var that = this;
    that.setData({
      chksubtab: e.currentTarget.dataset.tab,
    })
  },
  replayOpt(e) { //重新申请
    var that = this;
    var dataobj = e.detail;
    that.setData({
      showMask: true,
      showMaskAni: true
    })
  },
  getMark(e) { //获取申请的内容
    this.setData({
      mark: e.detail.value
    })
  },
  replyOpt() { //提交申请
    var that = this;
    var mark = that.data.mark;

    if (mark == "") {
      WxRequest.ShowAlert("请输入申请的内容");
    } else {
      //TODO 
      wx.showToast({
        title: '提交申请成功',
      })
      that.setData({
        showMaskAni: false
      })
      setTimeout(() => {
        that.setData({
          showMask: false
        })
      }, 1000);
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