// pages/zuji/fupin.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showloadingMask:true,
    list: [],
    urllist: [],
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

    //数据
    var arry = [];
    for (var i = 1; i < 32; i++) {
      arry.push(i);
    }
    that.setData({
      list: arry
    })
  },
  goBackOpt() { //点击返回
    wx.navigateBack({
      delta: 1,
    })
  },
  goDetail(e) { //点击到详情
    var urls = this.data.urllist;
    var index = e.currentTarget.dataset.index;
    var url = urls[index].Address == undefined ? '' : urls[index].Address;
    WxRequest.ViewRedGenePage(list[index].ID);
    if (url != "") {
      wx.navigateTo({
        url: '../webview/index?url=' + url,
      })
    }
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
        that.InitData();
      }
    })
  },
  InitData() { //获取数据
    var that = this;
    var url = requestUrl + "/API/RedGeneApi/GetPanoramList?type=12&rows=100&page=1";
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          urllist: res.data.data.datas
        })
      }
      setTimeout(() => {
        that.setData({
          showloadingMask:false
        })
      }, 1000);
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