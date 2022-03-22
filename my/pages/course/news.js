// my/pages/course/news.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chktab: 1, //1浏览我的 2评论我的 3收到的赞 4分享我的 5收藏我的
    list: [],
    pageindex: 1,
    pagesize: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapTab(e) { //切换tab
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.tab,
      pageindex: 1,
      list: []
    })
    that.InitData();
  },
  ShowMore() { //加载更多
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

    getApp().ChargeLogin().then(res => {
      if (getApp().globalData.WxUserId == 0) {
        wx.navigateTo({
          url: '../../../wxauth/pages/wxlogin/index',
        })
      } else {
        that.InitData();
      }
    })

  },
  InitData() { //获取数据
    var that = this;
    var chktab = parseInt(that.data.chktab); //1浏览我的 2评论我的 3收到的赞 4分享我的 5收藏我的
    var pageindex = that.data.pageindex;
    var pagesize = that.data.pagesize;

    var url = requestUrl;
    var params = "?page=" + pageindex + "&rows=" + pagesize + "&userid=" + getApp().globalData.WxUserId;
    switch (chktab) {
      case 1:
        url = url + "/API/UserCenterManuApi/GetBrowseListWhereReply" + params;
        break;
      case 2:
        url = url + "/API/UserCenterManuApi/GetCommentListWhereReply" + params;
        break;
      case 3:
        url = url + "/API/UserCenterManuApi/GetLikesListWhereReply" + params;
        break;
      case 4:
        url = url + "/API/UserCenterManuApi/GetShareListWhereReply" + params;
        break;
      case 5:
        url = url + "/API/UserCenterManuApi/GetBrowseListWhereReply" + params;
        break;
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