// pages/course/jidi.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    dataobj: {},
    IsVr: true, //是否有VR视频
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
      courseid:options.courseid
    })
    //获取基地详情
    that.InitData();
  },
  InitData(){//获取基地详情
    var that=this;
    var url=requestUrl+"/API/PracticalMatrix/GetPracticalMatrixDetail?id="+that.data.id;
    WxRequest.PostRequest(url,{}).then(res=>{
      if(res.data.success){
        that.setData({
          dataobj:res.data.data
        })
      }
    })
  },
  bookOpt() { //报名
    var that=this;
    wx.navigateTo({
      url: '../course/book?id='+that.data.id+"&courseid="+that.data.courseid
    })
  },
  goVROpt() { //vr体验
    wx.navigateTo({
      url: '../webview/index?type=0&url=https://www.baidu.com',
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