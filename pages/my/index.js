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

  },
  goLogin() { //去登录
    wx.navigateTo({
      url: '../../wxauth/pages/wxlogin/index',
    })
  },
  goAccount() { //账号管理
    wx.navigateTo({
      url: '../../my/pages/account/index',
    })
  },
  tapMenu(e) { //跳转到菜单
    var that=this;
    var url = "",
      menu = parseInt(e.currentTarget.dataset.menu);
    switch (menu) {
      case 0:
        url = "../../my/pages/datacenter/index";
        break;
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
        if (!that.data.IsLogin) {
          url = "../../wxauth/pages/wxlogin/index";
          break;
        } else {
          url = "../../my/pages/account/index";
          break;
        }
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
      },
      fail: function () {
        that.setData({
          IsLogin: false,
          userInfo: []
        })
      }
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