// pages/group/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkkind: 1, //1实践群 2讨论组
    list: [],
    pageindex: 1,
    showloadingMask: true,
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
  tapKind(e) { //切换类型
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      chkkind: e.currentTarget.dataset.tab,
      pageindex:1,
      list:[]
    })
    that.InitData();
  },
  ShowMoreData(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      pageindex:1+that.data.pageindex,
    })
    that.InitData();
  },
  goDetail(e) {//进入到详情
    var that = this;
    var dataobj = e.currentTarget.dataset.obj;
    //消息更新为已读
    var url=requestUrl+"/API/GroupsInfo/PostReadGroupMsg?gId="+dataobj.Id+"&UserId="+getApp().globalData.WxUserId;
    WxRequest.PostRequest(url,{}).then(res=>{
      wx.navigateTo({
        url: '../../chat/pages/chat/wechat?id=' +dataobj.Id+"&jxid="+dataobj.JXID+"&type="+that.data.chkkind+"&gname="+dataobj.Title,
      })
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
    //获取菜单的列表数据
    that.setTabbarlist();

    getApp().ChargeLogin().then(res => {
      if (getApp().globalData.WxUserId == 0) {
        wx.navigateTo({
          url: '../../wxauth/pages/wxlogin/index',
        })
      } else {
        that.InitData();
      }
    })
  },
  setTabbarlist: function () { //获取菜单的列表数据
    var that = this;

    //设置选中的tabbar
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
      for (var i = 0; i < getApp().globalData.tabbar.length; i++) {
        if (getApp().globalData.tabbar[i].pagePath.indexOf("/group/index") > 0) {
          that.getTabBar().setData({
            selected: i,
            showTabBar: true,
            list: getApp().globalData.tabbar
          })
        }
      }
    }
  },
  InitData() { //获取首页数据
    var that = this;
    var pageindex=that.data.pageindex;
    
    var url = requestUrl + "/API/GroupsInfo/MyMessgeInfoList?userid=" + getApp().globalData.WxUserId + "&datatype="+that.data.chkkind+"&pageNo="+pageindex+"&pageSize=20";
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        if(pageindex==1){
          that.setData({
            list: res.data.data.Models
          })
        }else{
          that.setData({
            list:that.data.list.concat(res.data.data.Models) 
          })
        }
      }
      setTimeout(() => {
        wx.hideLoading();
        that.setData({
          showloadingMask: false
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