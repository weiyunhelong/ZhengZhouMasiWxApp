// chat/pages/chat/member.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupid: 0,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      groupid: options.id
    })
    if(options.type==1){
      wx.setNavigationBarTitle({
        title: '群成员',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '讨论成员',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline'],
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //获取成员
    that.InitData();
  },
  InitData() { //获取成员
    var that = this;
    var url = requestUrl + "/API/GroupsInfo/GetGroupItemALLList?gId=" + that.data.groupid + "&userid=" + getApp().globalData.WxUserId + "&keywords=";
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