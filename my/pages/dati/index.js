// my/pages/dati/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkkind: 0, //0:答题记录 1:错题集
    chktype: 0, //0:全部 1:选择题 2:判断题
    list: [], //列表数据
    pageindex:1,
    filterdate:"",
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
  tapKind(e) { //选中类型
    var that = this;
    that.setData({
      chkkind: e.currentTarget.dataset.tab,
      chktype:0,
      pageindex:1
    })
    that.InitData();
  },
  tapType(e) { //选中类型
    var that = this;
    that.setData({
      chktype: e.currentTarget.dataset.type,
      pageindex:1
    })
    that.InitData();
  },
  dateFilter(e){//日期筛选
    this.setData({
      filterdate:e.detail.value
    })
  },
  InitData() { //获取消息列表
    var that = this;
    var chkkind = that.data.chkkind;
    var chktype = that.data.chktype;
    var pageindex = that.data.pageindex;
    that.setData({
      list: [1,2,3,4,5,6,7,8,9,10]
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