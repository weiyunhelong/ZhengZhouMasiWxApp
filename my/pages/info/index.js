// my/pages/info/index.js
var WxRequest = require('../../../utils/WxRequest.js');
var validator = require('../../../utils/validator.js');
var requesturl = getApp().globalData.requestUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseTxOpt(){//替换头像
    var that = this;
    
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片 
        OssTool.uploadImgFile(res.tempFilePaths[0], 'avatarUrl/' + getApp().globalData.openId + '/',
          function (result) {
            that.setData({
              tx: result
            })
          })
      }
    })
  },  
  goDescOpt(){
    wx.navigateTo({
      url: '../info/desc',
    })
  },
  goSexOpt(){
    var that=this;
    wx.showActionSheet({
      itemList: ["保密","男","女"],
    })
  },
  goPwdOpt(){
    wx.navigateTo({
      url: '../info/pwd',
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