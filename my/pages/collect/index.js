// my/pages/collect/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chktab: 1, //分类
    pageindex: 1,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapTabOpt(e) { //切换tab
    var that = this;
    that.setData({
      chktab:e.currentTarget.dataset.tab,
      pageindex: 1
    })
    that.InitData();
  },
  ShowMoreOpt() { //加载更多
    var that = this;
    that.setData({
      pageindex: 1 + that.data.pageindex
    })
    that.InitData();
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
        url: '../../../wxauth/pages/wxlogin/index',
      })
    } else {
      that.InitData();
    }
  },
  InitData() { //获取数据
    var that = this;
    var chktab = parseInt(that.data.chktab), //分类
      pageindex = that.data.pageindex;

    var url = requestUrl;
    switch (chktab) {
      case 1:
        url += '/API/UserCenterApi/GetReadCollectionList?userid='+getApp().globalData.WxUserId+"&page="+pageindex+"&rows=10";
        break;
      case 2:
        url += '/API/UserCenterApi/GetFourCollectionList?userid='+getApp().globalData.WxUserId+"&page="+pageindex+"&rows=10";
        break
    }
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        if (pageindex == 1) {
          that.setData({
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