// changzhenglu/pages/map/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

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
  showMaskOpt() { //点击左上角的用户信息

  },
  goPostion() { //点击定位

  },
  goRun() { //点击Go

  },
  goLine() { //点击长征路线
    wx.navigateTo({
      url: '../line/index',
    })
  },
  goRank(){//点击排行
   wx.navigateTo({
     url: '../rank/index',
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