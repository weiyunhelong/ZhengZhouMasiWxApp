// yunsystem/pages/record/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');
var timeTool = require('../../../utils/time.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goDetail(e) { //跳转到详情
    wx.navigateTo({
      url: '../info/index?id=' + e.currentTarget.dataset.id,
    })
  },
  ScanOpt() { //扫码操作
    wx.navigateTo({
      url: '../scan/index',
    })
  },
  goHome() { //首页
    wx.redirectTo({
      url: '../home/index',
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

    getApp().ChargeLogin().then(res => {
      if (getApp().globalData.WxUserId == 0) {
        wx.navigateTo({
          url: '../../../wxauth/pages/wxlogin/index',
        })
      } else {
        that.InitData();
      }
    })
  },
  InitData(){
    var that=this;
    var url=requestUrl+"/API/CloudExhibition/GetCloudExhibitionMyList?userid="+getApp().globalData.WxUserId+"&rows=10&newtime="+timeTool.getNowDate();
    WxRequest.PostRequest(url,{}).then(res=>{
      if(res.data.success){
        that.setData({
          list:res.data.data==""?[]:res.data.data.datas
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