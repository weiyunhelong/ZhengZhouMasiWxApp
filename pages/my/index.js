// pages/my/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    IsLogin: false, //是否登录
    userInfo: {}, //用户信息
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
    })
  },
  goLogin() { //去登录
    wx.navigateTo({
      url: '../../wxauth/pages/wxlogin/index',
    })
  },
  goAccount() { //个人资料
    wx.navigateTo({
      url: '../../my/pages/info/index',
    })
  },
  goXunZhang() { //我的成就
    wx.navigateTo({
      url: '../../my/pages/chengji/index',
    })
  },
  goTabOpt(e) { //点击3个tab
    var index = e.currentTarget.dataset.index;
    var url = "";
    switch (parseInt(index)) {
      case 1:
        url = "../../my/pages/study/index";
        break;
      case 2:
        url = "../../my/pages/dati/index";
        break;
      case 3:
        url = "../../my/pages/chengji/index";
        break;
    }
    wx.navigateTo({
      url: url
    })
  },
  tapMenu(e) { //跳转到菜单
    var that = this;
    var url = "",
      menu = parseInt(e.currentTarget.dataset.menu);
    switch (menu) {
      case 0:
      case 1:
        url = "../../my/pages/news/index";
        break;
      case 2:
        url = "../../my/pages/study/index";
        break;
      case 3:
        url = "../../my/pages/collect/index";
        break;
      case 4:
        url = "../../my/pages/dati/index";
        break;
      case 5:
        url = "../../my/pages/course/index";
        break;
      case 6:
        url = "../../xuetang/pages/xuetang/index";
        break;
    }
    wx.navigateTo({
      url: url
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
    //获取菜单的列表数据
    that.setTabbarlist();

    wx.getStorage({
      key: "loginobj",
      success: function (res) {
        that.setData({
          IsLogin: true,
          userInfo: res.data
        })
        that.InitUserInfo();
      },
      fail: function () {
        that.setData({
          IsLogin: false,
          userInfo: []
        })
      }
    })
  },
  InitUserInfo() { //获取用户信息
    var that = this;
    var url = requestUrl + "/API/LoginApi/GetUserData?userId=" + getApp().globalData.WxUserId;
    WxRequest.PostRequest(url, {}).then(res => {

    })
  },
  setTabbarlist: function () { //获取菜单的列表数据
    var that = this;

    //设置选中的tabbar
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
      for (var i = 0; i < getApp().globalData.tabbar.length; i++) {
        if (getApp().globalData.tabbar[i].pagePath.indexOf("/my/index") > 0) {
          that.getTabBar().setData({
            selected: i,
            showTabBar: true,
            list: getApp().globalData.tabbar
          })
        }
      }
    }
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