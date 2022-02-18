// yunsystem/pages/home/index.js
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
  goBack() { //点击返回
    wx.navigateBack({
      delta: 1,
      fail: function () {
        wx.reLaunch({
          url: '../../../pages/home/index',
        })
      }
    })
  },
  goMenu(e) { //点击菜单
    var url = "";
    var menu = parseInt(e.currentTarget.dataset.menu);
    switch (menu) {
      case 1:
        url = "../xinzhengzhou/index";
        break;
      case 2:
        url = "../zhanqilai/index";
        break;
      case 3:
        url = "../hongsehenan/index";
        break;
      case 4:
        url = "../qiangqilai/index";
        break;
      case 5:
        url = "../fuqilai/index";
        break;
    }
    wx.navigateTo({
      url: url
    })
  },
  ScanOpt() { //扫码操作
    wx.navigateTo({
      url: '../scan/index',
    })
  },
  goRecord() { //体验记录
    wx.redirectTo({
      url: '../record/index',
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