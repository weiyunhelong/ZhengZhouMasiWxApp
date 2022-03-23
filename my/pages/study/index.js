// my/pages/study/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageindex: 1,
    chktab: -1,//-1全部（2全景 3红读 4四史）
    showloadingMask: true,
    numobj:{
      TotalTime: 0, 
      todayTime: 0
    },
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
  backOpt() { //返回
    wx.navigateBack({
      delta: 1,
      fail: function () {
        wx.reLaunch({
          url: '../../../pages/home/index',
        })
      }
    })
  },
  tapTab(e) { //切换tab
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.tab,
      pageindex: 1,
      list: [],
    })
    wx.showLoading({
      title: '加载中',
    })
    that.InitData();
  },
  ShowMoreData() { //加载更多
    var that = this;
    that.setData({
      pageindex: 1 + that.data.pageindex
    })
    that.InitData();
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
        that.InitNum();
        that.InitData();
      }
    })

  },
  InitNum() { //获取时长数据
    var that = this;
    var url = requestUrl + "/API/UserCenterApi/GetDurationWhereUser?userid=" + getApp().globalData.WxUserId;
    WxRequest.PostRequest(url, {}).then(res => {
      if(res.data.success){
        that.setData({
          numobj:res.data.data
        })
      }
       
    })
  },
  InitData() {
    var that = this;
    var pageindex = that.data.pageindex;
    var chktab= that.data.chktab;
    var url = requestUrl + "/API/UserCenterApi/GetDurationListWhereUser?page=" + pageindex + "&row=20&userid=" + getApp().globalData.WxUserId+"&datatype="+chktab;

    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        if (pageindex == 1) {
          that.setData({
            list: res.data.data.datas
          })
        } else {
          that.setData({
            list: that.data.list.concat(res.data.data.datas)
          })
        }
      }

      setTimeout(() => {
        wx.hideLoading();
        that.setData({
          showloadingMask: false
        })
      }, 1000);
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