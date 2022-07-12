// yunsystem/pages/list/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageindex: 1,
    pagesize: 10,
    showloadingMask: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goDetail(e){//点击到详情
    wx.navigateTo({
      url: '../info/index?id='+e.currentTarget.dataset.id
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
          url: '../../../wxauth/pages/wxlogin/index',
        })
      } else {
        that.InitData();
        that.SaveRecord();
      }
    })
  },
  InitData() { //获取列表
    var that = this;
    var pageindex = that.data.pageindex;
    var pagesize = that.data.pagesize;
    var url = requestUrl + "/API/CloudExhibition/GetCloudExhibitionInfoList?type=" + that.data.id + "&page=" + pageindex + "&rows=" + pagesize+"&userid=" + getApp().globalData.WxUserId;
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
          showloadingMask: false
        })
      }, 500);
    });
  },
  ShowMore() { //加载更多
    var that = this;
    that.setData({
      pageindex: that.data.pageindex + 1
    })
    that.InitData();
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