// pages/shidu/chapter.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showloadingMask:true,
    chktab: 1, //1:声音 2:简介 3:评论
    id: 0,
    dataobj: {},
    commentId: 0, //
    placeholdertxt: "发布留言...",
    comment: "", //评论
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
  tapTab(e) { //点击切换tab
    this.setData({
      chktab: e.currentTarget.dataset.tab
    })
  },
  collectOpt() { //收藏操作
    var that = this;
    var dataobj = that.data.dataobj;
    var url = requestUrl;
    var params = "";
    if (dataobj.IsCollect) { //取消收藏操作
      url += "/API/ReadRedTimeApi/CancelCollect";
      params += "?userId=" + getApp().globalData.WxUserId + "&id=" + dataobj.ID;
    } else { //收藏操作
      url += "/API/ReadRedTimeApi/Collect";
      params += "?userId=" + getApp().globalData.WxUserId + "&id=" + dataobj.ID + "&title=" + dataobj.Name + "&thumbnail=" + dataobj.Thumbnail;
    }
    WxRequest.PostRequest(url + params, {}).then(res => {
      if (res.data.success) {
        dataobj.IsCollect = !dataobj.IsCollect;
        that.setData({
          dataobj: dataobj
        })
        WxRequest.ShowAlert(res.data.msg)
      }
    })
  },
  goDetail(e) { //跳转到章节详情
    wx.navigateTo({
      url: '../shidu/detail?id=' + e.currentTarget.dataset.id
    })
  },
  getComment(e) { //获取评论内容
    this.setData({
      comment: e.detail.value
    })
  },
  tapFeedback(e) { //点击回复
    var that = this;
    var commId = e.currentTarget.dataset.id;
    var commName = e.currentTarget.dataset.name;
    that.setData({
      commentId: commId, //
      placeholdertxt: "回复" + commName + ":",
    })
  },
  sendMsgOpt() { //发布评论
    var that = this;
    var commentId = that.data.commentId;
    var comment = that.data.comment;
    var dataobj = that.data.dataobj;
    if (comment == "") {
      WxRequest.ShowAlert("请输入评论内容");
    } else if (commentId == 0) { //评论
      var url = requestUrl + "/API/ReadRedTimeApi/PostComment?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id + "&contents=" + comment + "&title=" + dataobj.Name + "&thumbnail=" + dataobj.Thumbnail;
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          wx.showToast({
            title: '评论成功',
          })
          that.setData({
            comment: ""
          })
          that.InitData();
        }
      })
    } else { //回复
      var url = requestUrl + "/API/ReadRedTimeApi/ReplyComment?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id + "&contents=" + comment + "&title=" + dataobj.Name + "&thumbnail=" + dataobj.Thumbnail + "&commentId=" + commentId + "&level=1";
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          wx.showToast({
            title: '评论回复成功',
          })
          that.setData({
            placeholdertxt: "发布留言...",
            commentId: 0,
            comment: ""
          })
          that.InitData();
        }
      })
    }
  },
  ZanCommentOpt(e) { //点赞
    var that = this;
    var dataobj = that.data.dataobj;
    var commId = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    var index = e.currentTarget.dataset.index;
    var likenum = e.currentTarget.dataset.num;

    if (status == false) {
      var url = requestUrl + "/API/ReadRedTimeApi/LikeComment?userId=" + getApp().globalData.WxUserId + "&commentId=" + commId + "&level=0&title=" + dataobj.Name + "&thumbnail=" + dataobj.Thumbnail;
      WxRequest.PostRequest(url, {}).then(res => {

        if (res.data.success) {
          dataobj.CommentList[index].IsLike = true;
          dataobj.CommentList[index].LikesNum = likenum + 1;
          that.setData({
            dataobj: dataobj
          })
          wx.showToast({
            title: '点赞成功',
          })
        } else {
          WxRequest.ShowAlert(res.data.msg);
        }
      })
    } else {
      var url = requestUrl + "/API/ReadRedTimeApi/CancelLikeComment?userId=" + getApp().globalData.WxUserId + "&commentId=" + commId + "&level=0";
      WxRequest.PostRequest(url, {}).then(res => {

        if (res.data.success) {
          dataobj.CommentList[index].IsLike = false;
          dataobj.CommentList[index].LikesNum = likenum - 1;
          that.setData({
            dataobj: dataobj
          })
          wx.showToast({
            title: '点赞已取消',
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
        //获取数据
        that.InitData();
      }
    })
  },
  InitData() { //获取数据
    var that = this;
    var url = requestUrl + "/API/ReadRedTimeApi/GetReadRedTimeDetail?userId" + getApp().globalData.WxUserId + "&id=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          dataobj: res.data.data
        })
      }
      setTimeout(() => {
        that.setData({
          showloadingMask:false
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
    var that = this;
    var url = requestUrl + "/API/ReadRedTimeApi/Foward?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {});

  }
})