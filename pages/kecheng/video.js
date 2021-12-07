// pages/kecheng/video.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    dataobj: {},
    chktab: 1, //1：文章赏析 2：学习交流
    IsPlay: false, //是否在播放状态   
    comment: "", //评论   
    commentList:[],//评论列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    })
  },
  playOpt() { //播放操作
    var that = this;
    that.setData({
      IsPlay: true
    })
  },
  pauseOpt() { //暂停操作
    var that = this;
    that.setData({
      IsPlay: false
    })
  },  
  SaveVideoProgress(progress){//保存播放记录
    var that = this;
    var url = requestUrl + "/API/ManuscriptApi/SavePlayhistory?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id + "&progress=" + progress;

    WxRequest.PostRequest(url, {}).then(res => {

    })
  },
  ZanOpt() { //点赞操作
    var that = this;
    var IsZan = that.data.IsZan;

    if (IsZan) { //取消点赞

      var url = requestUrl + "/API/ManuscriptApi/CancelLike?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id;
      WxRequest.PostRequest(url, {}).then(res => {

      })
      wx.showToast({
        title: '已取消点赞',
      })
    } else {

      var url = requestUrl + "/API/ManuscriptApi/Like?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id;
      WxRequest.PostRequest(url, {}).then(res => {

      })

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
      var url = requestUrl + "/API/ManuscriptApi/CancelCollect?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id;
      WxRequest.PostRequest(url, {}).then(res => {

      })

      wx.showToast({
        title: '已取消收藏',
      })
    } else {
      var url = requestUrl + "/API/ManuscriptApi/Collect?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id;
      WxRequest.PostRequest(url, {}).then(res => {

      })

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
      if (that.data.commentId != 0) {
        that.PostComment(comment, that.data.commentId);
      } else {
        that.PostComment(comment);
      }
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
  PostComment(comment) { //提交评论
    var that = this;
    var url = requestUrl + "/API/ManuscriptApi/PostComment?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id + "&contents=" + comment;

    WxRequest.PostRequest(url, {}).then(res => {

    })
  },
  PostFeedback(comment, id) { //提交回复评论
    var that = this;
    var url = requestUrl + "/API/ManuscriptApi/ReplyComment?userId=" + getApp().globalData.WxUserId + "&commentId=" + id + "&contents=" + comment;

    WxRequest.PostRequest(url, {}).then(res => {

    })
  },
  ZanCommentOpt(e) { //点赞评论
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;

    if (status == "false") {
      var url = requestUrl + "/API/ManuscriptApi/LikeComment?userId=" + getApp().globalData.WxUserId + "&commentId=" + id;
      WxRequest.PostRequest(url, {}).then(res => {

      })
    }else{
      var url = requestUrl + "/API/ManuscriptApi/CancelLikeComment?userId=" + getApp().globalData.WxUserId + "&commentId=" + id;
      WxRequest.PostRequest(url, {}).then(res => {

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

  },
  InitData() { //获取创课详情
    var that = this;
    var url = requestUrl + "/API/ManuscriptApi/GetManuscriptDetail?userId="+getApp().globalData.WxUserId+"&id="+that.data.id;

    WxRequest.PostRequest(url,{}).then(res=>{
      
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