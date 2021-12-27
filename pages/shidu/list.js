// pages/shidu/list.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
   list:[1,2,3,4,5,6,7,8],
   pageindex:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var pagetitle = "";
    var type =parseInt(options.type);
    switch (type) {
      case 1:
        pagetitle = "红色人物";
        break;
      case 2:
        pagetitle = "党史";
        break;
      case 3:
        pagetitle = "时事评论";
        break;
      case 4:
        pagetitle = "红色文化思想";
        break;
    }
    wx.setNavigationBarTitle({
      title: pagetitle,
    })
  },
  goDetail(e){//跳转到详情
    var that=this;
    wx.navigateTo({
      url: '../shidu/chapter?type='+e.currentTarget.dataset.type+"&id="+that.data.id
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