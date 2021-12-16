// my/pages/info/pwd.js
var WxRequest = require('../../../utils/WxRequest.js');
var validator = require('../../../utils/validator.js');
var requesturl = getApp().globalData.requestUrl;
var timer = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "", //手机号
    code: "", //验证码
    recode: "123456", //短信验证码
    clock: 60,
    pwd:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getPhone(e) { //获取手机号
    this.setData({
      phone: e.detail.value
    })
  },
  sendCode() { //发送短信验证码
    var that = this;
    if (that.data.phone == "") {
      WxRequest.ShowAlert("请输入手机号");
    } else if (!validator.validateMobile(that.data.phone)) {
      WxRequest.ShowAlert("手机号不正确");
    } else {
      timer = setInterval(function () {
        var clock = that.data.clock;
        if (clock == 0) {
          clearInterval(timer);
          that.setData({
            clock: 60
          })
        } else {
          //TODO 发送短信
          that.setData({
            clock: clock - 1
          })
        }

      }, 1000)
    }
  },
  getCode(e) { //获取验证码
    this.setData({
      code: e.detail.value
    })
  },
  getPwd(e) { //获取新密码
    this.setData({
      pwd: e.detail.value
    })
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