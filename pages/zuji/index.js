// pages/zuji/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id: 1,
      date: "2012/12",
      city: "河北阜平县",
      name: "只要有信心，黄土变成金",
    }, {
      id: 2,
      date: "2012/12",
      city: "广东顺德",
      name: "党建兴民心聚，岭南古村换发新活力",
    }, {
      id: 3,
      date: "2013/02",
      city: "甘肃定西",
      name: "阔步走在大路上，日子越过越红火",
    }, {
      id: 4,
      date: "2013/02",
      city: "甘肃临夏",
      name: "通水通路换新颜",
    }, {
      id: 5,
      date: "2013/11",
      city: "湖南湘西",
      name: "产业强,幸福长,菖蒲塘村的乡村振兴梦",
    }, {
      id: 6,
      date: "2013/11",
      city: "山东临沂",
      name: "农业、旅游两手抓，老区起了新变化",
    }, {
      id: 7,
      date: "2021/12",
      city: "河北阜平县",
      name: "只要有信心，黄土变成金",
    }, {
      id: 8,
      date: "2021/12",
      city: "河北阜平县",
      name: "只要有信心，黄土变成金",
    }, {
      id: 9,
      date: "2021/12",
      city: "河北阜平县",
      name: "只要有信心，黄土变成金",
    }, {
      id: 10,
      date: "2021/12",
      city: "河北阜平县",
      name: "只要有信心，黄土变成金",
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goDetail(e) { //点击跳转到详情页面
    wx.navigateTo({
      url: '../zuji/detail?id=' + e.currentTarget.dataset.id,
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
        if (getApp().globalData.tabbar[i].pagePath.indexOf("/zuji/index") > 0) {
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