// my/pages/news/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkkind: 0, //0:评论 1:点赞 2:公告
    pageindex: 1,
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
  ShowMoreData() { //加载更多
    var that = this;
    that.setData({
      pageindex: that.data.pageindex + 1
    })
    that.InitData();
  },
  InitData() { //获取消息列表
    var that = this;
    var chkkind = that.data.chkkind;
    var pageindex = that.data.pageindex;
    var url = requestUrl;
    var params = "?page=" + pageindex + "&rows=20";
    switch (chkkind + '') {
      case '0': //评论
        url += "/API/UserCenterApi/GetCommentList";
        params += "&userid=" + getApp().globalData.WxUserId;
        break;
      case '1': //点赞
        url += "/API/UserCenterApi/GetLikesList";
        params += "&userid=" + getApp().globalData.WxUserId;
        break;
      case '2': //公告
        url += "/API/UserCenterApi/GetNotice";
        break;
    }
    WxRequest.PostRequest(url + params, {}).then(res => {
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
      getApp().ChargeLogin().then(res => {
        if (getApp().globalData.WxUserId == 0) {
          wx.navigateTo({
            url: '../../../wxauth/pages/wxlogin/index',
          })
        }
      })
    } else {
      that.InitData();
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