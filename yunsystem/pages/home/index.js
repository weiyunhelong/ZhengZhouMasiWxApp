// yunsystem/pages/middle/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showStep: false,
    bgimg:'',
    showloadingMask:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          navigationBarHeight: res.statusBarHeight
        })
      },
    })
  },
  goBack() { //点击返回
    wx.navigateBack({
      delta: 1,
      fail: function () {
        wx.reLaunch({
          url: '../../../pages/home/index',
        })
      }
    })
  },
  konwOpt() { //点击我知道了
    var that = this;

    wx.setStorage({
      key: 'yunzhanopt',
      data: true,
      complete: function () {
        that.setData({
          showStep: false,
        })
      }
    })
  },
  ScanOpt() { //扫码操作
    wx.navigateTo({
      url: '../scan/index',
    })
  },
  goRecord() { //体验记录
    wx.redirectTo({
      url: '../record/index',
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

    wx.getStorage({
      key: 'yunzhanopt',
      success: function () {
        that.setData({
          showStep: false
        })
      },
      fail: function () {
        that.setData({
          showStep: true
        })
      }
    })
  },
  InitData(){//获取背景图
    var that=this;
    var url=requestUrl+"/API/CloudExhibition/GetCoverCloud?userid="+getApp().globalData.WxUserId;
    WxRequest.PostRequest(url,{}).then(res=>{
      if(res.data.success){
        that.setData({
          bgimg:res.data.data
        })
      }
      setTimeout(() => {
        that.setData({
          showloadingMask:false
        })
      }, 500);
    })
  },
  goList(){//跳转到列表
    wx.navigateTo({
      url: '../list/index',
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