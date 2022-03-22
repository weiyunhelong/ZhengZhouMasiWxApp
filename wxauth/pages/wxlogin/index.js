// wxauth/pages/wxlogin/index.js
var WxRequest = require('../../../utils/WxRequest.js');
var requestUrl = getApp().globalData.requestUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkTab: 1, //选中的tab
    account: "", //账号
    pwd: "", //密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapTabOpt(e) { //切换tab
    var that = this;
    that.setData({
      chkTab: e.currentTarget.dataset.tab
    })
  },
  getAccount(e) { //获取账号
    this.setData({
      account: e.detail.value
    })
  },
  getPwd(e) { //获取密码
    this.setData({
      pwd: e.detail.value
    })
  },
  forgetpwdOpt(e) { //忘记密码
    wx.navigateTo({
      url: '../auth/password',
    })
  },
  loginOpt() { //登录操作
    var that = this;
    var chkTab = that.data.chkTab, //选中的tab
      account = that.data.account, //账号
      pwd = that.data.pwd; //密码

    if (account == "") {
      WxRequest.ShowAlert("请输入您的账号");
    } else if (pwd == "") {
      WxRequest.ShowAlert("请输入您的密码");
    } else if (chkTab == 1) { //学生登录
      //TODO 学生登录
      var url = requestUrl + "/API/LoginApi/Login?account=" + account + "&password=" + pwd;
      var params = {};
      WxRequest.PostRequest(url, params).then(res => {
       
        if (res.data.success) {
          getApp().globalData.userInfo = res.data.data;
          getApp().globalData.WxUserId = res.data.data.id;
          if (res.data.data.ReadName == null || res.data.data.ReadName == '') {
            wx.redirectTo({
              url: '../auth/info',
            })
          } else {
            wx.setStorage({
              key: "loginObj",
              data: "account:" + account + ",pwd:" + pwd + ",type:1",
              success: function () {
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
          }
        }else{
          WxRequest.ShowAlert(res.data.msg);
        }
      })
    } else if (chkTab == 2) { //教师登录

      var url = requestUrl + "/API/LoginApi/Login?account=" + account + "&password=" + pwd;
      var params = {};
      WxRequest.PostRequest(url, params).then(res => {
       
        if (res.data.success) {
          getApp().globalData.userInfo = res.data.data;
          getApp().globalData.WxUserId = res.data.data.id;
          if (res.data.data.ReadName == null || res.data.data.ReadName == '') {
            wx.redirectTo({
              url: '../auth/info',
            })
          } else {
            wx.setStorage({
              key: "loginObj",
              data: "account:" + account + ",pwd:" + pwd + ",type:2",
              success: function () {
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
           
          }
        }else{
          WxRequest.ShowAlert(res.data.msg);
        }
      })
      
    }
  },
  wxOpt() { //微信登录

    var that = this;
    if (that.data.account == "") {
      WxRequest.ShowAlert("请输入您的账号");
    } else {
      var url = requestUrl + "/API/LoginApi/BindWeiXin?account=" + that.data.account + "&openid=" + getApp().globalData.openId;
      WxRequest.PostRequest(url, {}).then(res => {

        if (res.data.success) {
          var wxurl = requestUrl + "/API/LoginApi/WXLogin?openid=" + getApp().globalData.openId;
          WxRequest.PostRequest(wxurl, {}).then(res => {
            
            if (res.data.success) {
              getApp().globalData.userInfo = res.data.data;
              getApp().globalData.WxUserId = res.data.data.id;
              if (res.data.data.ReadName == null || res.data.data.ReadName == '') {
                wx.redirectTo({
                  url: '../auth/info',
                })
              } else {
                wx.setStorage({
                  key: "loginObj",
                  data: "account:" + account + ",pwd:" + pwd + ",type:3",
                  success: function () {
                    wx.navigateBack({
                      delta: 1,
                    })
                  }
                })
               
              }
            }else{
              WxRequest.ShowAlert(res.data.msg);
            }
          })
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