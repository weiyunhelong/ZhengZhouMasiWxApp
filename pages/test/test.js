// pages/test/test.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');
var timer="";//倒计时

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clock:"",//倒计时
    showMask: false,
    showMaskAni: false,
    showModal: false,
    showModalAni: false,
    list:[],
    chkoption:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.InitData();
  },
  InitData(){
    var that=this;
    var list=[];
    for(var i=0;i<100;i++){
      list.push(i);
    }
    that.setData({
      list:list
    })
  },
  tapOption(e){//初始化选项
    var that=this;
    that.setData({
      chkoption:e.currentTarget.dataset.index
    })
  },
  nomove() {
    return false;
  },
  postOpt() { //交卷操作
    this.setData({
      showMask: true,
      showMaskAni: true,
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
  confirmOpt(){
    var that=this;
    wx.redirectTo({
      url: '../test/result',
      complete:function(){
        that.cancelOpt();
      }
    })
  },
  checkOpt(){//查看答题过程
    this.setData({
      showModal: true,
      showModalAni: true,
    })
  },
  cancelModal(){
    this.setData({
      showModalAni: false,
    })
    setTimeout(() => {
      this.setData({
        showModal: false
      })
    }, 1000);
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