// wxauth/pages/auth/study.js
var WxRequest = require('../../../utils/WxRequest.js');
var validator = require('../../../utils/validator.js');
var requesturl = getApp().globalData.requestUrl;
var timer = '';
var OssTool = require('../../../ossutils/uploadFile.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tx: "", //头像
    nickName: "", //昵称
    name: "", //姓名
    sexs: ["保密", '男', '女'],
    sex: -1, //性别
    desc: "", //签名
    phone: "", //手机号
    code: "", //验证码
    recode: "123456", //短信验证码
    clock: 60,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseTx() { //上传头像
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片 
        OssTool.uploadImgFile(res.tempFilePaths[0], 'avatarUrl/' + getApp().globalData.openId + '/',
          function (result) {
            that.setData({
              tx: result
            })
          })
      }
    })
  },
  getNickName(e) { //获取昵称
    this.setData({
      nickName: e.detail.value
    })
  },
  getName(e) { //获取姓名
    this.setData({
      name: e.detail.value
    })
  },
  sexChkOpt(e) { //性别
    this.setData({
      sex: e.detail.value
    })
  },
  getDesc(e) { //获取签名
    this.setData({
      desc: e.detail.value
    })
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
  finishOpt() { //点击完成
    var that = this;
    var tx = that.data.tx, //头像
      nickName = that.data.nickName, //昵称
      name = that.data.name, //姓名
      sex = that.data.sex, //性别
      desc = that.data.desc, //签名
      phone = that.data.phone, //手机号
      code = that.data.code, //验证码
      recode = that.data.recode; //短信验证码

    if (tx == "") {
      WxRequest.ShowAlert("请上传头像");
    } else if (nickName == "") {
      WxRequest.ShowAlert("请输入昵称");
    } else if (name == "") {
      WxRequest.ShowAlert("请输入姓名");
    } else if (sex == -1) {
      WxRequest.ShowAlert("请选择性别");
    } else if (desc == "") {
      WxRequest.ShowAlert("请输入签名");
    } else if (phone == "") {
      WxRequest.ShowAlert("请输入手机号");
    } else if (!validator.validateMobile(phone)) {
      WxRequest.ShowAlert("手机号不正确");
    } else if (code == "") {
      WxRequest.ShowAlert("请输入验证码");
    } else if (code != recode) {
      WxRequest.ShowAlert("验证码不正确");
    } else {
      //TODO 提交表单
      var url = requestUrl + "/API/LoginApi/CompleteUserInfo?verifyCode=" + code;
      var params = {
        ID: getApp().globalData.WxUserId,
        Avatar: that.data.tx,
        NickName: that.data.nickName,
        ReadName: that.data.name,
        Sex: that.data.sex,
        Asign: that.data.desc,
        mobile: that.data.phone
      };
      WxRequest.PostRequest(url, params).then(res => {

      })
      wx.setStorage({
        key: "loginobj",
        data: {
          tx: that.data.tx, //头像
          nickName: that.data.nickName, //昵称
          name: that.data.name, //姓名
          sex: that.data.sex, //性别
          desc: that.data.desc, //签名
          phone: that.data.phone
        },
        success: function () {
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }
  },
  skipOpt() { //点击跳过
    var that = this;
    wx.navigateBack({
      delta: 1,
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

  }
})