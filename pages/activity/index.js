// pages/activity/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,//课程id
    activityid:-1,//活动id
    dataobj: {},
    chkTab: 0, //当前的任务
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
      chkTab: e.currentTarget.dataset.name
    })
  },
  goAddOpt() { //跳转到创建
    var that = this;
    wx.navigateTo({
      url: '../activity/create?id=' + that.data.id,
    })
  },
  bookOpt() { //报名
    var that = this;
    wx.navigateTo({
      url: '../activity/book?id=' + that.data.id + "&taskid=" + that.data.activityid,
    })
  },
  UploadOpt() { //上传作品
    var that = this;
    wx.navigateTo({
      url: '../activity/upload?id=' + that.data.id + "&taskid=" + that.data.activityid,
    })
  },
  CancelBookOpt(){//取消报名
    var that = this;
    var url = requestUrl + "/API/PracticalActivity/CancelApply?activityID=" + that.data.activityid+"&userID="+getApp().globalData.WxUserId;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        var dataobj=that.data.dataobj;
        dataobj.IsApply=false;
        that.setData({
          dataobj: dataobj
        })
      }else{
        WxRequest.ShowAlert(res.data.msg);
      }
    })
  },
  showModalOpt(){//显示全部活动
    var that = this;

    that.setData({
      showMask: true,
      showMaskAni: true,
    })
  },
  hideMaskOpt(){//收起全部活动
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
  NextOpt(){//下一个活动
    var that = this;
    var dataobj=that.data.dataobj;
    if(dataobj.NextID==0){
      WxRequest.ShowAlert("已是最后一个");
    }else{
      that.setData({
        activityid:dataobj.NextID
      })
      that.InitObjData();
    }
  },
  checkhuodong(e){//切换活动
    var that = this;
    that.setData({
      activityid:e.currentTarget.dataset.id
    })
    that.InitObjData();
    that.hideMaskOpt();
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
      wx.redirectTo({
        url: '../../wxauth/pages/wxlogin/index',
      })
    } else {
      //获取全部活动
      that.InitData();
    }
  },
  InitData() { //获取全部活动
    var that = this;
    var url = requestUrl + "/API/PracticalActivity/GetPracticalActivityList?page=1&rows=100&practicalID=" + that.data.id;
    WxRequest.PostRequest(url, {}).then(res => {
      if (res.data.success) {
        that.setData({
          list: res.data.data.datas,
          activityid:res.data.data.datas.length==0?-1:res.data.data.datas[0].ID
        })
        if(that.data.activityid!=-1){
          that.InitObjData();
        }        
      }
    })
  },
  InitObjData(){//获取活动详情
    var that = this;
    var url = requestUrl + "/API/PracticalActivity/GetPracticalActivityDetail?id=" + that.data.activityid+"&userID="+getApp().globalData.WxUserId;
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