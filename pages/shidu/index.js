// pages/shidu/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    chktab: 0,
    list: [1, 2, 3, 4, 5, 6, ],
    pageindex: 1,
    studyobj: {}, //最近学习
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
    wx.navigateTo({
      url: '../shidu/list?id=' + e.currentTarget.dataset.menu,
    })
  },
  goDetail(e) { //跳转到详情页面
    wx.navigateTo({
      url: '../shidu/chapter?id=' + e.currentTarget.dataset.id,
    })
  },
  InitData() { //获取列表数据
    var that = this;
    var pageindex = that.data.pageindex;
    var url = requestUrl + "/API/ReadRedTimeApi/GetReadRedTimeList?keywords=&userId=" + getApp().globalData.WxUserId + "&page=" + pageindex + "&rows=10&type=" + that.data.chktab;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        if (pageindex == 1) {
          that.setData({
            studyobj: res.data.data.RecentLearning,
            list: res.data.data.datas
          })
        } else {
          that.setData({
            list: that.data.list.concat(res.data.data.datas)
          })
        }
      }
    })
  },
  tapTab(e) { //切换tab
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.index,
      pageindex: 1
    })
    //获取列表数据
    //that.InitData();
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