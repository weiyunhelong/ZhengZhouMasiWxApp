// pages/group/user.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageindex: 1,
    chkIds: [],
    id: 0, //讨论组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chkTapOpt(e) { //点击操作
    var that = this;
    var list = that.data.list,
      chkIds = [];
    var id = e.currentTarget.dataset.id;
    for (var i = 0; i < list.length; i++) {
      if (id == list[i].ID) {
        list[i].IsChk = !list[i].IsChk;
        break;
      }
    }
    for (var i = 0; i < list.length; i++) {
      if (list[i].IsChk) {
        chkIds.push(list[i].ID);
      }
    }
    that.setData({
      list: list,
      chkIds: chkIds,
    })
  },
  ShowMoreData() { //加载更多
    var that = this;
    that.setData({
      pageindex: 1 + that.data.pageindex
    })
    that.InitData();
  },
  confirmOpt() { //点击确定操作
    var that = this;
    var chkIds = that.data.chkIds;
    if (chkIds.length == 0) {
      WxRequest.ShowAlert("请选择成员");
    } else {
      //TODO 请求接口
      var url = requestUrl + "?id=" + that.data.id + "&userIds=" + chkIds.join(',');
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          wx.showToast({
            title: '创建成功',
          })
          wx.navigateBack({
            delta: 1,
          })
        } else {
          WxRequest.ShowAlert(res.data.msg);
        }
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
  InitData() { //获取首页数据
    var that = this;
    var pageindx = that.data.pageindex;
    var chkkind = that.data.chkkind;
    var url = requestUrl + "/API/XRIdeology/HomeDateList?uid=" + getApp().globalData.WxUserId + "&dataType=" + chkkind;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        if (pageindx == 1) {
          that.setData({
            list: res.data.data.CourseCenter, //res.data.data.datas
          })
        } else {
          that.setData({
            list: that.data.list.concat(res.data.data.datas)
          })
        }
      }
      setTimeout(() => {
        wx.hideLoading();
        that.setData({
          showloadingMask: false
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