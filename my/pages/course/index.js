// my/pages/course/index.js
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

  },
  TouGaoOpt(){//投稿
    wx.showModal({
      confirmColor: '#262626',
      confirmText: '我知道了',
      content: '请到网页端进行投稿',
      showCancel: false,
      title: '',
    })
  },
  goDataOpt(){//数据中心
    wx.navigateTo({
      url: '../course/data',
    })
  },
  goMenuOpt(e) { //点击菜单
    var that = this;
    var id =parseInt(e.currentTarget.dataset.id);
    var url = '';
    switch (id) {
      case 1:
        url = "../course/data";
        break;
      case 2:
        url = "../course/dynamic";
        break;
      case 3:
        url = "../course/news";
        break;
      case 4:
        url = "../course/content";
        break;
    }
    wx.navigateTo({
      url: url
    })
  },
  goContentOpt(){//内容管理
    wx.navigateTo({
      url: '../course/content',
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