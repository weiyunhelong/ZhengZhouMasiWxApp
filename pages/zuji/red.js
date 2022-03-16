// pages/zuji/red.js
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
  goBackOpt() { //点击返回
    wx.navigateBack({
      delta: 1,
    })
  },
  goDetail(e) {
    var list=this.data.list;
    var index = e.currentTarget.dataset.index;
    WxRequest.ViewRedGenePage(list[index].ID);
    if (list[index].Address != "") {
      wx.navigateTo({
        url: '../webview/index?url=' + list[index].Address,
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
    if (getApp().globalData.WxUserId == 0) {
      wx.redirectTo({
        url: '../../wxauth/pages/wxlogin/index',
      })
    } else {
      that.InitData();
    }
  },
  InitData() { //获取数据
    var that = this;
    var url = requestUrl + "/API/RedGeneApi/GetPanoramList?type=11&rows=100&page=1";
    WxRequest.PostRequest(url, {}).then(res => {
     if(res.data.success){
       that.setData({
         list:res.data.data.datas
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