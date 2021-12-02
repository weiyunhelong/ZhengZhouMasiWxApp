// my/pages/news/index.js
var requestUrl = getApp().globalData.requestUrl;
var WxRequest = require('../../../utils/WxRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chkkind: 0, //0:评论 1:点赞 2:公告
    list: [], //列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tapKind(e) { //选中类型
    var that = this;
    that.setData({
      chkkind: e.currentTarget.dataset.tab
    })
    that.InitData();
  },
  InitData() { //获取消息列表
    var that = this;
    var chkkind = that.data.chkkind;
    var list = [{
      id: 1,
      cover: "https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/mysucai/studycover.png",
      name: "爱国主义教育基地纪念关贵爱国主义教育基地纪念关贵",
      datetime: "刚刚",
      percent: "12"
    }, {
      id: 2,
      cover: "https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/mysucai/studycover.png",
      name: "爱国主义教育基地纪念关贵爱国主义教育基地纪念关贵",
      datetime: "2分钟前",
      percent: "56"
    }, {
      id: 3,
      cover: "https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/mysucai/studycover.png",
      name: "爱国主义教育基地纪念关贵爱国主义教育基地纪念关贵",
      datetime: "1小时前",
      percent: "12"
    }, {
      id: 4,
      cover: "https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/mysucai/studycover.png",
      name: "爱国主义教育基地纪念关贵爱国主义教育基地纪念关贵",
      datetime: "2021-11-08",
      percent: "12"
    }, {
      id: 5,
      cover: "https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/mysucai/studycover.png",
      name: "爱国主义教育基地纪念关贵爱国主义教育基地纪念关贵",
      datetime: "2021-11-08",
      percent: "12"
    }, {
      id: 6,
      cover: "https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/mysucai/studycover.png",
      name: "爱国主义教育基地纪念关贵爱国主义教育基地纪念关贵",
      datetime: "2021-11-08",
      percent: "12"
    }, {
      id: 7,
      cover: "https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/mysucai/studycover.png",
      name: "爱国主义教育基地纪念关贵爱国主义教育基地纪念关贵",
      datetime: "2021-11-08",
      percent: "12"
    }, {
      id: 8,
      cover: "https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/mysucai/studycover.png",
      name: "爱国主义教育基地纪念关贵爱国主义教育基地纪念关贵",
      datetime: "2021-11-08",
      percent: "12"
    }, {
      id: 9,
      cover: "https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/mysucai/studycover.png",
      name: "爱国主义教育基地纪念关贵爱国主义教育基地纪念关贵",
      datetime: "2021-11-08",
      percent: "12"
    }, {
      id: 10,
      cover: "https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/mysucai/studycover.png",
      name: "爱国主义教育基地纪念关贵爱国主义教育基地纪念关贵",
      datetime: "2021-11-08",
      percent: "12"
    }, {
      id: 11,
      cover: "https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/mysucai/studycover.png",
      name: "爱国主义教育基地纪念关贵爱国主义教育基地纪念关贵",
      datetime: "2021-11-08",
      percent: "12"
    }, {
      id: 12,
      cover: "https://zhengzhousizheng.oss-cn-beijing.aliyuncs.com/mysucai/studycover.png",
      name: "爱国主义教育基地纪念关贵爱国主义教育基地纪念关贵",
      datetime: "2021-11-08",
      percent: "12"
    }];
    that.setData({
      list: list
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