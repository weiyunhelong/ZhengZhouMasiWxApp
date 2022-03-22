// pages/shidu/detail.js
var requestUrl = getApp().globalData.requestUrl;
const time = require('../../utils/time.js');
var WxRequest = require('../../utils/WxRequest.js');
const myaudio = wx.createInnerAudioContext({}); //录音播放
var timer = ""; //计时器

Page({

  /**
   * 页面的初始数据
   */
  data: {
    IsPlay: false, //判断是否在播放
    chktab: 1, //1：介绍 2：学习交流
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
  CollectOpt() { //收藏操作
    var that = this;
    var dataobj = that.data.dataobj;
    var url = requestUrl;
    var params = "";
    if (dataobj.IsCollect) { //取消收藏操作
      url += "/API/ReadRedTimeApi/CancelCollect";
      params += "?userId=" + getApp().globalData.WxUserId + "&id=" + dataobj.ID;
    } else { //收藏操作
      url += "/API/ReadRedTimeApi/Collect";
      params += "?userId=" + getApp().globalData.WxUserId + "&id=" + dataobj.ID + "&title=" + dataobj.Title + "&thumbnail=" + dataobj.Thumbnail;
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
  playOpt() { //播放操作
    var that = this;
    var dataobj = that.data.dataobj;
    var src = dataobj.Audio;
    myaudio.src = src;
    if (dataobj.Progress != "0:00") {
      var currtime = dataobj.Progress;
      var secnum = parseInt(currtime.split(':')[0]) * 60 + parseInt(currtime.split(':')[1]);
      myaudio.seek(secnum);
    }
    myaudio.play();
    that.setData({
      IsPlay: true,
      playSTime: new Date().getTime()
    })
    timer = setInterval(function () {
      var dataobj = that.data.dataobj;
      dataobj.Progress = time.AddSeconds(dataobj.Progress, 1);
      that.setData({
        dataobj: dataobj
      })
      if (dataobj.Progress == dataobj.summarytime) {
        clearInterval(timer);
        that.pauseOpt();
      }
    }, 1000)

  },
  pauseOpt() { //暂停操作
    var that = this;
    myaudio.pause();
    that.setData({
      IsPlay: false
    })
    myaudio.onPause(function (res) {
      clearInterval(timer);
      var dataobj = that.data.dataobj;
      that.SaveVideoProgress(dataobj.Progress);
    })
  },
  SaveVideoProgress(progress) { //保存播放记录
    var that = this;
    var dataobj = that.data.dataobj;
    var url = requestUrl + "/API/ReadRedTimeApi/SavePlayhistory";
    var params = {
      userId: getApp().globalData.WxUserId,
      RID: dataobj.ID,
      TypeID: 0,
      Level: 1,
      Progress: progress,
      Title: dataobj.Title,
      Thumbnail: dataobj.Thumbnail
    };
    WxRequest.PostRequest(url, params).then(res => {});

  },
  prebtnOpt() { //前一个
    var that = this;
    var dataobj = that.data.dataobj;
    if (dataobj.PreID == 0) {
      wx.redirectTo({
        url: '../shidu/detail?id=' + dataobj.PreID,
      })
    } else {
      WxRequest.ShowAlert("已是第一个");
    }
  },
  nextbtnOpt() { //下一个
    var that = this;
    var dataobj = that.data.dataobj;
    if (dataobj.NextID == 0) {
      wx.redirectTo({
        url: '../shidu/detail?id=' + dataobj.NextID,
      })
    } else {
      WxRequest.ShowAlert("已是最后一个");
    }
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
    var dataobj = that.data.dataobj;
    var url = requestUrl + "/API/ReadRedTimeApi/PostManuComment?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id + "&contents=" + comment + "&title=" + dataobj.Title + "&thumbnail=" + dataobj.Thumbnail;

    WxRequest.PostRequest(url, {}).then(res => {

      if (res.data.success) {
        wx.showToast({
          title: '评论成功',
          duration: 2000
        })
        that.setData({
          comment: "",
          commentId: 0,
          placeholdertxt: "发布留言...",
        })
        that.InitData();
      } else {
        WxRequest.ShowAlert(res.data.msg);
      }
    })
  },
  PostFeedback(comment, commentId) { //提交回复评论
    var that = this;
    var dataobj = that.data.dataobj;
    var url = requestUrl + "/API/ReadRedTimeApi/ReplyComment?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id + "&contents=" + comment + "&title=" + dataobj.Title + "&thumbnail=" + dataobj.Thumbnail + "&commentId=" + commentId + "&level=1"

    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        wx.showToast({
          title: '回复成功',
          duration: 2000
        })
        that.setData({
          commentId: 0,
          placeholdertxt: "发布留言...",
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
    var commId = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    var dataobj = that.data.dataobj;

    if (status == false) {
      var url = requestUrl + "/API/ReadRedTimeApi/LikeComment?userId=" + getApp().globalData.WxUserId + "&commentId=" + commId + "&level=1&title=" + dataobj.Title + "&thumbnail=" + dataobj.Thumbnail;
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
      var url = requestUrl + "/API/ReadRedTimeApi/CancelLikeComment?userId=" + getApp().globalData.WxUserId + "&commentId=" + commId + "&level=1";
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
        //获取数据
        that.InitData();
      }
    })
  },
  InitData() { //获取详情
    var that = this;
    var url = requestUrl + "/API/ReadRedTimeApi/GetRedManuDetail?userId=" + getApp().globalData.WxUserId + "&id=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {

      if (res.data.success) {
        var dataobj = res.data.data;
        dataobj.summarytime = "02:30";
        dataobj.Progress = dataobj.Progress == "" ? '0:00' : dataobj.Progress;
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
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(timer);
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