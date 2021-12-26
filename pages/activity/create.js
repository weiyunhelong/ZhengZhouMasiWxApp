// pages/activity/create.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');
var validator = require('../../utils/validator.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    actstartdt: "",
    actenddt: "",
    bookstartdt: "",
    bookenddt: "",
    name: "",
    number: "",
    title: "",
    desc: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getActStartDt(e) {
    this.setData({
      actstartdt: e.detail.value
    })
  },
  getActEndDt(e) {
    this.setData({
      actenddt: e.detail.value
    })
  },
  getBookStartDt(e) {
    this.setData({
      bookstartdt: e.detail.value
    })
  },
  getBookEndDt(e) {
    this.setData({
      bookenddt: e.detail.value
    })
  },
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getNumber(e) {
    this.setData({
      number: e.detail.value
    })
  },
  getTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  getDesc(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  postOpt() {
    var that=this;
    var actstartdt=that.data.actstartdt,
    actenddt=that.data.actenddt,
    bookstartdt=that.data.bookstartdt,
    bookenddt=that.data.bookenddt,
    name=that.data.name,
    number=that.data.number,
    title=that.data.title,
    desc=that.data.desc;

    if(actstartdt==""){
      WxRequest.ShowAlert("请选择活动开始时间");
    }else if(actenddt==""){
      WxRequest.ShowAlert("请选择活动结束时间");
    }else if(bookstartdt==""){
      WxRequest.ShowAlert("请选择预约开始时间");
    }else if(bookenddt==""){
      WxRequest.ShowAlert("请选择预约结束时间");
    }else if(name==""){
      WxRequest.ShowAlert("请输入发起人");
    }else if(number==""){
      WxRequest.ShowAlert("请设置活动人数");
    }else if(title==""){
      WxRequest.ShowAlert("请输入活动标题");
    }else if(desc==""){
      WxRequest.ShowAlert("请输入活动内容");
    }else{
        //TODO 请求接口
        wx.showToast({
          title: '创建活动成功',
          duration:2000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 2000);
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