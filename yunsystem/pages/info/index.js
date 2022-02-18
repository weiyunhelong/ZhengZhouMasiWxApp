// yunsystem/pages/info/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    dataobj: {},
    IsZan: false, //是否点赞
    IsCollect: false, //是否收藏
    IsVr: true, //是否有VR视频
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  ZanOpt() { //点赞
    var that = this;
    var dataobj = that.data.dataobj;
    var IsZan = that.data.IsZan;

    if (IsZan) { //取消点赞
      wx.showToast({
        title: '已取消点赞',
        duration: 2000
      })
      that.setData({
        IsZan: false
      })
    } else { //点赞
      wx.showToast({
        title: '点赞成功',
        duration: 2000
      })
      that.setData({
        IsZan: true
      })
    }
  },
  CollectOpt() { //收藏
    var that = this;
    var dataobj = that.data.dataobj;
    var IsCollect = that.data.IsCollect;

    if (IsCollect) { //取消收藏
      wx.showToast({
        title: '已取消收藏',
        duration: 2000
      })
      that.setData({
        IsCollect: false
      })
    } else { //收藏
      wx.showToast({
        title: '收藏成功',
        duration: 2000
      })
      that.setData({
        IsCollect: true
      })
    }
  },
  goVROpt() { //vr体验
    var that = this;
    wx.navigateTo({
      url: '../webview/index?type=0&url=' + that.data.dataobj.VRUrl
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline'],
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: "arobj",
      success: function (res) {
        that.setData({
          dataobj: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.removeStorage({
      key: 'arobj',
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorage({
      key: 'arobj',
    })
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