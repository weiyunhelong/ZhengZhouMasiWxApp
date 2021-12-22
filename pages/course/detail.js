// pages/course/detail.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

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

    chkTab: 0, //当前的任务
    showMask: false, //显示遮罩层
    showMaskAni: false, //遮罩层动画
    chksubTab: 0, //选中子分类
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
  showMaskOpt(e) { //点击显示遮罩
    var that = this;
    that.setData({
      showMask: true,
      showMaskAni: true,
      chkTab: e.currentTarget.dataset.tab,
      chksubTab: 1, //子分类
    })
  },
  hideMaskOpt() { //隐藏遮罩层
    var that = this;
    that.setData({
      showMaskAni: false
    })
    setTimeout(() => {
      that.setData({
        showMask: false,
        chkTab: 0
      })
    }, 2000);
  },
  goBackOpt() { //点击返回
    wx.navigateBack({
      delta: 1,
    })
  },
  uploadOpt() { //上传操作
    var that = this;
    wx.navigateTo({
      url: '../course/upload?id=' + that.data.id,
    })
  },
  tapSubTab(e) { //点击子分类
    var that = this;
    that.setData({
      chksubTab: e.currentTarget.dataset.tab
    })
  },
  goJiDiOpt(e) { //点击跳转到基地详情
    wx.navigateTo({
      url: '../course/jidi?id=' + e.currentTarget.dataset.id,
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