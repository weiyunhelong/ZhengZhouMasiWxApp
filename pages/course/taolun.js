// pages/course/taolun.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0, //
    title: "",
    info: "",
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
  getTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  getInfo(e) {
    this.setData({
      info: e.detail.value
    })
  },
  PostOpt() { //点击提交
    var that = this;
    var id = that.data.id, //
      title = that.data.title,
      info = that.data.info;

    if (title == "") {
      WxRequest.ShowAlert("请输入讨论标题");
    } else if (info == "") {
      WxRequest.ShowAlert("请输入讨论内容");
    } else {
      //TODO 请求接口
      var url = requestUrl + "/API/TopicInforList/SaveTopicInfor";
      var params = {
        PracticalID: id,
        UserId: getApp().globalData.WxUserId,
        Title: title,
        Contents: info,
      };
      WxRequest.PostFormRequest(url, params).then(res => {
        if (res.data.success) {
          wx.showToast({
            title: '发起讨论成功',
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