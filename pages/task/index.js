// pages/task/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    taskid: -1,
    dataobj: {}, //当前的任务
    IsVr: true, //是否有VR视频
    tasks: [], //任务列表
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
  tapTab(e) { //切换任务
    var that = this;
    that.setData({
      taskid: e.currentTarget.dataset.id
    })
    that.InitObjData();
  },
  goVROpt() { //跳转到VR页面
    wx.navigateTo({
      url: '../webview/index?url=https://www.baidu.com',
    })
  },
  goUploadWork() { //上传作品
    var that = this;
    wx.navigateTo({
      url: '../task/upload?id=' + that.data.id + "&taskid=" + that.data.taskid,
    })
  },
  showModalOpt() { //点击显示遮罩
    var that = this;
    that.setData({
      showMask: true,
      showMaskAni: true,
    })
  },
  hideMaskOpt() { //隐藏遮罩层
    var that = this;
    that.setData({
      showMaskAni: false
    })
    setTimeout(() => {
      that.setData({
        showMask: false
      })
    }, 2000);
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
        wx.redirectTo({
          url: '../../wxauth/pages/wxlogin/index',
        })
      } else {
        //获取全部任务
        that.InitData();
      }
    })
  },
  InitData() { //获取全部任务
    var that = this;
    var url = requestUrl + "/API/PracticalTask/GetPracticalTaskList?page=1&rows=100&practicalID=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          tasks: res.data.data.datas,
          taskid: res.data.data.datas.length == 0 ? -1 : res.data.data.datas[0].ID
        })
        if (that.data.taskid != -1) {
          that.InitObjData();
        }
      }
    })
  },
  InitObjData() { //获取任务详情
    var that = this;
    var url = requestUrl + "/API/PracticalTask/GetPracticalTaskDetail?id=" + that.data.taskid;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          dataobj: res.data.data
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