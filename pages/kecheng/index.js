// pages/kecheng/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chktab: 1, //1视频 0专栏
    list: [],
    pageindex: 1,
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
  tapTab(e) { //切换tab
    var that = this;
    that.setData({
      chktab: e.currentTarget.dataset.tab,
      pageindex:1
    })
    that.InitData();
  },
  goDetail(e) { //点击到详情
    var that = this;
    //var chktab = that.data.chktab;
    // if (chktab == 0) { //专栏
    //   wx.navigateTo({
    //     url: '../kecheng/detail?id=' + e.currentTarget.dataset.id,
    //   })
    // } else { //视频
    //   wx.navigateTo({
    //     url: '../kecheng/video?id=' + e.currentTarget.dataset.id,
    //   })
    // }
    wx.navigateTo({
      url: '../kecheng/video?id=123',
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

    that.InitData();
  },
  setTabbarlist: function () { //获取菜单的列表数据
    var that = this;

    //设置选中的tabbar
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
      for (var i = 0; i < getApp().globalData.tabbar.length; i++) {
        if (getApp().globalData.tabbar[i].pagePath.indexOf("/kecheng/index") > 0) {
          that.getTabBar().setData({
            selected: i,
            showTabBar: true,
            list: getApp().globalData.tabbar
          })
        }
      }
    }
  },
  InitData() { //获取列表数据
    var that = this;

    var pageindex = that.data.pageindex;
    var chktab = that.data.chktab; //0视频 1专栏
    var url=requestUrl+"/API/ManuscriptApi/GetManuscriptList?keywords=&userId="+getApp().globalData.WxUserId+"page="+pageindex+"&rows=10"+"&type="+chktab;
    WxRequest.PostRequest(url,{}).then(res=>{
      if(res.data.success){
        if(pageindex==1){
          that.setData({
            list:res.data.data.datas
          })
        }else{
          that.setData({
            list:that.data.list.concat(res.data.data.datas) 
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