// pages/course/taolundetail.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    dataobj: {},
    commentId: 0, //
    placeholdertxt: "说点什么吧...",
    comment: "", //评论
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
      practicalid:options.pid
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
      if (that.data.commentId == 0) {
        that.PostComment(comment);
      } else {
        that.PostFeedback(comment, that.data.commentId);
      }
    } else {
      WxRequest.ShowAlert("请输入您的评论");
    }
  },
  tapFeedback(e) { //点击选中需要回复的评论
    var that = this;
    that.setData({
      commentId: e.currentTarget.dataset.id,
      placeholdertxt: "回复" + e.currentTarget.dataset.name + ":"
    })
  },
  PostComment(comment) { //提交评论
    var that = this;
    var url = requestUrl + "/API/TopicInforList/PostComment?userId=" + getApp().globalData.WxUserId + "&themeid=" + that.data.id + "&contents=" + comment+"&practicalid="+that.data.practicalid;

    WxRequest.PostRequest(url, {}).then(res => {

      if (res.data.success) {
        wx.showToast({
          title: '评论成功',
          duration: 2000
        })
        that.setData({
          comment: "",
          commentId: 0,
          placeholdertxt: "说点什么吧...",
        })
        that.InitData();
      } else {
        WxRequest.ShowAlert(res.data.msg);
      }
    })
  },
  PostFeedback(comment, id) { //提交回复评论
    var that = this;
    var url = requestUrl + "/API/TopicInforList/ReplyComment?userId=" + getApp().globalData.WxUserId + "&commentid=" + id + "&contents=" + comment+"&practicalid="+that.data.practicalid;

    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        wx.showToast({
          title: '回复成功',
          duration: 2000
        })
        that.setData({
          commentId: 0,
          placeholdertxt: "说点什么吧...",
          comment: ""
        })
        that.InitData();
      } else {
        WxRequest.ShowAlert(res.data.msg);
      }
    })
  },
  ShowMoreComment(e) { //点击展开
    var that = this;
    var dataobj = that.data.dataobj;
    var index = e.currentTarget.dataset.index;
    dataobj.CommentList[index].IsOpen = true;
    that.setData({
      dataobj: dataobj
    })
  },
  ZanCommentOpt(e) { //点赞评论
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    var dataobj = that.data.dataobj;

    if (status == false) {
      var url = requestUrl + "/API/TopicInforList/LikeComment?userid=" + getApp().globalData.WxUserId + "&commentid=" + id;
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          dataobj.CommentList[index].IsLike = true;
          that.setData({
            dataobj: dataobj
          })
          wx.showToast({
            title: '点赞评论成功',
            duration: 2000
          })
        } else {
          WxRequest.ShowAlert(res.data.msg);
        }
      })
    } else {
      var url = requestUrl + "/API/TopicInforList/CancelLikeComment?userid=" + getApp().globalData.WxUserId + "&commentid=" + id;
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          dataobj.CommentList[index].IsLike = false;
          that.setData({
            dataobj: dataobj
          })
          wx.showToast({
            title: '已取消评论点赞',
            duration: 2000
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
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.InitData();
  },
  InitData() { //获取详情
    var that = this;
    var url = requestUrl + "/API/TopicInforList/GetTopicInforDetail?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        var dataobj = res.data.data;
        that.setData({
          dataobj: dataobj
        })
      } else {
        WxRequest.ShowAlert("该记录已不存在");
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 2000);
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