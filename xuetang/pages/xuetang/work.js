// xuetang/pages/xuetang/work.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chktab: -1,//-1全部 0:活动 1：任务 2:优质
    pageindex:1,
    list:[],
    showMask: false,
    showMaskAni: false,
    commentTxt:'',//评论
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
      pageindex:1,
      list:[]
    })
    that.InitData();
  },
  ShowMoreData(){//加载更多数据
    var that = this;
    that.setData({
      pageindex:1+that.data.pageindex
    })
    that.InitData();
  },
  showCommentOpt(e) { //显示评论浮窗
    var that = this;
    that.setData({
      showMask: true,
      showMaskAni: true,
      commentTxt:e.currentTarget.dataset.obj
    })
  },
  closeMask() {//关闭评论浮窗
    var that = this;
    that.setData({
      showMaskAni: false,
    })
    setTimeout(() => {
      that.setData({
        commentTxt:'',
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
    if (getApp().globalData.WxUserId == 0) {
      wx.navigateTo({
        url: '../../../wxauth/pages/wxlogin/index',
      })
    } else {
      that.InitData();
    }
  },
  InitData() { //获取我的实践课
    var that = this;
    var  chktab=that.data.chktab,//-1全部 0:活动 1：任务 2:优质
    pageindex=that.data.pageindex;

    var url = requestUrl + "/API/UserCenterJindeSchool/GetWorksListWhereUser?page="+pageindex+"&rows=10&userid=" + getApp().globalData.WxUserId+"&state=-1&type="+chktab;
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