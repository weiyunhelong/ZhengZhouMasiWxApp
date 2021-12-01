// pages/kecheng/detail.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    IsZan: false, //是否点赞
    IsCollect: false, //是否收藏
    chktab: 1, //1：文章赏析 2：学习交流
    comment: "", //评论
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  ZanOpt() { //点赞操作
    var that = this;
    var IsZan = that.data.IsZan;
    if (IsZan) { //取消点赞
      wx.showToast({
        title: '已取消点赞',
      })
    } else {
      wx.showToast({
        title: '点赞成功',
      })
    }
    that.setData({
      IsZan: !IsZan
    })
  },  
  CollectOpt() { //收藏操作
    var that = this;
    var IsCollect = that.data.IsCollect;
    if (IsCollect) { //取消收藏
      wx.showToast({
        title: '已取消收藏',
      })
    } else {
      wx.showToast({
        title: '收藏成功',
      })
    }
    that.setData({
      IsCollect: !IsCollect
    })
  },
  tapTab(e) { //切换tab
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.tab
    })
  },
  getComment(e) { //获取评论
    this.setData({
      comment: e.detail.value
    })
  },
  sendMsgOpt() { //发送评论
    var that = this;
    var comment = that.data.comment;
    if (comment.length > 0) {
      //TODO 请求接口进行发送
      that.setData({
        comment: ""
      })
      wx.showToast({
        title: '评论成功',
        duration: 2000
      })
    } else {
      WxRequest.ShowAlert("请输入您的评论");
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