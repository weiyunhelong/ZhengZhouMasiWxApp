// xuetang/pages/xuetang/baogao.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chktab: -1, //分类 -1:全部 0:待批阅 1:已通过 2未通过
    pageindex: 1, //下标
    list: [], //列表
    showMask: false,
    showMaskAni: false,
    commentTxt: '', //老师回复
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapTab(e) { //切换tab
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.tab,
      pageindex: 1,
      list: []
    })
    that.InitData();
  },
  ShowMoreData() { //加载更多
    var that = this;
    that.setData({
      pageindex: that.data.pageindex + 1
    })
    that.InitData();
  },
  showCommentOpt(e) { //显示评论浮窗
    var that = this;
    that.setData({
      showMask: true,
      showMaskAni: true,
      commentTxt: e.currentTarget.dataset.obj.Remark
    })
  },
  closeMask() { //关闭评论浮窗
    var that = this;
    that.setData({
      showMaskAni: false,
    })
    setTimeout(() => {
      that.setData({
        commentTxt: '',
        showMask: false,
      })
    }, 1000);
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
  },
  InitData() { //获取我的实践报告
    var that = this;
    var pageindex = that.data.pageindex;
    var chktab = that.data.chktab;
    var url = requestUrl + "/API/UserCenterJindeSchool/GetReportListWhereUser?page=" + pageindex + "&rows=10&userid=" + getApp().globalData.WxUserId + "&state=" + (chktab==-1?'':chktab);
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