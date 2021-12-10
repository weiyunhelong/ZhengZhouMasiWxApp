// yunsystem/pages/info/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    dataobj: {},
    desc: '<p>三亚市，是海南省地级市，简称崖，古称崖州，别称鹿城，地处海南岛的最南端。三亚东邻陵水黎族自治县，西接乐东黎族自治县，北毗保亭黎族苗族自治县，南临南海，三亚市陆地总面积1921平方千米，海域总面积3226平方千米。东西长91.6千米，南北宽51公里，下辖四个区。</p>\
    <img style="width:100%;border-radius:10px;margin:10px 0;" src="https://bkimg.cdn.bcebos.com/pic/0b55b319ebc4b74543a93692ffb609178a82b901bf57"/>\
    <p>三亚市，是海南省地级市，简称崖，古称崖州，别称鹿城，地处海南岛的最南端。三亚东邻陵水黎族自治县，西接乐东黎族自治县，北毗保亭黎族苗族自治县，南临南海，三亚市陆地总面积1921平方千米，海域总面积3226平方千米。东西长91.6千米，南北宽51公里，下辖四个区。</p>\
    <img style="width:100%;border-radius:10px;margin:10px 0;" src="https://bkimg.cdn.bcebos.com/pic/0b55b319ebc4b74543a93692ffb609178a82b901bf57"/>\
    <p>三亚市，是海南省地级市，简称崖，古称崖州，别称鹿城，地处海南岛的最南端。三亚东邻陵水黎族自治县，西接乐东黎族自治县，北毗保亭黎族苗族自治县，南临南海，三亚市陆地总面积1921平方千米，海域总面积3226平方千米。东西长91.6千米，南北宽51公里，下辖四个区。</p>',
    IsZan: false, //是否点赞
    IsCollect: false, //是否收藏
    IsVr: true, //是否有VR视频
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    })
  },
  ZanOpt() { //点赞
    var that = this;
    var dataobj = that.data.dataobj;
    var IsZan = that.data.IsZan;

    if (IsZan) { //取消点赞
      wx.showToast({
        title: '已取消点赞',
        duration: 2000
      })
      that.setData({
        IsZan: false
      })
    } else { //点赞
      wx.showToast({
        title: '点赞成功',
        duration: 2000
      })
      that.setData({
        IsZan: true
      })
    }
  },
  CollectOpt() { //收藏
    var that = this;
    var dataobj = that.data.dataobj;
    var IsCollect = that.data.IsCollect;

    if (IsCollect) { //取消收藏
      wx.showToast({
        title: '已取消收藏',
        duration: 2000
      })
      that.setData({
        IsCollect: false
      })
    } else { //收藏
      wx.showToast({
        title: '收藏成功',
        duration: 2000
      })
      that.setData({
        IsCollect: true
      })
    }
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