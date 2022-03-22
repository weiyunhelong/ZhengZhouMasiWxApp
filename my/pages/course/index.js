// my/pages/course/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataobj: {}, //数据部分
    list: [], //内容管理部分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goUserOpt() { //点击用户信息
    wx.navigateTo({
      url: '../info/index',
    })
  },
  TouGaoOpt() { //投稿
    wx.showModal({
      confirmColor: '#262626',
      confirmText: '我知道了',
      content: '请到网页端进行投稿',
      showCancel: false,
      title: '',
    })
  },
  goDataOpt() { //数据中心
    wx.navigateTo({
      url: '../course/data',
    })
  },
  goMenuOpt(e) { //点击菜单
    var that = this;
    var id = parseInt(e.currentTarget.dataset.id);
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
  goContentOpt() { //内容管理
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
    var that = this;
    if (getApp().globalData.WxUserId == 0) {
      getApp().ChargeLogin().then(res => {
        if (getApp().globalData.WxUserId == 0) {
          wx.navigateTo({
            url: '../../../wxauth/pages/wxlogin/index',
          })
        }
      })
    } else {
      that.InitData();
      that.InitList();
    }
  },
  InitData() { //获取数据
    var that = this;
    var url = requestUrl + "/API/UserCenterManuApi/DataScreening?userid=" + getApp().globalData.WxUserId + "&&typeid=1";
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          dataobj: res.data.data,
          userInfo:getApp().globalData.userInfo
        })
      }
    })
  },
  InitList() { //获取内容管理
    var that = this;
    var url = requestUrl + "/API/UserCenterManuApi/GetManuListByHome?userid=" + getApp().globalData.WxUserId;
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