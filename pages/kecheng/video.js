// pages/kecheng/detail.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showloadingMask:true,
    chktab: 1, //1：文章赏析 2：学习交流
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
      id: options.id
    })

    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          navigationBarHeight: res.statusBarHeight
        })
      },
    })
  },
  goBackOpt() { //点击返回
    wx.navigateBack({
      delta: 1,
    })
  },
  ViewVideoOpt(e) { //保存播放记录
    var that = this;
    var url = requestUrl + "/API/FourHistoryApi/SavePlayhistory?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id + "&progress=" + e.detail.currentTime;

    WxRequest.PostRequest(url, {}).then(res => {});

  },
  ZanOpt() { //点赞操作
    var that = this;
    var dataobj = that.data.dataobj;
    var IsZan = dataobj.IsLike;

    if (IsZan) { //取消点赞

      var url = requestUrl + "/API/ManuscriptApi/CancelLike?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id;
      WxRequest.PostRequest(url, {}).then(res => {

        if (res.data.success) {
          dataobj.IsLike = false;
          dataobj.LikesNum = dataobj.LikesNum - 1;

          that.setData({
            dataobj: dataobj
          })
          wx.showToast({
            title: '已取消点赞',
          })
        } else {
          WxRequest.ShowAlert(res.data.msg);
        }
      })

    } else {

      var url = requestUrl + "/API/ManuscriptApi/Like?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id;
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          dataobj.IsLike = true;
          dataobj.LikesNum = dataobj.LikesNum + 1;

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
    }
  },
  CollectOpt() { //收藏操作
    var that = this;
    var dataobj = that.data.dataobj;
    var IsCollect = dataobj.IsCollect;
    if (IsCollect) { //取消收藏
      var url = requestUrl + "/API/ManuscriptApi/CancelCollect?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id;
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          dataobj.IsCollect = false;
          dataobj.CollectionNum = dataobj.CollectionNum - 1;
          that.setData({
            dataobj: dataobj
          })
          wx.showToast({
            title: '已取消收藏',
          })
        } else {
          WxRequest.ShowAlert(res.data.msg);
        }
      })
    } else {
      var url = requestUrl + "/API/ManuscriptApi/Collect?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id;
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          dataobj.IsCollect = true;
          dataobj.CollectionNum = dataobj.CollectionNum + 1;
          that.setData({
            dataobj: dataobj
          })
          wx.showToast({
            title: '收藏成功',
          })
        } else {
          WxRequest.ShowAlert(res.data.msg);
        }
      })
    }
  },
  tapTab(e) { //切换tab
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.tab
    })
    that.InitData();
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
    var url = requestUrl + "/API/ManuscriptApi/PostComment?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id + "&contents=" + comment;

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
    var url = requestUrl + "/API/ManuscriptApi/ReplyComment?userId=" + getApp().globalData.WxUserId + "&commentId=" + id + "&contents=" + comment;

    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        wx.showToast({
          title: '评论成功',
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
      var url = requestUrl + "/API/ManuscriptApi/LikeComment?userId=" + getApp().globalData.WxUserId + "&commentId=" + id;
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
      var url = requestUrl + "/API/ManuscriptApi/CancelLikeComment?userId=" + getApp().globalData.WxUserId + "&commentId=" + id;
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
  InitData() { //获取创课详情
    var that = this;
    var url = requestUrl + "/API/ManuscriptApi/GetManuscriptDetail?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id;

    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        var dataobj = res.data.data;
        if(dataobj.Audio!=null&&Audio!=''){
          wx.redirectTo({
            url: '../kecheng/detail?id='+that.data.id,
          })
        }else{
          dataobj.Progress = dataobj.Progress == "" ? '0:00' : dataobj.Progress;
          that.setData({
            dataobj: dataobj
          })
        }
      } else {
        WxRequest.ShowAlert("该记录已不存在");
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 2000);
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
    var dataobj = that.data.dataobj;
    var url=requestUrl+"/API/ManuscriptApi/Foward?userId="+getApp().globalData.WxUserId+"&id="+dataobj.id;
    WxRequest.PostRequest(url,{}).then(res=>{});
    return {
      title: dataobj.Title,
      imageUrl: dataobj.Thumbnail,
      path: "pages/kecheng/video?id=" + that.data.id
    }
  }
})