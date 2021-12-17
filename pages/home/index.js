// pages/home/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

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
  goUserOpt(){//点击跳转到用户信息
    wx.navigateTo({
      url: '../../my/pages/info/index',
    })
  },
  tapMenu(e) { //点击菜单部分
    var that = this;
    var menu = parseInt(e.currentTarget.dataset.menu);
    var url = "";
    switch (menu) {
      case 1:
        url = "../shidu/index";
        break;
      case 2:
        url = "../zuji/fupin";
        break;
      case 3:
        url = "../jinian/index";
        break;
      case 4:
        url = "../zuji/red";
        break;
      case 5:
        url = "../sijiang/index";
        break;
    }
    wx.navigateTo({
      url: url,
      fail: function () {
        wx.switchTab({
          url: url
        })
      }
    })
  },
  goSystem() { //党建和思政教育云展系统
    wx.navigateTo({
      url: '../../yunsystem/pages/home/index',
    })
  },
  goShiduOpt(e) { //点击红色时时读
    wx.navigateTo({
      url: '../shidu/detail?id=' + e.currentTarget.dataset.id
    })
  },
  goChuangke() { //创课中心
    wx.switchTab({
      url: '../kecheng/index',
    })
  },
  goChuangkeOpt(e) { //点击创课中心
    wx.navigateTo({
      url: '../kecheng/detail?id=' + e.currentTarget.dataset.id
    })
  },
  goJiyin(){//红色基因
    wx.switchTab({
      url: '../jiyin/index',
    })
  },
  goJiYinOpt(e){//点击探寻红色基因
    wx.navigateTo({
      url: '../jiyin/detail?id=' + e.currentTarget.dataset.id
    })
  },
  goSiJiangOpt(e){//点击探寻四讲
    wx.navigateTo({
      url: '../sijiang/detail?id=' + e.currentTarget.dataset.id
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
  },
  setTabbarlist: function () { //获取菜单的列表数据
    var that = this;

    //设置选中的tabbar
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
      for (var i = 0; i < getApp().globalData.tabbar.length; i++) {
        if (getApp().globalData.tabbar[i].pagePath.indexOf("/home/index") > 0) {
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