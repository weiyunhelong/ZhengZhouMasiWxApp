// pages/course/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showloadingMask:true,
    chktab: 1, //1:我的实践课 2:更多课程
    pageindex: 1,
    list: [],
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
  goSystem() { //党建和思政教育云展系统
    wx.navigateTo({
      url: '../../yunsystem/pages/home/index',
    })
  },
  tapTab(e) { //切换tab
    var that = this;
    that.setData({
      pageindex: 1,
      chktab: e.currentTarget.dataset.tab
    })
    that.InitData();
  },
  goDetail(e) { //跳转到详情
    wx.navigateTo({
      url: '../course/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  showModaData() { //滚动加载更多
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
    //获取菜单的列表数据
    that.setTabbarlist();
    if (getApp().globalData.WxUserId == 0) {
      getApp().ChargeLogin().then(res => {
        if (getApp().globalData.WxUserId == 0) {
          wx.navigateTo({
            url: '../../wxauth/pages/wxlogin/index',
          })
        }
      })
    } else {
      //获取课程列表
      that.InitData();
    }
  },
  setTabbarlist: function () { //获取菜单的列表数据
    var that = this;

    //设置选中的tabbar
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
      for (var i = 0; i < getApp().globalData.tabbar.length; i++) {
        if (getApp().globalData.tabbar[i].pagePath.indexOf("/course/index") > 0) {
          that.getTabBar().setData({
            selected: i,
            showTabBar: true,
            list: getApp().globalData.tabbar
          })
        }
      }
    }
  },
  InitData() { //获取课程列表
    var that = this;
    var pageindex = that.data.pageindex;
    var chktab = that.data.chktab;
    var url = requestUrl + "/API/PracticalTeaching/GetPracticalTeachingList?page=" + pageindex + "&rows=10&userID=" + (chktab == 1 ? getApp().globalData.WxUserId : "");

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
        that.setData({
          showloadingMask:false
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