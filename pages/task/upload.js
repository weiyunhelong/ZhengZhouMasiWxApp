// pages/task/upload.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0, //
    taskid: 0,
    title: "",
    desc: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
      taskid: options.taskid,
    })
  },
  getTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  getInfo(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  PostOpt() { //点击提交
    var that = this;
    var id = that.data.id, //
      title = that.data.title,
      desc = that.data.desc;

    if (title == "") {
      WxRequest.ShowAlert("请输入作品标题");
    } else if (desc == "") {
      WxRequest.ShowAlert("请输入作品内容");
    } else {
      //TODO 请求接口
      var url = requestUrl + "/API/PracticalTask/UploadWork";
      var params = {
        PracticalID: id,
        TaskID: that.data.taskid,
        UserID: getApp().globalData.WxUserId,
        Title: title,
        Contents: desc
      };
      WxRequest.PostRequest(url, params).then(res => {
        if (res.data.success) {
          wx.showToast({
            title: '上传作品成功',
            duration: 2000
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
      menus: ['shareAppMessage', 'shareTimeline']
    })
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