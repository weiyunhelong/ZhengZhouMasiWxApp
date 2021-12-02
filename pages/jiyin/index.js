// pages/jiyin/index.js
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

  },
  goMenu(e) { //点击菜单
    var url = "";
    var menu = parseInt(e.currentTarget.dataset.menu);
    switch (menu) {
      case 1:
        url = "../xinzhongguo/index";
        break;
      case 2:
        url = "../jinian/index";
        break;
      case 3:
        url = "../shidu/index";
        break;
      case 4:
        url = "../sijiang/index";
        break;
      case 5:
        url = "../zuji/detail";
        break;
      case 6:
        url = "../zuji/index";
        break;
    }
    wx.navigateTo({
      url: url,
      fail:function(){
        wx.switchTab({
          url: url
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
    var that = this;
    //获取菜单的列表数据
    that.setTabbarlist();
  },
  setTabbarlist: function () { //获取菜单的列表数据
    var that = this;

    //设置选中的tabbar
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
      for (var i = 0; i < getApp().globalData.tabbar.length; i++) {
        if (getApp().globalData.tabbar[i].pagePath.indexOf("/jiyin/index") > 0) {
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