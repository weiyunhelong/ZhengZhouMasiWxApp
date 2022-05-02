// pages/shidu/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showloadingMask:true,
    tabs: [],
    pageindex: 1,
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
  goBackOpt() { //返回
    wx.navigateBack({
      delta: 1,
    })
  },
  goSystem() { //党建和思政教育云展系统
    wx.navigateTo({
      url: '../../yunsystem/pages/home/index',
    })
  },
  tapMenu(e) { //跳转到对应的分类列表
    var obj = e.currentTarget.dataset.menu;
    wx.navigateTo({
      url: '../shidu/list?id=' + obj.Key + '&name=' + obj.Value,
    })
  },
  goDetail(e) { //跳转到详情页面
    WxRequest.ViewRedGenePage(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../shidu/chapter?id=' + e.currentTarget.dataset.id,
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

    getApp().ChargeLogin().then(res => {
      if (getApp().globalData.WxUserId == 0) {
        wx.navigateTo({
          url: '../../wxauth/pages/wxlogin/index',
        })
      } else {
        //获取数据
        that.InitTABData();
      }
    })
  },
  InitTABData() { //获取数据
    var that = this;
    var url = requestUrl + "/API/CategoryApi/GetReadRedTypeList";
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        var tabs = res.data.data;
        that.setData({
          tabs: tabs
        })
        for (var i = 0; i < tabs.length; i++) {
          that.InitData(tabs[i].Key, i);
        }
      }
      setTimeout(() => {
        that.setData({
          showloadingMask:false
        })
      }, 1000);
    })
  },
  InitData(id, i) { //获取分类下的列表数据
    var that = this;
    var tabs = that.data.tabs;
    var url = requestUrl + "/API/ReadRedTimeApi/GetReadRedTimeList?page=1&rows=6&type=" + id+"&uid="+getApp().globalData.WxUserId;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        tabs[i].list = res.data.data.datas;
        that.setData({
          tabs: tabs
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