// wxauth/pages/auth/password.js
var WxRequest = require('../../../utils/WxRequest.js');
var validator = require('../../../utils/validator.js');
var requestUrl = getApp().globalData.requestUrl;
var timer = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "", //手机号
    code: "", //验证码
    recode: "", //短信验证码
    clock: 60,
    pwd: "",
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
      var url = requestUrl + "/API/PublicDataApi/SendMsgCode?contact=" + that.data.phone;
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          that.setData({
            recode: res.data.data.msgcode
          })
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
        } else {
          WxRequest.ShowAlert(res.data.msg);
        }
      })
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
  confirmOpt() { //修改密码
    var that = this;

    var phone = that.data.phone, //手机号
      code = that.data.code, //验证码
      recode = that.data.recode, //短信验证码
      pwd = that.data.pwd;

    if (phone == "") {
      WxRequest.ShowAlert("请输入手机号");
    } else if (!validator.validateMobile(phone)) {
      WxRequest.ShowAlert("手机号不正确");
    } else if (code == "") {
      WxRequest.ShowAlert("请输入验证码");
    } else if (recode != code) {
      WxRequest.ShowAlert("验证码错误");
    } else if (pwd == "") {
      WxRequest.ShowAlert("请输入密码");
    } else {
      var url = requestUrl + "/API/UserCenterApi/UpdateUserPassWord?userid="+getApp().globalData.WxUserId+"&newpwd="+pwd;
      WxRequest.PostRequest(url, {}).then(res => {
        if (res.data.success) {
          wx.showToast({
            title: '修改密码成功',
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