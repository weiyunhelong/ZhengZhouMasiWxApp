// chat/pages/chat/invite.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

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
    var that = this;
    that.setData({
      id: options.groupid,
      type:options.type
    })
    if(options.type==1){
      wx.setNavigationBarTitle({
        title: '新增',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '移除',
      })
    }
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
    } else if(that.data.type==1){//新增
      //TODO 请求接口
      var url = requestUrl + "/API/GroupsInfo/AddGroupItem?gId=" + that.data.id + "&userids=" + chkIds.join(',');
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          wx.showToast({
            title: '邀请成功',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 2000);
        } else {
          WxRequest.ShowAlert(res.data.msg);
        }
      })
    } else if(that.data.type==2){//移除
      //TODO 请求接口
      var url = requestUrl + "/API/GroupsInfo/DeleteGroupItem?gId=" + that.data.id + "&userids=" + chkIds.join(',');
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          wx.showToast({
            title: '操作成功',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 2000);
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
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline'],
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.InitData();
  },
  InitData() { //获取成员列表
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