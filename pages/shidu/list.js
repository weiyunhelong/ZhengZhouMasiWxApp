// pages/shidu/list.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    list: [],
    pageindex: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    })
    wx.setNavigationBarTitle({
      title: options.name,
    })
  },
  goDetail(e) { //跳转到详情
    var that = this;
    wx.navigateTo({
      url: "../shidu/chapter?id=" + e.currentTarget.dataset.id
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
      wx.reLaunch({
        url: '../../wxauth/pages/wxlogin/index',
      })
    } else {
      //获取数据
      that.InitData();
    }
  },
  InitData() { //获取数据
    var that = this;
    var pageindex = that.data.pageindex;
    var url = requestUrl + "/API/ReadRedTimeApi/GetReadRedTimeList?page=" + pageindex + "&rows=10&type=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        if (pageindex == 1) {
          that.setData({
            list: res.data.data.datas
          })
        } else {
          that.setData({
            list:that.data.list.concat(res.data.data.datas) 
          })
        }
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