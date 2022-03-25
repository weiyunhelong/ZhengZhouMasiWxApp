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
    id: 0, //群组id
    pid: 0, //实践课程id
    IsShowAll:false,//显示全部
    list:[],//成员
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id: options.id,
    })
  },
  InitData() { //获取数据
    var that = this;
    var url = requestUrl + "/API/GroupsInfo/GroupInfoDetail?UserId=" + getApp().globalData.WxUserId + "&Id=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          dataobj: res.data.data
        })
      }
      setTimeout(() => {
        wx.hideLoading();
        that.setData({
          showloadingMask: false
        })
      }, 1000);
    })
  },
  InitMember() { //获取用户成员
    var that = this;
    var url = requestUrl + "/API/GroupsInfo/GetGroupItemALLList?keywords=&userid=" + getApp().globalData.WxUserId + "&gId=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          list: res.data.data.datas
        })
      }
    })
  },
  memberOpt(e) { //新增或者移除
    var that = this;
    var dataobj=that.data.dataobj;
    wx.navigateTo({
      url: '../chat/invite?id=' + dataobj.Id + "&type=" + e.currentTarget.dataset.type + "&pid=" + dataobj.JXID,
    })
  },
  ShowMoreOpt(){//查看全部
    var that=this;
    that.setData({
      IsShowAll:!that.data.IsShowAll
    })
  },
  jiesanOpt() { //解散讨论组
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
          var url = requestUrl + "/API/GroupsInfo/PostDeleteGroupInfo?gId=" + that.data.id + "&UserId=" + getApp().globalData.WxUserId;
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
  outOpt() { //退出讨论组
    var that = this;

    wx.showModal({
      cancelColor: '#666666',
      cancelText: '取消',
      confirmColor: '#000000',
      confirmText: '确定',
      content: '确定要退出讨论组吗',
      showCancel: true,
      title: '',
      success: (result) => {
        if (result.confirm) {
          //TODO　请求接口解散群组
          var url = requestUrl + "/API/GroupsInfo/DeleteGroupItemByID?gId=" + that.data.id + "&ids=" + getApp().globalData.WxUserId;
          WxRequest.PostRequest(url, {}).then(res => {
            if (res.data.success) {
              wx.showToast({
                title: '退出成功',
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
    var that=this;
    getApp().ChargeLogin().then(res => {
      if (getApp().globalData.WxUserId == 0) {
        wx.navigateTo({
          url: '../../wxauth/pages/wxlogin/index',
        })
      } else {
        that.InitData();
        that.InitMember();
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