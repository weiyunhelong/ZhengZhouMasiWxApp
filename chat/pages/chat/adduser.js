// chat/pages/chat/adduser.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    chkids: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.InitData();
  },
  InitData() {
    var that = this;
    var list = [];
    for (var i = 0; i < 15; i++) {
      list.push({
        id: i + 1,
        ischk: false,
        avatar: "/resources/comman/avatarUrl.jpg",
        name: "矫瑶海"+i
      })
    }
    that.setData({
      list:list
    })
  },
  tapCheckOpt(e) {
    var that = this;
    var list = that.data.list;
    var id = e.currentTarget.dataset.id;
    for (var i = 0; i < list.length; i++) {
      if (id == list[i].id) {
        list[i].ischk=!list[i].ischk;
      }
    }
    var chkids=[];
    for (var i = 0; i < list.length; i++) {
      if (list[i].ischk) {
        chkids.push(list[i].id);
      }
    }
    that.setData({
      list:list,
      chkids:chkids
    })
  },
  confrimOpt(){
    var that=this;
    var chkids=that.data.chkids;
    if(chkids.length==0){
      WxRequest.ShowAlert("请选择成员");
    }else{
      wx.showToast({
        title: '选择成功',
      })
    }
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