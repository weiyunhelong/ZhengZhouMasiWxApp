// xuetang/pages/xuetang/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goUserOpt() { //点击用户
    wx.navigateTo({
      url: '../../../my/pages/info/index',
    })
  },
  tapMenu(e) { //点击菜单
    var that = this;
    var url = "";
    var index = parseInt(e.currentTarget.dataset.menu);
    switch (index) {
      case 1:
        url = "../xuetang/shijian";
        break;
      case 2:
        url = "../xuetang/baogao";
        break;
      case 3:
        url = "../xuetang/work";
        break;
      case 4:
        url = "../xuetang/test";
        break;
      case 5:
        url = "../xuetang/create";
        break;
      case 6:
        url = "../xuetang/book";
        break;
    }
    wx.navigateTo({
      url: url
    })
  },
  goCourseOpt(e) { //点击我的实践课
    wx.navigateTo({
      url: '../../../pages/course/detail?id=' + e.currentTarget.dataset.id
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
    var that = this;
    if (getApp().globalData.WxUserId == 0) {
      wx.redirectTo({
        url: '../../../wxauth/pages/wxlogin/index',
      })
    } else {
      that.InitData();
    }
  },
  InitData() { //获取我的实践课
    var that = this;
    var url = requestUrl + "/API/UserCenterJindeSchool/GetPracticeListWhereUser?page=1&rows=10&userid=" + getApp().globalData.WxUserId;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          list: res.data.data.datas
        })
      }
    })
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