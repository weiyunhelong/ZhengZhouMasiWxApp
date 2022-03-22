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

    chkTab: 0, //当前的任务
    showMask: false, //显示遮罩层
    showMaskAni: false, //遮罩层动画

    showMaskList: false, //显示列表部分
    fangans: [], //方案列表    
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
    that.setData({
      id: options.id
    })
  },
  showMaskOpt(e) { //点击显示遮罩
    var that = this;

    that.setData({
      showMask: true,
      showMaskAni: true,
      chkTab: e.currentTarget.dataset.tab,
      chksubTab: 0, //子分类
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
  showModalOpt() { //显示列表
    this.setData({
      showMaskList: true,
      masklist: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //当前的任务
      chkmasklist: 0,
    })
  },
  checkfangan(e) { //选中方案
    var that = this;
    var chksubTab = parseInt(e.currentTarget.dataset.index);
    that.setData({
      chksubTab: chksubTab
    })
  },
  checkziyuanOpt(e) { //选中资源
    var that = this;
    var chksubTab = parseInt(e.currentTarget.dataset.index);
    that.setData({
      chksubTab: chksubTab
    })
  },
  showFangAnNextOpt() { //显示下个方案
    var that = this;
    var fangans = that.data.fangans;
    var chksubTab = parseInt(that.data.chksubTab);
    if (chksubTab + 1 == fangans.length) {
      chksubTab = 0;
    } else {
      chksubTab = chksubTab + 1;
    }
    that.setData({
      chksubTab: chksubTab
    })
  },
  showZiYuanNextOpt() { //显示下个资源
    var that = this;
    var ziyuans = that.data.ziyuans;
    var chksubTab = parseInt(that.data.chksubTab);
    if (chksubTab + 1 == ziyuans.length) {
      chksubTab = 0;
    } else {
      chksubTab = chksubTab + 1;
    }
    that.setData({
      chksubTab: chksubTab
    })
  },
  hideMaskListOpt() { //点击收起
    this.setData({
      showMaskList: false
    })
  },
  goBackOpt() { //点击返回
    wx.navigateBack({
      delta: 1,
    })
  },
  goActivityOpt() { //点击实践活动
    var that = this;
    wx.navigateTo({
      url: '../activity/index?id=' + that.data.id
    })
  },
  goTaskOpt() { //点击实践任务
    var that = this;
    wx.navigateTo({
      url: '../task/index?id=' + that.data.id
    })
  },
  goTestOpt() { //点击答题测试
    var that = this;
    wx.navigateTo({
      url: '../test/index?id=' + that.data.id
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
  tapJidiSubTab(e) { //点击子分类
    var that = this;
    that.setData({
      chksubTab: e.currentTarget.dataset.tab
    })
    that.InitJiDi();
  },
  goJiDiOpt(e) { //点击跳转到基地详情
    var that = this;
    wx.navigateTo({
      url: '../course/jidi?id=' + e.currentTarget.dataset.id + "&courseid=" + that.data.id
    })
  },
  goTaoLun(e) { //点击到讨论专区
    var that = this;
    wx.navigateTo({
      url: '../course/taolundetail?id=' + e.currentTarget.dataset.id + "&pid=" + that.data.id
    })
  },
  goPublicTaolun() { //点击发起讨论
    var that = this;
    wx.navigateTo({
      url: '../course/taolun?id=' + that.data.id
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
          url: '../../wxauth/pages/wxlogin/index',
        })
      } else {
        //获取课程详情
        that.InitData();

        //获取教学方案
        that.InitFangAn();

        //获取实践基地
        that.InitJiDi();

        //获取实践资源
        that.InitZiYuan();

        //获取讨论区
        that.InitComment();

      }
    })

  },
  InitData() { //获取详情
    var that = this;
    var url = requestUrl + "/API/PracticalTeaching/GetPracticalTeachingDetail?id=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          dataobj: res.data.data
        })
      }
    })
  },
  InitFangAn() { //获取教学方案
    var that = this;
    var url = requestUrl + "/API/PracticalScheme/GetPracticalSchemeList?page=1&rows=100&practicalID=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          fangans: res.data.data.datas,
        })
      }
    })
  },
  InitJiDi() { //获取实践基地
    var that = this;
    var url = requestUrl + "/API/PracticalMatrix/GetPracticalMatrixList?page=1&rows=100&practicalID=" + that.data.id + "&type=" + that.data.chksubTab;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          jidis: res.data.data.datas,
        })
      }
    })
  },
  InitZiYuan() { //获取实践资源
    var that = this;
    var url = requestUrl + "/API/PracticalResource/GetPracticalResourceList?page=1&rows=100&practicalID=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          ziyuans: res.data.data.datas,
        })
      }
    })
  },
  InitComment() { //获取讨论区
    var that = this;
    var url = requestUrl + "/API/TopicInforList/GetTopicInforList?page=1&rows=100&practicalid=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          comments: res.data.data.datas,
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