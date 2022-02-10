// chat/pages/chat/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkkind: 0, //0:全部题目 1:错题集
    list: [], //列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapKind(e) { //选中类型
    var that = this;
    that.setData({
      chkkind: e.currentTarget.dataset.tab
    })
    that.InitData();
  },
  InitData() { //获取消息列表
    var that = this;
    var chkkind = that.data.chkkind;
    that.setData({
      list: [1,2,3,4,5,6,7,8,9,10]
    })
  },
  goChatOpt(e){
    wx.navigateTo({
      url: '../chat/wechat?id='+e.currentTarget.dataset.id+"&type="+e.currentTarget.dataset.id
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
    var that=this;
    that.InitData();
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