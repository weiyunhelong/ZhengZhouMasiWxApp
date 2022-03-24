// chat/pages/chat/set.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showloadingMask: false,
    dataobj: {},
    id: 0,
    pageindex: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id
    })
    that.InitData();
  },
  InitData() { //获取数据
    var that = this;
    var pageindx = that.data.pageindex;
    var chkkind = that.data.chkkind;
    var url = requestUrl + "/API/XRIdeology/HomeDateList?uid=" + getApp().globalData.WxUserId + "&dataType=" + chkkind;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        if (pageindx == 1) {
          that.setData({
            list: res.data.data.CourseCenter.concat(res.data.data.Fourhistories), //res.data.data.datas
          })
        } else {
          that.setData({
            list: that.data.list.concat(res.data.data.RedGene)
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
  memberOpt(e) { //
    var that = this;
    wx.navigateTo({
      url: '../chat/invite?id=' + that.data.id + "&type="+e.currentTarget.dataset.type,
    })
  },
  jiesanOpt(){//解散讨论组
    var that = this;

    wx.showModal({
      cancelColor: '#666666',
      cancelText: '取消',
      confirmColor: '#000000',
      confirmText: '确定',
      content: '确定要解散此讨论组吗',
      showCancel: true,
      title: '',
      success: (result) => {
        if (result.confirm) {
          //TODO　请求接口解散群组
          var url = requestUrl + "/API/GroupsInfo/PostDeleteGroupInfo?gId=" + that.data.groupid + "&UserId=" + getApp().globalData.WxUserId;
          WxRequest.PostRequest(url, {}).then(res => {
            if (res.data.success) {
              wx.showToast({
                title: '解散成功',
              })
              setTimeout(() => {
                wx.navigateBack({
                  delta: 2,
                })
              }, 2000);
            } else {
              WxRequest.ShowAlert(res.data.msg);
            }
          })

        }
      }
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