// my/pages/info/nickname.js
var WxRequest = require('../../../utils/WxRequest.js');
var validator = require('../../../utils/validator.js');
var requestUrl = getApp().globalData.requestUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    val: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      val: options.name
    })
  },
  getval(e) {
    this.setData({
      val: e.detail.value
    })
  },
  finshOpt() {
    var that = this;
    var val = that.data.val;
    if (val == "") {
      WxRequest.ShowAlert("请输入您的昵称");
    } else {
      //TODO 请求接口
      var url = requestUrl + "/API/LoginApi/UpdateUserNickName?UserID=" + getApp().globalData.WxUserId + "&nickName=" + val;
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          getApp().globalData.userInfo.NickName = val;
          wx.showToast({
            title: '保存成功',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 2000);
        }else{
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