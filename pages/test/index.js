// pages/test/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMask: false,
    showMaskAni: false,
    id: 0,
    list: [],
    dataobj: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  nomove() {
    return false;
  },
  goTest(e) { //跳转到测试
    var dataobj = e.currentTarget.dataset.obj;

    this.setData({
      showMask: true,
      showMaskAni: true,
      dataobj: dataobj
    })
  },
  cancelOpt() {
    this.setData({
      showMaskAni: false,
    })
    setTimeout(() => {
      this.setData({
        showMask: false
      })
    }, 1000);
  },
  confirmOpt() {
    var that = this;
    var url = requestUrl + "/API/ExamAnswer/SaveTestGradesInfo?tid=" + that.data.dataobj.ID + "&uid=" + getApp().globalData.WxUserId;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        wx.navigateTo({
          url: '../test/test?tid=' + that.data.dataobj.ID + "&tgid=" + res.data.data.testgradesid + "&clock=" + that.data.dataobj.Duration,
          complete: function () {
            that.cancelOpt();
          }
        })
      } else {
        WxRequest.ShowAlert(res.data.msg);
      }
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
    var that = this;
    if (getApp().globalData.WxUserId == 0) {
      getApp().ChargeLogin().then(res => {
        if (getApp().globalData.WxUserId == 0) {
          wx.navigateTo({
            url: '../../wxauth/pages/wxlogin/index',
          })
        }
      })
    } else {
      //获取全部试卷
      that.InitData();
    }
  },
  InitData() { //获取全部试卷
    var that = this;
    var url = requestUrl + "/API/ExamAnswer/TestPaperList?pid=" + that.data.id + "&uid=" + getApp().globalData.WxUserId;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          list: res.data.data.datas
        })
      }
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

  }
})