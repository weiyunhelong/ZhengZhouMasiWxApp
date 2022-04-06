// changzhenglu/pages/line/index.js
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
  goBackOpt(){//点击返回
    wx.navigateBack({
      delta: 1,
      fail:function(){
        wx.reLaunch({
          url: '../../../pages/middle/index',
        })
      }
    })
  },
  viewOpt(e) { //点击浏览
    var that = this;
    that.setData({
      showMask: true,
      showMaskAni: true,
      dataobj: {
        id:1
      },
    })
  },
  goWebOpt() { //进入参观
    var that = this;
    var dataobj = that.data.dataobj;
    wx.navigateTo({
      url: '../info/index?id=' + dataobj.id,
      complete:function(){
        that.setData({
          showMaskAni: false,
          showMask: false,
        })
      }
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